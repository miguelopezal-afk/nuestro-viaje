const tripStart = new Date('2026-07-07T19:25:00-06:00');
const planningStart = new Date('2023-07-07T19:25:00-06:00');

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
  sinceText.textContent = `Desde el 7 de julio de 2023 hasta el despegue: ${Math.floor(traveled / 86400000).toLocaleString('es-GT')} días caminados juntos.`;

  if (distance <= 0) {
    countdownEl.hidden = true;
    departedNote.hidden = false;
    kicker.textContent = 'Nuestro viaje ya comenzó';
  }
}

const itinerary = [
  { day: 1, date: 'Mar 7 jul · América', title: 'Guatemala → San Salvador → Madrid', text: 'Vuelo IB222 desde La Aurora (16:55) hacia El Salvador, y a las 19:25 rumbo a Madrid. Noche a bordo.' },
  { day: 2, date: 'Mié 8 jul · Madrid → Londres', title: 'Llegamos a Europa', text: 'Llegada a Madrid 14:10 y conexión IB723 (16:50) a Londres, llegada 18:15. Traslado al hotel. Alojamiento.' },
  { day: 3, date: 'Jue 9 jul · Londres', title: 'City Tour de Londres', text: 'Visita de la ciudad y sus monumentos, terminando frente al Palacio de Buckingham para el cambio de guardia. Tarde libre.' },
  { day: 4, date: 'Vie 10 jul · Londres → París', title: 'Cruzamos el Canal por el Eurotunnel', text: 'Salida a Folkestone, el bus aborda el tren por el Eurotunnel a través del Canal de la Mancha. Llegada a Calais y continuación a París.' },
  { day: 5, date: 'Sáb 11 jul · París', title: 'Panorámica de París', text: 'Recorrido acabando en la Torre Eiffel. Tarde libre; opcional paseo en Bateaux Mouche por el Sena, Montmartre y Barrio Latino.' },
  { day: 6, date: 'Dom 12 jul · París', title: 'Día libre en París', text: 'Día para pasear a nuestro ritmo. Opcional: visita a Versalles y sus jardines.', free: true },
  { day: 7, date: 'Lun 13 jul · París → Frankfurt', title: 'Paseo por el río Rin', text: 'Vía la región de Champagne hasta el Rin: paseo en barco de Boppard a St. Goar. Continuación a Frankfurt.' },
  { day: 8, date: 'Mar 14 jul · Frankfurt → Zúrich', title: 'Heidelberg, Lucerna y Zúrich', text: 'Heidelberg y su castillo, bordeando la Selva Negra hacia Suiza. Lucerna, junto al lago de los Cuatro Cantones, y Zúrich.' },
  { day: 9, date: 'Mié 15 jul · Zúrich → Venecia', title: 'Milán y rumbo a Venecia', text: 'Atravesando los lagos de Lugano y Como hasta Milán (Duomo, Galería, La Scala). Continuación a Venecia.' },
  { day: 10, date: 'Jue 16 jul · Venecia → Florencia', title: 'Venecia, Padua y Florencia', text: 'Venecia a pie hasta la Plaza San Marcos y taller de cristal. Padua y su basílica. Continuación a Florencia.' },
  { day: 11, date: 'Vie 17 jul · Florencia → Roma', title: 'Florencia artística', text: 'Duomo, Campanile de Giotto, Plaza de la Signoria y Ponte Vecchio. Por la tarde, salida hacia la ciudad eterna.' },
  { day: 12, date: 'Sáb 18 jul · Roma', title: 'Roma y el Vaticano', text: 'Opcional visita al Vaticano, sus museos y la Capilla Sixtina. Recorrido panorámico y, por la tarde, opcional Roma barroca.' },
  { day: 13, date: 'Dom 19 jul · Roma', title: 'Día libre en Roma', text: 'Día libre. Sugerencia: excursión de todo el día a Nápoles y la bella isla de Capri.', free: true },
  { day: 14, date: 'Lun 20 jul · Regreso', title: 'De vuelta a casa', text: 'Roma → Madrid (IB648 12:00) → Panamá (IB257 16:35) → San Salvador (IB7742 22:28) y conexión a Guatemala. ¡Fin del viaje!' }
];

const hotels = [
  { city: 'Londres · 8–10 jul (2 noches)', name: 'Holiday Inn Express Royal Docks', addr: '1 Silvertown Way, Canning Town, Newham, Londres', tel: '+44 20 7540 4040' },
  { city: 'París · 10–13 jul (3 noches)', name: 'Ibis La Défense Esplanade', addr: '4 Bd de Neuilly, 92081 Paris La Défense Cedex', tel: '+33 1 41 97 40 20' },
  { city: 'Frankfurt · 13–14 jul (1 noche)', name: 'Mercure & Residenz Frankfurt Messe 4★', addr: 'Voltastraße 29, 60486 Frankfurt', tel: '+49 69 79260' },
  { city: 'Zúrich · 14–15 jul (1 noche)', name: 'Novotel Zurich Airport Messe 4★', addr: 'Lindbergh-Platz 1, Talackerstrasse 21, 8152 Glattpark', tel: '+41 44 829 9000' },
  { city: 'Venecia · 15–16 jul (1 noche)', name: 'Hotel Smart Holiday 4★', addr: 'Via dell\'Essiccatoio 38, 30173 Mestre', tel: '+39 041 611 088' },
  { city: 'Florencia · 16–17 jul (1 noche)', name: 'Hotel Mirage 4★', addr: 'Via Francesco Baracca 231, 50127 Florencia', tel: '+39 055 352 011', web: 'https://www.hotelmirage.it/' },
  { city: 'Roma · 17–20 jul (3 noches)', name: 'Occidental Aran Park 4★', addr: 'Via Riccardo Forster 24, 00143 Roma', tel: '+39 06 510 721' }
];

const info = [
  { label: 'Código pre-checkin Iberia', value: 'LT6B7 (check-in 24 h antes en iberia.com)' },
  { label: 'Localizador de la reserva', value: '6224531' },
  { label: 'Emergencias MapaPlus (Madrid)', value: '+34 913 759 333 · WhatsApp +34 686 811 780' },
  { label: 'Correo de emergencias', value: 'emergencias@mapagrouptravel.com', href: 'mailto:emergencias@mapagrouptravel.com' },
  { label: 'Seguro de asistencia', value: 'MAPFRE · póliza 698/72 (hasta 100.000 €)' },
  { label: 'Equipaje en el autocar', value: 'Solo 1 maleta en bodega + 1 bolsa de mano por persona' }
];

function renderTrip() {
  const dayList = document.getElementById('dayList');
  const hotelList = document.getElementById('hotelList');
  const infoList = document.getElementById('infoList');
  if (!dayList || !hotelList || !infoList) return;

  dayList.innerHTML = itinerary.map((d) => `
    <article class="day-card${d.free ? ' free' : ''}" data-day="${d.day}">
      <span class="day-date">${d.date}</span>
      <span class="day-title">${d.title}</span>
      <p class="day-text">${d.text}</p>
    </article>`).join('');

  hotelList.innerHTML = hotels.map((h) => `
    <article class="hotel-card">
      <span class="hotel-city">${h.city}</span>
      <span class="hotel-name">${h.name}</span>
      <p>${h.addr}<br />Tel: ${h.tel}${h.web ? `<br /><a href="${h.web}" target="_blank" rel="noopener">Sitio web</a>` : ''}</p>
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
