import Link from 'next/link';
import { createAktualnosc } from '@/lib/actions/aktualnosci';
import SubmitButton from '@/components/admin/SubmitButton';
import styles from '@/components/admin/admin.module.scss';

export const metadata = {
  title: 'Panel administracyjny - nowa aktualność',
};

export default function NewAktualnoscPage() {
  return (
    <>
      <Link href="/admin/aktualnosci" className={styles.backLink}>
        ← Wróć do listy
      </Link>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Nowa aktualność</h1>
        <p className={styles.pageSubtitle}>
          Wypełnij treść wpisu. Pliki do pobrania dodasz po zapisaniu wpisu.
        </p>
      </div>

      <form action={createAktualnosc} className={styles.card}>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="title">Tytuł</label>
            <input id="title" name="title" type="text" required />
          </div>

          <div className={styles.field}>
            <label htmlFor="excerpt">Krótki opis (widoczny na liście)</label>
            <input id="excerpt" name="excerpt" type="text" maxLength={200} />
          </div>

          <div className={styles.field}>
            <label htmlFor="publicationDate">Data publikacji</label>
            <input id="publicationDate" name="publicationDate" type="date" required />
          </div>

          <div className={styles.field}>
            <label htmlFor="content">Treść</label>
            <textarea id="content" name="content" required rows={10} />
            <span className={styles.helpText}>
              Nową linię odstępu użyj, aby rozdzielić akapity.
            </span>
          </div>

          <div className={styles.field}>
            <label htmlFor="coverImage">Zdjęcie główne</label>
            <input id="coverImage" name="coverImage" type="file" accept="image/*" />
          </div>

          <div className={styles.checkboxRow}>
            <input id="published" name="published" type="checkbox" defaultChecked />
            <label htmlFor="published">Opublikuj od razu</label>
          </div>

          <div>
            <SubmitButton pendingText="Zapisywanie...">Zapisz aktualność</SubmitButton>
          </div>
        </div>
      </form>
    </>
  );
}
