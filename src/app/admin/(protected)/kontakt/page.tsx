import { getContactContent, updateContactContent } from '@/lib/actions/contact';
import SubmitButton from '@/components/admin/SubmitButton';
import styles from '@/components/admin/admin.module.scss';

export const metadata = {
  title: 'Panel administracyjny - kontakt',
};

export const dynamic = 'force-dynamic';

export default async function AdminKontaktPage() {
  const content = await getContactContent();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Kontakt</h1>
        <p className={styles.pageSubtitle}>Edytuj informacje widoczne na stronie kontaktowej.</p>
      </div>

      <form action={updateContactContent} className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Treść strony</span>
        </div>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="title">Nagłówek</label>
            <input id="title" name="title" type="text" defaultValue={content.title} />
          </div>
          <div className={styles.field}>
            <label htmlFor="officeTitle">Nazwa biura</label>
            <input id="officeTitle" name="officeTitle" type="text" defaultValue={content.officeTitle} />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Adres e-mail</label>
            <input id="email" name="email" type="email" defaultValue={content.email} />
          </div>
          <div>
            <SubmitButton pendingText="Zapisywanie...">Zapisz zmiany</SubmitButton>
          </div>
        </div>
      </form>
    </>
  );
}
