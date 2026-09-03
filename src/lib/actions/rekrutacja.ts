'use server';

import { revalidatePath } from 'next/cache';
import { eq, asc, sql } from 'drizzle-orm';
import { put, del } from '@vercel/blob';
import { db } from '@/lib/db';
import { rekrutacjaContent, rekrutacjaPliki } from '@/lib/db/schema';
import { getUserId } from '@/lib/get-user-id';

export async function getRekrutacjaContent() {
  const [content] = await db.select().from(rekrutacjaContent).limit(1);
  return content ?? null;
}

async function ensureRekrutacjaFileVariants() {
  await db.execute(sql`
    ALTER TABLE IF EXISTS rekrutacja_pliki
      ADD COLUMN IF NOT EXISTS "blackWhiteUrl" text,
      ADD COLUMN IF NOT EXISTS "blackWhitePathname" text
  `);
}

export async function getRekrutacjaPliki() {
  await ensureRekrutacjaFileVariants();
  return db.select().from(rekrutacjaPliki).orderBy(asc(rekrutacjaPliki.position));
}

export async function updateRekrutacjaContent(formData: FormData) {
  const userId = await getUserId();

  const title = String(formData.get('title') ?? '').trim();
  const intro = String(formData.get('intro') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();

  const existing = await getRekrutacjaContent();

  if (existing) {
    await db
      .update(rekrutacjaContent)
      .set({ title, intro, content, userId, updatedAt: new Date() })
      .where(eq(rekrutacjaContent.id, existing.id));
  } else {
    await db.insert(rekrutacjaContent).values({ userId, title, intro, content });
  }

  revalidatePath('/rekrutacja');
  revalidatePath('/admin/rekrutacja');
}

export async function addRekrutacjaFile(formData: FormData) {
  const userId = await getUserId();

  const file = formData.get('colorFile') as File | null;
  const blackWhiteFile = formData.get('blackWhiteFile') as File | null;
  const description = String(formData.get('description') ?? '').trim();

  if (!file || file.size === 0) {
    throw new Error('Wybierz plik do wgrania.');
  }

  const blob = await put(`rekrutacja/kolor/${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true,
  });
  let blackWhiteBlob: Awaited<ReturnType<typeof put>> | null = null;

  try {
    if (blackWhiteFile && blackWhiteFile.size > 0) {
      blackWhiteBlob = await put(`rekrutacja/czarno-biale/${blackWhiteFile.name}`, blackWhiteFile, {
        access: 'public',
        addRandomSuffix: true,
      });
    }
  } catch (error) {
    await del(blob.url).catch(() => {});
    throw error;
  }

  const files = await getRekrutacjaPliki();
  const nextPosition = files.length > 0 ? files[files.length - 1].position + 1 : 0;

  await db.insert(rekrutacjaPliki).values({
    userId,
    name: file.name,
    description: description || null,
    url: blob.url,
    pathname: blob.pathname,
    blackWhiteUrl: blackWhiteBlob?.url ?? null,
    blackWhitePathname: blackWhiteBlob?.pathname ?? null,
    position: nextPosition,
  });

  revalidatePath('/rekrutacja');
  revalidatePath('/admin/rekrutacja');
}

export async function deleteRekrutacjaFile(fileId: number) {
  await getUserId();

  const [file] = await db
    .select()
    .from(rekrutacjaPliki)
    .where(eq(rekrutacjaPliki.id, fileId))
    .limit(1);

  if (file) {
    await Promise.all([
      del(file.url).catch(() => {}),
      file.blackWhiteUrl ? del(file.blackWhiteUrl).catch(() => {}) : Promise.resolve(),
    ]);
    await db.delete(rekrutacjaPliki).where(eq(rekrutacjaPliki.id, fileId));
  }

  revalidatePath('/rekrutacja');
  revalidatePath('/admin/rekrutacja');
}
