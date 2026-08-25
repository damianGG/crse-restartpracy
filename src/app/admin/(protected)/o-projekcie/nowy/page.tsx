import Link from 'next/link';
import { createOProjekcieBlok } from '@/lib/actions/o-projekcie';
import SubmitButton from '@/components/admin/SubmitButton';
import RichTextEditor from '@/components/admin/RichTextEditor';
import styles from '@/components/admin/admin.module.scss';

export const metadata = {
  title: 'Panel administracyjny - nowy blok',
};

export default function NewOProjekcieBlokPage() {
  return (
    <>
      <Link href="/admin/o-projekcie" className={styles.backLink}>
        ← Wróć do listy
      </Link>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Nowa forma wsparcia</h1>
        <p className={styles.pageSubtitle}>
          Blok pojawi się na końcu strony „O projekcie”.
        </p>
      </div>

      <form action={createOProjekcieBlok} className={styles.card}>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="title">Tytuł</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="np. Poradnictwo psychologiczne"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="content">Opis</label>
            <RichTextEditor name="content" />
            <span className={styles.helpText}>
              Najlepiej użyj listy punktowanej — punkty wyświetlą się ze znacznikami na stronie.
            </span>
          </div>

          <div className={styles.field}>
            <label htmlFor="image">Zdjęcie</label>
            <input id="image" name="image" type="file" accept="image/*" />
          </div>

          <div>
            <SubmitButton pendingText="Dodawanie...">Dodaj blok</SubmitButton>
          </div>
        </div>
      </form>
    </>
  );
}
