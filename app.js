const tripStart = new Date('2026-12-21T18:15:00-06:00');
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
  const passedDays = Math.floor(traveled / 86400000);
  const leftDays = Math.floor(distance / 86400000);
  progressText.textContent = `${Math.round(progress)}%`;
  sinceText.textContent = `Compramos los boletos el 22 de septiembre. Ya pasaron ${passedDays} días y faltan ${leftDays} para el 21 de diciembre, cuando empieza el viaje.`;

  if (distance <= 0) {
    countdownEl.hidden = true;
    departedNote.hidden = false;
    kicker.textContent = 'Nuestra Navidad en Europa ya comenzó';
  }
}

const itinerary = [
  { day: '★', date: '21 al 26 dic · Londres', title: 'Christofer y Fabián se adelantan', text: 'Salen el 21 de diciembre (IB222 y IB721) y llegan a Londres el 22. Pasan la Navidad ahí y el 26 nos alcanzan en París.', free: true, plan: ['22 dic: llegan a Heathrow 17:15; hotel y cena tranquila.', '23 dic: Westminster, Big Ben, London Eye y cambio de guardia en Buckingham.', '24 dic: Torre de Londres y Tower Bridge; en la noche, luces de Regent Street y Covent Garden.', '25 dic: Navidad sin metro; caminar por Hyde Park y la zona del hotel.', '26 dic: viajan de Londres a París y nos juntamos todos (el Eurostar sí opera ese día; el 25 no).'] },
  { day: 1, date: 'Vie 25 dic · Guatemala → Madrid', title: 'Navidad en el aire', text: 'Vuelo IB222 desde La Aurora a las 18:15, con escala en San Salvador. Noche a bordo rumbo a Madrid.', plan: ['Comer bien antes de salir y llegar a La Aurora unas 3 horas antes.', 'Ropa cómoda y una muda en la mochila de mano; tratar de dormir en el vuelo.'] },
  { day: 2, date: 'Sáb 26 dic · Madrid → París', title: 'Llegamos a Europa', text: 'Llegada a Madrid (T4S) a las 14:05 y conexión IB589 a las 15:45. Llegada a París Charles de Gaulle (T2D) a las 17:55 y traslado a Disneyland Paris. Christofer y Fabián también llegan a París este día: nos juntamos todos.', plan: ['Conexión corta en Madrid (1 h 40 min): ir directo a la puerta del IB589.', 'Llegando a CDG, traslado a Disney (unos 40 min en auto o el autobús Magical Shuttle).', 'Cena en Disney Village y a descansar: mañana empieza la magia.'] },
  { day: 3, date: 'Dom 27 dic · Disneyland Paris', title: 'Día de Disney', text: 'Primer día completo en los parques.', plan: ['Llegar a la apertura y empezar por Fantasyland: Peter Pan, Dumbo e It’s a Small World.', 'Adventureland: Piratas del Caribe. Frontierland: Big Thunder Mountain.', 'En la tarde, el desfile de Navidad por Main Street.', 'En la noche, el espectáculo de fuegos artificiales frente al castillo.'] },
  { day: 4, date: 'Lun 28 dic · Disneyland Paris', title: 'Día de Disney', text: 'Segundo día en los parques.', plan: ['Mañana en el segundo parque (Walt Disney Studios): Ratatouille, Avengers y Toy Story.', 'Tarde de regreso en Disneyland Park: Discoveryland (Buzz Lightyear, Star Wars Hyperspace Mountain) y repetir las favoritas.', 'Fotos con personajes y compras de recuerdos.'] },
  { day: 5, date: 'Mar 29 dic · Disney → París', title: 'Nos mudamos al centro', text: 'Última mañana en Disney y traslado al hotel en el centro de París.', plan: ['Última mañana en Disney o una comida con personajes.', 'Traslado al centro de París (el tren RER A llega directo en unos 40 min).', 'Al atardecer, subir a la Torre Eiffel (boletos comprados antes).', 'En la noche, ver el centelleo de la torre desde Trocadero y las luces de los Campos Elíseos.', 'Ojo: el Louvre cierra los martes.'] },
  { day: 6, date: 'Mié 30 dic · París', title: 'París en el centro', text: 'Día completo para recorrer la ciudad.', plan: ['Mañana: Louvre con entradas compradas y paseo por el Jardín de las Tullerías.', 'Mediodía: Notre-Dame, la Sainte-Chapelle y un crepe en la Île de la Cité.', 'Tarde: árbol de Navidad de las Galerías Lafayette y su terraza con vista.', 'Noche: paseo en barco por el Sena con la ciudad iluminada.', 'Dejar las maletas listas: mañana vuelo temprano.'] },
  { day: 7, date: 'Jue 31 dic · París → Praga', title: 'Fin de año en Praga', text: 'Vuelo por la mañana de París a Praga. Recibimos el 2027 allá.', plan: ['Salir temprano a CDG para el vuelo de la mañana.', 'Llegando, dejar maletas en el hotel y caminar a la Plaza de la Ciudad Vieja.', 'Ver el Reloj Astronómico a la hora en punto y recorrer el mercado de Navidad.', 'Cena temprano y ver los fuegos de medianoche desde un mirador, lejos de las multitudes.'] },
  { day: 8, date: 'Vie 1 ene · Praga', title: '¡Feliz Año Nuevo!', text: 'Primer día del año en Praga. El regreso de Christofer (1 ene) está pendiente de cambio.', plan: ['Mañana tranquila: muchos lugares abren tarde el 1 de enero.', 'Cruzar el Puente de Carlos y pasear por Malá Strana.', 'Probar el trdelník y un chocolate caliente en el mercado.', 'Revisar el cambio del vuelo de Christofer.'] },
  { day: 9, date: 'Sáb 2 ene · Praga', title: 'Praga', text: 'Día en Praga.', plan: ['Castillo de Praga: Catedral de San Vito y el Callejón del Oro.', 'Cambio de guardia en la entrada del castillo al mediodía.', 'Bajar caminando por Malá Strana y subir en funicular al mirador de Petřín.', 'Cena checa: goulash o svíčková.'] },
  { day: 10, date: 'Dom 3 ene · Praga → Madrid', title: 'Último día en Praga', text: 'Mañana en Praga y vuelo en la tarde a Madrid.', plan: ['Puente de Carlos muy temprano, casi vacío, para las fotos.', 'Último paseo por el mercado de Navidad y compras de recuerdos.', 'En la tarde, al aeropuerto para el vuelo a Madrid.'] },
  { day: 11, date: 'Lun 4 ene · Madrid', title: 'Madrid', text: 'Primer día completo en Madrid.', plan: ['Parque del Retiro: botes en el lago y el Palacio de Cristal.', 'Puerta de Alcalá y la Plaza de Cibeles.', 'Tarde: Puerta del Sol, el oso y el madroño, y la Plaza Mayor.', 'Chocolate con churros en San Ginés.'] },
  { day: 12, date: 'Mar 5 ene · Madrid', title: 'Cabalgata de Reyes', text: 'Día en Madrid y, por la tarde, la Cabalgata de Reyes.', plan: ['Mañana: Palacio Real y la Catedral de la Almudena.', 'Mediodía: Mercado de San Miguel para comer de todo un poco.', 'Tarde: Cabalgata de Reyes; llegar temprano para encontrar buen lugar para los niños.'] },
  { day: 13, date: 'Mié 6 ene · Madrid', title: 'Día de Reyes', text: 'Día de Reyes en Madrid, con roscón. Es feriado y muchas tiendas cierran.', plan: ['Desayuno con roscón de Reyes.', 'Tour del estadio Santiago Bernabéu.', 'Tarde: Museo del Prado (revisar horario del feriado) o Templo de Debod al atardecer.', 'Muchas tiendas cierran: dejar las compras para el 4 o el 5.', 'En la noche, hacer las maletas.'] },
  { day: 14, date: 'Jue 7 ene · Madrid → Guatemala', title: 'De vuelta a casa', text: 'Regresamos todos desde Madrid: vuelo IB221 desde la T4S a las 11:50, directo a Guatemala. Llegada a las 16:45.', plan: ['Salir del hotel hacia las 8:00 rumbo a la T4S (metro o taxi).', 'Estar en el aeropuerto unas 3 horas antes del vuelo de las 11:50.', '¡Llegada a Guatemala a las 16:45!'] }
];

