const WA='2347071887840';
let cart=JSON.parse(localStorage.getItem('nt_cart')||'[]');
const $=id=>document.getElementById(id);
const products={
 'PVC Tarpaulin':{cat:'tarpaulin',desc:'Heavy-duty waterproof PVC sheet for protection, covers and custom projects.',specs:['Custom size','Multiple GSM','Many colours'],intro:'Quality PVC tarpaulin supplied for homes, farms, businesses, trucks and other protection needs.',images:['images/products/pvc-tarpaulin/1.jpg','images/products/pvc-tarpaulin/2.jpg','images/products/pvc-tarpaulin/3.jpg','images/products/pvc-tarpaulin/4.jpg']},
 'Trailer Cover':{cat:'trailer',desc:'Strong custom covers designed to protect trucks, trailers and cargo.',specs:['Custom fit','Water resistant','Reinforced'],intro:'Made to your trailer dimensions with practical protection for cargo during transport.',images:[]},
 'Fishpond Liner':{cat:'fishpond',desc:'PVC liners made to your pond dimensions for practical fish farming projects.',specs:['Exact dimensions','Waterproof','Durable PVC'],intro:'Custom pond liners designed around your pond measurements for fish farming projects.',images:[]},
 'Canopy':{cat:'canopy',desc:'Practical shade and event canopies for homes, businesses and outdoor events.',specs:['Various sizes','Strong cover','Custom colour'],intro:'Canopies for shade, ceremonies, shops, events and outdoor activities.',images:[]},
 'Tent':{cat:'canopy',desc:'Quality tents for ceremonies, outdoor gatherings and temporary spaces.',specs:['Multiple sizes','Neat finish','Custom options'],intro:'Tents for ceremonies, gatherings and temporary spaces, with custom options available.',images:[]},
 'Custom Tarpaulin':{cat:'tarpaulin',desc:'Give us your length, width, colour and thickness/GSM and we\'ll discuss your requirements.',specs:['Any size','Custom GSM','Custom colour'],intro:'Tell us exactly what you need and we will discuss the right material, size and finish for your project.',images:[]}
};
function save(){localStorage.setItem('nt_cart',JSON.stringify(cart));renderCart()}
function toggleMenu(){$('menu').classList.toggle('open')}function closeMenu(){$('menu').classList.remove('open')}
function filterProducts(cat,btn){document.querySelectorAll('.cat').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.product-card').forEach(c=>c.style.display=cat==='all'||c.dataset.cat===cat?'':'none');$('noResults').hidden=[...document.querySelectorAll('.product-card')].every(c=>c.style.display==='none')}
function searchProducts(){let q=$('search').value.toLowerCase();let visible=0;document.querySelectorAll('.product-card').forEach(c=>{let ok=(c.dataset.name+' '+c.dataset.desc+' '+c.dataset.spec).toLowerCase().includes(q);c.style.display=ok?'':'none';if(ok)visible++});$('noResults').hidden=visible>0}
function addToCart(name){let item=cart.find(x=>x.name===name);if(item)item.qty++;else cart.push({name,qty:1});save();toast(name+' added to your order')}
function removeFromCart(name){cart=cart.filter(x=>x.name!==name);save()}function changeQty(name,delta){let item=cart.find(x=>x.name===name);if(!item)return;item.qty=Math.max(1,item.qty+delta);save()}
function renderCart(){let count=cart.reduce((a,x)=>a+x.qty,0);$('cartCount').textContent=count;let box=$('cartItems');if(!cart.length){box.innerHTML='<div class="empty">Your order basket is empty.<br><a href="#products" onclick="closeCart()">Browse products</a></div>';return}box.innerHTML=cart.map(x=>`<div class="cart-row"><div><b>${x.name}</b><small>Quantity: ${x.qty}</small></div><div class="qty"><button onclick="changeQty('${x.name.replace(/'/g,"\\'")}',-1)">−</button><b>${x.qty}</b><button onclick="changeQty('${x.name.replace(/'/g,"\\'")}',1)">+</button><button class="remove" onclick="removeFromCart('${x.name.replace(/'/g,"\\'")}')">Remove</button></div></div>`).join('')}
function openCart(){renderCart();$('cart').hidden=false;$('cart').classList.add('show')}function closeCart(){$('cart').classList.remove('show');setTimeout(()=>{$('cart').hidden=true},180)}
function checkoutCart(){if(!cart.length)return;let lines=cart.map(x=>`- ${x.name} (Qty: ${x.qty})`).join('\n');let msg=`Hello N Tarpaulin, I would like to request a quote.\n\nMy selected products:\n${lines}\n\nPlease confirm availability and price.`;window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank')}
function quickOrder(name){$('product').value=name;$('order').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('name').focus(),450)}
function closeModal(){if($('modal'))$('modal').hidden=true}
function sendOrder(e){e.preventDefault();let fields=['product','name','phone','length','width','gsm','colour','quantity','details'];let v=Object.fromEntries(fields.map(id=>[id,$(id).value.trim()]));let msg=`Hello N Tarpaulin, I want to place an order/request a quote.\n\nProduct: ${v.product}\nName: ${v.name}\nPhone: ${v.phone}\nLength: ${v.length||'Not specified'}\nWidth: ${v.width||'Not specified'}\nThickness/GSM: ${v.gsm||'Not specified'}\nColour: ${v.colour||'Not specified'}\nQuantity: ${v.quantity||'Not specified'}\nExtra details: ${v.details||'None'}`;localStorage.setItem('nt_last_order',JSON.stringify({...v,created:new Date().toISOString()}));window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank');toast('Opening WhatsApp…')}
function toast(t){let x=document.createElement('div');x.className='toast';x.textContent=t;document.body.appendChild(x);setTimeout(()=>x.remove(),2200)}
function shareApp(){if(navigator.share){navigator.share({title:'N Tarpaulin',text:'Quality PVC Tarpaulin from N Tarpaulin, Aba.'}).catch(()=>{});}else{navigator.clipboard?.writeText(location.href);toast('App link copied')}}
function installApp(){if(window.deferredPrompt){window.deferredPrompt.prompt();window.deferredPrompt.userChoice.finally(()=>{window.deferredPrompt=null;$('installBtn').hidden=true})}else toast('Open this app in Chrome and use the browser menu to install it.')}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();window.deferredPrompt=e;$('installBtn').hidden=false});window.addEventListener('appinstalled',()=>{$('installBtn').hidden=true;toast('N Tarpaulin installed')});window.addEventListener('online',()=>{$('status').textContent='Online';$('status').className='status online'});window.addEventListener('offline',()=>{$('status').textContent='Offline mode';$('status').className='status offline'});

