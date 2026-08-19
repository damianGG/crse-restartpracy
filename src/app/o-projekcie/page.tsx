import type { Metadata } from 'next';
import { getAboutProjectContent } from '@/lib/actions/about-project';

export const metadata: Metadata = {
  title: 'O projekcie - Restart Pracy',
};

export const dynamic = 'force-dynamic';

export default async function AboutProjectPage() {
  const content = await getAboutProjectContent();

  return (
    <>
      <section
        className="wrapper"
        style={{
          position: 'relative',
          backgroundPosition: 'right',
          backgroundImage: "url('/img/flaga-ue-tlo.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="overlay"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        />
        <div className="container pt-5 pb-5 pt-md-10 pb-md-10 text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row">
            <div className="col-md-9 col-lg-7 col-xl-5 mx-auto">
              <h1 className="display-1 mb-3" style={{ color: 'white' }}>{content.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container mb-15 mt-15">
        <p className="mb-3 fw-bold lead fs-lg">Wartość projektu: {content.projectValue}</p>
        <p className="mb-15 fw-bold lead fs-lg">Wysokość wkładu Funduszy Europejskich: {content.euFundingValue}</p>
        <div className="mt-4 mb-15">
          <p className="mb-3 fw-bold lead fs-lg">{content.objective}</p>
          <p>Efektami udziału w projekcie będzie:</p>
          <ul className="icon-list bullet-bg bullet-soft-primary mb-3">
            {content.outcomes.map((outcome, index) => (
              <li className={index ? 'mt-3' : ''} key={outcome}><i className="uil uil-check" />{outcome}</li>
            ))}
          </ul>
        </div>

        {content.sections.map((section, index) => (
          <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center" key={`${section.title}-${index}`}>
            <div className={`col-lg-6 position-relative ${index % 2 === 0 ? 'order-lg-1' : ''}`}>
              <div className="overlap-grid overlap-grid-2">
                <div>
                  <figure className="rounded shadow">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.imageUrl} width={600} height={1000} alt="" />
                  </figure>
                </div>
                <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: '14rem', left: '-2.5rem', zIndex: '-1' }} />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="lead fs-lg">{section.title}</p>
              <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                {section.bullets.map((bullet, bulletIndex) => (
                  <li className={bulletIndex ? 'mt-3' : ''} key={bullet}><i className="uil uil-check" />{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
