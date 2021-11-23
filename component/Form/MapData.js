import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import styles from "../../styles/Home.module.css";

const MapData = ({ mapInfo }) => {
  const [viewport, setViewport] = useState({
    width: 600,
    height: 400,
    latitude: Number(mapInfo.lat),
    longitude:  Number(mapInfo.lng),
    zoom: 1,
  });
useEffect(()=>{
  setViewport({
    width: 600,
    height: 400,
    latitude: Number(mapInfo.lat),
    longitude:  Number(mapInfo.lng),
    zoom: 1,
  })
},[mapInfo])
  return (
    <div className={styles.map}>
      <ReactMapGL
        mapboxApiAccessToken={process.env.MAP_API}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
        >
         <img src="/mark.png" alt="mark"/>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default MapData;
