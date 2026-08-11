import Link from "next/link";




export default function Footer2() {
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


              <div className="col-md-12">
                <div className="widget">
                  <p className="widget-title fs-15 fw-bold"><i className="uil uil-envelope fs-25 me-2 "></i> e-mail</p>
                  <Link href="mailto:restartpracy@crse.org.pl" className="link-primary">
                    restartpracy@crse.org.pl
                  </Link>
                  <br className="d-none d-md-block" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="fs-15">Centrum Rozwoju Społeczno-Ekonomicznego rights reserved.</p>
      </div>
    </footer>
  );
}
