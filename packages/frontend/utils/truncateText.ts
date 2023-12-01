export function truncateText(text: string | undefined, maxLength: number) {
  if (text) {
    const truncatedText = `${text.substring(0, maxLength)}...`;
    return truncatedText;
  }
  return "";
}
