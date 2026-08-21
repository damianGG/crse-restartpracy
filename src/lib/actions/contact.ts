'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { contactContent } from '@/lib/db/schema';
import { DEFAULT_CONTACT_CONTENT } from '@/lib/contact-defaults';
import { getUserId } from '@/lib/get-user-id';

export async function getContactContent() {
  try {
    const [content] = await db.select().from(contactContent).limit(1);

    return {
      title: content?.title || DEFAULT_CONTACT_CONTENT.title,
      officeTitle: content?.officeTitle || DEFAULT_CONTACT_CONTENT.officeTitle,
      email: content?.email || DEFAULT_CONTACT_CONTENT.email,
    };
  } catch {
    return DEFAULT_CONTACT_CONTENT;
  }
}

export async function updateContactContent(formData: FormData) {
  const userId = await getUserId();
  const values = {
    title: String(formData.get('title') ?? '').trim(),
    officeTitle: String(formData.get('officeTitle') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    userId,
    updatedAt: new Date(),
  };
  const [existing] = await db.select().from(contactContent).limit(1);

  if (existing) {
    await db.update(contactContent).set(values).where(eq(contactContent.id, existing.id));
  } else {
    await db.insert(contactContent).values(values);
  }

  revalidatePath('/kontakt');
  revalidatePath('/admin/kontakt');
}
