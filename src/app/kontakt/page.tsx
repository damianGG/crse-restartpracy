import type { Metadata } from 'next'
import { getContactContent } from '@/lib/actions/contact';
import ContactMap from '@/components/blocks/maps/ContactMap';
export const metadata: Metadata = {
    title: 'Kontakt - Restart Pracy',
    description: 'Dane kontaktowe biura projektu Restart Pracy',
}
export default async function Kontakt() {
    const content = await getContactContent();

    return (
        <>
            <section
                className="wrapper"
                style={{
                    position: 'relative',
                    backgroundPosition: 'right',
                    backgroundImage: "url('/img/flaga-ue-tlo.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                />
                <div
                    className="container pt-5 pb-5 pt-md-10 pb-md-10 text-center"
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <div className="row">
                        <div className="col-md-9 col-lg-7 col-xl-5 mx-auto">
                            <h1 className="display-1 mb-3" style={{ color: 'white' }}>
                                Kontakt
                            </h1>
                            <p className="lead px-xxl-10"></p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-10 py-md-14">
                <div className="row gy-8 align-items-center">
                    <div className="col-lg-5">
                        <h2 className="h1 mb-4">{content.officeTitle}</h2>
                        {content.officeAddress && <p style={{ whiteSpace: 'pre-line' }}>{content.officeAddress}</p>}
                        {content.contactPerson && <p><strong>Kontakt:</strong> {content.contactPerson}</p>}
                        {content.phone && <p><strong>Telefon:</strong> <a href={`tel:${content.phone}`} className="link-primary">{content.phone}</a></p>}
                        {content.email && <p><strong>E-mail:</strong> <a href={`mailto:${content.email}`} className="link-primary">{content.email}</a></p>}
                        {content.facebookUrl && <p><strong>Facebook:</strong> <a href={content.facebookUrl} className="link-primary" target="_blank" rel="noopener noreferrer">Facebook</a></p>}
                    </div>
                    {content.officeAddress && (
                        <div className="col-lg-7">
                            <ContactMap address={content.officeAddress} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
