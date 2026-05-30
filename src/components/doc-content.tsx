export function DocContent({ content }: { content: string }) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="prose-doc">
      {blocks.map((block, index) => {
        const isHeading = block.length < 86 && !/[.!?]$/.test(block) && index > 0;
        if (isHeading) {
          return <h2 key={block}>{block}</h2>;
        }
        return <p key={`${index}-${block.slice(0, 18)}`}>{block}</p>;
      })}
    </div>
  );
}
