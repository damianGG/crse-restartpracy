import {
  getRekrutacjaContent,
  getRekrutacjaPliki,
  updateRekrutacjaContent,
  addRekrutacjaFile,
  deleteRekrutacjaFile,
} from '@/lib/actions/rekrutacja';
import SubmitButton from '@/components/admin/SubmitButton';
import styles from '@/components/admin/admin.module.scss';

export const metadata = {
  title: 'Panel administracyjny - rekrutacja',
};

export const dynamic = 'force-dynamic';

export default async function AdminRekrutacjaPage() {
  const [content, files] = await Promise.all([
    getRekrutacjaContent(),
    getRekrutacjaPliki(),
  ]);

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Rekrutacja</h1>
        <p className={styles.pageSubtitle}>
          Edytuj treść strony rekrutacji oraz zarządzaj dokumentami do pobrania.
        </p>
      </div>

      <form action={updateRekrutacjaContent} className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Treść strony</span>
        </div>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="title">Nagłówek</label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={content?.title ?? ''}
              placeholder="Rekrutacja"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="intro">Wprowadzenie (pod nagłówkiem)</label>
            <input
              id="intro"
              name="intro"
              type="text"
              defaultValue={content?.intro ?? ''}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="content">Treść</label>
            <textarea
              id="content"
              name="content"
              rows={10}
              defaultValue={content?.content ?? ''}
            />
            <span className={styles.helpText}>
              Nową linię odstępu użyj, aby rozdzielić akapity.
            </span>
          </div>

          <div>
            <SubmitButton pendingText="Zapisywanie...">Zapisz treść</SubmitButton>
          </div>
        </div>
      </form>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Dokumenty do pobrania</span>
        </div>

        {files.length === 0 ? (
          <p className={styles.emptyState}>Brak dokumentów. Dodaj pierwszy plik.</p>
        ) : (
          <div className={styles.list}>
            {files.map((file) => {
              const deleteFile = deleteRekrutacjaFile.bind(null, file.id);
              return (
                <div className={styles.listItem} key={file.id}>
                  <div className={styles.listItemMain}>
                    <div className={styles.listItemTitle}>
                      {file.description || file.name}
                    </div>
                    <div className={styles.listItemMeta}>{file.name}</div>
                  </div>
                  <div className={styles.listItemActions}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                    >
                      Pobierz
                    </a>
                    <form action={deleteFile}>
                      <SubmitButton variant="danger" size="sm" pendingText="Usuwanie...">
                        Usuń
                      </SubmitButton>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <form action={addRekrutacjaFile} className={styles.formGrid} style={{ marginTop: '1.25rem' }}>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label htmlFor="description">Nazwa widoczna dla odwiedzających</label>
              <input id="description" name="description" type="text" placeholder="np. Regulamin rekrutacji" />
            </div>
            <div className={styles.field}>
              <label htmlFor="file">Plik</label>
              <input id="file" name="file" type="file" required />
            </div>
          </div>
          <div>
            <SubmitButton pendingText="Wgrywanie...">Dodaj plik</SubmitButton>
          </div>
        </form>
      </div>
    </>
  );
}
