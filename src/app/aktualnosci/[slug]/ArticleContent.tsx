export default function ArticleContent({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/).filter((p) => p.trim().length > 0);

  return (
    <>
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
    </>
  );
}
