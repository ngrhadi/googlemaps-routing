import { useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { lazyLoader } from './laziLoader';

const Map = lazyLoader(() => import('./Map'));

const libraries = ['places'];

const MapRender = (props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API,
    libraries,
  });
  const [lat, setLat] = useState(-1);
  const [lng, setLng] = useState(120);
  const [zoom, setZoom] = useState(10);
  const [markers, setMarkers] = useState(null)
  const [isWalking, setisWalking] = useState(false)
  const [isDriving, setisDriving] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)

  const center = useMemo(
    () => ({
      lat: lat,
      lng: lng,
    }),
    [lat, lng]
  );


  const handleMoveMarker = (e) => {
    let newLat = e.latLng.toJSON().lat;
    let newLng = e.latLng.toJSON().lng;
    setLat(newLat);
    setLng(newLng);
  };

  const handleDragMarker = (e) => {
    let newLat = e.latLng.toJSON().lat;
    let newLng = e.latLng.toJSON().lng;
    setLat(newLat);
    setLng(newLng);
  };

  const getCurrentLocation = () => navigator.geolocation.getCurrentPosition(function (position) {
    let newLat = parseInt(position.coords.latitude);
    let newLng = parseInt(position.coords.longitude);
    setLat(newLat);
    setLng(newLng);
  })

  useEffect(() => {
    getCurrentLocation()
  }, [])

  useEffect(() => {
    if (lat && lng) {
      setMarkers({ lat, lng })
      setZoom(10)
    }
    return (() => { })
  }, [lat, lng]);

  const options = {
    zoomControlOptions: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    scrollZoomControl: true,
  };

  const containerStyle = {
    minWidth: "100vh",
    height: "100vh",
  };
  const googlemaps = useRef(null);

  return (
    <>
      <Map
        zoom={zoom}
        googlemaps={googlemaps}
        isLoaded={isLoaded}
        markers={markers}
        handleMoveMarker={handleMoveMarker}
        center={center}
        containerStyle={containerStyle}
        lat={lat}
        lng={lng}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        isWalking={isWalking}
        setisWalking={setisWalking}
        isDriving={isDriving}
        setisDriving={setisDriving}
        handleDragMarker={handleDragMarker}
        isSearchBar={true}
        markerOnClick={true}
        options={options}
        isSearchEnable={true}

      />
    </>
  )
}

export default MapRender
