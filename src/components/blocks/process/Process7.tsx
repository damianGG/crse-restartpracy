import DownloadList from "@/components/reuseable/process-list/DownloadList";
import Link from "next/link";

const backendLink = process.env.STRAPI_PUBLIC_BACKEND_LINK;
const bearerToken = process.env.BEARER_TOKEN;

interface FileAttributes {
  attributes: {
    url: string;
  };
}

interface FileRelation {
  data?: FileAttributes | FileAttributes[] | null;
}

interface DocumentAttributes {
  tytul: string;
  kolorowy?: FileRelation;
  czarnobialy?: FileRelation;
}

interface DocumentItem {
  id: number;
  attributes: DocumentAttributes;
}

interface StrapiResponse {
  data: DocumentItem[];
}

export async function getStrapiData(): Promise<StrapiResponse> {
  try {
    const response = await fetch(`${backendLink}/api/most-integracji-dokumenties?sort=rank:asc&populate=*`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(bearerToken ? { Authorization: `****** } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return { data: [] };
  }
}

function getDocumentUrl(fileRelation?: FileRelation) {
  const fileData = fileRelation?.data;

  if (!fileData) {
    return "";
  }

  const url = Array.isArray(fileData) ? fileData[0]?.attributes?.url : fileData.attributes?.url;

  if (!url) {
    return "";
  }

  return url.startsWith("/") && backendLink ? `${backendLink}${url}` : url;
}

export default async function Process7() {
  const dataFromStrapi = await getStrapiData();
  const data = dataFromStrapi?.data || [];

  return (
    <div className="container pt-10 pt-md-10 pb-13 pb-md-15">
      <div className="row mb-5">
        <div className="col-md-10 col-xl-8 col-xxl-7 mx-auto text-center">
          <p className="lead fs-lg mb-8">
            Strona rekrutacji jest w budowie. Dokumenty poniżej są pobierane z systemu CMS,
            dzięki czemu personel projektu może samodzielnie dodawać pliki i ustawiać ich kolejność.
          </p>
          <h2 className="display-4 mb-10 px-lg-14">DOKUMENTY REKRUTACYJNE:</h2>
          <div className="d-flex flex-column align-items-start">
            <p>
              <span className="icon btn btn-circle btn-lg btn-soft-primary pe-none me-4">
                <span className="number"><i className="uil uil-file-download fs-40"></i></span>
              </span>
              - pobrania pliku w wersji kolorowej
            </p>
            <p>
              <span className="icon btn btn-circle btn-lg btn-soft-primary pe-none me-4" style={{ backgroundColor: "white" }}>
                <span className="number" style={{ color: "black" }}><i className="uil uil-file-download fs-40"></i></span>
              </span>
              - pobrania pliku w wersji czarno-białej
            </p>
          </div>
          <p>Prosimy o drukowanie dokumentów rekrutacyjnych w kolorze. Wersja czarno-biała dotyczy sytuacji braku możliwości wydruku w kolorze.</p>
          {data.length === 0 ? (
            <p className="text-danger">Nie udało się pobrać dokumentów. Prosimy spróbować później.</p>
          ) : (
            <div className="col-lg-12 order-lg-2">
              {data.map((item) => (
                <DownloadList
                  key={item.id}
                  title={item.attributes.tytul}
                  link1={getDocumentUrl(item.attributes.kolorowy)}
                  link2={getDocumentUrl(item.attributes.czarnobialy)}
                  className="mb-5"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="text-center mt-5">Aby uzyskać więcej informacji prosimy o kontakt z <Link href="/kontakt" className="link-primary">Biurem projektu.</Link></p>
    </div>
  );
}
