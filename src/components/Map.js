import { GoogleMap, MarkerF } from '@react-google-maps/api'
import Sidebar from './Sidebar';

const Map = (props) => {
  if (!props.isLoaded) return <div>Loading...</div>
  return (
    <div className="min-h-screen">
      <Sidebar
        isWalking={props.isWalking}
        setisWalking={props.setisWalking}
        isDriving={props.isDriving}
        setisDriving={props.setisDriving}
        setShowSidebar={props.setShowSidebar}
        showSidebar={props.showSidebar}
      />

      <GoogleMap
        ref={props.googlemaps}
        zoom={props.zoom}
        onClick={props.handleMoveMarker}
        options={props.options}
        center={props.center}
        mapContainerStyle={props.containerStyle}
      >
        <MarkerF
          {...props}
          position={props.markers}
          draggable={true}
          onDragEnd={props.handleDragMarker}
        >
        </MarkerF>
      </GoogleMap>
    </div>
  )
}

export default Map;
