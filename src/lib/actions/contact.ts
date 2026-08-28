'use server';

import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { contactContent } from '@/lib/db/schema';
import { getUserId } from '@/lib/get-user-id';
import { DEFAULT_CONTACT_CONTENT } from '@/lib/contact-defaults';

function getText(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim();
}

function getFacebookUrl(value: string) {
  if (!value) return '';

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '';
  } catch {
    return '';
  }
}

function isMissingContactTableError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'cause' in error &&
    typeof error.cause === 'object' &&
    error.cause !== null &&
    'code' in error.cause &&
    error.cause.code === '42P01'
  );
}

async function ensureContactContentTable() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS contact_content (
      id serial PRIMARY KEY,
      "userId" text,
      "officeTitle" text,
      "officeAddress" text,
      "contactPerson" text,
      phone text,
      email text,
      "facebookUrl" text,
      "organizationName" text,
      "updatedAt" timestamp NOT NULL DEFAULT now()
    )
  `);
}

export async function getContactContent() {
  let content;

  try {
    [content] = await db.select().from(contactContent).limit(1);
  } catch (error) {
    if (!isMissingContactTableError(error)) throw error;
  }

  return {
    ...DEFAULT_CONTACT_CONTENT,
    ...Object.fromEntries(
      Object.entries(content ?? {}).filter(([, value]) => typeof value === 'string' && value),
    ),
  };
}

export async function updateContactContent(formData: FormData) {
  const userId = await getUserId();
  await ensureContactContentTable();
  const values = {
    officeTitle: getText(formData, 'officeTitle'),
    officeAddress: getText(formData, 'officeAddress'),
    contactPerson: getText(formData, 'contactPerson'),
    phone: getText(formData, 'phone'),
    email: getText(formData, 'email'),
    facebookUrl: getFacebookUrl(getText(formData, 'facebookUrl')),
    organizationName: getText(formData, 'organizationName'),
  };

  const [existing] = await db.select().from(contactContent).limit(1);

  if (existing) {
    await db
      .update(contactContent)
      .set({ ...values, userId, updatedAt: new Date() })
      .where(eq(contactContent.id, existing.id));
  } else {
    await db.insert(contactContent).values({ ...values, userId });
  }

  revalidatePath('/kontakt');
  revalidatePath('/admin/kontakt');
  revalidatePath('/', 'layout');
}
