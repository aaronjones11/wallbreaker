import * as THREE from 'three';
import { moments } from './data.js';
import './style.css';

const app = document.querySelector('#app');
app.innerHTML = '<div id="scene"></div><div class="shade"></div><header><div><div class="brand">WALL<b>BREAKER.</b></div><div class="kicker">THE MENTALITY COLLECTION</div></div><div class="search"><input id="search" aria-label="Search legends" placeholder="⌕ SEARCH LEGENDS & QUOTES..."><div class="results" id="results"></div></div></header><nav class="filters" id="filters"></nav><div class="instructions">DRAG TO EXPLORE<br>SCROLL TO ZOOM · CLICK A MONUMENT</div><div class="actions"><button id="random">IGNITE ↗</button><button id="reset">RESET ⌖</button></div><aside class="panel" id="panel"><div class="banner" id="banner"><span id="initials"></span><button class="close" id="close">✕</button></div><div class="content"><div class="category" id="category"></div><h2 id="name"></h2><div class="quote-label" id="quote-label"></div><blockquote id="quote"></blockquote><p class="quote-notice" id="quote-notice"></p><p id="description"></p><a id="watch" target="_blank" rel="noopener noreferrer">▶ FIND ORIGINAL MOMENT</a><a class="alt" id="more" target="_blank" rel="noopener noreferrer">MORE SPEECHES ↗</a></div></aside><footer><b>●</b> THE LIVING WALL · '+moments.length+' MOMENTS · THREE.JS</footer>';
const $ = selector => app.querySelector(selector);

