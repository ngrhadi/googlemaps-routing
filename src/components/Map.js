import { GoogleMap, MarkerF, PolylineF } from '@react-google-maps/api'
import Sidebar from './Sidebar';
import { useCallback, useEffect, useState } from 'react';

const Map = (props) => {
  const [isOrigin, setIsOrigin] = useState(false)
  const [isDestination, setIsDestination] = useState(false)
  const [isGenerateLine, setIsGenerateLine] = useState(false)
  const [origin, setOrigin] = useState({
    lat: 0,
    lng: 0,
  })
  const [destination, setDestination] = useState({
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

  const [arrayMarker, setArrayMarker] = useState([{
    lat: 0,
    lng: 0,
  }])

  const handleArrayMarker = useCallback(() => {
    setArrayMarker([{
      lat: origin.lat,
      lng: origin.lng
    },
    {
      lat: destination.lat,
      lng: destination.lng
    }
    ])
  }, [origin, destination])

  useEffect(() => {
    if (props.lat && props.lng) {
      handleArrayMarker()

    }
  }, [handleArrayMarker, props.lng, props.lat])

  useEffect(() => {
    if (isOrigin === true && isDestination === false) {
      setOrigin({
        lat: props.lat,
        lng: props.lng
      })
    }
    if (isDestination === true && isOrigin === false) {
      setDestination({
        lat: props.lat,
        lng: props.lng
      })
    }

    return (() => { })
  }, [isOrigin, isDestination, props.lng, props.lat]);


  const [pathLine, setPathLine] = useState([]);

  const options = {
    strokeColor: '#27272a',
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: '#FF0000',
    fillOpacity: 1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    // radius: 30000,
    location: pathLine,
    zIndex: 99,
  };


  return (
    <div className="min-h-screen">
      <Sidebar
        isWalking={props.isWalking}
        setisWalking={props.setisWalking}
        isDriving={props.isDriving}
        setisDriving={props.setisDriving}
        setShowSidebar={props.setShowSidebar}
        showSidebar={props.showSidebar}
        handleFocusOrigin={handleFocusOrigin}
        handleFocusDestination={handleFocusDestination}
        setIsGenerateLine={setIsGenerateLine}
        isOrigin={isOrigin}
        setPathLine={setPathLine}
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
        mapContainerStyle={props.containerStyle}
      >
        {(arrayMarker).map((v, i) => (
          <MarkerF
            key={i}
            {...props}
            position={v}
            draggable={true}
            onDragEnd={props.handleDragMarker}
          >
          </MarkerF>
        ))}

        {isGenerateLine && (
          <PolylineF
            // {...props}
            path={pathLine}
            options={options}
          ></PolylineF>
        )}

      </GoogleMap>
    </div>
  )
}

export default Map;
