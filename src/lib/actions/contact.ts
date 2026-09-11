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

function getUrl(value: string) {
  if (!value) return '';

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '';
  } catch {
    return '';
  }
}

async function ensureContactContentTable() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS contact_content (
      id serial PRIMARY KEY,
      "userId" text,
      "officeTitle" text,
      "officeAddress" text,
      "officeHours" text,
      "contactPerson" text,
      phone text,
      email text,
      "facebookUrl" text,
      "facebookLabel" text,
      "organizationName" text,
      "organizationTitle" text,
      "organizationAddress" text,
      "organizationWebsiteUrl" text,
      "organizationWebsiteLabel" text,
      "organizationFacebookUrl" text,
      "organizationFacebookLabel" text,
      "organizationPhone" text,
      "organizationEmail" text,
      hashtags text,
      "hashtagsUrl" text,
      "footerText" text,
      "updatedAt" timestamp NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql`
    ALTER TABLE contact_content
      ADD COLUMN IF NOT EXISTS "officeHours" text,
      ADD COLUMN IF NOT EXISTS "facebookLabel" text,
      ADD COLUMN IF NOT EXISTS "organizationTitle" text,
      ADD COLUMN IF NOT EXISTS "organizationAddress" text,
      ADD COLUMN IF NOT EXISTS "organizationWebsiteUrl" text,
      ADD COLUMN IF NOT EXISTS "organizationWebsiteLabel" text,
      ADD COLUMN IF NOT EXISTS "organizationFacebookUrl" text,
      ADD COLUMN IF NOT EXISTS "organizationFacebookLabel" text,
      ADD COLUMN IF NOT EXISTS "organizationPhone" text,
      ADD COLUMN IF NOT EXISTS "organizationEmail" text,
      ADD COLUMN IF NOT EXISTS hashtags text,
      ADD COLUMN IF NOT EXISTS "hashtagsUrl" text,
      ADD COLUMN IF NOT EXISTS "footerText" text
  `);
}

export async function getContactContent() {
  await ensureContactContentTable();
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
  await ensureContactContentTable();
  const values = {
    officeTitle: getText(formData, 'officeTitle'),
    officeAddress: getText(formData, 'officeAddress'),
    officeHours: getText(formData, 'officeHours'),
    contactPerson: getText(formData, 'contactPerson'),
    phone: getText(formData, 'phone'),
    email: getText(formData, 'email'),
    facebookUrl: getUrl(getText(formData, 'facebookUrl')),
    facebookLabel: getText(formData, 'facebookLabel'),
    organizationName: getText(formData, 'organizationName'),
    organizationTitle: getText(formData, 'organizationTitle'),
    organizationAddress: getText(formData, 'organizationAddress'),
    organizationWebsiteUrl: getUrl(getText(formData, 'organizationWebsiteUrl')),
    organizationWebsiteLabel: getText(formData, 'organizationWebsiteLabel'),
    organizationFacebookUrl: getUrl(getText(formData, 'organizationFacebookUrl')),
    organizationFacebookLabel: getText(formData, 'organizationFacebookLabel'),
    organizationPhone: getText(formData, 'organizationPhone'),
    organizationEmail: getText(formData, 'organizationEmail'),
    hashtags: getText(formData, 'hashtags'),
    hashtagsUrl: getUrl(getText(formData, 'hashtagsUrl')),
    footerText: getText(formData, 'footerText'),
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