/* Editorial / immersive hybrid navigation */
const editorial=document.createElement('main');
editorial.id='editorial';
editorial.className='editorial';
editorial.setAttribute('aria-label','Explore the mentality collection');
editorial.innerHTML='<div class="ed-inner"><div class="ed-overline">THE MENTALITY COLLECTION <span> / VOL. 001</span></div><section class="ed-hero"><div class="ed-hero-copy"><div class="ed-label">FEATURED MOMENT <span>— THE COURAGE ISSUE</span></div><h1>WORDS THAT<br><em>BREAK WALLS.</em></h1><p>A living archive of the speeches, voices and moments that move us. Find your fire. Follow the story.</p><div class="ed-hero-actions"><button type="button" id="ed-feature">EXPLORE THE FEATURE ↗</button><button type="button" id="ed-enter-wall">ENTER THE 3D WALL →</button></div></div><div class="ed-hero-art" id="ed-hero-art"><div class="ed-art-glow"></div><div class="ed-art-word">BURN<br>THE<br>BOATS.</div><div class="ed-art-credit">BOB CHESNEY / COURAGE</div></div></section><section class="ed-library"><div class="ed-section-head"><div><div class="ed-overline">THE ARCHIVE / THE COMPLETE COLLECTION</div><h2>Explore the moments<span>.</span></h2></div><p>Browse by mentality, discover a legend, or go deeper into a speech.</p></div><div class="ed-toolbar"><label class="ed-search-label"><span>⌕</span><input id="ed-search" type="search" placeholder="Search people, quotes, themes…" aria-label="Search the archive"></label><div id="ed-chips" class="ed-chips" aria-label="Filter archive by category"></div></div><div class="ed-results"><span id="ed-count"></span><span>SELECT A MOMENT TO EXPLORE</span></div><div class="ed-grid" id="ed-grid"></div></section><div class="ed-bottom">WALLBREAKER <span>BUILT ON EFFORT. CONSISTENCY. DISCOMFORT.</span></div></div>';
app.append(editorial);
const viewSwitch=document.createElement('div');
viewSwitch.className='view-switch';
viewSwitch.setAttribute('role','group');
viewSwitch.setAttribute('aria-label','Choose a browsing view');
viewSwitch.innerHTML='<button type="button" data-view="editorial" class="active">EXPLORE</button><button type="button" data-view="wall">THE WALL ↗</button>';
app.querySelector('header').append(viewSwitch);
let activeView='editorial',edCategory='ALL',edQuery='';
function switchView(view){
  activeView=view;
  app.classList.toggle('is-editorial',view==='editorial');
  viewSwitch.querySelectorAll('button').forEach(button=>{
    const active=button.dataset.view===view;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  if(view==='editorial')$('#panel').classList.remove('open');
  else resize();
}
viewSwitch.addEventListener('click',event=>{
  const target=event.target.closest('button[data-view]');
  if(target)switchView(target.dataset.view);
});
const edSearch=$('#ed-search'),edGrid=$('#ed-grid'),edChips=$('#ed-chips');
const archiveCategories=['ALL',...new Set(moments.map(m=>m.category))];
edChips.replaceChildren(...archiveCategories.map(cat=>{
  const b=document.createElement('button');b.type='button';b.dataset.category=cat;b.textContent=cat;
  b.setAttribute('aria-pressed',String(cat===edCategory));
  b.classList.toggle('active',cat===edCategory);
  return b;
}));
function renderEditorial(){
  const matched=moments.filter(m=>(edCategory==='ALL'||m.category===edCategory)&&
    (m.name+' '+m.quote+' '+m.category+' '+m.description).toLowerCase().includes(edQuery));
  $('#ed-count').textContent=String(matched.length).padStart(2,'0')+' / '+moments.length+' MOMENTS';
  const frag=document.createDocumentFragment();
  matched.forEach(m=>{
    const tile=document.createElement('article');
    tile.className='ed-card';
    const visual=document.createElement('button');
    visual.type='button';visual.className='ed-card-art';visual.dataset.action='read';visual.dataset.index=m.id;
    visual.setAttribute('aria-label','Explore '+m.name+' — '+m.quote);
    const image=portraitUrls.get(m.name);
    if(image){
      const img=document.createElement('img');img.src=image;img.alt='';
      img.loading='lazy';img.onerror=()=>img.remove();visual.append(img);
    }
    const stamp=document.createElement('span');stamp.className='ed-card-stamp';stamp.textContent=String(m.id+1).padStart(2,'0');
    const silhouette=document.createElement('span');silhouette.className='ed-card-silhouette';silhouette.textContent=m.name.split(' ').map(w=>w[0]).join('').slice(0,2);
    visual.append(silhouette,stamp);
    const info=document.createElement('div');info.className='ed-card-info';
    const tag=document.createElement('div');tag.className='ed-card-tag';tag.textContent=m.category;
    const name=document.createElement('h3');name.textContent=m.name;
    const quote=document.createElement('p');quote.textContent=m.quote;
    const actions=document.createElement('div');actions.className='ed-card-actions';
    const read=document.createElement('button');read.type='button';read.dataset.action='read';read.dataset.index=m.id;read.textContent='EXPLORE ↗';
    const watch=document.createElement('button');watch.type='button';watch.dataset.action='watch';watch.dataset.index=m.id;watch.textContent=m.sourceUrl?'▶ WATCH':'▶ VIDEO';
    actions.append(read,watch);info.append(tag,name,quote,actions);tile.append(visual,info);frag.append(tile);
  });
  edGrid.replaceChildren(frag);
  if(!matched.length){const empty=document.createElement('p');empty.className='ed-empty';empty.textContent='No moments found. Try a different search or category.';edGrid.append(empty);}
}
function refreshEditorialPortraits(name,url){
  // Update visible cards without clearing search results or resetting scroll.
  editorial.querySelectorAll('.ed-card').forEach(tile=>{
    const btn=tile.querySelector('[data-action="read"]');
    if(!btn||moments[Number(btn.dataset.index)].name!==name)return;
    const visual=tile.querySelector('.ed-card-art');
    const existing=visual.querySelector('img');
    if(existing)existing.remove();
    const img=document.createElement('img');img.alt='';img.loading='lazy';img.src=url;img.onerror=()=>img.remove();
    visual.prepend(img);
  });
  if(name==='Bob Chesney'){
    const art=$('#ed-hero-art');
    art.style.setProperty('--hero-portrait','url("'+url.replace(/"/g,'%22')+'")');
  }
}
edChips.addEventListener('click',event=>{
  const b=event.target.closest('button[data-category]');if(!b)return;
  edCategory=b.dataset.category;
  edChips.querySelectorAll('button').forEach(node=>{
    const active=node===b;node.classList.toggle('active',active);node.setAttribute('aria-pressed',String(active));
  });
  renderEditorial();
});
edSearch.addEventListener('input',()=>{edQuery=edSearch.value.trim().toLowerCase();renderEditorial();});
edGrid.addEventListener('click',event=>{
  const b=event.target.closest('button[data-action]');if(!b)return;
  const i=Number(b.dataset.index);if(!moments[i])return;
  if(b.dataset.action==='watch')openVideo(moments[i]);
  else{switchView('wall');fly(i);}
});
$('#ed-feature').addEventListener('click',()=>{const index=moments.findIndex(m=>m.quote.toLowerCase().includes('burn the boats'));if(index>=0){switchView('wall');fly(index);}});
$('#ed-enter-wall').addEventListener('click',()=>switchView('wall'));

const scene = new THREE.Scene();
scene.background = new THREE.Color('#090606');
scene.fog = new THREE.FogExp2(0x090606,.00042);
const camera = new THREE.PerspectiveCamera(52,1,1,9000);
camera.position.set(0,0,1150);
const renderer = new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.8));
renderer.outputColorSpace = THREE.SRGBColorSpace;
$('#scene').append(renderer.domElement);
scene.add(new THREE.AmbientLight(0xffb38b,.62));
const key = new THREE.PointLight(0xff4c1d,1400000,2600,1.8);
key.position.set(-420,500,700);
scene.add(key);
const fill = new THREE.PointLight(0xffa34a,700000,2000,1.8);
fill.position.set(600,-420,500);
scene.add(fill);
const wall = new THREE.Group();
scene.add(wall);
const stone = new THREE.MeshStandardMaterial({color:0x1d1817,roughness:.9,metalness:.12});
const rim = new THREE.MeshStandardMaterial({color:0x5d2415,roughness:.48,metalness:.4});
const hot = new THREE.MeshBasicMaterial({color:0xff622b});
const back = new THREE.Mesh(new THREE.BoxGeometry(3000,2300,60),stone);
back.position.z = -75;
wall.add(back);
const portraitCache = new Map();
function tileTexture(m){
  const c = document.createElement('canvas');
  c.width=512;c.height=640;
  const g=c.getContext('2d');
  const bg=g.createLinearGradient(0,0,512,640);
  bg.addColorStop(0,'#30211c');bg.addColorStop(.6,'#1b1515');bg.addColorStop(1,'#080607');
  g.fillStyle=bg;g.fillRect(0,0,512,640);
  const halo=g.createRadialGradient(256,205,0,256,230,290);
  halo.addColorStop(0,'#a34b2977');halo.addColorStop(1,'#08060700');
  g.fillStyle=halo;g.fillRect(0,0,512,640);
  g.fillStyle='#b1785b';g.font='bold 145px Arial';g.textAlign='center';
  g.fillText(m.name.split(' ').map(v=>v[0]).join('').slice(0,2),256,315);
  g.fillStyle='#050506b0';g.fillRect(0,410,512,230);
  g.textAlign='left';g.fillStyle='#fff1e7';g.font='bold 39px Arial';
  const name=m.name.toUpperCase();g.fillText(name.length>17?name.slice(0,17)+'…':name,28,480);
  g.fillStyle='#ffd1b8';g.font='italic 26px Georgia';
  let line='',lines=[];
  for(const word of m.quote.split(' ')){if((line+' '+word).length>28){lines.push(line);line=word;}else line+=(line?' ':'')+word;}
  lines.push(line);lines.slice(0,2).forEach((text,i)=>g.fillText(text,28,528+i*31));
  g.fillStyle='#ff955b';g.font='bold 19px Arial';g.fillText(m.category,28,613);
  const texture=new THREE.CanvasTexture(c);
  texture.colorSpace=THREE.SRGBColorSpace;
  return texture;
}
const cards=[];
const loader=new THREE.TextureLoader();
moments.forEach((m,i)=>{
  const col=i%5,row=Math.floor(i/5);
  const x=(col-2)*260+(row%2)*25,y=(2-row)*330,z=18+Math.sin(i*2.13)*22;
  const group=new THREE.Group();
  group.position.set(x,y,z);group.rotation.y=Math.sin(i*1.7)*.055;
  const slab=new THREE.Mesh(new THREE.BoxGeometry(228,286,25),rim);
  group.add(slab);
  const material=new THREE.MeshStandardMaterial({map:tileTexture(m),roughness:.8,metalness:.05});
  const inset=new THREE.Mesh(new THREE.BoxGeometry(216,274,2),material);
  inset.position.z=14;group.add(inset);
  const edge=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(231,289,27)),new THREE.LineBasicMaterial({color:0xff6b32,transparent:true,opacity:.8}));
  group.add(edge);
  const halo=new THREE.Mesh(new THREE.PlaneGeometry(247,304),new THREE.MeshBasicMaterial({color:0xff4719,transparent:true,opacity:.065,depthWrite:false}));
  halo.position.z=-15;group.add(halo);
  wall.add(group);cards.push({group,inset,halo,baseX:x,baseY:y});

});