function openProductPage(name){
  const data=products[name];
  if(!data)return;
  const page=$('productPage'), grid=$('products'), order=$('order'), contact=$('contact'), content=$('productPageContent');
  const gallery=data.images||[];
  const main=gallery[0]||'';
  const safeName=name.replace(/'/g,"\\'");
  const mainHtml=main?`<img class="real-product-photo" src="${main}" alt="${name}" onclick="viewPhoto(this.src)">`:`<div class="product-photo"><div class="photo-icon">📸</div><strong>PRODUCT PHOTO</strong></div>`;
  const galleryHtml=gallery.length?gallery.map((src,i)=>`<button type="button" class="photo-box has-photo" onclick="setMainPhoto('${src}')"><img src="${src}" alt="${name} photo ${i+1}"><span>Photo ${i+1}</span></button>`).join(''):[1,2,3,4].map(i=>`<div class="photo-box">📷<br>Photo ${i}<br><small>Photo coming soon</small></div>`).join('');
  content.innerHTML=`<div class="product-detail"><div><div id="mainProductPhoto" class="product-photo real-photo-wrap">${mainHtml}</div></div><div class="product-detail-info"><span class="eyebrow">N TARP﻿AULIN • PRODUCT</span><h1>${name}</h1><p>${data.desc}</p><div class="specs">${data.specs.map(x=>`<span>${x}</span>`).join('')}</div><p>${data.intro}</p><p><b>Price:</b> Contact us for a quote based on size, specification and quantity.</p><div class="static-actions"><button class="btn whatsapp" onclick="quickQuote('${safeName}')">Request a Quote →</button><button class="quick-order-btn" onclick="quickOrder('${safeName}')">Add to Order</button></div></div></div><h3 class="gallery-title">Product Photos</h3><div class="photo-grid">${galleryHtml}</div>`;
  grid.hidden=true; order.hidden=true; contact.hidden=true; page.hidden=false;
  page.scrollIntoView({behavior:'smooth',block:'start'});
}
function setMainPhoto(src){
  const box=$('mainProductPhoto');
  if(box) box.innerHTML=`<img class="real-product-photo" src="${src}" alt="Product photo" onclick="viewPhoto(this.src)">`;
}
function viewPhoto(src){
  const w=window.open();
  if(w){w.document.write(`<title>N Tarpaulin Photo</title><style>body{margin:0;background:#000;display:grid;place-items:center;height:100vh}img{max-width:100%;max-height:100%;object-fit:contain}</style><img src="${src}">`);w.document.close();}
}

function goProducts(){
  $('productPage').hidden=true; $('order').hidden=false; $('contact').hidden=false; $('products').hidden=false;
  $('products').scrollIntoView({behavior:'smooth',block:'start'});
}
function quickQuote(name){
  const msg=`Hello N Tarpaulin, I want to request a quote for ${name}. Please send me the price and available options.`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank');
}

$('year').textContent=new Date().getFullYear();renderCart();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
window.addEventListener('load',()=>{if($('modal'))$('modal').hidden=true;if($('cart'))$('cart').hidden=true});window.addEventListener('pageshow',()=>{if($('modal'))$('modal').hidden=true;if($('cart'))$('cart').hidden=true});
