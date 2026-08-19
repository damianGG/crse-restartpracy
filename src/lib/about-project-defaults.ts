export type AboutProjectSection = {
  title: string;
  imageUrl: string;
  bullets: string[];
};

export const DEFAULT_ABOUT_PROJECT_CONTENT = {
  title: 'O projekcie',
  projectValue: '877 125,00 zł',
  euFundingValue: '745 556,25 zł',
  objective:
    'Celem głównym projektu jest zwiększenie możliwości zawodowych 100 osób powyżej 18 roku życia zamieszkujących województwo świętokrzyskie, wpisujących się w definicję osób ubogich pracujących, poprzez aktywizację zawodową oraz zwiększenie świadomości i kompetencji 15 pracodawców i związków zawodowych w zakresie zapobiegania dyskryminacji i tworzenia przyjaznego środowiska pracy.',
  outcomes: [
    'Poprawa sytuacji Uczestników/czek projektu na rynku pracy poprzez nabycie nowych kompetencji i kwalifikacji.',
    'Poprawa sytuacji społecznej minimum 70 Uczestników/czek projektu.',
    'Wzrost świadomości społecznej, w tym pracodawców i związków zawodowych, w zakresie równości, niedyskryminacji i przyjaznego miejsca pracy.',
  ],
  sections: [
    {
      title: 'Usługi doradztwa zawodowego i psychologa - przygotowanie indywidualnej ścieżki wsparcia',
      imageUrl: '/projekt/1 Usługi doradztwa zawodowego i psychologa - przygotowanie indywidualnej ścieżki wsparcia.jpg',
      bullets: [
        'Przygotowanie Indywidualnej ścieżki wsparcia (IŚW) dla każdego Uczestnika/Uczestniczki projektu.',
        'Dokument przygotowany przez doradcę zawodowego i psychologa określi profil potrzeb i potencjału oraz indywidualną ścieżkę wsparcia.',
        'Podczas spotkań zapewniona będzie możliwość wsparcia tłumacza.',
        'Wsparciem zostanie objętych 300 Uczestników/Uczestniczek.',
      ],
    },
    {
      title: 'Usługi doradztwa zawodowego - indywidualne wsparcie doradcy OPT',
      imageUrl: '/projekt/2 Usługi doradztwa zawodowego - indywidualne wsparcie doradcy OPT.jpg',
      bullets: [
        'Pomoc w planowaniu i realizacji indywidualnej ścieżki wsparcia, przygotowaniu do rekrutacji oraz potwierdzaniu kompetencji i kwalifikacji.',
        'Indywidualne spotkania z doradcą OPT w wymiarze 3 godzin zegarowych na osobę.',
        'Podczas spotkań zapewniona będzie możliwość wsparcia tłumacza.',
        'Wsparciem zostanie objętych 90 osób.',
      ],
    },
    {
      title: 'Pośrednictwo pracy',
      imageUrl: '/projekt/3 Pośrednictwo pracy.jpg',
      bullets: [
        'Indywidualne wsparcie w poruszaniu się po rynku pracy i uzyskaniu zatrudnienia zgodnego z kwalifikacjami oraz oczekiwaniami.',
        'Indywidualne spotkania z pośrednikiem pracy w wymiarze 3 godzin zegarowych na osobę.',
        'Podczas spotkań zapewniona będzie możliwość wsparcia tłumacza.',
        'Wsparciem zostanie objętych 45 osób.',
      ],
    },
    {
      title: 'Szkolenie - Podkarpacki Rynek Pracy',
      imageUrl: '/projekt/4 Szkolenie - Podkarpacki Rynek Pracy.jpg',
      bullets: [
        'Szkolenie obejmuje zagadnienia podkarpackiego rynku pracy, prawa pracy, zatrudnienia OPT, podatków i ubezpieczeń społecznych.',
        'Szkolenie potrwa średnio 16 godzin (2 dni po średnio 8 godzin).',
        'Zapewnione będą tłumaczenie, catering oraz możliwość zwrotu kosztów dojazdu i opieki.',
        'Wsparciem zostanie objętych 120 osób.',
      ],
    },
    {
      title: 'Poradnictwo psychologiczne',
      imageUrl: '/projekt/5 Poradnictwo psychologiczne.jpg',
      bullets: [
        'Indywidualna pomoc psychologiczna związana ze zdrowiem psychiczno-fizycznym i trudnościami migracyjnymi oraz aklimatyzacyjnymi.',
        'Poradnictwo psychologiczne w wymiarze średnio 4 godzin zegarowych na osobę.',
        'Podczas spotkań zapewniona będzie możliwość wsparcia tłumacza.',
        'Wsparciem zostanie objętych 270 osób.',
      ],
    },
    {
      title: 'Warsztaty adaptacyjne dot. polskiego systemu pomocy społecznej, ochrony zdrowia, edukacji',
      imageUrl: '/projekt/6 Warsztaty adaptacyjne dot. polskiego systemu pomocy społecznej, ochrony zdrowia, edukacji.jpg',
      bullets: [
        'Wprowadzenie do polskiego systemu pomocy społecznej, ochrony zdrowia i edukacji.',
        'Warsztaty potrwają 16 godzin szkoleniowych (2 dni po średnio 8 godzin).',
        'Zapewnione będą tłumaczenie, catering oraz możliwość zwrotu kosztów dojazdu i opieki.',
        'Wsparciem zostanie objętych 120 osób.',
      ],
    },
    {
      title: 'Wsparcie w nauce języka polskiego',
      imageUrl: '/projekt/7 Wsparcie w nauce języka polskiego.jpg',
      bullets: [
        '20 godzin zegarowych indywidualnych konwersacji z native speakerem, obejmujących realistyczne sytuacje komunikacyjne i aspekty życia w Polsce.',
        'Możliwość zwrotu kosztów opieki nad dzieckiem lub osobą zależną.',
        'Wsparciem zostanie objętych 30 osób.',
      ],
    },
    {
      title: 'Szkolenia/kursy zawodowe',
      imageUrl: '/projekt/8 Szkoleniakursy zawodowe.jpg',
      bullets: [
        'Szkolenie lub kurs zawodowy umożliwiający uzupełnienie albo podniesienie kwalifikacji.',
        'Tematyka wsparcia będzie wynikała z indywidualnej diagnozy i zostanie wskazana w IŚW.',
        'Możliwość udziału w egzaminie zgodnym z rodzajem kształcenia.',
        'Średnia liczba godzin kursu wyniesie 80 godzin szkoleniowych.',
        'Zapewnione będą catering oraz możliwość zwrotu kosztów dojazdu i opieki.',
        'Wsparciem zostanie objętych 258 osób.',
      ],
    },
  ] satisfies AboutProjectSection[],
};
