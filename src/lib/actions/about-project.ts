'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { aboutProjectContent } from '@/lib/db/schema';
import {
  DEFAULT_ABOUT_PROJECT_CONTENT,
  type AboutProjectSection,
} from '@/lib/about-project-defaults';
import { getUserId } from '@/lib/get-user-id';

function parseSections(value: string | null | undefined): AboutProjectSection[] {
  if (!value) return DEFAULT_ABOUT_PROJECT_CONTENT.sections;

  try {
    const sections = JSON.parse(value);
    if (
      Array.isArray(sections) &&
      sections.every(
        (section) =>
          typeof section?.title === 'string' &&
          typeof section?.imageUrl === 'string' &&
          Array.isArray(section?.bullets) &&
          section.bullets.every((bullet: unknown) => typeof bullet === 'string'),
      )
    ) {
      return sections;
    }
  } catch {
    // Fall back to the built-in content when stored data is invalid.
  }

  return DEFAULT_ABOUT_PROJECT_CONTENT.sections;
}

export async function getAboutProjectContent() {
  const [content] = await db.select().from(aboutProjectContent).limit(1);

  return {
    title: content?.title || DEFAULT_ABOUT_PROJECT_CONTENT.title,
    projectValue: content?.projectValue || DEFAULT_ABOUT_PROJECT_CONTENT.projectValue,
    euFundingValue: content?.euFundingValue || DEFAULT_ABOUT_PROJECT_CONTENT.euFundingValue,
    objective: content?.objective || DEFAULT_ABOUT_PROJECT_CONTENT.objective,
    outcomes: content?.outcomes
      ? content.outcomes.split('\n').filter(Boolean)
      : DEFAULT_ABOUT_PROJECT_CONTENT.outcomes,
    sections: parseSections(content?.sections),
  };
}

export async function updateAboutProjectContent(formData: FormData) {
  const userId = await getUserId();
  const sections = DEFAULT_ABOUT_PROJECT_CONTENT.sections.map((section, index) => ({
    title: String(formData.get(`sectionTitle-${index}`) ?? '').trim(),
    imageUrl: String(formData.get(`sectionImageUrl-${index}`) ?? '').trim(),
    bullets: String(formData.get(`sectionBullets-${index}`) ?? '')
      .split('\n')
      .map((bullet) => bullet.trim())
      .filter(Boolean),
  }));
  const values = {
    title: String(formData.get('title') ?? '').trim(),
    projectValue: String(formData.get('projectValue') ?? '').trim(),
    euFundingValue: String(formData.get('euFundingValue') ?? '').trim(),
    objective: String(formData.get('objective') ?? '').trim(),
    outcomes: String(formData.get('outcomes') ?? '').trim(),
    sections: JSON.stringify(sections),
    userId,
    updatedAt: new Date(),
  };
  const [existing] = await db.select().from(aboutProjectContent).limit(1);

  if (existing) {
    await db.update(aboutProjectContent).set(values).where(eq(aboutProjectContent.id, existing.id));
  } else {
    await db.insert(aboutProjectContent).values(values);
  }

  revalidatePath('/o-projekcie');
  revalidatePath('/admin/o-projekcie');
}
