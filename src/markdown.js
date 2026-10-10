/** Replace only an image description, keeping the generated URLs intact.
 * @param {string} markdown
 * @param {string} description
 */
export function withAltText(markdown, description) {
  const alt = description.trim().replace(/[[\]\\\n\r<>]/g, ' ');
  return alt ? markdown.replace(/!\[[^\]]*\]/, () => `![${alt}]`) : markdown;
}
