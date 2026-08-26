'use server';

import { eq } from 'drizzle-orm';
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

export async function getContactContent() {
  const [content] = await db.select().from(contactContent).limit(1);

  return {
    ...DEFAULT_CONTACT_CONTENT,
    ...Object.fromEntries(
      Object.entries(content ?? {}).filter(([, value]) => typeof value === 'string' && value),
    ),
  };
}

export async function updateContactContent(formData: FormData) {
  const userId = await getUserId();
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
