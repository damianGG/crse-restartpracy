'use client';

import { useId, useRef, useState } from 'react';
import {
  formatEligibilityPoints,
  parseEligibilityItems,
  serializeEligibilityCards,
} from '@/lib/eligibility-items';
import styles from './admin.module.scss';

export default function EligibilityCardsEditor({ defaultValue = '' }: { defaultValue?: string }) {
  const id = useId();
  const [cards, setCards] = useState(() => parseEligibilityItems(defaultValue).map((item, index) => ({
    id: index,
    text: item.text,
    points: formatEligibilityPoints(item.children),
  })));
  const nextId = useRef(cards.length);

  function updateCard(cardId: number, field: 'text' | 'points', value: string) {
    setCards((current) => current.map((card) => (
      card.id === cardId ? { ...card, [field]: value } : card
    )));
  }

  return (
    <div className={styles.formGrid}>
      <p className={styles.helpText}>
        Każdy kafelek ma osobną treść i opcjonalną listę punktów. Nowy wiersz w polu
        wypunktowania dodaje punkt w tym samym kafelku, a nie nowy kafelek.
      </p>
      {cards.map((card, index) => (
        <fieldset className={styles.card} key={card.id}>
          <legend className={styles.cardTitle}>Kafelek {index + 1}</legend>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor={`${id}-${card.id}-text`}>Treść kafelka</label>
              <input
                id={`${id}-${card.id}-text`}
                type="text"
                value={card.text}
                onChange={(event) => updateCard(card.id, 'text', event.target.value)}
                required
                pattern=".*\S.*"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={`${id}-${card.id}-points`}>Wypunktowanie (jeden punkt w wierszu)</label>
              <textarea
                id={`${id}-${card.id}-points`}
                rows={5}
                value={card.points}
                onChange={(event) => updateCard(card.id, 'points', event.target.value)}
                placeholder={'powyżej 18 roku życia\nspełniające kryteria udziału'}
                aria-describedby={`${id}-help`}
              />
            </div>
            <div>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                onClick={() => setCards((current) => current.filter((item) => item.id !== card.id))}
                aria-label={`Usuń kafelek ${index + 1}`}
              >
                Usuń kafelek
              </button>
            </div>
          </div>
        </fieldset>
      ))}
      <span className={styles.helpText} id={`${id}-help`}>
        Nie musisz wpisywać myślników ani kropek. Aby dodać podpunkt niższego poziomu,
        wstaw spacje na początku wiersza. Zmiany zatwierdź przyciskiem „Zapisz treść”.
      </span>
      <div>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
          onClick={() => {
            const cardId = nextId.current++;
            setCards((current) => [...current, { id: cardId, text: '', points: '' }]);
          }}
        >
          Dodaj kafelek
        </button>
      </div>
      <input type="hidden" name="eligibilityItems" value={serializeEligibilityCards(cards)} />
    </div>
  );
}
