import { Fragment } from "react";

// CUSTOM DATA


const DEFAULT_ABOUT_CONTENT = `Celem głównym projektu jest zwiększenie możliwości zawodowych 100 osób powyżej 18 roku życia zamieszkujących w rozumieniu Kodeksu Cywilnego na obszarze województwa świętokrzyskiego, wpisujących się w definicję osób ubogich pracujących poprzez zaplanowane działania realizowane w ramach aktywizacji zawodowej oraz zwiększenie świadomości i kompetencji 15 pracodawców/związków zawodowych posiadających jednostkę organizacyjną na obszarze województwa świętokrzyskiego na temat sposobów zapobiegania dyskryminacji i tworzenia przyjaznego środowiska pracy, co przyczyni się m.in. do poprawy pozycji Uczestników/czek projektu na rynku pracy.

Efektami udziału w projekcie będzie:
• poprawa sytuacji Uczestników/czek projektu na rynku pracy poprzez nabycie przez nich nowych kompetencji/kwalifikacji,
• poprawa sytuacji społecznej min. 70 Uczestników/czek projektu,
• wzrost świadomości społecznej, w tym pracodawców i/lub związków zawodowych w zakresie równości, niedyskryminacji, przyjaznego miejsca pracy, praw osób z niepełnosprawnościami oraz godności każdego człowieka.

Wartość projektu: 877\u00A0125,00 zł
Wysokość wkładu Funduszy Europejskich: 745 556,25 zł`;

export default function About6({
  content = DEFAULT_ABOUT_CONTENT,
}: {
  content?: string;
}) {
  const paragraphs = content.split('\n');

  return (
    <div className="container pt-5 pt-md-5 pb-13 pb-md-15 mb-n14 mb-md-n17" style={{ maxWidth: "56rem" }} data-bs-theme='dark'>
      <div className="row gx-lg-8 gx-xl-12 gy-10 mb-5 align-items-center">
        <div className="col-lg-12">
          <p className="lead fs-lg">
            {paragraphs.map((line, index) => (
              <Fragment key={index}>
                {line}
                {index < paragraphs.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
