import type { Metadata } from 'next';
import DownloadElement from '@/components/reuseable/process-list/DownloadElement';
import { getRekrutacjaContent, getRekrutacjaPliki } from '@/lib/actions/rekrutacja';

export const metadata: Metadata = {
  title: 'Rekrutacja - Restart Pracy',
  description: 'Informacje o rekrutacji do projektu Restart Pracy oraz pliki do pobrania.',
};

export const dynamic = 'force-dynamic';

function TextContent({ value }: { value: string }) {
  return (
    <>
      {value.split(/\n{2,}/).map((paragraph, index) => (
        <p className="mb-3" key={index}>
          {paragraph.split('\n').map((line, lineIndex, lines) => (
            <span key={lineIndex}>
              {line}
              {lineIndex < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}

function LineList({ value, ordered = false }: { value: string; ordered?: boolean }) {
  const items = value.split('\n').map((item) => item.trim()).filter(Boolean);
  const List = ordered ? 'ol' : 'ul';

  return (
    <List className="mb-6">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </List>
  );
}

export default async function Rekrutacja() {
  const [content, files] = await Promise.all([
    getRekrutacjaContent(),
    getRekrutacjaPliki(),
  ]);

  const hasBodyContent = content && (
    content.content ||
    content.eligibilityTitle ||
    content.eligibilityItems ||
    content.priorityContent ||
    content.equalOpportunities ||
    content.applicationTitle ||
    content.applicationIntro ||
    content.applicationSteps ||
    content.applicationHelp ||
    content.documentsTitle ||
    content.documentsIntro ||
    content.documentsFooter
  );

  return (
    <>
      <section className="wrapper bg-soft-primary">
        <div className="container pt-10 pb-14 pt-md-14 pb-md-16 text-center">
          <div className="row">
            <div className="col-md-10 col-xl-8 mx-auto">
              <h1 className="display-1 mb-4">{content?.title || 'Rekrutacja'}</h1>
              {content?.intro && <p className="lead fs-lg">{content.intro}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper bg-light">
        <div className="container pt-10 pb-14 pt-md-14 pb-md-16">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              {content?.content ? (
                <div className="mb-8">
                  <TextContent value={content.content} />
                </div>
              ) : !hasBodyContent ? (
                <p className="lead text-center">
                  Informacje o rekrutacji będą dostępne wkrótce.
                </p>
              ) : null}

              {content?.eligibilityTitle && (
                <h2 className="h3 mb-4">{content.eligibilityTitle}</h2>
              )}
              {content?.eligibilityItems && (
                <LineList value={content.eligibilityItems} />
              )}
              {content?.priorityContent && (
                <div className="mb-6">
                  <TextContent value={content.priorityContent} />
                </div>
              )}
              {content?.equalOpportunities && (
                <div className="mb-8">
                  <TextContent value={content.equalOpportunities} />
                </div>
              )}

              {content?.applicationTitle && (
                <h2 className="h3 mb-4">{content.applicationTitle}</h2>
              )}
              {content?.applicationIntro && (
                <div className="mb-4">
                  <TextContent value={content.applicationIntro} />
                </div>
              )}
              {content?.applicationSteps && (
                <LineList value={content.applicationSteps} ordered />
              )}
              {content?.applicationHelp && (
                <div className="mb-8">
                  <TextContent value={content.applicationHelp} />
                </div>
              )}

              {(files.length > 0 ||
                content?.documentsTitle ||
                content?.documentsIntro ||
                content?.documentsFooter) && (
                <div className="mt-10">
                  <h2 className="h3 mb-4 text-center">
                    {content?.documentsTitle || 'Dokumenty do pobrania'}
                  </h2>
                  {content?.documentsIntro && (
                    <div className="mb-5 text-center">
                      <TextContent value={content.documentsIntro} />
                    </div>
                  )}
                  {files.length > 0 && (
                    <>
                      <div className="d-flex flex-wrap justify-content-center gap-4 mb-6">
                        <span className="d-flex align-items-center gap-2">
                          <span className="btn btn-circle btn-sm btn-soft-primary pe-none">
                            <i className="uil uil-file-download" />
                          </span>
                          wersja kolorowa
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <span className="btn btn-circle btn-sm btn-white text-dark border pe-none">
                            <i className="uil uil-file-download" />
                          </span>
                          wersja czarno-biała
                        </span>
                      </div>
                      <div className="d-flex flex-column gap-3">
                        {files.map((file) => (
                          <DownloadElement
                            key={file.id}
                            title={file.description || file.name}
                            link1={file.url}
                            link2={file.blackWhiteUrl}
                            link1Label={`Pobierz wersję kolorową: ${file.description || file.name}`}
                            link2Label={`Pobierz wersję czarno-białą: ${file.description || file.name}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {content?.documentsFooter && (
                    <div className="mt-6">
                      <TextContent value={content.documentsFooter} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
