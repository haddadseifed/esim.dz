// Minimal interactivity: demo checkout + QR/PDF + email preview
let currentPlan = { name: '', details: '', price: 0 };

function openCheckout(name, details, price){
  currentPlan = { name, details, price };
  document.getElementById('co-plan').value = name;
  document.getElementById('co-details').value = details;
  document.getElementById('co-total').textContent = `$${price}`;
  document.getElementById('success').hidden = true;
  document.getElementById('checkout').setAttribute('aria-hidden','false');
}
function closeCheckout(){
  document.getElementById('checkout').setAttribute('aria-hidden','true');
}
function submitCheckout(e){
  e.preventDefault();
  const name = document.getElementById('co-name').value.trim();
  const email = document.getElementById('co-email').value.trim();
  if(!name || !email){ return false; }
  const orderId = `ESIMDZ-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  document.getElementById('order-id').textContent = `Order ID: ${orderId}`;
  document.getElementById('success').hidden = false;
  return false;
}
// Simple PDF via data URL (text-only placeholder)
function downloadPDF(){
  const text = [
    'eSIM DZ — Order Profile (Demo)',
    document.getElementById('order-id').textContent,
    `Plan: ${currentPlan.name}`,
    `Details: ${currentPlan.details}`,
    `Total: $${currentPlan.price}`,
    '',
    'This is a demo PDF generated on the client side.',
  ].join('\n');
  const blob = new Blob([text], {type: 'application/pdf'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'eSIMDZ-Order.pdf'; a.click();
  URL.revokeObjectURL(url);
}

function copyEmail(){
  const subject = `Your eSIM DZ Order`;
  const body = `Hello,\n\nThank you for your purchase!\n\nPlan: ${currentPlan.name}\nDetails: ${currentPlan.details}\nTotal: $${currentPlan.price}\n\nNext steps: You'll receive your official QR code by email in production.\n\nSupport: info@esimdz.dpdns.org`;
  navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
  alert('Email preview copied to clipboard.');
}

window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.submitCheckout = submitCheckout;
window.downloadPDF = downloadPDF;
window.copyEmail = copyEmail;
