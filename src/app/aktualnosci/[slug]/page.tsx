import FigureImage from "@/components/reuseable/FigureImage";
import BlockContent from "./BlockContent";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import DownloadElement from "@/components/reuseable/process-list/DownloadElement";
import "./style.css";

const backendLink = process.env.STRAPI_PUBLIC_BACKEND_LINK;
const bearerToken = process.env.BEARER_TOKEN;

function resolveAssetUrl(url?: string) {
  if (!url) {
    return "";
  }

  return url.startsWith("/") && backendLink ? `${backendLink}${url}` : url;
}

async function getStrapiData(id: string) {
  const response = await fetch(`${backendLink}/api/most-integracji-aktualnoscis/${id}?populate=*`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(bearerToken ? { Authorization: "Bearer " + bearerToken } : {}),
    },
  });

  return response.json();
}

export default async function BlogDetailsTemplate({ params }: { params: { slug: string } }) {
  const id = params.slug.split("-")[0];
  const { data } = await getStrapiData(id);
  const title = data.attributes.tytul;
  const date = data.attributes.data;
  const formattedDate = format(new Date(date), "dd MMMM yyyy", { locale: pl });
  const content = data.attributes.opis;
  const photoURL = resolveAssetUrl(data.attributes.zdjecie?.data?.attributes?.url);
  const tekstPlikDoPobrania = data.attributes?.TekstPlikiDoPobrania || "";
  const downloadURL = resolveAssetUrl(data.attributes.PlikDoPobrania?.data?.attributes?.url);

  return (
    <>
      <section className="wrapper bg-soft-primary">
        <div className="container pt-10 pb-19 pt-md-14 pb-md-20 text-center">
          <div className="row">
            <div className="col-md-10 col-xl-8 mx-auto">
              <div className="post-header">
                <h1 className="display-1 mb-4">{title}</h1>
                <ul className="post-meta mb-5">
                  <li className="post-date">
                    <i className="uil uil-calendar-alt" />
                    <span>{formattedDate}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper bg-light">
        <div className="container pb-14 pb-md-16">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="blog single mt-n17">
                <div className="card">
                  {photoURL && (
                    <FigureImage width={960} height={600} src={photoURL} className="card-img-top" />
                  )}
                  {downloadURL && (
                    <div className="d-flex align-self-center mt-10">
                      <DownloadElement title={tekstPlikDoPobrania} link1={downloadURL} />
                    </div>
                  )}
                  <div className="card-body">
                    <div className="classic-view">
                      <article className="post">
                        <div className="post-content mb-5">
                          <BlockContent content={content} />
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
