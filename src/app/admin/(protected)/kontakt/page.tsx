import SubmitButton from '@/components/admin/SubmitButton';
import styles from '@/components/admin/admin.module.scss';
import { getContactContent, updateContactContent } from '@/lib/actions/contact';

export const metadata = {
  title: 'Panel administracyjny - kontakt',
};

export const dynamic = 'force-dynamic';

export default async function AdminKontaktPage() {
  const content = await getContactContent();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Kontakt i stopka</h1>
        <p className={styles.pageSubtitle}>
          Zarządzaj danymi wyświetlanymi na stronie kontaktowej i w stopce.
        </p>
      </div>

      <form action={updateContactContent} className={styles.card}>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="officeTitle">Nazwa biura projektu</label>
            <input id="officeTitle" name="officeTitle" defaultValue={content.officeTitle} />
          </div>
          <div className={styles.field}>
            <label htmlFor="officeAddress">Adres biura</label>
            <textarea id="officeAddress" name="officeAddress" rows={3} defaultValue={content.officeAddress} />
          </div>
          <div className={styles.field}>
            <label htmlFor="contactPerson">Osoba do kontaktu</label>
            <input id="contactPerson" name="contactPerson" defaultValue={content.contactPerson} />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">Telefon</label>
            <input id="phone" name="phone" type="tel" defaultValue={content.phone} />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" defaultValue={content.email} />
          </div>
          <div className={styles.field}>
            <label htmlFor="facebookUrl">Link do Facebooka</label>
            <input id="facebookUrl" name="facebookUrl" type="url" defaultValue={content.facebookUrl} />
            <span className={styles.helpText}>Podaj pełny adres rozpoczynający się od http:// lub https://.</span>
          </div>
          <div className={styles.field}>
            <label htmlFor="organizationName">Nazwa organizacji w stopce</label>
            <input id="organizationName" name="organizationName" defaultValue={content.organizationName} />
          </div>
          <div>
            <SubmitButton pendingText="Zapisywanie...">Zapisz zmiany</SubmitButton>
          </div>
        </div>
      </form>
    </>
  );
}
