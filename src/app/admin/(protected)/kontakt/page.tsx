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

      <form action={updateContactContent}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Biuro projektu</h2>
          </div>
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
              <label htmlFor="officeHours">Godziny pracy / informacja dodatkowa</label>
              <textarea id="officeHours" name="officeHours" rows={3} defaultValue={content.officeHours} />
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="phone">Telefon</label>
                <input id="phone" name="phone" type="tel" defaultValue={content.phone} />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" defaultValue={content.email} />
              </div>
            </div>
            <input type="hidden" name="contactPerson" value={content.contactPerson} />
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Beneficjent</h2>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor="organizationTitle">Nagłówek</label>
              <input id="organizationTitle" name="organizationTitle" defaultValue={content.organizationTitle} />
            </div>
            <div className={styles.field}>
              <label htmlFor="organizationAddress">Adres</label>
              <textarea id="organizationAddress" name="organizationAddress" rows={2} defaultValue={content.organizationAddress} />
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="organizationWebsiteLabel">Nazwa strony</label>
                <input id="organizationWebsiteLabel" name="organizationWebsiteLabel" defaultValue={content.organizationWebsiteLabel} />
              </div>
              <div className={styles.field}>
                <label htmlFor="organizationWebsiteUrl">Link do strony</label>
                <input id="organizationWebsiteUrl" name="organizationWebsiteUrl" type="url" defaultValue={content.organizationWebsiteUrl} />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="organizationFacebookLabel">Nazwa profilu Facebook</label>
                <input id="organizationFacebookLabel" name="organizationFacebookLabel" defaultValue={content.organizationFacebookLabel} />
              </div>
              <div className={styles.field}>
                <label htmlFor="organizationFacebookUrl">Link do Facebooka</label>
                <input id="organizationFacebookUrl" name="organizationFacebookUrl" type="url" defaultValue={content.organizationFacebookUrl} />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="organizationPhone">Telefon</label>
                <input id="organizationPhone" name="organizationPhone" type="tel" defaultValue={content.organizationPhone} />
              </div>
              <div className={styles.field}>
                <label htmlFor="organizationEmail">E-mail</label>
                <input id="organizationEmail" name="organizationEmail" type="email" defaultValue={content.organizationEmail} />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="hashtags">Hashtagi</label>
                <input id="hashtags" name="hashtags" defaultValue={content.hashtags} />
              </div>
              <div className={styles.field}>
                <label htmlFor="hashtagsUrl">Link hashtagów</label>
                <input id="hashtagsUrl" name="hashtagsUrl" type="url" defaultValue={content.hashtagsUrl} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Stopka</h2>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor="facebookUrl">Link do Facebooka</label>
              <input id="facebookUrl" name="facebookUrl" type="url" defaultValue={content.facebookUrl} />
              <span className={styles.helpText}>Podaj pełny adres rozpoczynający się od http:// lub https://.</span>
            </div>
            <div className={styles.field}>
              <label htmlFor="facebookLabel">Nazwa profilu Facebook</label>
              <input id="facebookLabel" name="facebookLabel" defaultValue={content.facebookLabel} />
            </div>
            <div className={styles.field}>
              <label htmlFor="organizationName">Nazwa organizacji</label>
              <input id="organizationName" name="organizationName" defaultValue={content.organizationName} />
            </div>
            <div className={styles.field}>
              <label htmlFor="footerText">Tekst końcowy</label>
              <input id="footerText" name="footerText" defaultValue={content.footerText} />
            </div>
          </div>
        </section>

        <SubmitButton pendingText="Zapisywanie...">Zapisz zmiany</SubmitButton>
      </form>
    </>
  );
}
