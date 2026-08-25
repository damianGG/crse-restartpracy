import Image from 'next/image';
import { getOProjekcieContent, getOProjekcieBloki } from '@/lib/actions/o-projekcie';
import ProjectRichContent from './ProjectRichContent';
import './style.css';

export const metadata = {
    title: 'O projekcie',
    description:
        'Cele, wartość i formy wsparcia dostępne w ramach projektu — doradztwo zawodowe, poradnictwo psychologiczne, szkolenia i kursy zawodowe.',
};

export const dynamic = 'force-dynamic';

export default async function OProjekcie() {
    const [content, bloki] = await Promise.all([
        getOProjekcieContent(),
        getOProjekcieBloki(),
    ]);

    const heroTitle = content?.heroTitle?.trim() || 'O projekcie';

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
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                />
                <div
                    className="container pt-5 pb-5 pt-md-10 pb-md-10 text-center"
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <div className="row">
                        <div className="col-md-9 col-lg-7 col-xl-5 mx-auto">
                            <h1 className="display-1 mb-3" style={{ color: 'white' }}>
                                {heroTitle}
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mb-15 mt-15">
                {content?.projectValue?.trim() && (
                    <p className="mb-3 fw-bold lead fs-lg">
                        Wartość projektu: {content.projectValue}
                    </p>
                )}
                {content?.euContribution?.trim() && (
                    <p className="mb-3 fw-bold lead fs-lg">
                        Wysokość wkładu Funduszy Europejskich: {content.euContribution}
                    </p>
                )}

                {content?.intro?.trim() && (
                    <div className="mt-10 mb-15 lead fs-lg">
                        <ProjectRichContent content={content.intro} />
                    </div>
                )}

                {bloki.map((blok, index) => {
                    const imageRight = index % 2 === 0;
                    const shape = (
                        <div
                            className="shape bg-dot primary rellax w-16 h-20"
                            style={{ top: '14rem', left: '-2.5rem', zIndex: -1 }}
                        />
                    );

                    return (
                        <div
                            key={blok.id}
                            className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center"
                        >
                            <div
                                className={`col-lg-6 position-relative${
                                    imageRight ? ' order-lg-1' : ''
                                }`}
                            >
                                <div className="overlap-grid overlap-grid-2">
                                    {imageRight && shape}
                                    {blok.imageUrl && (
                                        <div>
                                            <figure className="rounded shadow">
                                                <Image
                                                    src={blok.imageUrl}
                                                    width={600}
                                                    height={1000}
                                                    alt={blok.title}
                                                />
                                            </figure>
                                        </div>
                                    )}
                                    {!imageRight && shape}
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <p className="lead fs-lg">{blok.title}</p>
                                <div className="row gy-3 gx-xl-8">
                                    <div className="col-xl-12">
                                        <ProjectRichContent content={blok.content} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
