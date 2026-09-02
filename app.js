const WA='2347071887840';
let cart=JSON.parse(localStorage.getItem('nt_cart')||'[]');
const $=id=>document.getElementById(id);
function save(){localStorage.setItem('nt_cart',JSON.stringify(cart));renderCart();}
function toggleMenu(){ $('menu').classList.toggle('open'); } function closeMenu(){ $('menu').classList.remove('open'); }
function filterProducts(cat,btn){document.querySelectorAll('.cat').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.product-card').forEach(c=>c.style.display=cat==='all'||c.dataset.cat===cat?'':'none');$('noResults').hidden=[...document.querySelectorAll('.product-card')].every(c=>c.style.display==='none');}
function searchProducts(){let q=$('search').value.toLowerCase();let visible=0;document.querySelectorAll('.product-card').forEach(c=>{let ok=(c.dataset.name+' '+c.dataset.desc+' '+c.dataset.spec).toLowerCase().includes(q);c.style.display=ok?'':'none';if(ok)visible++});$('noResults').hidden=visible>0;}
function addToCart(name){let item=cart.find(x=>x.name===name);if(item)item.qty++;else cart.push({name,qty:1});save();toast(name+' added to your order');}
function removeFromCart(name){cart=cart.filter(x=>x.name!==name);save();}
function changeQty(name,delta){let item=cart.find(x=>x.name===name);if(!item)return;item.qty=Math.max(1,item.qty+delta);save();}
function renderCart(){let count=cart.reduce((a,x)=>a+x.qty,0);$('cartCount').textContent=count;let box=$('cartItems');if(!cart.length){box.innerHTML='<div class="empty">Your order basket is empty.<br><a href="#products" onclick="closeCart()">Browse products</a></div>';return}box.innerHTML=cart.map(x=>`<div class="cart-row"><div><b>${x.name}</b><small>Quantity: ${x.qty}</small></div><div class="qty"><button onclick="changeQty('${x.name.replace(/'/g,"\\'")}',-1)">−</button><b>${x.qty}</b><button onclick="changeQty('${x.name.replace(/'/g,"\\'")}',1)">+</button><button class="remove" onclick="removeFromCart('${x.name.replace(/'/g,"\\'")}')">Remove</button></div></div>`).join('');}
function openCart(){renderCart();$('cart').hidden=false;$('cart').classList.add('show')}function closeCart(){$('cart').classList.remove('show');setTimeout(()=>{$('cart').hidden=true},180)}
function checkoutCart(){if(!cart.length)return;let lines=cart.map(x=>`- ${x.name} (Qty: ${x.qty})`).join('\n');let msg=`Hello N Tarpaulin, I would like to request a quote.\n\nMy selected products:\n${lines}\n\nPlease confirm availability and price.`;window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank')}
function quickOrder(name){$('product').value=name;$('order').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('name').focus(),450);}
function viewProduct(btn){let c=btn.closest('.product-card');$('modalContent').innerHTML=`<span class="eyebrow">PRODUCT DETAILS</span><h2>${c.dataset.name}</h2><p>${c.dataset.desc}</p><h3>What you can request</h3><p>${c.dataset.spec}</p><p class="note">Prices depend on size, material specification, colour and quantity. Contact N Tarpaulin for a quote.</p><button class="btn whatsapp full" onclick="closeModal();quickOrder('${c.dataset.name}')">Customize / Request Quote →</button>`;$('modal').hidden=false;}
function closeModal(){$('modal').hidden=true}
function sendOrder(e){e.preventDefault();let fields=['product','name','phone','length','width','gsm','colour','quantity','details'];let v=Object.fromEntries(fields.map(id=>[id,$(id).value.trim()]));let msg=`Hello N Tarpaulin, I want to place an order/request a quote.\n\nProduct: ${v.product}\nName: ${v.name}\nPhone: ${v.phone}\nLength: ${v.length||'Not specified'}\nWidth: ${v.width||'Not specified'}\nThickness/GSM: ${v.gsm||'Not specified'}\nColour: ${v.colour||'Not specified'}\nQuantity: ${v.quantity||'Not specified'}\nExtra details: ${v.details||'None'}`;localStorage.setItem('nt_last_order',JSON.stringify({...v,created:new Date().toISOString()}));window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank');toast('Opening WhatsApp…');}
function toast(t){let x=document.createElement('div');x.className='toast';x.textContent=t;document.body.appendChild(x);setTimeout(()=>x.remove(),2200)}
function shareApp(){if(navigator.share){navigator.share({title:'N Tarpaulin',text:'Quality PVC Tarpaulin from N Tarpaulin, Aba.'}).catch(()=>{});}else{navigator.clipboard?.writeText(location.href);toast('App link copied');}}
function installApp(){if(window.deferredPrompt){window.deferredPrompt.prompt();window.deferredPrompt.userChoice.finally(()=>{window.deferredPrompt=null;$('installBtn').hidden=true});}else toast('Open this app in Chrome and use the browser menu to install it.');}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();window.deferredPrompt=e;$('installBtn').hidden=false;});
window.addEventListener('appinstalled',()=>{$('installBtn').hidden=true;toast('N Tarpaulin installed');});
window.addEventListener('online',()=>{$('status').textContent='Online';$('status').className='status online';});
window.addEventListener('offline',()=>{$('status').textContent='Offline mode';$('status').className='status offline';});
$('year').textContent=new Date().getFullYear();renderCart();$('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});

window.addEventListener('load',()=>{if($('modal'))$('modal').hidden=true;if($('cart'))$('cart').hidden=true;});
window.addEventListener('pageshow',()=>{if($('modal'))$('modal').hidden=true;if($('cart'))$('cart').hidden=true;});
