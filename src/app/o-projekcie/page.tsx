

export default function News() {
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
                                O projekcie
                            </h1>
                            <p className="lead px-xxl-10"></p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mb-15 mt-15" >
                <p className="mb-3 fw-bold lead fs-lg">Wartość projektu: 877&nbsp;125,00 zł</p>
                <p className="mb-3 fw-bold lead fs-lg mb-15 ">Wysokość wkładu Funduszy Europejskich: 745 556,25 zł</p>
                <div className=" mt-4 mb-15">
                    <p className="mb-3 fw-bold lead fs-lg">
                        Celem głównym projektu jest zwiększenie możliwości zawodowych 100 osób
                        powyżej 18 roku życia zamieszkujących w rozumieniu Kodeksu Cywilnego na
                        obszarze województwa świętokrzyskiego, wpisujących się w definicję osób ubogich
                        pracujących poprzez zaplanowane działania realizowane w ramach aktywizacji
                        zawodowej oraz zwiększenie świadomości i kompetencji 15 pracodawców/związków
                        zawodowych posiadających jednostkę organizacyjną na obszarze województwa
                        świętokrzyskiego na temat sposobów zapobiegania dyskryminacji i tworzenia
                        przyjaznego środowiska pracy, co przyczyni się m.in. do poprawy pozycji
                        Uczestników/czek projektu na rynku pracy.<br />
                        Efektami udziału w projekcie będzie:
                    </p>
                    <ul className="icon-list bullet-bg bullet-soft-primary mb-3">
                        <li><i className="uil uil-check"></i>poprawa sytuacji Uczestników/czek projektu na rynku pracy poprzez nabycie
                        przez nich nowych kompetencji/kwalifikacji,</li>
                        <li className="mt-3"><i className="uil uil-check"></i>poprawa sytuacji społecznej min. 70 Uczestników/czek projektu,</li>
                        <li className="mt-3"><i className="uil uil-check"></i>wzrost świadomości społecznej, w tym pracodawców i/lub związków
                        zawodowych w zakresie równości, niedyskryminacji, przyjaznego miejsca
                        pracy, praw osób z niepełnosprawnościami oraz godności każdego człowieka.</li>
                    </ul>

                    <p> Wartość projektu: 877&nbsp;125,00 zł</p>
                    <p> Wysokość wkładu Funduszy Europejskich: 745 556,25 zł</p>
                </div>
            </div>
        </>
    );
};
