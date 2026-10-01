const tripStart = new Date('2026-12-25T18:15:00-06:00');
const planningStart = new Date('2026-09-22T12:00:00-06:00');

const ids = ['days', 'hours', 'minutes', 'seconds'];
const nodes = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const sinceText = document.getElementById('sinceText');
const shareButton = document.getElementById('shareButton');
const kicker = document.getElementById('kicker');
const countdownEl = document.getElementById('countdown');
const departedNote = document.getElementById('departedNote');

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const distance = Math.max(tripStart - now, 0);
  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  nodes.days.textContent = days;
  nodes.hours.textContent = pad(hours);
  nodes.minutes.textContent = pad(minutes);
  nodes.seconds.textContent = pad(seconds);

  const fullWait = tripStart - planningStart;
  const traveled = Math.min(Math.max(now - planningStart, 0), fullWait);
  const progress = fullWait > 0 ? (traveled / fullWait) * 100 : 100;
  progressBar.style.width = `${progress.toFixed(2)}%`;
  progressText.textContent = `${Math.round(progress)}%`;
  sinceText.textContent = `Desde el 22 de septiembre de 2026, cuando compramos los boletos: ${Math.floor(traveled / 86400000).toLocaleString('es-GT')} días de espera.`;

  if (distance <= 0) {
    countdownEl.hidden = true;
    departedNote.hidden = false;
    kicker.textContent = 'Nuestra Navidad en Europa ya comenzó';
  }
}

const itinerary = [
  { day: '★', date: '21 al 25 dic · Londres', title: 'Christofer y Fabián se adelantan', text: 'Salen el 21 de diciembre (IB222 y IB721) y llegan a Londres el 22. Pasan unos días ahí y luego nos alcanzan en París.', free: true },
  { day: 1, date: 'Vie 25 dic · Guatemala → Madrid', title: 'Navidad en el aire', text: 'Vuelo IB222 desde La Aurora a las 18:15, con escala en San Salvador. Noche a bordo rumbo a Madrid.' },
  { day: 2, date: 'Sáb 26 dic · Madrid → París', title: 'Llegamos a Europa', text: 'Llegada a Madrid (T4S) a las 14:05 y conexión IB589 a las 15:45. Llegada a París Charles de Gaulle (T2D) a las 17:55 y traslado a Disneyland Paris. Nos juntamos todos en París.' },
  { day: 3, date: 'Dom 27 dic · Disneyland Paris', title: 'Día de Disney', text: 'Primer día completo en los parques.' },
  { day: 4, date: 'Lun 28 dic · Disneyland Paris', title: 'Día de Disney', text: 'Segundo día en los parques.' },
  { day: 5, date: 'Mar 29 dic · Disney → París', title: 'Nos mudamos al centro', text: 'Última mañana en Disney y traslado al hotel en el centro de París.' },
  { day: 6, date: 'Mié 30 dic · París → Bruselas → Praga', title: 'Tren nocturno a Praga', text: 'De París a Bruselas y, por la noche, salida en el European Sleeper de Bruselas a Praga. Noche a bordo del tren.' },
  { day: 7, date: 'Jue 31 dic · Praga', title: 'Fin de año en Praga', text: 'Llegamos a Praga en el European Sleeper y recibimos el 2027 allá.' },
  { day: 8, date: 'Vie 1 ene · Praga', title: '¡Feliz Año Nuevo!', text: 'Primer día del año en Praga. El regreso de Christofer (1 ene) está pendiente de cambio.' },
  { day: 9, date: 'Sáb 2 ene · Praga', title: 'Praga', text: 'Día en Praga.' },
  { day: 10, date: 'Dom 3 ene · Praga', title: 'Último día en Praga', text: 'Día en Praga antes de salir hacia España.' },
  { day: 11, date: 'Lun 4 ene · España', title: 'Llegamos a España', text: 'Inicio de los días en España.' },
  { day: 12, date: 'Mar 5 ene · España', title: 'España', text: 'Día en España.' },
  { day: 13, date: 'Mié 6 ene · España', title: 'Día de Reyes', text: 'Día de Reyes en España.' },
  { day: 14, date: 'Jue 7 ene · Madrid → Guatemala', title: 'De vuelta a casa', text: 'Vuelo IB221 desde Madrid T4S a las 11:50, directo a Guatemala. Llegada a las 16:45. Fabián regresa en el mismo vuelo.' }
];

const stays = [
  { city: 'Disneyland Paris', dates: '26 al 29 dic', nights: '3 noches' },
  { city: 'Centro de París', dates: '29 al 30 dic', nights: '1 noche' },
  { city: 'European Sleeper · Bruselas → Praga', dates: '30 al 31 dic', nights: 'Noche en tren' },
  { city: 'Praga', dates: '31 dic al 3 ene', nights: 'Año Nuevo' },
  { city: 'España', dates: '4 al 7 ene', nights: 'Regreso desde Madrid' }
];

const info = [
  { label: 'Viajeros', value: 'Miguel, Krystel, Santiago y José Joaquín · Christofer y Fabián se adelantan a Londres el 21 de diciembre; el regreso de Christofer está pendiente de cambio' },
  { label: 'Check-in', value: 'En línea en iberia.com, se abre 24 h antes de cada vuelo', href: 'https://www.iberia.com' },
  { label: 'Equipaje', value: 'Ida 25 dic: sin maleta facturada (0PC). Vuelta 7 ene: 1 maleta facturada por persona (1PC)' },
  { label: 'Pendiente', value: 'Cambiar el vuelo de regreso de Christofer (1 ene), hoteles, tren París → Bruselas y boletos del European Sleeper (30 dic), viaje Praga → España' },
  { label: 'Agencia', value: 'Town Tkt Office · Av. La Reforma 8-60 zona 9, Edificio Galerías Reforma · Tel. 2202-4949', href: 'tel:+50222024949' }
];

function renderTrip() {
  const dayList = document.getElementById('dayList');
  const infoList = document.getElementById('infoList');
  const stayList = document.getElementById('stayList');
  if (!dayList || !infoList || !stayList) return;

  stayList.innerHTML = stays.map((h) => `
    <article class="hotel-card">
      <span class="hotel-city">${h.dates} · ${h.nights}</span>
      <span class="hotel-name">${h.city}</span>
    </article>`).join('');

  dayList.innerHTML = itinerary.map((d) => `
    <article class="day-card${d.free ? ' free' : ''}" data-day="${d.day}">
      <span class="day-date">${d.date}</span>
      <span class="day-title">${d.title}</span>
      <p class="day-text">${d.text}</p>
    </article>`).join('');

  infoList.innerHTML = info.map((i) => `
    <div class="info-row">
      <span class="info-label">${i.label}</span>
      <span class="info-value">${i.href ? `<a href="${i.href}">${i.value}</a>` : i.value}</span>
    </div>`).join('');
}

shareButton.addEventListener('click', async () => {
  const data = {
    title: 'Nuestro Viaje',
    text: 'Mira cuanto falta para nuestro viaje.',
    url: window.location.href
  };

  if (navigator.share) {
    await navigator.share(data);
    return;
  }

  await navigator.clipboard.writeText(window.location.href);
  shareButton.textContent = 'Enlace copiado';
  setTimeout(() => { shareButton.textContent = 'Compartir'; }, 1800);
});

renderTrip();
updateCountdown();
setInterval(updateCountdown, 1000);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