const portraitUrls = new Map();
renderEditorial();
switchView('editorial');
function updateSpeakerPortrait(name,url,image){
  portraitUrls.set(name,url);
  refreshEditorialPortraits(name,url);
  cards.forEach((card,i)=>{
    const m=moments[i];
    if(m.name!==name)return;
    const c=document.createElement('canvas');c.width=512;c.height=640;
    const g=c.getContext('2d');
    const scale=Math.max(512/image.width,418/image.height);
    const w=image.width*scale,h=image.height*scale;
    g.drawImage(image,(512-w)/2,(418-h)/2,w,h);
    g.fillStyle='rgba(15,9,7,.17)';g.fillRect(0,0,512,418);
    g.fillStyle='#050506de';g.fillRect(0,418,512,222);
    g.fillStyle='#fff1e7';g.font='bold 38px Arial';g.fillText(m.name.toUpperCase().slice(0,19),23,482);
    g.fillStyle='#ffd1b8';g.font='italic 24px Georgia';g.fillText(m.quote.slice(0,32),23,532);
    g.fillStyle='#ff955b';g.font='bold 19px Arial';g.fillText(m.category,23,608);
    const material=card.inset.material;
    material.map?.dispose();
    material.map=new THREE.CanvasTexture(c);
    material.map.colorSpace=THREE.SRGBColorSpace;
    material.needsUpdate=true;
  });
  if(selected>=0&&moments[selected]?.name===name){
    setPopupPortrait(moments[selected]);
  }
}
function setPopupPortrait(m){
  const banner=$('#banner'),old=banner.querySelector('img');
  if(old)old.remove();
  $('#initials').textContent=m.name.split(' ').map(v=>v[0]).join('').slice(0,2);
  const url=portraitUrls.get(m.name);
  if(!url)return;
  const img=document.createElement('img');
  img.src=url;img.alt=m.name;img.referrerPolicy='no-referrer';
  img.onerror=()=>img.remove();
  banner.prepend(img);
}
function loadPortrait(url){
  return new Promise((resolve,reject)=>loader.load(url,texture=>resolve(texture.image),undefined,reject));
}
async function articlePortrait(title){
  const endpoint='https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=700&titles='+encodeURIComponent(title)+'&origin=*';
  const response=await fetch(endpoint);
  if(!response.ok)throw new Error('Article portrait request failed');
  const json=await response.json();
  const page=Object.values(json.query?.pages||{})[0];
  return page?.thumbnail?.source||null;
}
async function hydratePortraits(){
  const unique=new Map();
  moments.forEach(m=>{if(!unique.has(m.name))unique.set(m.name,m);});
  await Promise.allSettled([...unique].map(async ([name,m])=>{
    let url=m.portrait;
    if(!url&&m.wikiTitle)url=await articlePortrait(m.wikiTitle);
    if(!url)return;
    const image=await loadPortrait(url);
    updateSpeakerPortrait(name,url,image);
  }));
}
// Wikipedia article images are opportunistic and may be absent or blocked by CORS.
// Curated /public/portraits files override this lookup through moment.portrait.
hydratePortraits();

