import { getOProjekcieContent } from '@/lib/actions/o-projekcie';
import './style.css';

export const metadata = {
    title: 'O projekcie',
    description:
        'Cele, wartość i formy wsparcia dostępne w ramach projektu — doradztwo zawodowe, poradnictwo psychologiczne, szkolenia i kursy zawodowe.',
};

export const dynamic = 'force-dynamic';

export default async function OProjekcie() {
    const content = await getOProjekcieContent();
    const heroTitle = content?.heroTitle?.trim() || 'O projekcie';
    const projectValue = content?.projectValue?.trim();
    const euContribution = content?.euContribution?.trim();
    const intro = content?.intro?.trim();

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
                    <h1 className="display-1 mb-3" style={{ color: 'white' }}>
                        {heroTitle}
                    </h1>
                </div>
            </section>

            <div className="container mb-15 mt-15">
                {projectValue && (
                    <p className="mb-3 fw-bold lead fs-lg">
                        Wartość projektu: {projectValue}
                    </p>
                )}
                {euContribution && (
                    <p className="mb-3 fw-bold lead fs-lg">
                        Wysokość wkładu Funduszy Europejskich: {euContribution}
                    </p>
                )}
                {intro && <p className="lead fs-lg">{intro}</p>}
            </div>
        </>
    );
}
