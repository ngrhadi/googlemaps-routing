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
    destination,
    setIsGenerateLine,
    setPathLine
  } = props

  const [showModal, setShowModal] = useState(false)
  const [isSuccessGetRoutes, setIsSuccessGetRoutes] = useState(false)
  const [isSuccesStore, setIsSuccessStore] = useState(true)
  const [storeData, setStoreData] = useState({})
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
    setOriginValue(`${origin.lat.toString()},${origin.lng.toString()}`)
  }

  const handleChangeDestination = (e) => {
    e.preventDefault()
    setDestinationValue(`${destination.lat.toString()},${destination.lng.toString()}`)
  }

  useEffect(() => {
    if (origin) {
      setOriginValue(`${origin.lat.toString()},${origin.lng.toString()}`)
    }
    if (destination) {
      setDestinationValue(`${destination.lat.toString()},${destination.lng.toString()}`)
    }
  }, [origin, destination]);


  const handleSwitchMarker = (e) => {
    e.preventDefault();
    setOriginValue(destinationValue)
    setDestinationValue(originValue)
  }

  const handleRequestDataRoute = async (e) => {
    e.preventDefault();
    const fetching = await axios.post('http://localhost:3500/api/v1/route-google', {
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
    setShowSidebar(false);

    if (fetching.statusText === "OK") {
      setIsGenerateLine(true)
      setPathLine(fetching.data.polyline)
      setStoreData(fetching.data)

      setShowModal(true)
      setIsSuccessGetRoutes(true)
    } else {
      setIsSuccessGetRoutes(false)
    }

    return fetching
  }

  const routesData = storeData?.response?.routes.map(e => e)[0]

  console.log(routesData, "routes data")

  const handleStoreToDB = async (e) => {
    e.preventDefault();
    const json = {
      x1: parseFloat(origin.lat),
      y1: parseFloat(origin.lng),
      x2: parseFloat(destination.lat),
      y2: parseFloat(destination.lng),
      distance: await routesData.legs.map(e => e.distance.text)[0],
      duration: await routesData.legs.map(e => e.duration.text)[0],
      route: await routesData.overview_polyline.points,
      code: (Math.floor(100000 + Math.random() * 900000)).toString(),
    }

    const store = await axios.post('http://localhost:3500/api/v1/store-data/', {
      ...json
    }, {
      headers: {
        contentType: 'application/json'
      }
    })

    console.log(store)
    setIsSuccessStore(false)
    setTimeout(() => {
      setIsSuccessStore(false)
      if (store.statusText === 'OK') {
        setShowModal(false)
        setIsSuccessStore(true)
      } else {
        setShowModal(false)
        setIsSuccessStore(true)
      }
      setShowModal(false)
    }, 5000);

    return store
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
            <button htmlFor="confirm-db" type="submit"
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

      {showModal && isSuccessGetRoutes === true && (
        <>
          <div className="fixed w-screen h-screen z-20 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="absolute z-30 card w-screen h-screen px-72 shadow-xl">
            <div className="flex flex-col justify-center h-full items-center">
              <div className='bg-white w-[28rem] h-[24rem] p-4'>
                <div className="h-full">
                  <p className="text-lg font-bold">
                    Your Data Travel
                  </p>
                  <div className='w-full max-h-full flex flex-col'>
                    <p className="text-sm font-semibold pt-3">Sumary Route</p>
                    <p className="text-sm font-light mb-1">{routesData?.summary}</p>
                    <p className="text-sm font-semibold">Distance</p>
                    <p className="text-sm font-light mb-1">{routesData?.legs.map(e => e.distance.text)[0]}</p>
                    <p className="text-sm font-semibold">Duration</p>
                    <p className="text-sm font-light mb-1">{routesData.legs.map(e => e.duration.text)[0]}</p>
                    <p className="text-sm font-semibold">Mode Transportation</p>
                    <p className="text-sm font-light mb-1 capitalize">{isModeTransport}</p>
                  </div>
                  <div className='sticky mt-6'>
                    <div className='bottom-0 w-full max-h-full flex flex-col justify-center items-center'>
                      <p className="text-xs italic pt-5">Are You Wanna Save This Data on Data Base ?</p>
                      <button className={`btn btn-sm hover:cursor-pointer w-full ${isSuccesStore ? '' : 'loading'}`}
                        onClick={handleStoreToDB}>Confirm</button>
                      <button className={`btn btn-sm btn-ghost hover:cursor-pointer w-full`}
                        onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showModal && isSuccessGetRoutes === false && (
        <>
          <div className="fixed w-screen h-screen z-20 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="absolute z-30 card w-screen h-screen px-72 shadow-xl">
            <div className="flex flex-col justify-center h-full items-center">
              <div className='bg-white w-1/2 h-1/2 p-4'>
                <p className="text-lg font-semibold">
                  Something Wrong
                </p>
                <button className={`btn btn-error btn-sm w-full hover:cursor-pointer`} onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default Sidebar
