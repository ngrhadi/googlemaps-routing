import { GoogleMap, MarkerF } from '@react-google-maps/api'
import Sidebar from './Sidebar';
import { useCallback, useEffect, useState } from 'react';

const Map = (props) => {
  const [isOrigin, setIsOrigin] = useState(false)
  const [isDestination, setIsDestination] = useState(false)
  const [origin, setOrigin] = useState({
    lat: 0,
    lng: 0,
  })

  const handleFocusOrigin = () => {
    setIsOrigin(true)
    setIsDestination(false)
  }

  const handleFocusDestination = () => {
    setIsOrigin(false)
    setIsDestination(true)
  }

  const [destination, setDestination] = useState({
    lat: 0,
    lng: 0,
  })
  const [arrayMarker, setArrayMarker] = useState([])

  const handleArrayMarker = useCallback(() => {
    setArrayMarker([origin, destination])
  }, [origin, destination])

  // const [map, setMap] = useState(null)
  // const onLoad = useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(props.center);
  //   map.fitBounds(bounds);
  // }, [])

  useEffect(() => {
    if (props.lat && props.lng) {
      handleArrayMarker()
    }
  }, [handleArrayMarker, props.lng, props.lat])

  useEffect(() => {
    if (isOrigin === true) {
      setOrigin({
        lat: props.lat,
        lng: props.lng
      })
    }
    if (isDestination === true) {
      setDestination({
        lat: props.lat,
        lng: props.lng
      })
    }

    return (() => { })
  }, [isOrigin, isDestination, props.lng, props.lat]);

  return (
    <div className="min-h-screen">
      <Sidebar
        isWalking={props.isWalking}
        setisWalking={props.setisWalking}
        isDriving={props.isDriving}
        setisDriving={props.setisDriving}
        setShowSidebar={props.setShowSidebar}
        showSidebar={props.showSidebar}
        longitude={props.lng}
        latitude={props.lat}
        handleFocusOrigin={handleFocusOrigin}
        handleFocusDestination={handleFocusDestination}
        isOrigin={isOrigin}
        isDestination={isDestination}
        origin={origin}
        destination={destination}
      />

      <GoogleMap
        ref={props.googlemaps}
        zoom={props.zoom}
        onClick={props.handleMoveMarker}
        options={props.options}
        center={props.center}
        // onLoad={onLoad}
        mapContainerStyle={props.containerStyle}
      >
        {arrayMarker.map((v, i) => (
          <MarkerF
            key={i}
            {...props}
            position={v}
            draggable={true}
            onDragEnd={props.handleDragMarker}
          >
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  )
}

export default Map;
