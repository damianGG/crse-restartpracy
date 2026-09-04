import { createElement, Fragment, type ReactNode } from 'react';

const allowedTags = new Set([
  'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
  'ul', 'ol', 'li', 'h2', 'h3', 'blockquote', 'a',
]);

const tagPattern = /<\/?([a-z0-9]+)([^>]*)>/gi;

function looksLikeHtml(value: string) {
  return /<\/?(p|br|strong|em|b|i|ul|ol|li|h[1-6]|blockquote)\b/i.test(value);
}

function getLinkProps(attributes: string) {
  const href = attributes.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  if (!href) return {};

  const value = href[1] ?? href[2] ?? href[3];
  if (!/^(https?:|mailto:|\/(?!\/)|#)/i.test(value)) return {};

  const target = attributes.match(/\btarget\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  return target?.[1] === '_blank' || target?.[2] === '_blank' || target?.[3] === '_blank'
    ? { href: value, target: '_blank', rel: 'noopener noreferrer' }
    : { href: value };
}

function parseNodes(content: string, from = 0, closingTag?: string): [ReactNode[], number] {
  const nodes: ReactNode[] = [];
  let cursor = from;
  let key = 0;
  tagPattern.lastIndex = from;

  while (true) {
    const match = tagPattern.exec(content);
    if (!match) {
      if (cursor < content.length) nodes.push(content.slice(cursor));
      return [nodes, content.length];
    }

    if (match.index > cursor) nodes.push(content.slice(cursor, match.index));
    cursor = tagPattern.lastIndex;

    const [, rawTag, attributes] = match;
    const tag = rawTag.toLowerCase();
    const closing = match[0].startsWith('</');

    if (closing && tag === closingTag) return [nodes, cursor];
    if (!allowedTags.has(tag) || closing) {
      nodes.push(match[0]);
      continue;
    }

    if (tag === 'br') {
      nodes.push(createElement('br', { key: key++ }));
      continue;
    }

    const [children, next] = parseNodes(content, cursor, tag);
    cursor = next;
    tagPattern.lastIndex = next;
    const props = tag === 'a'
      ? { key: key++, ...getLinkProps(attributes) }
      : { key: key++ };

    nodes.push(createElement(tag, props, children));
  }
}

export default function ArticleContent({ content }: { content: string }) {
  if (looksLikeHtml(content)) {
    const [nodes] = parseNodes(content);
    return (
      <div className="richContent">
        {nodes.map((node, index) => <Fragment key={index}>{node}</Fragment>)}
      </div>
    );
  }

  // Zgodność ze starszymi wpisami zapisanymi jako zwykły tekst.
  const paragraphs = content.split(/\n{2,}/).filter((p) => p.trim().length > 0);

  return (
    <div className="richContent">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mt-3 mb-3">
          {paragraph.split('\n').map((line, lineIndex) => (
            <span key={lineIndex}>
              {line}
              {lineIndex < paragraph.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
