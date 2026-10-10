import { create } from 'fontkit';
import { escapeXml } from './svg.js';
export function parseFont(bytes) {
  return create(new Uint8Array(bytes));
}
const decode = (value) =>
  value.replace(
    /&(amp|lt|gt|quot|apos);/g,
    (_, name) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" })[name],
  );
export function outlineSvg(svg, font, family) {
  const output = svg.replace(/<text\b([^>]*)>([^<]*)<\/text>/g, (_, attrs, encoded) => {
    const value = decode(encoded),
      a = Object.fromEntries([...attrs.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
    const size = Number(a['font-size']) || 12,
      run = font.layout(value),
      unit = size / font.unitsPerEm,
      width = run.positions.reduce((sum, p) => sum + p.xAdvance, 0) * unit,
      scale = a.textLength && width ? Number(a.textLength) / width : 1;
    let x = Number(a.x) || 0;
    if (a['text-anchor'] === 'middle') x -= (width * scale) / 2;
    else if (a['text-anchor'] === 'end') x -= width * scale;
    const keep = attrs.replace(
      /\s(?:x|y|font-size|font-weight|text-anchor|textLength|lengthAdjust)="[^"]*"/g,
      '',
    );
    let cursorX = 0,
      cursorY = 0;
    const paths = run.glyphs
      .map((glyph, i) => {
        const p = run.positions[i],
          result = `<path d="${glyph.path.toSVG()}" transform="translate(${(cursorX + p.xOffset) * unit} ${-(cursorY + p.yOffset) * unit}) scale(${unit} ${-unit})"/>`;
        cursorX += p.xAdvance;
        cursorY += p.yAdvance;
        return result;
      })
      .join('');
    return `<g${keep} data-font-text="${escapeXml(value)}" transform="translate(${x} ${Number(a.y) || 0}) scale(${scale} 1)">${paths}</g>`;
  });
  const notice = [
    font.copyright,
    font._getName?.('licenseDescription'),
    font._getName?.('licenseInfoURL'),
  ]
    .filter(Boolean)
    .join('\n');
  return output.replace(
    '</svg>',
    `<metadata>Google Font: ${escapeXml(family)}\n${escapeXml(notice)}</metadata></svg>`,
  );
}