for(let i=0;i<moments.length;i++)for(const j of [i+1,i+5]){
  if(j>=moments.length||(j===i+1&&i%5===4))continue;
  const a=cards[i].group.position,b=cards[j].group.position;
  const curve=new THREE.CatmullRomCurve3([
    new THREE.Vector3(a.x,a.y,-27),
    new THREE.Vector3((a.x+b.x)/2+Math.sin(i*4)*17,(a.y+b.y)/2+Math.cos(i*3)*16,-27),
    new THREE.Vector3(b.x,b.y,-27)
  ]);
  wall.add(new THREE.Mesh(new THREE.TubeGeometry(curve,12,1.6,5,false),hot));
}
const count=800,particlePos=new Float32Array(count*3),particleSpeed=new Float32Array(count);
for(let i=0;i<count;i++){
  particlePos[i*3]=(Math.random()-.5)*3100;
  particlePos[i*3+1]=(Math.random()-.5)*2400;
  particlePos[i*3+2]=Math.random()*650-80;
  particleSpeed[i]=.35+Math.random()*1.5;
}
const particleGeometry=new THREE.BufferGeometry();
particleGeometry.setAttribute('position',new THREE.BufferAttribute(particlePos,3));
scene.add(new THREE.Points(particleGeometry,new THREE.PointsMaterial({color:0xff8c3d,size:3.5,transparent:true,opacity:.8,depthWrite:false})));
let targetX=0,targetY=0,targetZ=1150,selected=-1,filter='ALL';
const categories=['ALL',...new Set(moments.map(m=>m.category))];
function reset(){
  targetX=0;targetY=0;targetZ=1150;selected=-1;
  $('#panel').classList.remove('open');
  cards.forEach(c=>c.halo.material.opacity=.065);
}
function showFilters(){
  $('#filters').replaceChildren(...categories.map(cat=>{
    const b=document.createElement('button');
    b.textContent=cat;b.className=cat===filter?'active':'';
    b.onclick=()=>{
      filter=cat;showFilters();
      cards.forEach((c,i)=>c.group.visible=cat==='ALL'||moments[i].category===cat);
      if(cat==='ALL')reset();
      else{const i=moments.findIndex(m=>m.category===cat);if(i>=0)fly(i,false);}
    };
    return b;
  }));
}
function fly(i,open=true){
  const m=moments[i],c=cards[i];
  if(!c.group.visible){filter='ALL';showFilters();cards.forEach(v=>v.group.visible=true);}
  selected=i;targetX=c.baseX;targetY=c.baseY;targetZ=530;
  if(!open)return;
  $('#panel').classList.add('open');
  $('#name').textContent=m.name.toUpperCase();
  $('#category').textContent=m.category+' / LEGEND '+String(i+1).padStart(2,'0');
  $('#quote').textContent=m.fullQuote || m.quote;
  $('#quote-label').textContent=m.fullQuote?'VERIFIED QUOTATION':'FEATURED MOMENT';
  $('#quote-notice').textContent='';
  $('#description').textContent=m.description;
  setPopupPortrait(m);
  $('#watch').textContent=m.sourceUrl?'▶ WATCH ORIGINAL MOMENT':'▶ VIEW VIDEO';
  $('#more').href='https://www.youtube.com/results?search_query='+encodeURIComponent(m.name+' motivational speeches');
}