const stays = [
  { city: 'Disneyland Paris', dates: '26 al 29 dic', nights: '3 noches' },
  { city: 'Centro de París', dates: '29 al 31 dic', nights: '2 noches' },
  { city: 'Praga', dates: '31 dic al 3 ene', nights: '3 noches · Año Nuevo' },
  { city: 'Madrid', dates: '3 al 7 ene', nights: '4 noches · regreso a casa' }
];

const recs = [
  {
    photo: 'assets/foto-londres.jpg',
    place: 'Londres', who: 'Christofer y Fabián · 22 al 26 dic',
    items: [
      '<b>Westminster:</b> Big Ben, el Parlamento y la Abadía de Westminster; cruzar el puente para ver el London Eye y, si quieren, subirse.',
      '<b>Buckingham:</b> cambio de guardia (ver el horario en la web de la Guardia Real) y caminar por St James’s Park hasta Trafalgar Square.',
      '<b>Torre de Londres:</b> las Joyas de la Corona y los Beefeaters; después cruzar el Tower Bridge y bajar a su mirador de piso de vidrio.',
      '<b>Museos gratis:</b> British Museum (la Piedra Rosetta), National Gallery en Trafalgar y el Museo de Historia Natural con la pista de hielo navideña.',
      '<b>Luces de Navidad:</b> Regent Street, Oxford Street, Carnaby Street y Covent Garden con su árbol gigante y mercado.',
      '<b>Winter Wonderland en Hyde Park:</b> feria navideña con juegos, pista de hielo, mercado y comida. Comprar entrada en línea.',
      '<b>Camden Market:</b> puestos de comida de todo el mundo y tiendas alternativas; ideal para almorzar.',
      '<b>Notting Hill y Portobello Road:</b> casas de colores y el mercado (los sábados está completo).',
      '<b>Soho y Chinatown:</b> para cenar y salir en la noche; Leicester Square está al lado.',
      '<b>Harry Potter:</b> andén 9¾ en la estación de King’s Cross (gratis) o el tour de los estudios Warner Bros (reservar con mucha anticipación).',
      '<b>Fútbol:</b> tour del estadio de Chelsea (Stamford Bridge), Arsenal (Emirates) o Tottenham; el Boxing Day (26 dic) hay partidos de Premier League.',
      '<b>Qué comer:</b> fish & chips en un pub, un Sunday roast, el afternoon tea y el desayuno inglés completo.',
      '<b>Vistas:</b> Sky Garden (gratis, reservar en línea) o The Shard para ver toda la ciudad.'
    ],
    tip: 'El 25 de diciembre no hay metro, trenes ni autobuses en Londres y casi todo cierra, incluidos museos y restaurantes: reserven la cena de Navidad con tiempo y planeen ese día caminando cerca del hotel. El 26 (Boxing Day) hay transporte limitado y es día de rebajas en las tiendas. Compren una tarjeta Oyster o paguen con tarjeta sin contacto en el metro.'
  },
  {
    photo: 'assets/foto-disney.jpg',
    place: 'Disneyland Paris', who: 'Todos · 26 al 29 dic',
    items: [
      '<b>Fantasyland (lo mejor para los niños):</b> Peter Pan’s Flight, Dumbo, It’s a Small World, el Carrusel de Lancelot y el laberinto de Alicia.',
      '<b>Castillo de la Bella Durmiente:</b> subir al castillo y bajar a la cueva del dragón que está debajo.',
      '<b>Adventureland:</b> Piratas del Caribe, la isla de Peter Pan con la casa del árbol de los Robinson y Indiana Jones (para los más grandes).',
      '<b>Frontierland:</b> Big Thunder Mountain, la mejor montaña rusa familiar, y la casa embrujada Phantom Manor.',
      '<b>Discoveryland:</b> Buzz Lightyear Laser Blast (compiten por puntos), Star Wars Hyperspace Mountain y Autopia para que los niños manejen.',
      '<b>Walt Disney Studios:</b> Ratatouille, Avengers Assemble: Flight Force, Spider-Man W.E.B. Adventure, Toy Story Playland y la zona de Frozen si ya está abierta.',
      '<b>Shows:</b> el desfile de Navidad en Main Street en la tarde y los fuegos artificiales frente al castillo en la noche; buscar lugar 30–45 min antes.',
      '<b>Personajes:</b> Meet Mickey Mouse en Fantasyland y las princesas en Princess Pavilion; ver horarios en la app.',
      '<b>Comidas:</b> una comida con personajes (Auberge de Cendrillon o Plaza Gardens) reservada con anticipación; para algo rápido, Disney Village.',
      '<b>Disney Village:</b> en la noche, cenar, ver tiendas y el lago.'
    ],
    tip: 'Son de las fechas más llenas del año: lleguen a la apertura y hagan primero lo más popular, usen la app de Disneyland Paris para ver tiempos de espera y reservar comidas, y consideren Premier Access para Peter Pan, Ratatouille y Big Thunder. Hace frío: gorro, guantes y capas de ropa para los niños.'
  },
  {
    photo: 'assets/foto-paris.jpg',
    place: 'París', who: 'Todos · 29 al 31 dic',
    items: [
      '<b>Torre Eiffel:</b> subir con boletos comprados en línea (se agotan); en la noche ver el centelleo de luces cada hora en punto desde Trocadero.',
      '<b>Louvre:</b> la Mona Lisa, la Venus de Milo y las antigüedades egipcias; entrada con horario reservada. Cierra los martes, así que el 30.',
      '<b>Jardín de las Tullerías:</b> entre el Louvre y la Plaza de la Concordia; en diciembre suele haber feria con rueda de la fortuna.',
      '<b>Île de la Cité:</b> Notre-Dame, ya reabierta (entrada gratis, mejor con reserva), y los vitrales de la Sainte-Chapelle.',
      '<b>Barco por el Sena:</b> Bateaux Mouches o Vedettes du Pont Neuf, mejor al atardecer o de noche con la ciudad iluminada.',
      '<b>Campos Elíseos y Arco del Triunfo:</b> caminar con las luces de Navidad y subir al arco para ver la avenida y la Torre Eiffel.',
      '<b>Montmartre:</b> la basílica del Sacré-Cœur con vista a todo París, la Plaza del Tertre con los pintores y el funicular.',
      '<b>Galerías Lafayette:</b> el árbol de Navidad bajo la cúpula, las vitrinas animadas y la terraza gratis con vista.',
      '<b>Para los niños:</b> el Jardín de Luxemburgo con sus juegos y barquitos, o la Ciudad de las Ciencias.',
      '<b>Qué comer:</b> crepes en la calle, croissants de panadería, chocolate caliente en Angelina y macarons de Ladurée.'
    ],
    tip: 'El metro es la forma más rápida de moverse; compren boletos en las máquinas o usen la app de RATP. Cuidado con los carteristas en el metro, en la Torre Eiffel y en Montmartre. Muchos museos son gratis para menores de 18.'
  },
  {
    photo: 'assets/foto-praga.jpg',
    place: 'Praga', who: 'Todos · 31 dic al 3 ene',
    items: [
      '<b>Plaza de la Ciudad Vieja:</b> el Reloj Astronómico (show cada hora en punto), la iglesia de Týn y el mercado de Navidad con su árbol gigante.',
      '<b>Puente de Carlos:</b> el puente de las estatuas; ir muy temprano para las fotos sin gente y tocar la estatua de San Juan Nepomuceno para la suerte.',
      '<b>Castillo de Praga:</b> la Catedral de San Vito, el Antiguo Palacio Real y el Callejón del Oro, con casitas de colores que les encantan a los niños.',
      '<b>Cambio de guardia:</b> en la entrada del castillo cada hora, y el más vistoso al mediodía con fanfarria.',
      '<b>Malá Strana:</b> el barrio debajo del castillo, con la iglesia de San Nicolás y el muro de John Lennon.',
      '<b>Colina de Petřín:</b> subir en funicular, la torre mirador (como una mini Torre Eiffel) y el laberinto de espejos, ideal para los niños.',
      '<b>Plaza de Wenceslao:</b> la avenida principal, con otro mercado de Navidad y el Museo Nacional.',
      '<b>Barrio Judío (Josefov):</b> sinagogas y el antiguo cementerio judío.',
      '<b>Para los niños:</b> el Museo del Juguete en el castillo o el zoológico de Praga, de los mejores de Europa.',
      '<b>Qué comer:</b> trdelník, salchichas y vino caliente en los mercados, goulash en pan, svíčková (res en salsa con knedlíky) y el pastel medovník.'
    ],
    tip: 'La moneda es la corona checa, no el euro: paguen con tarjeta o cambien en casas de cambio confiables, nunca en la calle. La noche del 31 el centro se llena y hay cohetes por todos lados; con los niños, mejor un mirador como Letná o Petřín. El 1 de enero muchos lugares abren tarde o cierran. Hace mucho frío: ropa térmica.'
  },
  {
    photo: 'assets/foto-madrid.jpg',
    place: 'Madrid', who: 'Todos · 3 al 7 ene',
    items: [
      '<b>Cabalgata de Reyes (5 ene, en la tarde):</b> el gran desfile de los Reyes Magos por la Castellana y Cibeles, con carrozas y dulces para los niños. Lleguen temprano.',
      '<b>Roscón de Reyes (6 ene):</b> desayunarlo como los españoles; el que encuentra la figurita tiene suerte.',
      '<b>Parque del Retiro:</b> botes en el lago, el Palacio de Cristal y los titiriteros y artistas callejeros.',
      '<b>Puerta del Sol y Plaza Mayor:</b> el kilómetro cero, el oso y el madroño, y la plaza con sus arcos.',
      '<b>Palacio Real:</b> uno de los palacios más grandes de Europa, con la Catedral de la Almudena al lado y los jardines de Sabatini.',
      '<b>Estadio Santiago Bernabéu:</b> el tour por el museo, los vestidores y la cancha del Real Madrid; reservar en línea.',
      '<b>Museo del Prado:</b> Velázquez, Goya y El Bosco; con los niños, una visita corta a las obras principales.',
      '<b>Gran Vía:</b> la avenida de los edificios bonitos y las tiendas, con luces de Navidad.',
      '<b>Templo de Debod:</b> un templo egipcio de verdad, con el mejor atardecer de Madrid.',
      '<b>Para los niños:</b> el Parque Warner, el Zoo Aquarium o el Museo del Ferrocarril.',
      '<b>Qué comer:</b> chocolate con churros en San Ginés, bocadillo de calamares en la Plaza Mayor, tapas en el Mercado de San Miguel y jamón ibérico.'
    ],
    tip: 'El 6 de enero es feriado y muchas tiendas cierran: hagan las compras el 4 o el 5. Los españoles cenan tarde, muchos restaurantes abren para cenar a las 20:30 o 21:00. El 7 el vuelo sale a las 11:50 de la T4S: estén en el aeropuerto unas 3 horas antes.'
  }
];

