import sanitizeHtml from 'sanitize-html';

function looksLikeHtml(value: string) {
  return /<\/?(p|br|strong|em|b|i|ul|ol|li|h[1-6]|blockquote)\b/i.test(value);
}

export default function ArticleContent({ content }: { content: string }) {
  if (looksLikeHtml(content)) {
    const clean = sanitizeHtml(content, {
      allowedTags: [
        'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
        'ul', 'ol', 'li', 'h2', 'h3', 'blockquote', 'a',
      ],
      allowedAttributes: {
        a: ['href', 'target', 'rel'],
      },
    });

    return (
      <div
        className="richContent"
        // Treść pochodzi wyłącznie od zalogowanego administratora i jest oczyszczana przez DOMPurify.
        dangerouslySetInnerHTML={{ __html: clean }}
      />
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
