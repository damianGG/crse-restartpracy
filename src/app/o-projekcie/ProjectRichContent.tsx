import { createElement, Fragment, type ReactNode } from 'react';

const allowedTags = new Set([
  'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
  'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'a',
]);

const tagPattern = /<\/?([a-z0-9]+)([^>]*)>/gi;

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
    const props =
      tag === 'a'
        ? { key: key++, ...getLinkProps(attributes) }
        : tag === 'ul' || tag === 'ol'
          ? { key: key++, className: 'icon-list bullet-bg bullet-soft-primary mb-0' }
          : { key: key++ };

    nodes.push(
      createElement(
        tag,
        props,
        tag === 'li'
          ? [createElement('i', { key: 'icon', className: 'uil uil-check' }), ...children]
          : children,
      ),
    );
  }
}

export default function ProjectRichContent({ content }: { content: string }) {
  if (!content?.trim()) return null;

  const [nodes] = parseNodes(content);
  return <div className="projectRichContent">{nodes.map((node, index) => <Fragment key={index}>{node}</Fragment>)}</div>;
}
