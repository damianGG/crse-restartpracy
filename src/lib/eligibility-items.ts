export type EligibilityItem = {
  text: string;
  children: EligibilityItem[];
};

export function parseEligibilityItems(value: string): EligibilityItem[] {
  const items: EligibilityItem[] = [];
  const stack: Array<{ level: number; item: EligibilityItem }> = [];

  value.split(/\r\n?|\n/).forEach((line) => {
    const match = line.match(/^(\s*)[-*•]\s+(.+)$/);
    const text = (match?.[2] ?? line).trim();
    if (!text) return;

    const level = match ? match[1].replace(/\t/g, '  ').length + 1 : 0;
    const item: EligibilityItem = { text, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1]?.item;
    if (parent) {
      parent.children.push(item);
    } else {
      items.push(item);
    }

    stack.push({ level, item });
  });

  return items;
}

export function formatEligibilityPoints(items: EligibilityItem[], indent = ''): string {
  return items.flatMap((item) => [
    `${indent}${item.text}`,
    ...(item.children.length ? [formatEligibilityPoints(item.children, `${indent}  `)] : []),
  ]).join('\n');
}

export function serializeEligibilityCards(cards: Array<{ text: string; points: string }>): string {
  return cards.map(({ text, points }) => [
    text.trim().replace(/^[-*•]\s+/, ''),
    ...points.split('\n').filter((line) => line.trim()).map((line) => {
      const indent = line.match(/^\s*/)?.[0] ?? '';
      const point = line.trim().replace(/^[-*•]\s+/, '');
      return `${indent}- ${point}`;
    }),
  ].join('\n')).join('\n');
}
