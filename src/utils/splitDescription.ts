export const splitDescription = (description: string | string[]): string[] => {
  const paragraphs = Array.isArray(description) ? description : [description];

  return paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean);
};
