emailjs.init("-AXffSkFuoK856dR_"); // Your real public key

const pricingTable = {
  interior: { basic: 70, standard: 90, premium: 130 },
  exterior: { basic: 60, standard: 80, deluxe: 95, premium: 110 },
  both: { basic: 130, standard: 170, deluxe: 200, premium: 240 }
};

const sizeSurcharge = { small: 0, medium: 15, full: 30 };
const typeSurcharge = { sedan: 0, suv: 0, truck: 20, exotic: 60 };

const form = document.getElementById('quote-form');
const result = document.getElementById('result');

function calculatePrice() {
  const type = document.getElementById('carType').value;
  const size = document.getElementById('carSize').value;
  const area = document.getElementById('serviceArea').value;
  const level = document.getElementById('packageLevel').value;
  const headlights = parseInt(document.getElementById('headlightCount').value);

  const base = pricingTable[area][level] || 0;
  const total = base + sizeSurcharge[size] + typeSurcharge[type] + (headlights * 50);

  result.textContent = `Estimated Price: $${total} `;
  return total;
}

form.addEventListener('input', calculatePrice);

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const finalPrice = calculatePrice();
  const email = document.getElementById('user_email').value;
  const type = document.getElementById('carType').value;
  const size = document.getElementById('carSize').value;
  const area = document.getElementById('serviceArea').value;
  const level = document.getElementById('packageLevel').value;
  const headlights = document.getElementById('headlightCount').value;
  const phone = document.getElementById('user_phone').value;

  const templateParams = {
  user_email: email,
  user_phone: phone, // add this line
  car_type: type,
  car_size: size,
  service_area: area,
  package_level: level,
  headlight_count: headlights,
  final_price: `$${finalPrice}`
};




  emailjs.send("service_f27xa3e", "template_6gtcluf", templateParams)
    .then(function(response) {
      alert("✅ Quote sent to your email!");
    }, function(error) {
      alert("❌ Failed to send email: " + error.text);
    });
});

// Close popup when clicking outside the popup content
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});