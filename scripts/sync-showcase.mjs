import {readFile,writeFile} from 'node:fs/promises';
import {COMMUNITY_REPOS} from '../src/community.js';

const start='<!-- community-showcase:start -->';
const end='<!-- community-showcase:end -->';
const escapeDescription=text=>text.replace(/\s+/g,' ').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/[\\`*_[\]{}()|!#]/g,'\\$&');

export async function syncShowcase(){
  const readme=await readFile('README.md','utf8');
  const from=readme.indexOf(start),to=readme.indexOf(end);
  if(from<0||to<from)throw new Error('README community showcase markers are missing.');
  const rows=COMMUNITY_REPOS.map(entry=>`| [${entry.repo}](https://github.com/${entry.repo}#readme) | ${escapeDescription(entry.description)} |`);
  const block=[start,'','| Repository | Workflow |','| --- | --- |',...rows,'',end].join('\n');
  const updated=readme.slice(0,from)+block+readme.slice(to+end.length);
  if(updated!==readme)await writeFile('README.md',updated);
}

await syncShowcase();
