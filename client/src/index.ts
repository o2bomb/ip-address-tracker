import "../sass/style.scss";

import * as L from "leaflet";

document.addEventListener("DOMContentLoaded", init);

let map: L.Map;
let marker: L.Marker;

function init() {
  map = L.map("map", { zoomControl: false }).setView([51.505, -0.09], 13);
  const markerIcon = L.icon({
    iconUrl: "../public/icon-location.svg",
    iconAnchor: [23, 56],
  });
  marker = L.marker(map.getCenter(), { icon: markerIcon }).addTo(map);

  // Initialise data with current IP address
  fetchIpData("").then(data => {
    displayData(data);
  });

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
    
    if (input) {
      // Set button to loading state
      submitButton.setAttribute("disabled", "");
      submitButton.classList.add("loading");
      // Perform the search
      const response = await fetchIpData(input.toString());
      // Display data to user
      displayData(response);
      // Set button to regular state
      submitButton.classList.remove("loading");
      submitButton.removeAttribute("disabled");
    }

    return false;
  });
}

function displayData(data) {
  const ipDiv = document.getElementById("ip-address");
  const locationDiv = document.getElementById("location");
  const timezoneDiv = document.getElementById("timezone");
  const ispDiv = document.getElementById("isp");
  try {
    const {
      city,
      country,
      postalCode,
      region,
      timezone,
      lat,
      lng,
    } = data.location;
    ipDiv.innerText = data.ip;
    locationDiv.innerText = `${city}, ${region} ${postalCode}`;
    timezoneDiv.innerText = `UTC${timezone}`;
    ispDiv.innerText = data.isp;
    // Update map with new lat, lng
    const newLatLng = new L.LatLng(lat, lng);
    map.setView(newLatLng, 13);
    marker.setLatLng(newLatLng);
  } catch (e) {}
}

function fetchIpData(ip: string) {
  const uri = `${process.env.SERVER_URL}/search/${ip}`;
  return fetch(uri)
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
}