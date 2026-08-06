import type { Metadata } from "next";
import { euContribution, projectEffects, projectGoal, projectPeriod, projectTitle, projectValue } from "@/data/project";

export const metadata: Metadata = {
  title: `O projekcie | ${projectTitle}`,
  description: projectTitle,
};

export default function AboutProject() {
  return (
    <>
      <section
        className="wrapper"
        style={{
          position: "relative",
          backgroundImage: "url('/img/photos/women_meet.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
          }}
        />
        <div className="container pt-10 pb-10 pt-md-14 pb-md-14 text-center" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto">
              <h1 className="display-1 mb-3 text-white">O projekcie</h1>
              <p className="lead fs-22 text-white mb-0">{projectTitle}</p>
              <p className="lead text-white-50 mb-0">Okres realizacji: {projectPeriod}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper bg-light">
        <div className="container py-14 py-md-16">
          <div className="row gy-10">
            <div className="col-lg-8">
              <h2 className="display-5 mb-4">Cel główny projektu</h2>
              <p className="lead fs-lg">{projectGoal}</p>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-lg h-100">
                <div className="card-body p-6">
                  <h3 className="h2 mb-4">Najważniejsze informacje</h3>
                  <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                    <li><i className="uil uil-check"></i>Okres realizacji: {projectPeriod}</li>
                    <li className="mt-3"><i className="uil uil-check"></i>Wartość projektu: {projectValue}</li>
                    <li className="mt-3"><i className="uil uil-check"></i>Wysokość wkładu Funduszy Europejskich: {euContribution}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row gy-6 mt-5">
            {projectEffects.map((effect, index) => (
              <div className="col-md-4" key={effect}>
                <div
                  className="card text-white border-0 h-100 shadow-lg"
                  style={{
                    backgroundImage: "linear-gradient(rgba(31, 41, 55, 0.72), rgba(31, 41, 55, 0.72)), url('/img/photos/shutterstock_2429463807.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="card-body p-6">
                    <span className="badge bg-primary mb-3">Efekt {index + 1}</span>
                    <p className="mb-0">{effect}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card shadow-lg border-0 mt-10 overflow-hidden">
            <div
              className="card-body p-8 p-md-10 text-white"
              style={{
                backgroundImage: "linear-gradient(rgba(8, 47, 73, 0.8), rgba(8, 47, 73, 0.8)), url('/img/photos/shutterstock_2350002237.jpg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <h2 className="display-6 mb-4">Udział w projekcie obejmuje następujące elementy</h2>
              <p className="lead mb-0">Strona w budowie.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
