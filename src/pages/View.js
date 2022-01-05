import axios from "axios"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import DriverInfo from "../component/DriverInfo"
import RaceBar from "../component/RaceBar"
import Emitter from "../context/Emitter"


function View() {
    const [searchParams,setSearchParams] = useSearchParams()
    const [actualLap,setActualLap] = useState(70)
    const [race,setRace] = useState([])
    const [drivers,setDrivers] = useState([])


    useEffect(()=>{
        axios.get(`http://ergast.com/api/f1/${searchParams.get('year')}/${searchParams.get('race')}/laps.json?limit=11000`)
        .then(res => {
            const race = res.data.MRData.RaceTable.Races[0]
            setRace(race)
            setDrivers(race.Laps[0].Timings.map(d => d.driverId))
            
        })
        
    },[searchParams])


    return (
        
        <div className=" bg-slate-200 h-screen w-screen flex flex-col justify-center items-center">
            <h1 className=" font-bold text-3xl">{race.season} {race.raceName?.toUpperCase()} </h1>
            <div className=" flex flex-col  w-[60%]">
            {
                drivers.map(driver => 
                <div className= 'flex space-x-3' key={`${race.season}${race.raceName}${driver}`} >
                    <Emitter>
                        <DriverInfo className= 'flex-1 'id={driver}  />
                        <RaceBar  className='flex-2'  actualLap={actualLap} laps={70}></RaceBar>
                    </Emitter>
                </div>
                )
            }
            </div>
        </div>
    )
}

export default View
