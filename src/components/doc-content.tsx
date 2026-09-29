type ContentBlock =
  | { type: "heading" | "subheading" | "paragraph"; text: string }
  | { type: "list"; items: string[] };

function isPdfArtifact(line: string) {
  return /^file:\/\//i.test(line)
    || /^\d+\/\d+\/\d+,?\s+\d{1,2}:\d{2}\s+(?:AM|PM)/i.test(line)
    || /^\d+\s*\/\s*\d+$/.test(line)
    || /^--\s*\d+\s+of\s+\d+\s*--$/i.test(line)
    || /^CORDOVA PROPERTY MANAGEMENT\s*\|\s*BLOG DRAFT$/i.test(line)
    || /^Cordova Property Management\s*\|\s*[A-Z][a-z]+\s+\d{1,2},\s+\d{4}\s*\|\s*\d+$/i.test(line);
}

function isNamedSectionHeading(line: string) {
  if (line.length > 105 || /[.!?]$/.test(line)) return false;
  return /^(?:introduction|conclusion|summary|final thoughts|key takeaways)$/i.test(line)
    || /^(?:step[- ]by[- ]step|how|why|what|when|where|common|key|the importance|benefits|warning signs|best practices)\b/i.test(line);
}

function isTitleCaseHeading(line: string) {
  if (line.length > 105 || /[.!?:]$/.test(line)) return false;
  const words = line.split(/\s+/).filter(Boolean);
  if (words.length < 2) return false;
  const minorWords = /^(?:a|an|and|as|at|but|by|for|from|in|of|on|or|the|to|with)$/i;
  return words.every((word, index) => {
    const plain = word.replace(/^[('“”]+|[),'“”]+$/g, "");
    return (index > 0 && minorWords.test(plain)) || /^[A-Z0-9]/.test(plain);
  });
}

function isSectionHeading(line: string) {
  if (isNamedSectionHeading(line)) return true;
  return line.split(/\s+/).length >= 4 && isTitleCaseHeading(line);
}

function isSubheading(line: string) {
  if (/^\d+\.\s+[A-Z]/.test(line) && line.length <= 105 && !/[.!?]$/.test(line)) return true;
  return line.split(/\s+/).length <= 3 && isTitleCaseHeading(line) && !isNamedSectionHeading(line);
}

function getBulletText(line: string) {
  const match = line.match(/^[\u2022\u2023\u25E6\u2043\u2219\uF0B7\uF0A7\u25AA\u25CF\-\u2013]\s*(.+)$/);
  return match?.[1]?.trim() || null;
}

function isEmbeddedArticleCta(line: string) {
  return /^(?:Get Started Today|Looking to .+\?\s*Contact Cordova Property|Contact Cordova Property Management|&#128222;)/i.test(line);
}

function removeRepeatedTitle(lines: string[], title?: string) {
  if (!title || lines.length === 0) return lines;
  const expected = title.replace(/\s+/g, " ").trim().toLowerCase();
  let combined = "";
  for (let index = 0; index < Math.min(lines.length, 5); index += 1) {
    combined = `${combined} ${lines[index]}`.replace(/\s+/g, " ").trim();
    if (combined.toLowerCase() === expected) return lines.slice(index + 1);
    if (combined.length > expected.length + 8) break;
  }
  return lines;
}

function formatContent(content: string, title?: string): ContentBlock[] {
  let lines = content.replace(/\r/g, "").split("\n").map((line) => line.replace(/\s+/g, " ").trim());
  lines = removeRepeatedTitle(lines, title);
  const introductionIndex = lines.findIndex((line) => /^introduction$/i.test(line));
  if (introductionIndex >= 0) lines = lines.slice(introductionIndex);

  const blocks: ContentBlock[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let collectingList = false;
  const flushParagraph = () => {
    const text = paragraph.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "paragraph", text });
    paragraph = [];
  };
  const flushList = () => {
    if (listItems.length) blocks.push({ type: "list", items: listItems });
    listItems = [];
  };

  for (const line of lines) {
    if (!line) {
      flushParagraph();
      continue;
    }
    if (isPdfArtifact(line) || /^By Cordova Property Management\b/i.test(line)) continue;
    if (isEmbeddedArticleCta(line)) {
      flushParagraph();
      flushList();
      break;
    }

    const bulletText = getBulletText(line);
    if (bulletText) {
      flushParagraph();
      listItems.push(bulletText);
      collectingList = false;
      continue;
    }
    if (listItems.length) flushList();

    if (collectingList) {
      if (!/[.!?]$/.test(line) && !isSectionHeading(line) && !isSubheading(line)) {
        listItems.push(line.replace(/^[\u2022\uF0B7\-\u2013]\s*/, ""));
        continue;
      }
      flushList();
      collectingList = false;
    }
    if (isSectionHeading(line)) {
      flushParagraph();
      blocks.push({ type: "heading", text: line });
      continue;
    }
    if (isSubheading(line)) {
      flushParagraph();
      blocks.push({ type: "subheading", text: line });
      continue;
    }

    paragraph.push(line);
    if (/:$/.test(line)) {
      flushParagraph();
      collectingList = true;
    } else if (/[.!?][”"]?$/.test(line)) {
      flushParagraph();
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}

export function DocContent({ content, title }: { content: string; title?: string }) {
  const blocks = formatContent(content, title);
  return (
    <div className="prose-doc">
      {blocks.map((block, index) =>
        block.type === "heading" ? <h2 key={`${index}-${block.text}`}>{block.text}</h2>
        : block.type === "subheading" ? <h3 key={`${index}-${block.text}`}>{block.text}</h3>
        : block.type === "list" ? <ul key={`${index}-${block.items[0]}`}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
        : <p key={`${index}-${block.text.slice(0, 24)}`}>{block.text}</p>
      )}
    </div>
  );
}
