/* Washy Moshy - front-end demo (tanpa backend). Data disimpan di LocalStorage. */
const I={drop:'<path d="M12 2s7 7 7 12a7 7 0 01-14 0c0-5 7-12 7-12z"/>',home:'<path d="M3 12l9-9 9 9M5 10v10h14V10"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',users:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8"/>',tag:'<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1"/>',card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',cog:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',out:'<path d="M9 21H5V3h4M16 17l5-5-5-5M21 12H9"/>',plus:'<path d="M12 5v14M5 12h14"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',bell:'<path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>',menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',next:'<path d="M5 12h14M13 6l6 6-6 6"/>'};
/* Akun demo & hak akses (simulasi front-end). deny = menu yang tidak boleh dibuka. */
const ACC={
  owner:{u:['owner','owner@washymoshy.id'],p:'owner123',name:'Owner',role:'Pemilik (Owner)',ini:'OW',deny:[]},
  admin:{u:['admin','admin@washymoshy.id'],p:'admin123',name:'Admin',role:'Petugas Laundry',ini:'AD',deny:['reports']}
};
const ME=()=>ACC[localStorage.wm_auth]||null;
const can=p=>{const m=ME();return !!m&&!m.deny.includes(p)};
const $=s=>document.querySelector(s),ic=n=>`<svg class="ic" viewBox="0 0 24 24">${I[n]}</svg>`;
const rp=n=>'Rp'+Number(n).toLocaleString('id-ID'),today=()=>new Date().toISOString().slice(0,10),fmt=d=>d?d.slice(8)+'/'+d.slice(5,7)+'/'+d.slice(0,4):'-';
const esc=s=>String(s??'').replace(/"/g,'&quot;'),ST=['Diterima','Dicuci','Selesai','Diambil'];

function seed(){
  const svc=[{id:'s1',name:'Cuci Kering',price:6000,days:2,desc:'Cuci bersih dan dikeringkan.',on:1},{id:'s2',name:'Cuci Setrika',price:8000,days:3,desc:'Cuci, kering, dan disetrika rapi.',on:1},{id:'s3',name:'Setrika Saja',price:5000,days:2,desc:'Khusus setrika pakaian bersih.',on:1},{id:'s4',name:'Cuci Selimut, Seprei, dan Bedcover',price:15000,days:1,desc:'Bersih, wangi dan bebas tungau.',on:1},{id:'s4',name:'Cuci Kering Lipat',price:7000,days:2,desc:'Cuci Kering Ekstra Lipat',on:1}];
  const cust=[['c1','Rina Wulandari','0812-3456-7801','Batam Center'],['c2','Budi Santoso','0821-9876-5432','Mukakuning'],['c3','Siti Aminah','0857-1234-5678','Sei Panas'],['c4','Dedi Kurniawan','0813-7711-8888','Tiban'],['c5','Maya Putri','0877-2211-3344','Nagoya'],['c6','Andi Pratama','0896-5543-2100','Bengkong'],['c7','Abyaqsa Ramadan','0811-2233-4567','Batam Center'],['c8','Ashila Fayyaza','0812-5433-9876','Nongsa'],['c9','Faizzah Jamal','0817-0817-0817','Piayu'],['c10','Jenal Rahmadani','0823-0922-0906','Batam Center']].map(([id,name,phone,addr])=>({id,name,phone,addr}));
  const raw=[['c1','2026-10-14','s2',4,'Diambil',1],['c2','2026-10-15','s1',3,'Diambil',1],['c3','2026-10-16','s4',2.5,'Diambil',1],['c4','2026-10-17','s2',5,'Selesai',0],['c5','2026-10-18','s1',6,'Selesai',1],['c6','2026-10-18','s3',3,'Dicuci',0],['c1','2026-10-19','s2',3.5,'Dicuci',0],['c2','2026-10-19','s4',2,'Dicuci',1],['c3','2026-10-20','s1',4,'Diterima',0],['c5','2026-10-20','s2',7,'Diterima',0]];
  const ord=raw.map(([cu,date,s,kg,status,paid],i)=>{const price=svc.find(x=>x.id==s).price;return{id:'o'+i,code:'LD-'+String(i+1).padStart(3,'0'),cust:cu,date,svc:s,kg,price,total:kg*price,status,paid,pdate:paid?date:'',note:''}});
  return{svc,cust,ord,cfg:{name:'Washy Moshy Laundry',phone:'0812-0000-1234',addr:'Batam Center, Batam'}};
}
let DB=JSON.parse(localStorage.wm_data||'null')||seed();
const save=()=>localStorage.wm_data=JSON.stringify(DB);
const cn=id=>(DB.cust.find(c=>c.id==id)||{}).name||'-',sv=id=>(DB.svc.find(s=>s.id==id)||{}).name||'-';
const badge=s=>`<span class="b ${s}">${s}</span>`,pay=o=>badge(o.paid?'Lunas':'Belum');
const refDate=()=>DB.ord.map(o=>o.date).sort().pop()||today();
const ago=n=>new Date(new Date(refDate())-n*864e5).toISOString().slice(0,10);
const sorted=l=>[...l].sort((a,b)=>b.date.localeCompare(a.date)||b.code.localeCompare(a.code));
const empty=(t='Data tidak ditemukan',s='Coba ubah kata kunci atau filter.')=>`<div class="empty">${ic('search')}<b>${t}</b><span>${s}</span></div>`;
const tbl=(h,rows)=>rows.length?`<div class="tw"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:empty();
const sum=l=>l.reduce((a,o)=>a+o.total,0);

/* ---------- UI helper: toast & modal ---------- */
function toast(m,t){const e=document.createElement('div');e.className='t '+(t||'');e.textContent=m;$('#ts').append(e);setTimeout(()=>e.remove(),2800)}
function closeM(){$('#md').classList.remove('on')}
function modal(title,body,ok,label='Simpan'){
  $('#md').innerHTML=`<div class="box"><div class="mh"><h3>${title}</h3><button class="x" type="button" onclick="closeM()">&times;</button></div><form id="fm" novalidate>${body}<div class="mf"><button type="button" class="btn" onclick="closeM()">Batal</button>${ok?`<button class="btn ${label=='Hapus'?'dg':'pri'}">${label}</button>`:''}</div></form></div>`;
  $('#md').classList.add('on');
  $('#md').onclick=e=>{if(e.target.id=='md')closeM()};
  $('#fm').onsubmit=e=>{e.preventDefault();if(!ok)return closeM();const f=$('#fm');let bad=0;
    f.querySelectorAll('[required]').forEach(i=>{const x=!i.value.trim();i.classList.toggle('err',x);if(x)bad=1});
    if(bad)return toast('Lengkapi field yang wajib diisi','err');
    if(ok(Object.fromEntries(new FormData(f)))!==false)closeM()};
}
const ask=(msg,fn)=>modal('Konfirmasi Hapus',`<p style="margin-bottom:14px">${msg}</p>`,()=>{fn()},'Hapus');
const fld=(k,l,t,v='',o,x='')=>`<label>${l}${t=='select'?`<select name="${k}" ${x}>${o.map(([a,b])=>`<option value="${a}" ${a==v?'selected':''}>${b}</option>`).join('')}</select>`:t=='area'?`<textarea name="${k}" rows="2">${v}</textarea>`:`<input name="${k}" type="${t}" value="${esc(v)}" ${x}>`}</label>`;
const dl=r=>`<dl>${r.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>`;

/* ---------- Pelanggan ---------- */
let CQ='';
function custForm(id){const c=DB.cust.find(x=>x.id==id)||{};
  modal(id?'Edit Pelanggan':'Tambah Pelanggan',`<div class="g2">${fld('name','Nama','text',c.name,0,'required')}${fld('phone','No. Telepon','tel',c.phone,0,'required')}</div>${fld('addr','Alamat','area',c.addr)}`,d=>{
    if(!/^[0-9+\- ]{8,16}$/.test(d.phone)){toast('Format nomor telepon tidak valid','err');return false}
    id?Object.assign(c,d):DB.cust.push({id:'c'+Date.now(),...d});save();toast('Data pelanggan disimpan');render()})}
function custView(id){const c=DB.cust.find(x=>x.id==id),n=DB.ord.filter(o=>o.cust==id);modal('Detail Pelanggan',dl([['Nama',c.name],['Telepon',c.phone],['Alamat',c.addr||'-'],['Jumlah order',n.length],['Total belanja',rp(sum(n))]]))}
function custDel(id){if(DB.ord.some(o=>o.cust==id))return toast('Pelanggan masih dipakai pada order, tidak dapat dihapus','err');
  ask('Hapus pelanggan ini?',()=>{DB.cust=DB.cust.filter(c=>c.id!=id);save();toast('Pelanggan dihapus');render()})}
function drawC(){const q=CQ.toLowerCase(),l=DB.cust.filter(c=>(c.name+c.phone).toLowerCase().includes(q));
  $('#tb').innerHTML=tbl(['Nama','Telepon','Alamat','Order','Aksi'],l.map(c=>[`<b>${c.name}</b>`,c.phone,c.addr||'-',DB.ord.filter(o=>o.cust==c.id).length,`<div class="ac"><button onclick="custView('${c.id}')">${ic('eye')}</button><button onclick="custForm('${c.id}')">${ic('edit')}</button><button class="dl" onclick="custDel('${c.id}')">${ic('trash')}</button></div>`]))}

/* ---------- Layanan ---------- */
function svcForm(id){const s=DB.svc.find(x=>x.id==id)||{on:1};
  modal(id?'Edit Layanan':'Tambah Layanan',`${fld('name','Nama layanan','text',s.name,0,'required')}<div class="g2">${fld('price','Harga per kg (Rp)','number',s.price,0,'required min=1')}${fld('days','Estimasi (hari)','number',s.days,0,'required min=1')}</div>${fld('desc','Deskripsi','area',s.desc)}${fld('on','Status','select',s.on,[[1,'Aktif'],[0,'Nonaktif']])}`,d=>{
    if(!(+d.price>0)||!(+d.days>0)){toast('Harga dan estimasi harus lebih dari 0','err');return false}
    d.price=+d.price;d.days=+d.days;d.on=+d.on;id?Object.assign(s,d):DB.svc.push({id:'s'+Date.now(),...d});save();toast('Layanan disimpan');render()})}
function svcDel(id){if(DB.ord.some(o=>o.svc==id))return toast('Layanan dipakai order. Ubah status menjadi Nonaktif saja','err');
  ask('Hapus layanan ini?',()=>{DB.svc=DB.svc.filter(s=>s.id!=id);save();toast('Layanan dihapus');render()})}

/* ---------- Order ---------- */
let F={q:'',st:'',from:'',to:''};
const nextCode=()=>'LD-'+String(Math.max(0,...DB.ord.map(o=>+o.code.slice(3)))+1).padStart(3,'0');
function ordForm(id){
  const o=DB.ord.find(x=>x.id==id)||{code:nextCode(),date:today(),svc:(DB.svc.find(s=>s.on)||{}).id,status:'Diterima',kg:'',cust:(DB.cust[0]||{}).id};
  if(!DB.cust.length)return toast('Tambah pelanggan terlebih dahulu','err');
  const sl=DB.svc.filter(s=>s.on||s.id==o.svc).map(s=>[s.id,`${s.name} - ${rp(s.price)}/kg`]);
  const price=o.price||(DB.svc.find(s=>s.id==o.svc)||{}).price||0;
  modal(id?'Edit Order':'Tambah Order',`<div class="g2">${fld('code','Kode order','text',o.code,0,'readonly')}${fld('date','Tanggal masuk','date',o.date,0,'required')}</div>${fld('cust','Pelanggan','select',o.cust,DB.cust.map(c=>[c.id,c.name]))}${fld('svc','Jenis layanan','select',o.svc,sl)}<div class="g2">${fld('kg','Berat (kg)','number',o.kg,0,'required step=0.1 min=0.1')}${fld('price','Harga per kg','number',price,0,'readonly')}</div>${fld('totalv','Total biaya','text',rp((o.kg||0)*price),0,'readonly')}${fld('status','Status order','select',o.status,ST.map(s=>[s,s]))}${fld('note','Catatan (opsional)','area',o.note||'')}`,d=>{
    d.kg=+d.kg;if(!(d.kg>0)){toast('Berat harus lebih dari 0 kg','err');return false}
    d.price=+d.price;d.total=d.kg*d.price;delete d.totalv;
    if(id)Object.assign(o,d);else DB.ord.push({id:'o'+Date.now(),paid:0,pdate:'',...d});
    save();toast(id?'Order diperbarui':'Order berhasil ditambahkan');render()});
  const f=$('#fm');f.oninput=()=>{const s=DB.svc.find(x=>x.id==f.svc.value);if(s&&document.activeElement==f.svc)f.price.value=s.price;f.totalv.value=rp((f.kg.value||0)*f.price.value)};
}
function ordView(id){const o=DB.ord.find(x=>x.id==id);modal('Detail Order '+o.code,dl([['Pelanggan',cn(o.cust)],['Tanggal masuk',fmt(o.date)],['Layanan',sv(o.svc)],['Berat',o.kg+' kg'],['Harga per kg',rp(o.price)],['Total biaya',`<b>${rp(o.total)}</b>`],['Status',badge(o.status)],['Pembayaran',pay(o)],['Catatan',o.note||'-']]))}
function ordDel(id){ask('Hapus order ini? Tindakan tidak dapat dibatalkan.',()=>{DB.ord=DB.ord.filter(o=>o.id!=id);save();toast('Order dihapus');render()})}
function adv(id){const o=DB.ord.find(x=>x.id==id);o.status=ST[ST.indexOf(o.status)+1];save();toast(`${o.code} kini berstatus ${o.status}`);render()}
const oact=o=>`<div class="ac">${o.status!='Diambil'?`<button title="Lanjutkan status" onclick="adv('${o.id}')">Status Selanjutnya</button>`:''}<button onclick="ordView('${o.id}')">${ic('eye')}</button><button onclick="ordForm('${o.id}')">${ic('edit')}</button><button class="dl" onclick="ordDel('${o.id}')">${ic('trash')}</button></div>`;
function drawO(){const q=F.q.toLowerCase();
  const l=sorted(DB.ord).filter(o=>(o.code+cn(o.cust)).toLowerCase().includes(q)&&(!F.st||o.status==F.st)&&(!F.from||o.date>=F.from)&&(!F.to||o.date<=F.to));
  $('#tb').innerHTML=tbl(['Kode','Pelanggan','Tanggal','Layanan','Berat','Total','Status','Aksi'],l.map(o=>[`<b>${o.code}</b>`,cn(o.cust),fmt(o.date),sv(o.svc),o.kg+' kg',rp(o.total),badge(o.status),oact(o)]))}

/* ---------- Pembayaran ---------- */
let PF='';
function togglePay(id){const o=DB.ord.find(x=>x.id==id);o.paid=o.paid?0:1;o.pdate=o.paid?today():'';save();toast(o.paid?`${o.code} ditandai lunas`:`${o.code} ditandai belum lunas`);render()}
function drawP(){const l=sorted(DB.ord).filter(o=>!PF||(PF=='1')==!!o.paid);
  $('#tb').innerHTML=tbl(['Kode','Pelanggan','Total','Pembayaran','Tgl bayar','Aksi'],l.map(o=>[`<b>${o.code}</b>`,cn(o.cust),rp(o.total),pay(o),fmt(o.pdate),`<button class=\"btn ${o.paid ? 'btn-belum' : 'btn-lunas'}\" onclick=\"togglePay('${o.id}')\">${o.paid?'Tandai belum lunas':'Tandai lunas'}</button>`]))}

/* ---------- Laporan ---------- */
let R={from:'2026-10-01',to:'2026-10-31',st:''};
const rlist=()=>sorted(DB.ord).filter(o=>(!R.from||o.date>=R.from)&&(!R.to||o.date<=R.to)&&(!R.st||o.status==R.st));
const bars=l=>{const m={};l.forEach(o=>m[o.date]=(m[o.date]||0)+o.total);const k=Object.keys(m).sort().slice(-10),mx=Math.max(1,...k.map(x=>m[x]));
  return k.length?`<div class="chart">${k.map(x=>`<div class="col" title="${rp(m[x])}"><em>${Math.round(m[x]/1000)}rb</em><i style="height:${m[x]/mx*80}%"></i><small>${x.slice(8)}/${x.slice(5,7)}</small></div>`).join('')}</div>`:empty('Belum ada data')};
function drawR(){const l=rlist();
  $('#rb').innerHTML=`<div class="cards"><div class="card sc"><small>Total order</small><b>${l.length}</b></div><div class="card sc"><small>Total pendapatan</small><b>${rp(sum(l))}</b></div><div class="card sc"><small>Total berat</small><b>${l.reduce((a,o)=>a+o.kg,0)} kg</b></div><div class="card sc"><small>Rata-rata per order</small><b>${rp(l.length?Math.round(sum(l)/l.length):0)}</b></div></div><div class="card" style="margin-bottom:16px"><h3>Pendapatan harian</h3>${bars(l)}</div><div class="card"><h3>Rekap order</h3>${tbl(['Kode','Pelanggan','Tanggal','Layanan','Berat','Total','Status'],l.map(o=>[o.code,cn(o.cust),fmt(o.date),sv(o.svc),o.kg+' kg',rp(o.total),badge(o.status)]))}</div>`}
function csv(){const rows=[['Kode','Pelanggan','Tanggal','Layanan','Berat (kg)','Total','Status'],...rlist().map(o=>[o.code,cn(o.cust),o.date,sv(o.svc),o.kg,o.total,o.status])];
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([rows.map(r=>r.map(x=>`"${x}"`).join(',')).join('\n')],{type:'text/csv'}));a.download='laporan-washy-moshy.csv';a.click();toast('CSV diunduh')}

/* ---------- Halaman ---------- */
let DP=0;
const head=(t,p,btns='')=>`<div class="ph"><div><h1>${t}</h1><p>${p}</p></div><div class="row">${btns}</div></div>`;
const addB=(t,f)=>`<button class="btn pri" onclick="${f}">${ic('plus')}${t}</button>`;
const PG={
dashboard:['Dashboard',()=>{const L=DB.ord,c=s=>L.filter(o=>o.status==s).length,per=DP?L.filter(o=>o.date>ago(DP)):L;
  return head('Dashboard','Kondisi operasional laundry hari ini.',`<button class="btn" onclick="custForm()">${ic('users')}Tambah Pelanggan</button>${addB('Tambah Order','ordForm()')}`)+
  `<div class="cards"><div class="card sc"><small>Total order</small><b>${L.length}</b></div><div class="card sc"><small>Diterima</small><b>${c('Diterima')}</b></div><div class="card sc"><small>Sedang dicuci</small><b>${c('Dicuci')}</b></div><div class="card sc"><small>Selesai</small><b>${c('Selesai')}</b></div><div class="card sc"><small>Pendapatan</small><b>${rp(sum(per))}</b><select onchange="DP=+this.value;render()"><option value="0">Semua periode</option><option value="7" ${DP==7?'selected':''}>7 hari terakhir</option><option value="3" ${DP==3?'selected':''}>3 hari terakhir</option></select></div></div>
  <div class="g"><div class="card"><h3>Pendapatan harian</h3>${bars(L)}</div><div class="card"><h3>Order per status</h3>${ST.map(s=>`<div class="pr"><div><span style="display:inline">${s}</span><b>${c(s)}</b></div><span><i style="width:${L.length?c(s)/L.length*100:0}%"></i></span></div>`).join('')}</div></div>
  <div class="card"><div class="ph" style="margin:0 0 8px"><h3 style="margin:0">Order terbaru</h3><button class="btn" onclick="nav('orders')">Lihat semua</button></div>${tbl(['Kode','Pelanggan','Layanan','Total','Status'],sorted(L).slice(0,5).map(o=>[`<b>${o.code}</b>`,cn(o.cust),sv(o.svc),rp(o.total),badge(o.status)]))}</div>`}],
orders:['Order Laundry',()=>head('Order Laundry','Kelola semua order cucian kiloan.',addB('Tambah Order','ordForm()'))+`<div class="card"><div class="bar"><div class="sr"><span>${ic('search')}</span><input id="fq" placeholder="Cari kode atau nama pelanggan" value="${esc(F.q)}"></div><select id="fs"><option value="">Semua status</option>${ST.map(s=>`<option ${F.st==s?'selected':''}>${s}</option>`).join('')}</select><input type="date" id="ff" value="${F.from}" title="Dari tanggal"><input type="date" id="ft" value="${F.to}" title="Sampai tanggal"><button class="btn" onclick="F={q:'',st:'',from:'',to:''};render()">Reset</button></div><div id="tb"></div></div>`],
customers:['Pelanggan',()=>head('Pelanggan',`${DB.cust.length} pelanggan terdaftar.`,addB('Tambah Pelanggan','custForm()'))+`<div class="card"><div class="bar"><div class="sr"><span>${ic('search')}</span><input id="fcq" placeholder="Cari nama atau nomor telepon" value="${esc(CQ)}"></div></div><div id="tb"></div></div>`],
services:['Layanan',()=>head('Layanan','Jenis layanan, harga per kg, dan estimasi pengerjaan (data contoh).',addB('Tambah Layanan','svcForm()'))+`<div class="sg">${DB.svc.map(s=>`<div class="card"><div class="ft" style="margin:0"><h3>${s.name}</h3><span class="b ${s.on?'Lunas':'Diambil'}">${s.on?'Aktif':'Nonaktif'}</span></div><p>${s.desc||''}</p><div class="pz">${rp(s.price)}<small class="mu" style="font-size:12px;font-weight:500"> /kg</small></div><div class="ft"><span class="mu">Estimasi ${s.days} hari</span><div class="ac"><button onclick="svcForm('${s.id}')">${ic('edit')}</button><button class="dl" onclick="svcDel('${s.id}')">${ic('trash')}</button></div></div></div>`).join('')}</div>`],
payments:['Pembayaran',()=>{const p=DB.ord.filter(o=>o.paid);return head('Pembayaran',`Lunas ${p.length} order (${rp(sum(p))}) &middot; Belum lunas ${DB.ord.length-p.length} order (${rp(sum(DB.ord)-sum(p))}). Status pembayaran terpisah dari status pengerjaan.`)+`<div class="card"><div class="bar"><select id="pf"><option value="">Semua</option><option value="1" ${PF=='1'?'selected':''}>Lunas</option><option value="0" ${PF=='0'?'selected':''}>Belum lunas</option></select></div><div id="tb"></div></div>`}],
reports:['Laporan',()=>head('Laporan','Rekap order dan pendapatan dari data aplikasi.',`<button class="btn" onclick="print()">Cetak</button><button class="btn pri" onclick="csv()">Ekspor CSV</button>`)+`<div class="card no-print" style="margin-bottom:16px"><div class="bar" style="margin:0"><label style="margin:0">Dari<input type="date" id="rf" value="${R.from}"></label><label style="margin:0">Sampai<input type="date" id="rt" value="${R.to}"></label><label style="margin:0">Status<select id="rs"><option value="">Semua status</option>${ST.map(s=>`<option ${R.st==s?'selected':''}>${s}</option>`).join('')}</select></label></div></div><div id="rb"></div>`],
settings:['Pengaturan',()=>head('Pengaturan','Informasi usaha dan profil pengguna demo.')+`<div class="g"><form class="card" id="cf">${fld('name','Nama laundry','text',DB.cfg.name,0,'required')}${fld('phone','Kontak (telepon)','tel',DB.cfg.phone)}${fld('addr','Alamat','area',DB.cfg.addr)}<button class="btn pri">Simpan Pengaturan</button></form><div class="card"><h3>Profil demo</h3>${dl([['Nama',ME().name],['Peran',ME().role],['Email',ME().u[1]]])}<hr style="border:0;border-top:1px solid var(--bd);margin:16px 0"><p class="mu" style="margin-bottom:10px">Kembalikan seluruh data ke kondisi awal demo.</p><button class="btn dg" onclick="ask('Reset semua data demo ke kondisi awal?',()=>{DB=seed();save();toast('Data demo direset');render()})">Reset Data Demo</button></div></div>`]
};
const AFTER={
orders:()=>{[['fq','q'],['fs','st'],['ff','from'],['ft','to']].forEach(([i,k])=>$('#'+i).oninput=e=>{F[k]=e.target.value;drawO()});drawO()},
customers:()=>{$('#fcq').oninput=e=>{CQ=e.target.value;drawC()};drawC()},
payments:()=>{$('#pf').onchange=e=>{PF=e.target.value;drawP()};drawP()},
reports:()=>{[['rf','from'],['rt','to'],['rs','st']].forEach(([i,k])=>$('#'+i).oninput=e=>{R[k]=e.target.value;drawR()});drawR()},
settings:()=>{$('#cf').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(!d.name.trim())return toast('Nama laundry wajib diisi','err');DB.cfg=d;save();toast('Pengaturan disimpan');render()}}
};

