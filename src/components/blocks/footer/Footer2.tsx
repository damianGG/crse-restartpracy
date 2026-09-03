import Link from "next/link";
import { getContactContent } from '@/lib/actions/contact';




export default async function Footer2() {
  const content = await getContactContent();

  return (
    <footer className="bg-soft-primary">
      <div className="container py-10 py-md-12">
        <div className="row gy-8 text-center text-md-start">
          <div className="col-md-6 col-lg-3">
            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3">
              <i className="uil uil-location-pin-alt fs-36 text-primary" />
              <div>
                <p className="widget-title fw-bold mb-2">Biuro projektu</p>
                <p className="mb-0 fw-bold">{content.officeTitle}</p>
                {content.officeAddress && <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{content.officeAddress}</p>}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <i className="uil uil-phone fs-36 text-primary" />
            <p className="widget-title fw-bold mb-2">Telefon</p>
            {content.phone && <Link href={`tel:${content.phone}`} className="link-primary">{content.phone}</Link>}
          </div>
          <div className="col-md-6 col-lg-3">
            <i className="uil uil-envelope fs-36 text-primary" />
            <p className="widget-title fw-bold mb-2">E-mail</p>
            {content.email && <Link href={`mailto:${content.email}`} className="link-primary">{content.email}</Link>}
          </div>
          <div className="col-md-6 col-lg-3">
            <i className="uil uil-facebook fs-36 text-primary" />
            <p className="widget-title fw-bold mb-2">Facebook</p>
            {content.facebookUrl && (
              <Link href={content.facebookUrl} className="link-primary" target="_blank" rel="noopener noreferrer">
                Odwiedź nasz profil
              </Link>
            )}
          </div>
        </div>
        <hr className="my-7" />
        <p className="fs-15 text-center mb-0">© {new Date().getFullYear()} {content.organizationName}. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
