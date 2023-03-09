import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Graticule,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import BranchesList from "./BranchesList/BranchesList";

import "./MapChart.scss";

type Marker = {
  markerOffset: number;
  name: string;
  coordinates: [number, number];
};

const markers: Marker[] = [
  {
    markerOffset: -2,
    name: "Buenos Aires",
    coordinates: [-58.3816, -34.6037],
  },
  {
    markerOffset: -2,
    name: "La Paz",
    coordinates: [-68.1193, -16.4897],
  },
  { markerOffset: -2, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: -2, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: -2, name: "Bogota", coordinates: [-74.0721, 4.711] },
  { markerOffset: -2, name: "Quito", coordinates: [-78.4678, -60.1807] },
];

const MapChart = () => {
  const [chosenCountry, setChosenCountry] = useState<Marker>();

  const [hover, setHover] = useState(-1);

  const handleHoverAndActive = (countryName: string, countryIndex: number) => {
    return chosenCountry?.name === countryName || countryIndex === hover;
  };

  return (
    <div className="map-container">
      <h1>Global reach</h1>
      <ComposableMap projection="geoMercator">
        <ZoomableGroup
          center={chosenCountry?.coordinates}
          zoom={3}
          fill="rgba(30, 29, 29, 0.94)"
          minZoom={4}
          maxZoom={20}
          style={{
            transitionDuration: "0.5s",
          }}
        >
          <Geographies geography="src/components/features1.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#464545"
                  strokeWidth={0.1}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map(({ name, coordinates, markerOffset }, index) => (
            <Marker
              key={name}
              coordinates={coordinates}
              className="marker-svg"
              // styles={{ display: `${zoomRatio < 15 ? 'none'}`}}
              onMouseOver={() => setHover(index)}
              onMouseLeave={() => setHover(-1)}
              onClick={() => {
                setChosenCountry({
                  name: name,
                  coordinates: coordinates,
                  markerOffset: markerOffset,
                });
              }}
              style={{ hover: { cursor: "pointer" } }}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="8"
                viewBox="0 0 20.000000 32.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                  fill={`${
                    handleHoverAndActive(name, index) ? "red" : "#303031"
                  }`}
                >
                  <path d="M37 290 c-54 -43 -39 -138 32 -204 l31 -30 35 34 c41 40 70 108 61 145 -9 35 -27 32 -20 -4 6 -29 -17 -83 -56 -131 l-20 -25 -20 25 c-30 36 -60 96 -60 118 0 11 10 32 22 47 19 25 26 27 70 23 47 -5 64 4 32 16 -32 12 -82 5 -107 -14z" />
                  <path d="M70 245 c-15 -18 -10 -45 13 -59 34 -22 73 27 47 59 -16 19 -44 19 -60 0z m46 -16 c10 -17 -13 -36 -27 -22 -12 12 -4 33 11 33 5 0 12 -5 16 -11z" />
                  <path d="M11 56 c-20 -23 24 -46 89 -46 65 0 109 23 89 46 -13 16 -39 19 -39 4 0 -5 5 -10 11 -10 5 0 7 -4 4 -10 -8 -13 -122 -13 -130 0 -3 6 -1 10 4 10 6 0 11 5 11 10 0 15 -26 12 -39 -4z" />
                </g>
              </svg>
              <text
                textAnchor="middle"
                y={markerOffset}
                fill={`${
                  handleHoverAndActive(name, index) ? "white" : "#767679"
                }`}
                style={{
                  fontFamily: "Noto Sans SC",
                  fontSize: "5px",
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="branches-list-container">
        <ul>
          {markers.map((marker) => {
            return (
              <>
                <li
                  key={marker.name}
                  onClick={() => {
                    setChosenCountry(marker);
                  }}
                >
                  {marker.name}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MapChart;