const info = [
  { label: 'Viajeros', value: '6 en total, 4 adultos y 2 niños. Adultos: Miguel, Krystel, Christofer y Fabián. Niños: Santiago y José Joaquín. Christofer y Fabián se adelantan a Londres el 21 de diciembre.' },
  { label: 'Check-in', value: 'En línea en iberia.com, se abre 24 h antes de cada vuelo', href: 'https://www.iberia.com' },
  { label: 'Equipaje', value: 'Ida 25 dic: sin maleta facturada (0PC). Vuelta 7 ene: 1 maleta facturada por persona (1PC)' },
  { label: 'Pendiente', value: 'Boletos de Londres a París de Christofer y Fabián (26 dic), cambiar el vuelo de regreso de Christofer (1 ene), hoteles, detalles del vuelo París CDG → Praga (31 dic en la mañana) y vuelo Praga → Madrid (3 ene en la tarde)' },
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
      ${d.plan ? `<ul class="day-plan">${d.plan.map((it) => `<li>${it}</li>`).join('')}</ul>` : ''}
    </article>`).join('');

  const recList = document.getElementById('recList');
  if (recList) {
    recList.innerHTML = recs.map((r) => `
      <article class="rec-card">
        ${r.photo ? `<img class="rec-photo" src="${r.photo}" alt="${r.place}" />` : ''}
        <span class="hotel-city">${r.who}</span>
        <span class="hotel-name">${r.place}</span>
        <ul>${r.items.map((it) => `<li>${it}</li>`).join('')}</ul>
        <p class="rec-tip"><b>Ojo:</b> ${r.tip}</p>
      </article>`).join('');
  }

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
