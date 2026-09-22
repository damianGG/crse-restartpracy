import Link from "next/link";
import Image from "next/image";
import { getContactContent } from '@/lib/actions/contact';

export default async function Footer2() {
  const content = await getContactContent();

  return (
    <footer className="bg-soft-primary">
      <div className="container pb-12 text-center pt-10">
        <div className="row mt-n10 mt-lg-0">
          <div className="col-xl-10 mx-auto">
            <div className="row mb-3 gy-6">
              <div className="col-md-3">
                <div className="widget">
                  <p className="widget-title fs-15 fw-bold"><i className="uil uil-map me-2 fs-25" /> Adres (Biuro projektu)</p>
                  {content.officeAddress && <address style={{ whiteSpace: 'pre-line' }}>{content.officeAddress}</address>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="widget">
                  <p className="widget-title fs-15 fw-bold"><i className="uil uil-phone-alt me-2 fs-25" />Telefon</p>
                  {content.phone && <Link href={`tel:${content.phone}`} className="link-primary">{content.phone}</Link>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="widget">
                  <p className="widget-title fs-15 fw-bold"><i className="uil uil-envelope fs-25 me-2" /> e-mail</p>
                  {content.email && <Link href={`mailto:${content.email}`} className="link-primary">{content.email}</Link>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="widget">
                  <p className="widget-title fs-15 fw-bold"><i className="uil uil-facebook-f fs-25" /> facebook</p>
                  {content.facebookUrl && (
                    <Link href={content.facebookUrl} className="link-primary" target="_blank" rel="noopener noreferrer">
                      {content.facebookLabel || content.organizationName}
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {content.officeHours && <p>{content.officeHours}</p>}
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
          <div className="d-flex align-items-center gap-3">
            <Image src="/img/logos/feds.jpg" alt="Fundusze Europejskie" width={180} height={19} />
            <Image src="/img/logos/podkarpackie.jpg" alt="Podkarpackie" width={180} height={15} />
          </div>
          {content.organizationName && <p className="fs-15 mb-0">{content.organizationName}</p>}
        </div>
        {content.footerText && <p className="fs-15 mt-3 mb-0">{content.footerText}</p>}
      </div>
    </footer>
  );
}
