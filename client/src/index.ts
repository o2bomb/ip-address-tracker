import "../sass/style.scss";

import * as L from "leaflet";

document.addEventListener("DOMContentLoaded", init);

function init() {
  const mymap = L.map("map", { zoomControl: false }).setView(
    [51.505, -0.09],
    13
  );

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      accessToken: process.env.MAPBOX_PUBLIC_TOKEN,
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 18,
      id: "mapbox/streets-v11",
    }
  ).addTo(mymap);

  const form = document.getElementById("search-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form as HTMLFormElement);
    const ip = formData.get("search");
    if (ip) {
      const uri = `${process.env.SERVER_URL}/search/${ip}`;
      const response = await fetch(uri).then(res => res.json());
      console.log(response);
    }
    return false;
  });
}