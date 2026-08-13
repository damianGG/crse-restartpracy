'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { put, del } from '@vercel/blob';
import { db } from '@/lib/db';
import { homepageContent } from '@/lib/db/schema';
import { getUserId } from '@/lib/get-user-id';

export const DEFAULT_HERO_TITLE = '„Restart Pracy – Start Rozwoju!”';
export const DEFAULT_HERO_IMAGE =
  'https://github.com/user-attachments/assets/3cea04b8-34bd-4e1b-b103-02fa562f0d7c';
export const DEFAULT_ABOUT_CONTENT = `Celem głównym projektu jest zwiększenie możliwości zawodowych 100 osób powyżej 18 roku życia zamieszkujących w rozumieniu Kodeksu Cywilnego na obszarze województwa świętokrzyskiego, wpisujących się w definicję osób ubogich pracujących poprzez zaplanowane działania realizowane w ramach aktywizacji zawodowej oraz zwiększenie świadomości i kompetencji 15 pracodawców/związków zawodowych posiadających jednostkę organizacyjną na obszarze województwa świętokrzyskiego na temat sposobów zapobiegania dyskryminacji i tworzenia przyjaznego środowiska pracy, co przyczyni się m.in. do poprawy pozycji Uczestników/czek projektu na rynku pracy.

Efektami udziału w projekcie będzie:
• poprawa sytuacji Uczestników/czek projektu na rynku pracy poprzez nabycie przez nich nowych kompetencji/kwalifikacji,
• poprawa sytuacji społecznej min. 70 Uczestników/czek projektu,
• wzrost świadomości społecznej, w tym pracodawców i/lub związków zawodowych w zakresie równości, niedyskryminacji, przyjaznego miejsca pracy, praw osób z niepełnosprawnościami oraz godności każdego człowieka.

Wartość projektu: 877\u00A0125,00 zł
Wysokość wkładu Funduszy Europejskich: 745 556,25 zł`;

export async function getHomepageContent() {
  const [content] = await db.select().from(homepageContent).limit(1);

  return {
    heroTitle: content?.heroTitle || DEFAULT_HERO_TITLE,
    heroImageUrl: content?.heroImageUrl || DEFAULT_HERO_IMAGE,
    aboutContent: content?.aboutContent || DEFAULT_ABOUT_CONTENT,
  };
}

export async function updateHomepageContent(formData: FormData) {
  const userId = await getUserId();

  const heroTitle = String(formData.get('heroTitle') ?? '').trim();
  const aboutContent = String(formData.get('aboutContent') ?? '').trim();
  const heroImageFile = formData.get('heroImage') as File | null;

  const [existing] = await db.select().from(homepageContent).limit(1);

  let heroImageUrl = existing?.heroImageUrl ?? null;
  if (heroImageFile && heroImageFile.size > 0) {
    if (existing?.heroImageUrl && existing.heroImageUrl.includes('blob.vercel-storage.com')) {
      await del(existing.heroImageUrl).catch(() => {});
    }
    const blob = await put(`strona-glowna/${heroImageFile.name}`, heroImageFile, {
      access: 'public',
      addRandomSuffix: true,
    });
    heroImageUrl = blob.url;
  }

  if (existing) {
    await db
      .update(homepageContent)
      .set({ heroTitle, aboutContent, heroImageUrl, userId, updatedAt: new Date() })
      .where(eq(homepageContent.id, existing.id));
  } else {
    await db.insert(homepageContent).values({ userId, heroTitle, aboutContent, heroImageUrl });
  }

  revalidatePath('/');
  revalidatePath('/admin/strona-glowna');
}