/* ---------- Shell, routing, login ---------- */
let PAGE='dashboard';
const MENU=[['dashboard','home'],['orders','list'],['customers','users'],['services','tag'],['payments','card'],['reports','chart'],['settings','cog']];
const nav=p=>location.hash='#app/'+p;
function logout(){localStorage.removeItem('wm_auth');location.hash='#login'}
function notif(){const r=DB.ord.filter(o=>o.status=='Selesai').length,u=DB.ord.filter(o=>!o.paid).length;return`<div><b>${r}</b> order selesai, siap diambil</div><div><b>${u}</b> order belum lunas</div><div class="mu">${DB.cfg.name}</div>`}
function render(){const[t,fn]=PG[PAGE];
  $('#sb').innerHTML=`<a class="brand" href="#"><img src="logo_washy_moshy.png" alt="Washy Moshy" class="sidebar-logo"><span>Washy Moshy</span></a>`+MENU.filter(([k])=>can(k)).map(([k,i])=>`<button class="mi ${k==PAGE?'on':''}" onclick="nav('${k}')">${ic(i)}${PG[k][0]}</button>`).join('')+`<button class="mi out" onclick="logout()">${ic('out')}Logout</button>`;
  $('.me').innerHTML=`<span class="av">${ME().ini}</span><div><b>${ME().name}</b><small>${ME().role}</small></div>`;$('#pg').innerHTML=fn();$('#tt').textContent=t;$('#bc').textContent='Washy Moshy / '+t;$('#nt').innerHTML=notif();
  document.body.classList.remove('open');if(AFTER[PAGE])AFTER[PAGE]()}
