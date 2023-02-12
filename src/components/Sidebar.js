import React, { useEffect, useState } from 'react'
import Menu from '../icons/Menu'
import Walking from '../icons/Walking'
import Driving from '../icons/Driving'
import Arround from '../icons/Arround'
import Xicon from '../icons/Xicon'
import axios from 'axios'

const Sidebar = (props) => {
  const {
    isWalking,
    setisWalking,
    isDriving,
    setisDriving,
    setShowSidebar,
    showSidebar,
    handleFocusOrigin,
    handleFocusDestination,
    isOrigin,
    isDestination,
    origin,
    destination
  } = props

  const [originValue, setOriginValue] = useState('')
  const [destinationValue, setDestinationValue] = useState('')
  const isModeTransport = isWalking ? "walking" : "driving"

  const handleDriving = () => {
    setisDriving(true)
    setisWalking(false)
  }

  const handleWalking = () => {
    setisDriving(false)
    setisWalking(true)
  }

  const handleChangeOrigin = (e) => {
    e.preventDefault()
    setOriginValue(`${origin.lat.toFixed(7).toString()},${origin.lng.toFixed(7).toString()}`)
  }

  const handleChangeDestination = (e) => {
    e.preventDefault()
    setDestinationValue(`${destination.lat.toFixed(7).toString()},${destination.lng.toFixed(7).toString()}`)
  }

  useEffect(() => {
    if (origin) {
      setOriginValue(`${origin.lat.toFixed(7).toString()},${origin.lng.toFixed(7).toString()}`)
    }
    if (destination) {
      setDestinationValue(`${destination.lat.toFixed(7).toString()},${destination.lng.toFixed(7).toString()}`)
    }
  }, [origin, destination]);

  const handleSwitchMarker = (e) => {
    e.preventDefault();
    setOriginValue(destinationValue)
    setDestinationValue(originValue)
  }


  const handleRequestDataRoute = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3500/api/v1/route-google', {
      origin: originValue,
      destination: destinationValue,
      mode: isModeTransport,
      polylineEncoding: 'GEO_JSON_LINESTRING',
      key: process.env.GOOGLE_MAPS_API
    }, {
      headers: {
        contentType: 'application/json'
      }
    })

    return response
  }


  return (
    <div>
      {showSidebar ? (
        <div className="absolute z-20 min-h-screen bg-zinc-700 w-6/12 max-w-md">
          <div className="flex justify-between text-white mx-3 mt-2">
            <p className="text-xl font-extrabold">GIGLEMAPS</p>
            <button className="" onClick={() => setShowSidebar(!showSidebar)}>
              <Xicon fill="bg-transparent" />
            </button>
          </div>
          <div className="flex flex-col justify-center w-full text-white px-3 mt-4">
            <p className="text-base">Origin : <strong>{originValue}</strong></p>
            <p className="text-base">Destination : <strong>{destinationValue}</strong></p>
            <p className="text-base">Drifing Status : <strong>{isDriving.toString()}</strong></p>
            <p className="text-base">Walking Status : <strong>{isWalking.toString()}</strong></p>
            <button type="submit"
              className="btn btn-outline border-white text-white btn-ghost w-full mt-6"
              onClick={handleRequestDataRoute}
            >Get Route</button>
          </div>
        </div>
      ) : (
        <div className="absolute z-20 top-3 left-3">
          <div className="flex flex-row items-center">
              <div className="max-w-xs bg-white h-[80.3px]">
                <input type="text" placeholder="Type here"
                  disabled={isOrigin ? true : false}
                  className={`input rounded-sm input-bordered h-[40.5px] w-full max-w-full text-sm`}
                  onFocus={handleFocusOrigin} value={originValue} onChange={handleChangeOrigin} />
                <input type="text" placeholder="Type here"
                  disabled={isDestination ? true : false}
                  className={`input rounded-sm input-bordered h-[40.5px] w-full max-w-full text-sm`}
                  onFocus={handleFocusDestination} value={destinationValue} onChange={handleChangeDestination} />
            </div>
              <div className="flex flex-col mr-1 bg-white w-8 -ml-2 justify-center items-center h-[80px]">
                <button className=" bg-white rounded-sm h-full" onClick={() => setShowSidebar(!showSidebar)}>
                <Menu fill="text-zinc-700 my-2 hover:text-zinc-900 w-10" />
              </button>
                <button className=" bg-white rounded-sm h-full" onClick={handleSwitchMarker}>
                <Arround />
              </button>
            </div>
              <div className="flex flex-col justify-center align-middle items-center p-2 bg-white min-h-[80px]">
              <button className={`${isDriving === true
                ? "w-full h-full rounded-full bg-blue-300"
                : "bg-white"} `}
                onClick={handleDriving}>
                <Driving fill={`hover:text-zinc-900 w-full `} />
              </button>
              <button className={`${isWalking === true
                ? "w-full h-full rounded-full bg-blue-300"
                : "bg-white"}`}
                onClick={handleWalking}>
                <Walking fill={`hover:text-zinc-900 w-full `} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Sidebar
