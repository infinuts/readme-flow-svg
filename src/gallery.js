// The previews and “Use this” buttons share these complete configurations.
export const GALLERY = [
  {id:'cicd',name:'CI/CD',description:'Run checks in parallel, then build and deploy.',config:{preset:'parallel',title:'Ship with confidence',theme:'github',traveler:'rocket',duration:12,layout:'grid',columns:3,routing:'elbow'}},
  {id:'etl',name:'ETL pipeline',description:'Extract raw data and turn it into a usable dataset.',config:{preset:'data',title:'From source to warehouse',steps:['Extract','Validate','Clean','Transform','Load','Report'],icons:['download','shield','check','process','database','response'],layout:'snake',columns:3,theme:'ocean',traveler:'package',duration:12}},
  {id:'auth',name:'Auth flow',description:'Follow a sign-in from credentials to a secure session.',config:{preset:'auth',title:'A secure sign-in',theme:'dark',traveler:'dot',duration:8,lineStyle:'dashed'}},
  {id:'onboarding',name:'Onboarding',description:'Help new users find their first useful moment.',config:{preset:'api',title:'Welcome aboard',steps:['Sign up','Verify email','Set up','Invite team','First project','Ready'],icons:['key','message','process','heart','build','check'],layout:'snake',columns:3,theme:'sunset',traveler:'heart',duration:12}},
  {id:'files',name:'File processing',description:'Watch a file travel from upload to download.',config:{preset:'files',title:'Smaller files, same quality',theme:'light',traveler:'file',duration:8}},
  {id:'ai',name:'AI inference',description:'Trace a prompt through tokenization and inference.',config:{preset:'ai',title:'From prompt to answer',theme:'terminal',traveler:'spark',font:'mono',duration:8}}
];
