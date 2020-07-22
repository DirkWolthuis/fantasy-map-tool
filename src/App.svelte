<script>
  import * as L from "leaflet";
  // If you're playing with this in the Svelte REPL, import the CSS using the
  // syntax in svelte:head instead. For normal development, this is better.
  import "leaflet/dist/leaflet.css";
  let map;

  var yx = L.latLng;

  var xy = function(x, y) {
    if (L.Util.isArray(x)) {
      // When doing xy([x, y]);
      return yx(x[1], x[0]);
    }
    return yx(y, x); // When doing xy(x, y);
  };

  function createMap(container) {
    let m = L.map(container, {
      crs: L.CRS.Simple,
      minZoom: -5
    }).setView([51.505, -0.09], 13);

    var bounds = [[0, 0], [3000, 5000]];
    var image = L.imageOverlay("map.png", bounds).addTo(m);
    m.fitBounds(bounds);

    var sol = xy(175.2, 145.0);
    // var mizar = xy(41.6, 130.1);
    // var kruegerZ = xy(13.4, 56.5);
    var deneb = xy(218.7, 8.3);
    
    var myIcon = L.divIcon({ html: `<div class="bg-red-500 w-10 h-10 radius-full"></div>` });

    L.marker(sol, { icon: myIcon })
      .addTo(m)
      .bindPopup("Sol");
    
    L.marker(deneb, { icon: myIcon })
      .addTo(m)
      .bindPopup("Deneb");

    var travel = L.polyline([sol, deneb]).addTo(m);

    return m;
  }

  function mapAction(container) {
    map = createMap(container);
    return {
      destroy: () => {
        map.remove();
      }
    };
  }
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<main>
  <div class="h-screen w-screen" use:mapAction />
</main>