function route(){let h=location.hash.slice(1);if(h.startsWith('app')&&!ME()){localStorage.removeItem('wm_auth');h='login'}
  if(h.startsWith('app/')&&!can(h.split('/')[1])){toast('Akses ditolak: menu ini tidak tersedia untuk peran Anda','err');h='app/dashboard';history.replaceState(null,'','#app/dashboard')}
  const app=h.startsWith('app');$('#landing').hidden=!(!h||h=='fitur'||h=='alur');$('#login').hidden=h!='login';$('#app').hidden=!app;
  if(app){PAGE=h.split('/')[1];if(!PG[PAGE])PAGE='dashboard';render()}else window.scrollTo(0,0);closeM()}
addEventListener('hashchange',route);

document.querySelectorAll('[data-i]').forEach(e=>e.innerHTML=ic(e.dataset.i));
$('#bur').innerHTML=ic('menu');$('#bur').onclick=()=>document.body.classList.toggle('open');$('#ov').onclick=()=>document.body.classList.remove('open');
$('#bell').onclick=()=>$('#nt').hidden=!$('#nt').hidden;
$('#gs').onkeydown=e=>{if(e.key=='Enter'){F={q:e.target.value,st:'',from:'',to:''};e.target.value='';nav('orders');if(PAGE=='orders')render()}};
$('#lt').onclick=()=>{const p=$('#lp');p.type=p.type=='password'?'text':'password';$('#lt').textContent=p.type=='password'?'Lihat':'Sembunyi'};
$('#lform').onsubmit=e=>{e.preventDefault();const u=$('#lu').value.trim(),p=$('#lp').value,er=$('#le'),b=$('#lb');er.textContent='';
  if(!u||!p){er.textContent='Username/email dan password wajib diisi.';return}
  b.classList.add('load');b.textContent='Memproses...';
  setTimeout(()=>{b.classList.remove('load');b.textContent='Masuk';
    const k=Object.keys(ACC).find(x=>ACC[x].p==p&&ACC[x].u.includes(u.toLowerCase()));
    if(k){localStorage.wm_auth=k;toast('Berhasil masuk sebagai '+ACC[k].role);location.hash='#app/dashboard'}else er.textContent='Username atau password salah.'},700)};
route();
