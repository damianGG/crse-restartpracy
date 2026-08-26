import Link from "next/link";
import { getContactContent } from '@/lib/actions/contact';




export default async function Footer2() {
  const content = await getContactContent();

  return (
    <footer className="bg-soft-primary">
      <div className="container">
        {/* <div className="card shadow-lg mt-n16 mt-md-n21 mb-15 mb-md-14">
          <ContactMap />
        </div> */}
      </div>

      <div className="container pb-12 text-center pt-10">
        <div className="row mt-n10 mt-lg-0">
          <div className="col-xl-10 mx-auto">
            <div className="row mb-3">


              <div className="col-md-4">
                <div className="widget">
                  <p className="widget-title fs-15 fw-bold">Biuro projektu</p>
                  <p className="mb-0 fw-bold">{content.officeTitle}</p>
                  {content.officeAddress && <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{content.officeAddress}</p>}
                </div>
              </div>
              <div className="col-md-4">
                <div className="widget">
                  <p className="widget-title fs-15 fw-bold">Kontakt</p>
                  {content.contactPerson && <p className="mb-1">{content.contactPerson}</p>}
                  {content.phone && <p className="mb-1"><Link href={`tel:${content.phone}`} className="link-primary">{content.phone}</Link></p>}
                  {content.email && <p className="mb-0"><Link href={`mailto:${content.email}`} className="link-primary">{content.email}</Link></p>}
                </div>
              </div>
              {content.facebookUrl && (
                <div className="col-md-4">
                  <div className="widget">
                    <p className="widget-title fs-15 fw-bold">Facebook</p>
                    <Link href={content.facebookUrl} className="link-primary" target="_blank" rel="noopener noreferrer">
                      Odwiedź nasz profil
                    </Link>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
        <p className="fs-15">{content.organizationName} rights reserved.</p>
      </div>
    </footer>
  );
}
