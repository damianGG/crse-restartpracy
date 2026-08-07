
import Image from "next/image";


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

                <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
                    <div className="col-lg-6 position-relative order-lg-1">

                        <div className="overlap-grid overlap-grid-2">

                            <div>
                                <figure className="rounded shadow">
                                    <Image
                                        src="/projekt/1 Usługi doradztwa zawodowego i psychologa - przygotowanie indywidualnej ścieżki wsparcia.jpg"
                                        width={600}
                                        height={1000}
                                        alt="hero"
                                    />
                                </figure>
                            </div>
                            <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: "14rem", left: "-2.5rem", zIndex: "-1" }} />

                        </div>
                    </div>

                    <div className="col-lg-6">



                        <p className="lead fs-lg">Usługi doradztwa zawodowego i psychologa - przygotowanie
                            indywidualnej ścieżki wsparcia</p>
                        <div className="row gy-3 gx-xl-8">
                            <div className="col-xl-12">
                                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                                    <li>
                                        <i className="uil uil-check" />
                                        Pierwszym obligatoryjnym elementem udziału każdego Uczestnika/Uczestniczki
                                        projektu będzie przygotowanie Indywidualnej ścieżki wsparcia (IŚW).                                </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        W ramach wsparcia zostanie sporządzony przez doradcę zawodowego i psychologa
                                        dokument (IŚW), w którym zostanie określony profil potrzeb i potencjału
                                        Uczestnika/Uczestniczki. W dokumencie opisana zostanie również indywidualna
                                        ścieżka wsparcia OPT, uzgodniona pomiędzy Uczestnikiem/Uczestniczką, a doradcą
                                        zawodowym i psychologiem – zawierająca wybrane formy wsparcia dostępne
                                        w projekcie, które najlepiej będą mogły wpłynąć na poprawę sytuacji społeczno-
                                        zawodowej OPT.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Podczas odbywania indywidualnych spotkań Uczestnikom/Uczestniczkom zostanie
                                        zapewniona możliwość wsparcia tłumacza.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparciem zostanie objętych 300 Uczestników/Uczestniczek (wszyscy Uczestnicy
                                        projektu).
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
                    <div className="col-lg-6 position-relative">

                        <div className="overlap-grid overlap-grid-2">

                            <div>
                                <figure className="rounded shadow">
                                    <Image
                                        src="/projekt/2 Usługi doradztwa zawodowego - indywidualne wsparcie doradcy OPT.jpg"
                                        width={600}
                                        height={1000}
                                        alt="hero"
                                    />
                                </figure>
                            </div>
                            <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: "14rem", left: "-2.5rem", zIndex: "-1" }} />

                        </div>
                    </div>

                    <div className="col-lg-6">


                        <h2 className="display-4 mb-3"></h2>

                        <p className="lead fs-lg">
                            Usługi doradztwa zawodowego - indywidualne wsparcie doradcy OPT
                        </p>

                        <div className="row gy-3 gx-xl-8">
                            <div className="col-xl-12">
                                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                                    <li>
                                        <i className="uil uil-check" />
                                        Doradca zawodowy wesprze OPT w planowaniu i realizacji indywidualnej ścieżki
                                        wsparcia (IŚW), w szczególności poprzez: pomoc w realizacji działań
                                        zaplanowanych w IŚW, udzielanie informacji na temat dostępnych form
                                        zatrudnienia oraz możliwości prowadzenia działalności gospodarczej w Polsce,
                                        prowadzenie indywidualnych konsultacji zawodowych, przygotowanie do procesu
                                        rekrutacji, w tym do rozmowy kwalifikacyjnej, wskazanie formalności niezbędnych
                                        do potwierdzenia (autoryzacji) posiadanych kompetencji i kwalifikacji na terenie
                                        Polski..
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparcie w postaci indywidualnych spotkań z doradcą OPT w wymiarze 3 godzin
                                        zegarowych/osobę.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Podczas odbywania indywidualnych spotkań Uczestnikom/Uczestniczkom zostanie
                                        zapewniona możliwość wsparcie tłumacza.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparciem zostanie objętych 90 osób. Dobór wsparcia będzie wynikał z IŚW.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
                    <div className="col-lg-6 position-relative order-lg-1">

                        <div className="overlap-grid overlap-grid-2">
                            <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: "14rem", left: "-2.5rem", zIndex: "-1" }} />
                            <div>
                                <figure className="rounded shadow">
                                    <Image
                                        src="/projekt/3 Pośrednictwo pracy.jpg"
                                        width={600}
                                        height={1000}
                                        alt="hero"
                                    />
                                </figure>
                            </div>


                        </div>
                    </div>

                    <div className="col-lg-6">


                        <h2 className="display-4 mb-3"></h2>

                        <p className="lead fs-lg">
                            Pośrednictwo pracy
                        </p>

                        <div className="row gy-3 gx-xl-8">
                            <div className="col-xl-12">
                                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">

                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Pośrednictwo pracy będzie ukierunkowane na wsparcie OPT w skutecznym
                                        poruszaniu się po rynku pracy oraz uzyskaniu zatrudnienia zgodnego z ich kwalifikacjami, predyspozycjami i oczekiwaniami, z uwzględnieniem potrzeb
                                        lokalnego i regionalnego rynku pracy.
                                        Wsparcie obejmie w szczególności indywidualną pracę z Uczestnikiem, polegającą
                                        na wspólnym poszukiwaniu ofert pracy, bieżącym przekazywaniu informacji o
                                        aktualnej sytuacji na rynku pracy oraz inicjowaniu kontaktów z pracodawcami.
                                        Pośrednik pracy będzie pozyskiwał i prezentował oferty pracy, a także wspierał
                                        uczestników w przygotowaniu dokumentów aplikacyjnych, w tym CV, w kontekście
                                        konkretnych ofert zatrudnienia.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparcie w postaci indywidualnych spotkań z pośrednikiem pracy w wymiarze
                                        3 godzin zegarowych/osobę.

                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Podczas odbywania indywidualnych spotkań Uczestnikom/Uczestniczkom zostanie
                                        zapewniona możliwość wsparcie tłumacza.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparciem zostanie objętych 45 osób. Dobór wsparcia będzie wynikał z IŚW.
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
                    <div className="col-lg-6 position-relative ">

                        <div className="overlap-grid overlap-grid-2">

                            <div>
                                <figure className="rounded shadow">
                                    <Image
                                        src="/projekt/4 Szkolenie - Podkarpacki Rynek Pracy.jpg"
                                        width={600}
                                        height={1000}
                                        alt="hero"
                                    />
                                </figure>
                            </div>
                            <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: "14rem", left: "-2.5rem", zIndex: "-1" }} />

                        </div>
                    </div>

                    <div className="col-lg-6">


                        <h2 className="display-4 mb-3"></h2>

                        <p className="lead fs-lg">
                            Szkolenie - Podkarpacki Rynek Pracy
                        </p>

                        <div className="row gy-3 gx-xl-8">
                            <div className="col-xl-12">
                                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                                    <li>
                                        <i className="uil uil-check" />
                                        Szkolenie będzie miało na celu m.in.: zapoznanie z podkarpackim rynkiem pracy,
                                        jego specyfiką i potrzebami, prawem pracy, relacjami w środowisku pracy, w tym
                                        napięciami w miejscu w pracy na tle kulturowym, planowanymi zmianami
                                        w zatrudnianiu OPT, rodzajami zezwoleń na pracę dla OPT, zagrożeniami
                                        związanymi z nielegalnym zatrudnieniem OPT, podatki oraz ubezpieczenia
                                        społeczne.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Szkolenie trwające śr. 16 godzin szkoleniowych (2 dni x śr. 8 godz. szkoleniowych).                               </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Podczas szkolenia Uczestnikom/Uczestniczkom zostanie zapewniona możliwość
                                        wsparcie tłumacza.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Każdy Uczestnik będzie miał zapewniony catering podczas dnia szkoleniowego.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        W ramach wsparcia Uczestnik/Uczestniczka będzie mógł/mogła ubiegać się o zwrot
                                        kosztów dojazdu zgodnie z zasadami określonymi w rozdziale VI i/lub zwrot
                                        kosztów opieki nad dzieckiem/osobą zależną zgodnie z zasadami określonymi
                                        w rozdziale VII.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparciem zostanie objętych 120 osób. Dobór wsparcia będzie wynikał z IŚW.
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
                    <div className="col-lg-6 position-relative order-lg-1">

                        <div className="overlap-grid overlap-grid-2">
                            <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: "14rem", left: "-2.5rem", zIndex: "-1" }} />
                            <div>
                                <figure className="rounded shadow">
                                    <Image
                                        src="/projekt/5 Poradnictwo psychologiczne.jpg"
                                        width={600}
                                        height={1000}
                                        alt="hero"
                                    />
                                </figure>
                            </div>


                        </div>
                    </div>

                    <div className="col-lg-6">


                        <h2 className="display-4 mb-3"></h2>

                        <p className="lead fs-lg">
                            Poradnictwo psychologiczne
                        </p>

                        <div className="row gy-3 gx-xl-8">
                            <div className="col-xl-12">
                                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">

                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        W ramach wsparcia Uczestnicy/Uczestniczki otrzymają indywidualną pomoc
                                        psychologiczną związaną ze zdrowiem psychiczno-fizycznym OPT.
                                        Uczestnicy/Uczestniczki uzyskają pomoc w sytuacjach dot. przeciążenia
                                        związanym ze stresem migracyjnym i aklimatyzacyjnym, otrzymają wsparcie
                                        w radzeniu sobie z codziennymi trudnościami związanymi z życiem rodzinnym
                                        i zawodowym.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparcie w postaci poradnictwa psychologicznego w wymiarze śr. 4 godzin
                                        zegarowych/osobę.

                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Podczas odbywania indywidualnych spotkań Uczestnikom/Uczestniczkom zostanie
                                        zapewniona możliwość wsparcia tłumacza.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparciem zostanie objętych 270 osób. Dobór wsparcia będzie wynikał z IŚW.
                                    </li>



                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
                    <div className="col-lg-6 position-relative ">

                        <div className="overlap-grid overlap-grid-2">

                            <div>
                                <figure className="rounded shadow">
                                    <Image
                                        src="/projekt/6 Warsztaty adaptacyjne dot. polskiego systemu pomocy społecznej, ochrony zdrowia, edukacji.jpg"
                                        width={600}
                                        height={1000}
                                        alt="hero"
                                    />
                                </figure>
                            </div>
                            <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: "14rem", left: "-2.5rem", zIndex: "-1" }} />

                        </div>
                    </div>

                    <div className="col-lg-6">


                        <h2 className="display-4 mb-3"></h2>

                        <p className="lead fs-lg">
                            Warsztaty adaptacyjne dot. polskiego systemu pomocy społecznej, ochrony zdrowia,
                            edukacji
                        </p>

                        <div className="row gy-3 gx-xl-8">
                            <div className="col-xl-12">
                                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                                    <li>
                                        <i className="uil uil-check" />
                                        Warsztaty będą miały na celu wprowadzenie Uczestników/Uczestniczek w polski
                                        system pomocy społecznej, ochrony zdrowia i edukacji.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Warsztaty trwające 16 godzin szkoleniowych (2 dni x śr. 8 godz. szkoleniowych).
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Podczas warsztatów Uczestnikom/Uczestniczkom zostanie zapewniona możliwość
                                        wsparcie tłumacza.                            </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        W ramach wsparcia Uczestnik/Uczestniczka będzie mógł/mogła ubiegać się o zwrot
                                        kosztów dojazdu zgodnie z zasadami określonymi w rozdziale VI i/lub zwrot
                                        kosztów opieki nad dzieckiem/osobą zależną zgodnie z zasadami określonymi
                                        w rozdziale VII.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Każdy Uczestnik będzie miał zapewniony catering podczas dnia szkoleniowego.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparciem zostanie objętych 120 osób. Dobór wsparcia będzie wynikał z IŚW.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
                    <div className="col-lg-6 position-relative order-lg-1">

                        <div className="overlap-grid overlap-grid-2">
                            <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: "14rem", left: "-2.5rem", zIndex: "-1" }} />
                            <div>
                                <figure className="rounded shadow">
                                    <Image
                                        src="/projekt/7 Wsparcie w nauce języka polskiego.jpg"
                                        width={600}
                                        height={1000}
                                        alt="hero"
                                    />
                                </figure>
                            </div>


                        </div>
                    </div>

                    <div className="col-lg-6">


                        <h2 className="display-4 mb-3"></h2>

                        <p className="lead fs-lg">
                            Wsparcie w nauce języka polskiego
                        </p>

                        <div className="row gy-3 gx-xl-8">
                            <div className="col-xl-12">
                                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">

                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        W ramach wsparcia Uczestnikom/Uczestniczkom zostanie zapewnione 20 godz.
                                        zegarowych indywidualnych konwersacji z Native speakerem. Ćwiczenia językowe
                                        będą koncentrowały się na symulowaniu realistycznych sytuacji komunikacyjnych,
                                        ale także podczas spotkań Uczestnicy/Uczestniczki będą mogli poznać różne
                                        aspekty życia codziennego w Polsce, poznać różnice kulturowe i normy społeczno-
                                        obyczajowe regionu. Zajęcia umożliwią OPT szybsze przełamanie bariery
                                        językowej, osłuchanie się z naturalnym akcentem języka polskiego oraz
                                        doskonalenie umiejętności komunikacyjnych poprzez symulowanie realistycznych
                                        sytuacji z życia codziennego.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        W ramach wsparcia Uczestnik/Uczestniczka będzie mógł/mogła ubiegać się o zwrot
                                        kosztów opieki nad dzieckiem/osobą zależną zgodnie z zasadami określonymi
                                        w rozdziale VII.

                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparciem zostanie objętych 30 osób. Dobór wsparcia będzie wynikał z IŚW.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
                    <div className="col-lg-6 position-relative ">

                        <div className="overlap-grid overlap-grid-2">

                            <div>
                                <figure className="rounded shadow">
                                    <Image
                                        src="/projekt/8 Szkoleniakursy zawodowe.jpg"
                                        width={600}
                                        height={1000}
                                        alt="hero"
                                    />
                                </figure>
                            </div>
                            <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: "14rem", left: "-2.5rem", zIndex: "-1" }} />

                        </div>
                    </div>

                    <div className="col-lg-6">


                        <h2 className="display-4 mb-3"></h2>

                        <p className="lead fs-lg">
                            Szkolenia/kursy zawodowe
                        </p>

                        <div className="row gy-3 gx-xl-8">
                            <div className="col-xl-12">
                                <ul className="icon-list bullet-bg bullet-soft-primary mb-0">
                                    <li>
                                        <i className="uil uil-check" />
                                        Celem wsparcia będzie uzupełnienie wykształcenia OPT poprzez szkolenie/kurs
                                        zawodowy pozwalający na uzupełnienie i/lub podniesienie kwalifikacji.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Dobór wsparcia i tematyka szkolenia/kursu będzie wynikała z indywidualnej
                                        diagnozy i będzie wskazana w IŚW.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Każdy/a Uczestnik/czka będzie miał/a możliwość wziąć udział w
                                        egzaminie zgodnym z rodzajem kształcenia (np. egzamin czeladniczy,
                                        VCC itp.).                        </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Średnia liczba godzin kursu wyniesie 80 godzin szkoleniowych.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Każdy Uczestnik/Uczestniczka projektu będzie miał możliwość wzięcia udziału
                                        w egzaminie zgodnym z rodzajem kształcenia.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Każdy Uczestnik będzie miał zapewniony catering podczas dnia szkoleniowego.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        W ramach wsparcia Uczestnik/Uczestniczka będzie mógł/mogła ubiegać się
                                        o zwrot kosztów dojazdu zgodnie z zasadami określonymi w rozdziale VI i/lub
                                        zwrot kosztów opieki nad dzieckiem/osobą zależną zgodnie z zasadami
                                        określonymi w rozdziale VII.
                                    </li>
                                    <li className="mt-3">
                                        <i className="uil uil-check" />
                                        Wsparciem zostanie objętych 258 osób.
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

