const state={channels:[],filtered:[],country:"all",category:"all",mode:"all",quality:"all",search:""};
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
async function loadData(){
  try{
    const [c,cat,ch]=await Promise.all([
      fetch("data/countries.json").then(r=>r.json()),
      fetch("data/categories.json").then(r=>r.json()),
      fetch("data/channels.json").then(r=>r.json())
    ]);
    state.channels=ch; renderMenus(c,cat); apply();
  }catch(e){ $("#channels").innerHTML='<div class="card">Unable to load channel data. Run this project from a web server instead of file://.</div>'; }
}
function renderMenus(countries,cats){
  $("#categoryMenu").innerHTML=cats.map(x=>`<button class="cat" data-category="${esc(x)}">◈ ${esc(x)}</button>`).join("");
  $("#countryMenu").innerHTML=countries.map(x=>`<button class="country" data-country="${x.code}">${x.flag} ${esc(x.name)}</button>`).join("");
  document.querySelectorAll(".cat").forEach(b=>b.onclick=()=>{state.category=b.dataset.category;state.country="all";apply()});
  document.querySelectorAll(".country").forEach(b=>b.onclick=()=>{state.country=b.dataset.country;state.category="all";apply()});
}
function apply(){
 state.search=$("#search").value.trim().toLowerCase(); state.quality=$("#quality").value;
 state.filtered=state.channels.filter(c=>
   (state.country==="all"||c.countryCode===state.country)&&
   (state.category==="all"||c.category===state.category)&&
   (state.mode!=="live"||c.live)&&
   (state.quality==="all"||c.quality===state.quality)&&
   (!state.search||`${c.name} ${c.country} ${c.category} ${c.language}`.toLowerCase().includes(state.search))
 );
 $("#total").textContent=state.channels.length.toLocaleString();
 $("#live").textContent=state.channels.filter(c=>c.live).length.toLocaleString();
 $("#countries").textContent=new Set(state.channels.map(c=>c.countryCode)).size;
 $("#cats").textContent=new Set(state.channels.map(c=>c.category)).size;
 $("#resultLabel").textContent=`${state.filtered.length.toLocaleString()} channels`;
 render();
}
function render(){
 $("#channels").innerHTML=state.filtered.map(c=>`
 <article class="card">
  <div class="card-top"><div class="logo">${c.flag}</div><div><div class="ctitle">${esc(c.name)}</div><div class="meta">${esc(c.category)} • ${esc(c.quality)}</div></div></div>
  <span class="badge">● ${esc(c.status)}</span>
  <div class="card-actions"><button class="watch" onclick="openPlayer('${c.id}')">▶ WATCH</button><button class="fav" onclick="fav(this)">♡</button></div>
 </article>`).join("") || '<div class="card">No channels match your filters.</div>';
}
function fav(b){b.textContent=b.textContent==="♡"?"♥":"♡"}
window.openPlayer=id=>{
 const c=state.channels.find(x=>x.id===id); if(!c)return;
 $("#playerTitle").textContent=c.name; $("#playerModal").classList.remove("hidden");
 const video=$("#video"), box=$("#playerMessage");
 video.pause(); video.removeAttribute("src"); video.load();
 window.currentHls?.destroy(); window.currentHls=null;
 if(c.sourceType==="youtube"){
   video.style.display="none";
   box.innerHTML=`<div class="embed-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(c.sourceId)}?autoplay=1&rel=0" title="${esc(c.name)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
   <div class="source-note">Official ${esc(c.provider)} live source. If playback is unavailable, use the official source link below.</div>
   <a class="source-link" href="${esc(c.sourceUrl)}" target="_blank" rel="noopener">Open official source ↗</a>`;
 } else if(c.sourceType==="external"){
   video.style.display="none";
   box.innerHTML=`<div class="external-source"><b>Official live web source</b><p>This provider publishes its live player on its own website.</p><a class="source-link" href="${esc(c.sourceUrl)}" target="_blank" rel="noopener">Open ${esc(c.provider)} Live ↗</a></div>`;
 } else if(c.stream){
   video.style.display="block"; box.textContent="Loading live HLS source…";
   if(window.Hls&&Hls.isSupported()){const h=new Hls();window.currentHls=h;h.loadSource(c.stream);h.attachMedia(video);h.on(Hls.Events.MANIFEST_PARSED,()=>video.play().catch(()=>{}));}
   else {video.src=c.stream;video.play().catch(()=>{});}
 } else {
   video.style.display="block";
   box.textContent="No direct HLS URL assigned to this catalog entry yet.";
 }
};$("#closePlayer").onclick=()=>{$("#playerModal").classList.add("hidden");window.currentHls?.destroy();$("#video").pause()};
$("#search").oninput=apply; $("#quality").onchange=apply;
$("#clear").onclick=()=>{state.country="all";state.category="all";state.mode="all";$("#search").value="";$("#quality").value="all";apply()};
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.country="all";state.category="all";state.mode=b.dataset.filter;apply()});
loadData();