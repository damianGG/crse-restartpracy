const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  formatEligibilityPoints,
  parseEligibilityItems,
  serializeEligibilityCards,
} = require('./eligibility-items.ts');

test('new lines in the points field stay inside the same card after saving and reloading', () => {
  const saved = serializeEligibilityCards([
    { text: 'Osoby spelniajace kryteria:', points: 'Powyzej 18 lat\nOsoby pracujace\nMieszkancy regionu' },
    { text: 'Pracodawcy', points: '' },
  ]);

  assert.deepEqual(parseEligibilityItems(saved), [
    {
      text: 'Osoby spelniajace kryteria:',
      children: [
        { text: 'Powyzej 18 lat', children: [] },
        { text: 'Osoby pracujace', children: [] },
        { text: 'Mieszkancy regionu', children: [] },
      ],
    },
    { text: 'Pracodawcy', children: [] },
  ]);
});

test('legacy cards and nested points survive opening and saving the editor', () => {
  const legacy = 'Osoby\n  - Dorosli\n    * Pracujacy\n      - Mieszkancy\n  - Pozostali\nPracodawcy';
  const original = parseEligibilityItems(legacy);
  const cards = original.map((item) => ({
    text: item.text,
    points: formatEligibilityPoints(item.children),
  }));

  assert.equal(cards[0].points, 'Dorosli\n  Pracujacy\n    Mieszkancy\nPozostali');
  assert.deepEqual(parseEligibilityItems(serializeEligibilityCards(cards)), original);
  assert.deepEqual(parseEligibilityItems('Pierwszy\n\nDrugi'), [
    { text: 'Pierwszy', children: [] },
    { text: 'Drugi', children: [] },
  ]);
});

test('stored criteria with CRLF line endings render as two cards, not five', () => {
  const value = [
    'Osoby spelniajace kryteria:',
    '- powyzej 18 roku zycia',
    '- wpisujacy sie w definicje ubogo pracujacych',
    '- mieszkajacych na obszarze woj. swietokrzyskiego',
    'Pracodawcy/zwiazki zawodowe',
  ].join('\r\n');
  const items = parseEligibilityItems(value);

  assert.deepEqual(items, [
    {
      text: 'Osoby spelniajace kryteria:',
      children: [
        { text: 'powyzej 18 roku zycia', children: [] },
        { text: 'wpisujacy sie w definicje ubogo pracujacych', children: [] },
        { text: 'mieszkajacych na obszarze woj. swietokrzyskiego', children: [] },
      ],
    },
    { text: 'Pracodawcy/zwiazki zawodowe', children: [] },
  ]);

  const saved = serializeEligibilityCards(items.map((item) => ({
    text: item.text,
    points: formatEligibilityPoints(item.children),
  })));
  assert.deepEqual(parseEligibilityItems(saved.replace(/\n/g, '\r\n')), items);
});

test('form submission line endings preserve nested points and blank lines', () => {
  const saved = serializeEligibilityCards([
    { text: 'Osoby', points: 'Dorosli\n  Pracujacy\n    Mieszkancy\nPozostali' },
    { text: 'Pracodawcy', points: '' },
  ]);
  const expected = parseEligibilityItems(saved);

  for (const newline of ['\r\n', '\r', '\n']) {
    assert.deepEqual(parseEligibilityItems(saved.replace(/\n/g, newline)), expected);
  }
  assert.deepEqual(parseEligibilityItems('Osoby\r\n\r\n- Dorosli\r\n\r\nPracodawcy\r\n'), [
    { text: 'Osoby', children: [{ text: 'Dorosli', children: [] }] },
    { text: 'Pracodawcy', children: [] },
  ]);
});

test('pasted bullet markers, blank lines, tabs and Windows line endings are supported', () => {
  const saved = serializeEligibilityCards([
    { text: 'Osoby', points: '- Dorosli\r\n\t* Pracujacy\r\n\r\n\u2022 Pozostali' },
    { text: '- Pracodawcy', points: '' },
  ]);
  assert.deepEqual(parseEligibilityItems(saved), [
    {
      text: 'Osoby',
      children: [
        { text: 'Dorosli', children: [{ text: 'Pracujacy', children: [] }] },
        { text: 'Pozostali', children: [] },
      ],
    },
    { text: 'Pracodawcy', children: [] },
  ]);
  assert.deepEqual(parseEligibilityItems('Osoby\n\u2022 Dorosli'), [
    { text: 'Osoby', children: [{ text: 'Dorosli', children: [] }] },
  ]);
});

test('removing all cards or clearing optional points does not leave empty list items', () => {
  assert.equal(serializeEligibilityCards([]), '');
  assert.deepEqual(parseEligibilityItems(' \r\n'), []);
  assert.deepEqual(parseEligibilityItems(serializeEligibilityCards([
    { text: 'Osoby', points: '\n  \n' },
  ])), [{ text: 'Osoby', children: [] }]);
});
