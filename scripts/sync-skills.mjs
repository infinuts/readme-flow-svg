import {mkdir,readFile,writeFile} from 'node:fs/promises';

const source=await readFile(new URL('../skills/readme-flow-svg/SKILL.md',import.meta.url),'utf8');
const targets=['.agents/skills/readme-flow-svg/SKILL.md','.claude/skills/readme-flow-svg/SKILL.md'];
for(const target of targets) {
  const url=new URL('../'+target,import.meta.url);
  if(process.argv.includes('--check')) {
    if(await readFile(url,'utf8')!==source)throw Error(`${target} is out of date. Run npm run sync:skills.`);
  }else {
    await mkdir(new URL('.',url),{recursive:true});await writeFile(url,source);
  }
}
console.log(process.argv.includes('--check')?'Harness skills are in sync.':'Updated Codex and Claude skills.');
