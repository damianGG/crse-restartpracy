import Link from 'next/link';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { getAllAktualnosciAdmin } from '@/lib/actions/aktualnosci';
import styles from '@/components/admin/admin.module.scss';

export const metadata = {
  title: 'Panel administracyjny - aktualności',
};

export const dynamic = 'force-dynamic';

export default async function AdminAktualnosciPage() {
  const items = await getAllAktualnosciAdmin();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Aktualności</h1>
        <p className={styles.pageSubtitle}>
          Dodawaj, edytuj i publikuj aktualności widoczne na stronie.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Wszystkie wpisy ({items.length})</span>
          <Link href="/admin/aktualnosci/nowa" className={`${styles.btn} ${styles.btnPrimary}`}>
            + Nowa aktualność
          </Link>
        </div>

        {items.length === 0 ? (
          <p className={styles.emptyState}>Brak aktualności. Dodaj pierwszy wpis.</p>
        ) : (
          <div className={styles.list}>
            {items.map((item) => (
              <div className={styles.listItem} key={item.id}>
                <div className={styles.listItemMain}>
                  <div className={styles.listItemTitle}>{item.title}</div>
                  <div className={styles.listItemMeta}>
                    {format(new Date(item.createdAt), 'dd MMMM yyyy', { locale: pl })}
                    {' · '}
                    <span
                      className={`${styles.badge} ${
                        item.published ? styles.badgePublished : styles.badgeDraft
                      }`}
                    >
                      {item.published ? 'Opublikowane' : 'Szkic'}
                    </span>
                  </div>
                </div>
                <div className={styles.listItemActions}>
                  <Link
                    href={`/aktualnosci/${item.slug}`}
                    target="_blank"
                    className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                  >
                    Podgląd
                  </Link>
                  <Link
                    href={`/admin/aktualnosci/${item.id}`}
                    className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                  >
                    Edytuj
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
