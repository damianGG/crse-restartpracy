import sanitizeHtml from 'sanitize-html';

function looksLikeHtml(value: string) {
  return /<\/?(p|br|strong|em|b|i|ul|ol|li|h[1-6]|blockquote)\b/i.test(value);
}

/**
 * Renders admin-authored HTML while preserving the site's bullet styling
 * (icon-list with check marks) used across the project pages.
 */
function decorateLists(html: string) {
  return html
    .replace(/<ul>/g, '<ul class="icon-list bullet-bg bullet-soft-primary mb-0">')
    .replace(/<ol>/g, '<ol class="icon-list bullet-bg bullet-soft-primary mb-0">')
    .replace(/<li>/g, () => '<li><i class="uil uil-check"></i>');
}

export default function ProjectRichContent({ content }: { content: string }) {
  if (!content?.trim()) return null;

  if (looksLikeHtml(content)) {
    const clean = sanitizeHtml(content, {
      allowedTags: [
        'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
        'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'a',
      ],
      allowedAttributes: {
        a: ['href', 'target', 'rel'],
      },
    });

    return (
      <div
        className="projectRichContent"
        // Treść pochodzi wyłącznie od zalogowanego administratora i jest oczyszczana przez sanitize-html.
        dangerouslySetInnerHTML={{ __html: decorateLists(clean) }}
      />
    );
  }

  // Zgodność z treścią zapisaną jako zwykły tekst.
  const paragraphs = content.split(/\n{2,}/).filter((p) => p.trim().length > 0);

  return (
    <div className="projectRichContent">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-3">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