const videoOverlay=document.createElement('div');
videoOverlay.id='video-overlay';
videoOverlay.className='video-overlay';
videoOverlay.hidden=true;
videoOverlay.innerHTML='<section class="video-modal" role="dialog" aria-modal="true" aria-label="Original speech video"><div class="video-top"><div><span class="video-eyebrow">THE ORIGINAL MOMENT</span><h2 id="video-title"></h2></div><button id="video-close" aria-label="Close video">✕</button></div><div class="video-stage" id="video-stage"></div><p id="video-note"></p><a id="video-external" target="_blank" rel="noopener noreferrer">OPEN ON YOUTUBE ↗</a></section>';
app.append(videoOverlay);
const videoStage=$('#video-stage');
function getYouTubeId(url){
  if(!url)return null;
  try{
    const u=new URL(url);
    if(u.hostname==='youtu.be')return /^[A-Za-z0-9_-]{11}$/.test(u.pathname.slice(1))?u.pathname.slice(1):null;
    if(['youtube.com','www.youtube.com','m.youtube.com'].includes(u.hostname)){
      const id=u.pathname.startsWith('/shorts/')?u.pathname.split('/')[2]:u.searchParams.get('v');
      return /^[A-Za-z0-9_-]{11}$/.test(id||'')?id:null;
    }
  }catch(e){}
  return null;
}
function closeVideo(){
  videoOverlay.hidden=true;
  videoStage.replaceChildren(); // Removes iframe and stops video playback.
  document.body.classList.remove('video-open');
}
function openVideo(m){
  closeVideo();
  videoOverlay.hidden=false;
  document.body.classList.add('video-open');
  $('#video-title').textContent=m.name+' — '+m.quote;
  const id=getYouTubeId(m.sourceUrl);
  const external=$('#video-external');
  external.href=m.sourceUrl||'https://www.youtube.com/results?search_query='+encodeURIComponent(m.search);
  external.textContent=id?'OPEN ON YOUTUBE ↗':'FIND ORIGINAL VIDEO ON YOUTUBE ↗';
  if(id){
    const iframe=document.createElement('iframe');
    iframe.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0';
    iframe.title=m.name+' — '+m.quote;
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    iframe.allowFullscreen=true;
    videoStage.append(iframe);
    $('#video-note').textContent='The video plays here when its uploader allows embedding. If playback is blocked, use the YouTube link below.';
  }else{
    const notice=document.createElement('div');
    notice.className='video-unlinked';
    notice.textContent='A direct video for this moment has not been linked yet.';
    videoStage.append(notice);
    $('#video-note').textContent='We’re still curating the original footage for this moment.';
  }
  $('#video-close').focus();
}
$('#watch').removeAttribute('target');
$('#watch').removeAttribute('href');
$('#watch').addEventListener('click',event=>{
  event.preventDefault();
  if(selected>=0)openVideo(moments[selected]);
});
$('#video-close').addEventListener('click',closeVideo);
videoOverlay.addEventListener('click',event=>{if(event.target===videoOverlay)closeVideo();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!videoOverlay.hidden)closeVideo();});

