import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFlagCheckered, faPause, faUndo} from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import DriverInfo from "../component/DriverInfo"
import RaceBar from "../component/RaceBar"
import Emitter from "../context/Emitter"




function View() {
    const [searchParams,setSearchParams] = useSearchParams()
    const [actualLap,setActualLap] = useState(0)
    const [race,setRace] = useState({})
    const [drivers,setDrivers] = useState([])
    const [allDriversInfo,setAllDriversInfo] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [laps,setLaps] = useState([])
    const [intervalID,setIntervalID] = useState(0)
    const [positions,setPositions] = useState({})

    const searchDriver=(id)=>{
        return allDriversInfo.find(driver => driver.driverId === id)
    }

    const handleAnimation= () =>{
        let actual = 0
        setActualLap(prev => {
            actual = prev + 1
            return actual})
        

        if (actual === laps.length){
            setIsClicked(false)
            
            setIntervalID(prev => {
                clearInterval(prev)
                return 0
            })
        }

        
    }

    const handleClick = () => {   
        
        if (!isClicked){
        
        const newIntervalId = setInterval(handleAnimation,800)
        setIntervalID(newIntervalId)
        }else{
            clearInterval(intervalID)
            setIntervalID(0)
        }
        
        setIsClicked(!isClicked)
    }

    

    useEffect(()=>{
        axios.get(`http://ergast.com/api/f1/${searchParams.get('year')}/${searchParams.get('race')}/laps.json?limit=11000`)
        .then(res => {
            const race = res.data.MRData.RaceTable.Races[0]
            setRace(race)
            setDrivers(race.Laps[0].Timings)
            let position = {}
            race.Laps[0].Timings.forEach((d)=>{
                position[d.driverId] = Number(d.position)
            })
            setPositions(position)
        })

        axios.get(`http://ergast.com/api/f1/${searchParams.get('year')}/${searchParams.get('race')}/drivers.json`)
        .then(res=>{
            const driverInfo = res.data.MRData.DriverTable.Drivers
            setAllDriversInfo(driverInfo)
        })
        
    },[searchParams])

    useEffect(()=>{
        if(Object.keys(race).length){
            setLaps(race.Laps)
        
        }
    },[race])
    
    console.log({race})
    console.log({laps})
    useEffect(()=>{
        if(laps[actualLap]){
            let actualPositions = positions
            laps[actualLap].Timings.forEach((lap)=>{
                actualPositions[lap.driverId] = lap.position
            })
            setPositions(positions)
        }
        

    },[actualLap,laps,positions])

    return (
        
        <div className=" bg-slate-200 h-screen w-screen grid grid-cols-3">
            <div className="flex flex-col justify-center items-center space-y-8 w-[40%]">
                <button className=" text-white transition-all w-15 rounded-full px-4 py-4 bg-gradient-to-r drop-shadow-md shadow-indigo-500  from-indigo-900 to-violet-800 hover:scale-110 active:scale-100" onClick={handleClick}>
                    {
                        !isClicked ? (
                            <div className="flex place-items-center font-f1 space-x-2">
                                <p>Start</p>
                                <FontAwesomeIcon icon={faFlagCheckered}/>
                            </div>
                        ) :
                        (
                            <div className="flex place-items-center font-f1 space-x-2">
                                <p>Pause</p>
                                <FontAwesomeIcon icon={faPause} />
                            </div>
                        )
                    }
                </button>

                <button className='group text-white transition-all w-15 rounded-full px-4 py-4 bg-gradient-to-r drop-shadow-md shadow-indigo-500  from-indigo-900 to-violet-800 hover:scale-110 active:scale-100' onClick={()=> setActualLap(0)}>
                    <div className="flex place-items-center font-f1 space-x-2">
                        <p>Restart</p>
                        <FontAwesomeIcon className='transition-all duration-500 group-hover:-rotate-[360deg]'icon={faUndo} />
                    </div>
                </button>
            </div>
            <div className=" grid place-items-center w-full">
                <h1 className=" font-bold text-3xl">{race.season} {race.raceName?.toUpperCase()} </h1>
                <h2 className=" font-bold text-xl"> Lap {actualLap} / {laps.length}</h2>
                 <div className=" flex flex-col  w-full">
                {   allDriversInfo.length ? (
                    drivers.map(driver => 
                    <div className= 'flex space-x-3 ' key={`${race.season}${race.raceName}${driver.driverId}`} >
                         <Emitter>
                             <DriverInfo className= 'flex-1 'driver={searchDriver(driver.driverId)}  />
                             <RaceBar  className='flex-2'  position={positions[driver.driverId]} actualLap={actualLap} laps={laps.length}></RaceBar>
                        </Emitter>
                    </div>
                    )
                )
                        :
                        <div></div>
                }
                </div>
            </div>
        </div>
    )
}

export default View
