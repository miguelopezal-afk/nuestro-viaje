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
  { day: 1, date: 'Vie 25 dic · Guatemala → Madrid', title: 'Navidad en el aire', text: 'Vuelo IB222 desde La Aurora a las 18:15, con escala en San Salvador. Noche a bordo rumbo a Madrid.' },
  { day: 2, date: 'Sáb 26 dic · Madrid → París', title: 'Llegamos a Europa', text: 'Llegada a Madrid (T4S) a las 14:05 y conexión IB589 a las 15:45 desde la T4. Llegada a París Charles de Gaulle (T2D) a las 17:55.' },
  { day: '…', date: '27 dic al 6 ene · Europa', title: 'París, Año Nuevo y regreso a Madrid', text: 'Días por planear. Antes del 7 de enero hay que estar de vuelta en Madrid para el vuelo a casa.', free: true },
  { day: 14, date: 'Jue 7 ene · Madrid → Guatemala', title: 'De vuelta a casa', text: 'Vuelo IB221 desde Madrid T4S a las 11:50, directo a Guatemala. Llegada a las 16:45. Fabián regresa en el mismo vuelo.' }
];

const info = [
  { label: 'Viajeros', value: 'Miguel, Krystel, Santiago y José Joaquín · Fabián se adelanta el 21 de diciembre' },
  { label: 'Check-in', value: 'En línea en iberia.com, se abre 24 h antes de cada vuelo', href: 'https://www.iberia.com' },
  { label: 'Equipaje', value: 'Ida: tarifa sin maleta facturada (0PC). Vuelta 7 ene: revisar la franquicia en cada boleto' },
  { label: 'Pendiente', value: 'Cómo ir de París a Madrid antes del 7 de enero (el vuelo sale 11:50 de la T4S)' },
  { label: 'Agencia', value: 'Town Tkt Office · Av. La Reforma 8-60 zona 9, Edificio Galerías Reforma · Tel. 2202-4949', href: 'tel:+50222024949' }
];

function renderTrip() {
  const dayList = document.getElementById('dayList');
  const infoList = document.getElementById('infoList');
  if (!dayList || !infoList) return;

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
