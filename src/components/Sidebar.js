import React, { useEffect, useState } from 'react'
import Menu from '../icons/Menu'
import Walking from '../icons/Walking'
import Driving from '../icons/Driving'
import Arround from '../icons/Arround'

const Sidebar = (props) => {
  const {
    isWalking,
    setisWalking,
    isDriving,
    setisDriving,
    setShowSidebar,
    showSidebar,
  } = props

  const [originValue, setOriginValue] = useState("")
  const [destinationValue, setDestinationValue] = useState("")
  const [isOrigin, setIsOrigin] = useState(false)
  const [isDestination, setIsDestination] = useState(false)

  const handleDriving = () => {
    setisDriving(true)
    setisWalking(false)
  }

  const handleWalking = () => {
    setisDriving(false)
    setisWalking(true)
  }

  const handleFocusOrigin = () => {
    setIsOrigin(true)
    setIsDestination(false)
  }

  const handleFocusDestination = () => {
    setIsOrigin(false)
    setIsDestination(true)
  }


  return (
    <div>
      {showSidebar ? (
        <div className="absolute z-20 min-h-screen bg-zinc-700 w-96 max-w-xs">
          <div className="flex justify-between text-white mx-3 mt-2">
            <p className="text-xl">GIGLEMAPS</p>
            <button className="" onClick={() => setShowSidebar(!showSidebar)}>
              <Menu fill="bg-transparent" />
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute z-20 top-3 left-3">
          <div className="flex flex-row items-center">
            <div className="max-w-xs">
              <input type="text" placeholder="Type here"
                className={`input rounded-sm input-bordered h-10 w-full max-w-full`}
                onFocus={handleFocusOrigin} />
              <input type="text" placeholder="Type here"
                className={`input rounded-sm input-bordered h-10 w-full max-w-full `}
                onFocus={handleFocusDestination} />
            </div>
            <div className="flex flex-col mr-1 bg-white ">
              <button className=" bg-white rounded-sm" onClick={() => setShowSidebar(!showSidebar)}>
                <Menu fill="text-zinc-700 my-2 hover:text-zinc-900 w-10" />
              </button>
              <button className=" bg-white rounded-sm">
                <Arround />
              </button>
            </div>
            <div className="flex flex-col justify-center align-middle items-center p-2 bg-white h-20">
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
