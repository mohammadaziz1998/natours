///

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibW9oYW1hZGF6ZXoxMjM0IiwiYSI6ImNscnV4azF3ZDBsbWgybHAxeDVyM2w5ZHAifQ.9TEisOJwP2cXaF4e1ns9ww';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mohamadazez1234/clrvre2d9012u01pb2xm74fk1', // style URL
    scrollZoom: false,
    // center: [-118.113491, 34.111754], // starting position [lng, lat]
    // zoom: 9, // starting zoom
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });
  //
  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 },
  });
};
