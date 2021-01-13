import "../sass/style.scss";

import * as L from "leaflet";

document.addEventListener("DOMContentLoaded", init);

function init() {
  const map = L.map("map", { zoomControl: false }).setView([51.505, -0.09], 13);
  const markerIcon = L.icon({
    iconUrl: "../public/icon-location.svg",
    iconAnchor: [23, 56],
  });
  const marker = L.marker(map.getCenter(), { icon: markerIcon }).addTo(map);

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
  ).addTo(map);

  const form = document.getElementById("search-form");
  const submitButton = document.querySelectorAll(".submit")[0];
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form as HTMLFormElement);
    const input = formData.get("search");
    const ipDiv = document.getElementById("ip-address");
    const locationDiv = document.getElementById("location");
    const timezoneDiv = document.getElementById("timezone");
    const ispDiv = document.getElementById("isp");
    if (input) {
      // Set button to loading state
      submitButton.setAttribute("disabled", "");
      submitButton.classList.add("loading");
      // Perform the search
      const uri = `${process.env.SERVER_URL}/search/${input}`;
      const response = await fetch(uri)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // Display data to user
      try {
        const {
          city,
          country,
          postalCode,
          region,
          timezone,
          lat,
          lng,
        } = response.location;
        ipDiv.innerText = response.ip;
        locationDiv.innerText = `${city}, ${region} ${postalCode}`;
        timezoneDiv.innerText = `UTC${timezone}`;
        ispDiv.innerText = response.isp;
        // Update map with new lat, lng
        const newLatLng = new L.LatLng(lat, lng);
        map.setView(newLatLng, 13);
        marker.setLatLng(newLatLng);
      } catch (e) {}
      // Set button to regular state
      submitButton.classList.remove("loading");
      submitButton.removeAttribute("disabled");
      console.log(response);
    }

    return false;
  });
}
