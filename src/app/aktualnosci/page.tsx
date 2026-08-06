import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import "./style.css";
import { projectTitle } from "@/data/project";

const backendLink = process.env.STRAPI_PUBLIC_BACKEND_LINK;
const bearerToken = process.env.BEARER_TOKEN;

async function getStrapiData() {
  try {
    const response = await fetch(`${backendLink}/api/most-integracji-aktualnoscis?sort=id:desc&pagination[pageSize]=100`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(bearerToken ? { Authorization: "Bearer " + bearerToken } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { data: [] };
  }
}

export const metadata: Metadata = {
  title: `Aktualności | ${projectTitle}`,
  description: `Aktualności projektu ${projectTitle}`,
};

function createSlug(text: string): string {
  const polishChars: { [key: string]: string } = {
    "ą": "a", "ć": "c", "ę": "e", "ł": "l", "ń": "n", "ó": "o", "ś": "s", "ź": "z", "ż": "z",
    "Ą": "a", "Ć": "c", "Ę": "e", "Ł": "l", "Ń": "n", "Ó": "o", "Ś": "s", "Ź": "z", "Ż": "z"
  };

  return text
    .split("")
    .map((char) => polishChars[char] || char)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default async function News() {
  const { data } = await getStrapiData();
  const sortedData = data.sort((a: any, b: any) => new Date(b.attributes.data).getTime() - new Date(a.attributes.data).getTime());

  return (
    <>
      <section
        className="wrapper"
        style={{
          position: "relative",
          backgroundPosition: "right",
          backgroundImage: "url('/img/flaga-ue-tlo.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
        />
        <div className="container pt-5 pb-5 pt-md-10 pb-md-10 text-center" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-md-9 col-lg-7 col-xl-5 mx-auto">
              <h1 className="display-1 mb-3" style={{ color: "white" }}>
                Aktualności
              </h1>
              <p className="lead px-xxl-10"></p>
            </div>
          </div>
        </div>
      </section>
      <div className="container mb-15 mt-15">
        <div className="row gx-0 gx-md-3 gx-xl-8 gy-8 align-items-center">
          {sortedData.length > 0 ? (
            sortedData.map((article: any) => {
              const slug = createSlug(article.attributes.tytul);
              const articleUrl = `/aktualnosci/${article.id}-${slug}`;

              return (
                <div className="col-md-4" key={article.id}>
                  <div className="card news-card h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="post-header">
                        <h2 className="post-title h3 mt-1 mb-3">{article.attributes.tytul}</h2>
                      </div>
                      <div className="post-content">
                        <p>{article.attributes.podtytul}</p>
                      </div>
                      <div className="mt-auto pt-4">
                        <Link
                          href={articleUrl}
                          className="btn btn-outline-primary rounded-pill"
                          aria-label={`Więcej o ${article.attributes.tytul}`}
                        >
                          Więcej o {article.attributes.tytul}
                        </Link>
                      </div>
                    </div>
                    <div className="card-footer">
                      <ul className="post-meta d-flex mb-0">
                        <li className="post-date">
                          <i className="uil uil-calendar-alt"></i>
                          <span>{format(new Date(article.attributes.data), "dd MMMM yyyy", { locale: pl })}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p>Brak dostępnych aktualności.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