showFilters();
$('#reset').onclick=reset;
$('#random').onclick=()=>fly(Math.floor(Math.random()*moments.length));
$('#close').onclick=()=>$('#panel').classList.remove('open');
const search=$('#search'),results=$('#results');
search.addEventListener('input',()=>{
  const q=search.value.trim().toLowerCase();results.replaceChildren();
  if(!q){results.classList.remove('show');return;}
  moments.forEach((m,i)=>{
    if(results.children.length>=9||!(m.name+' '+m.category+' '+m.quote+' '+m.description).toLowerCase().includes(q))return;
    const b=document.createElement('button');b.textContent=m.name+' — '+m.quote;
    const small=document.createElement('small');small.textContent=m.category;b.append(small);
    b.onclick=()=>{fly(i);search.value='';results.classList.remove('show');};
    results.append(b);
  });
  results.classList.add('show');
});
search.addEventListener('keydown',e=>{if(e.key==='Enter')results.querySelector('button')?.click();if(e.key==='Escape')results.classList.remove('show');});
const ray=new THREE.Raycaster(),mouse=new THREE.Vector2();
let down=false,dist=0,px=0,py=0;
const canvas=renderer.domElement;
canvas.addEventListener('pointerdown',e=>{
  down=true;dist=0;px=e.clientX;py=e.clientY;canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove',e=>{
  if(!down)return;
  const dx=e.clientX-px,dy=e.clientY-py;
  dist+=Math.abs(dx)+Math.abs(dy);
  const factor=targetZ/950;
  targetX-=dx*factor;targetY+=dy*factor;px=e.clientX;py=e.clientY;
});
canvas.addEventListener('pointerup',e=>{
  down=false;if(dist>7)return;
  const rect=canvas.getBoundingClientRect();
  mouse.x=((e.clientX-rect.left)/rect.width)*2-1;
  mouse.y=-((e.clientY-rect.top)/rect.height)*2+1;
  ray.setFromCamera(mouse,camera);
  const hits=ray.intersectObjects(cards.filter(c=>c.group.visible).map(c=>c.inset),false);
  if(hits.length){const i=cards.findIndex(c=>c.inset===hits[0].object);if(i>=0)fly(i);}
});
canvas.addEventListener('wheel',e=>{
  e.preventDefault();
  targetZ=Math.max(360,Math.min(2350,targetZ*(e.deltaY>0?1.095:.91)));
},{passive:false});
let last=performance.now();
function animate(t){
  requestAnimationFrame(animate);
  const dt=Math.min(40,t-last);last=t;
  camera.position.x+=(targetX-camera.position.x)*.075;
  camera.position.y+=(targetY-camera.position.y)*.075;
  camera.position.z+=(targetZ-camera.position.z)*.075;
  camera.lookAt(camera.position.x,camera.position.y,0);
  for(let i=0;i<count;i++){
    particlePos[i*3+1]+=particleSpeed[i]*dt*.035;
    if(particlePos[i*3+1]>1200)particlePos[i*3+1]=-1200;
  }
  particleGeometry.attributes.position.needsUpdate=true;
  cards.forEach((c,i)=>{const wanted=i===selected?.28:.065;c.halo.material.opacity+=(wanted-c.halo.material.opacity)*.04;});
  renderer.render(scene,camera);
}
function resize(){const w=app.clientWidth,h=app.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}
window.addEventListener('resize',resize);resize();
requestAnimationFrame(animate);
