import Link from 'next/link';
import {
  getOProjekcieContent,
  getOProjekcieBloki,
  updateOProjekcieContent,
  moveOProjekcieBlok,
} from '@/lib/actions/o-projekcie';
import SubmitButton from '@/components/admin/SubmitButton';
import RichTextEditor from '@/components/admin/RichTextEditor';
import styles from '@/components/admin/admin.module.scss';

export const metadata = {
  title: 'Panel administracyjny - o projekcie',
};

export const dynamic = 'force-dynamic';

export default async function AdminOProjekciePage() {
  const [content, bloki] = await Promise.all([
    getOProjekcieContent(),
    getOProjekcieBloki(),
  ]);

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>O projekcie</h1>
        <p className={styles.pageSubtitle}>
          Edytuj wstęp strony oraz zarządzaj blokami form wsparcia.
        </p>
      </div>

      <form action={updateOProjekcieContent} className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Wstęp strony</span>
          <Link
            href="/o-projekcie"
            target="_blank"
            className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
          >
            Podgląd strony
          </Link>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="heroTitle">Nagłówek</label>
            <input
              id="heroTitle"
              name="heroTitle"
              type="text"
              defaultValue={content?.heroTitle ?? ''}
              placeholder="O projekcie"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.field}>
              <label htmlFor="projectValue">Wartość projektu</label>
              <input
                id="projectValue"
                name="projectValue"
                type="text"
                defaultValue={content?.projectValue ?? ''}
                placeholder="877 125,00 zł"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="euContribution">Wkład Funduszy Europejskich</label>
              <input
                id="euContribution"
                name="euContribution"
                type="text"
                defaultValue={content?.euContribution ?? ''}
                placeholder="745 556,25 zł"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="intro">Opis projektu</label>
            <RichTextEditor name="intro" defaultValue={content?.intro ?? ''} />
            <span className={styles.helpText}>
              Użyj paska narzędzi, aby dodać pogrubienia, nagłówki lub listy punktowane.
            </span>
          </div>

          <div>
            <SubmitButton pendingText="Zapisywanie...">Zapisz wstęp</SubmitButton>
          </div>
        </div>
      </form>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Formy wsparcia ({bloki.length})</span>
          <Link
            href="/admin/o-projekcie/nowy"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            + Nowy blok
          </Link>
        </div>

        {bloki.length === 0 ? (
          <p className={styles.emptyState}>Brak bloków. Dodaj pierwszą formę wsparcia.</p>
        ) : (
          <div className={styles.list}>
            {bloki.map((blok, index) => {
              const moveUp = moveOProjekcieBlok.bind(null, blok.id, 'up');
              const moveDown = moveOProjekcieBlok.bind(null, blok.id, 'down');

              return (
                <div className={styles.listItem} key={blok.id}>
                  <div className={styles.listItemMain}>
                    <div className={styles.listItemTitle}>{blok.title}</div>
                    <div className={styles.listItemMeta}>Pozycja {index + 1}</div>
                  </div>
                  <div className={styles.listItemActions}>
                    {index > 0 && (
                      <form action={moveUp}>
                        <SubmitButton size="sm" pendingText="...">
                          ↑
                        </SubmitButton>
                      </form>
                    )}
                    {index < bloki.length - 1 && (
                      <form action={moveDown}>
                        <SubmitButton size="sm" pendingText="...">
                          ↓
                        </SubmitButton>
                      </form>
                    )}
                    <Link
                      href={`/admin/o-projekcie/${blok.id}`}
                      className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                    >
                      Edytuj
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
