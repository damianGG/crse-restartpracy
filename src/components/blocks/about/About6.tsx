import { euContribution, projectEffects, projectGoal, projectPeriod, projectTitle, projectValue } from "@/data/project";

export default function About6() {
  return (
    <div className="container pt-5 pt-md-5 pb-13 pb-md-15 mb-n14 mb-md-n17" style={{ maxWidth: "56rem" }} data-bs-theme="dark">
      <div className="row gx-lg-8 gx-xl-12 gy-10 mb-5 align-items-center ">
        <div className="col-lg-12">
          <h2 className="display-4 mb-3 text-center mb-10">
            Zapraszamy do projektu <br></br>&bdquo;{projectTitle}&rdquo;
          </h2>
          <div className="col-lg-12">
            <p className="lead fs-lg">{projectGoal}</p>
            <div className="row gy-3 ">
              <div className="col-xl-12">
                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                  <li><i className="uil uil-check"></i>100 osób powyżej 18 roku życia z województwa świętokrzyskiego wpisujących się w definicję osób ubogich pracujących.</li>
                  <li className="mt-3"><i className="uil uil-check"></i>15 pracodawców lub związków zawodowych posiadających jednostkę organizacyjną na obszarze województwa świętokrzyskiego.</li>
                  <li className="mt-3"><i className="uil uil-check"></i>Działania z zakresu aktywizacji zawodowej, równości i przeciwdziałania dyskryminacji.</li>
                </ul>
                <h4 className="lead fs-lg mt-5 ">Najważniejsze efekty projektu:</h4>
                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                  {projectEffects.map((effect) => (
                    <li className="mt-3" key={effect}>
                      <i className="uil uil-check"></i>{effect}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 align-items-center ">
        <div className="col-lg-12">
          <p className="lead fs-lg">Informacje w skrócie:</p>
          <div className="row gy-3 ">
            <div className="col-xl-12">
              <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                <li className="mt-3"><i className="uil uil-check"></i>Okres realizacji: {projectPeriod}</li>
                <li className="mt-3"><i className="uil uil-check"></i>Wartość projektu: {projectValue}</li>
                <li className="mt-3"><i className="uil uil-check"></i>Wysokość wkładu Funduszy Europejskich: {euContribution}</li>
                <li className="mt-3"><i className="uil uil-check"></i>Udział w projekcie obejmuje następujące elementy: <strong>Strona w budowie</strong>.</li>
              </ul>
            </div>

            <p className="text-center fs-20 mt-15">Szczegóły poszczególnych elementów wsparcia zostaną opublikowane w kolejnych aktualizacjach strony.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
