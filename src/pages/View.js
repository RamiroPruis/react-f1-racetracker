import { useState, useEffect } from "react"
import Sidebar from "../component/Sidebar"
import DriversGrid from "../component/DriversGrid"
import { useRaceInfo } from '../hooks/useRaceInfo'



function View() {
    const [laps,setLaps] = useState([])
    const [actualLap,setActualLap] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const [intervalID,setIntervalID] = useState(0)
    const {race,positions,setPositions,allDriversInfo,drivers} = useRaceInfo()

    useEffect(()=>{
        if(Object.keys(race).length){
            setLaps(race.Laps)
        
        }
    },[race])

    useEffect(()=>{
        if(laps[actualLap]){
            let actualPositions = positions
            laps[actualLap].Timings.forEach((lap)=>{
                actualPositions[lap.driverId] = lap.position
            })
            setPositions(positions)
        }
        
        return () =>{
            setPositions([])
        }
    },[actualLap,laps,positions,setPositions])
    

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
            if (actualLap===laps.length)
                setActualLap(0)
            const newIntervalId = setInterval(handleAnimation,800)
            setIntervalID(newIntervalId)
        }else{
            clearInterval(intervalID)
            setIntervalID(0)
        }   
        setIsClicked(!isClicked)
    }

    

    return (
        
        <div className=" bg-slate-200 h-screen w-screen overflow-auto grid grid-cols-3">
            <Sidebar isClicked={isClicked} onClick={handleClick} setActualLap={setActualLap} />

            {/* Main Animation div */}
            <DriversGrid actualLap={actualLap} allDriversInfo={allDriversInfo} race={race} positions={positions} laps={laps} drivers={drivers}/>
            
    
        </div>
    )
}

export default View
