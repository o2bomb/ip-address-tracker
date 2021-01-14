# IP Address Tracker
A website that allows users to get detailed information on IP addresses

This project was based on a challenge by [Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0)

[Live demo](http://ip-address-tracker.felixtan.me/)

## Tech Stack
- TypeScript/HTML/CSS
- [webpack](https://webpack.js.org/)
- [Express](https://expressjs.com/)
- [Leaflet](https://leafletjs.com/) (displays the map)
- [Mapbox API](https://docs.mapbox.com/api/overview/) (map tileset)
- [IP Geolocation API](https://geo.ipify.org/)

Deployed using [Dokku](https://github.com/dokku/dokku) on a DigitalOcean Droplet

## Running the project
Installation prerequisites:
- Yarn or npm

1. Clone the repo to your local machine
2. Create a .env file in the `server` and `client` directories (see the .env.example file for an example of what the .env file looks like)
3. In the current directory:
    1. `yarn install` to install all required libraries
    2. `yarn watch` to run the TypeScript compiler
    3. In a new terminal, `yarn dev` to start the server
4. In the `client` directory:
    1. `yarn install` to install all required libraries
    2. `yarn watch` to compile .ts files into /dist/bundle.js
    2. In a new terminal, `yarn dev` to start the live server
