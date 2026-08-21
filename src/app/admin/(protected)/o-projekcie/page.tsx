import { getAboutProjectContent, updateAboutProjectContent } from '@/lib/actions/about-project';
import ImageDropzone from '@/components/admin/ImageDropzone';
import SubmitButton from '@/components/admin/SubmitButton';
import styles from '@/components/admin/admin.module.scss';

export const metadata = {
  title: 'Panel administracyjny - o projekcie',
};

export const dynamic = 'force-dynamic';

export default async function AdminOProjekciePage() {
  const content = await getAboutProjectContent();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>O projekcie</h1>
        <p className={styles.pageSubtitle}>Edytuj treść, wartości oraz zakres wsparcia na stronie projektu.</p>
      </div>

      <form action={updateAboutProjectContent} className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Informacje podstawowe</span>
        </div>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="title">Nagłówek</label>
            <input id="title" name="title" type="text" defaultValue={content.title} />
          </div>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label htmlFor="projectValue">Wartość projektu</label>
              <input id="projectValue" name="projectValue" type="text" defaultValue={content.projectValue} />
            </div>
            <div className={styles.field}>
              <label htmlFor="euFundingValue">Wkład Funduszy Europejskich</label>
              <input id="euFundingValue" name="euFundingValue" type="text" defaultValue={content.euFundingValue} />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="objective">Cel główny projektu</label>
            <textarea id="objective" name="objective" rows={6} defaultValue={content.objective} />
          </div>
          <div className={styles.field}>
            <label htmlFor="outcomes">Efekty udziału w projekcie</label>
            <textarea id="outcomes" name="outcomes" rows={5} defaultValue={content.outcomes.join('\n')} />
            <span className={styles.helpText}>Każdy efekt wpisz w osobnym wierszu.</span>
          </div>
        </div>

        {content.sections.map((section, index) => (
          <div key={index}>
            <div className={styles.cardHeader} style={{ marginTop: '1.75rem' }}>
              <span className={styles.cardTitle}>Forma wsparcia {index + 1}</span>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label htmlFor={`sectionTitle-${index}`}>Nazwa</label>
                <input id={`sectionTitle-${index}`} name={`sectionTitle-${index}`} type="text" defaultValue={section.title} />
              </div>
              <div className={styles.field}>
                <ImageDropzone
                  id={`sectionImage-${index}`}
                  name={`sectionImage-${index}`}
                  currentImageUrl={section.imageUrl}
                  label="Zdjęcie"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor={`sectionBullets-${index}`}>Opis</label>
                <textarea
                  id={`sectionBullets-${index}`}
                  name={`sectionBullets-${index}`}
                  rows={6}
                  defaultValue={section.bullets.join('\n')}
                />
                <span className={styles.helpText}>Każdy punkt wpisz w osobnym wierszu.</span>
              </div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: '1.75rem' }}>
          <SubmitButton pendingText="Zapisywanie...">Zapisz zmiany</SubmitButton>
        </div>
      </form>
    </>
  );
}
