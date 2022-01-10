
import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'

export const useRaceInfo = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const [race,setRace] = useState({})
    const [positions,setPositions] = useState({})
    const [allDriversInfo,setAllDriversInfo] = useState([])
    const [drivers,setDrivers] = useState([])
    const navigate = useNavigate()
    
    useEffect(()=>{
        axios.get(`https://ergast.com/api/f1/${searchParams.get('year')}/${searchParams.get('race')}/laps.json?limit=11000`)
        .then(res => {
            const race = res.data.MRData.RaceTable.Races[0]
            
            if(race){
                setRace(race)
                setDrivers(race.Laps[0].Timings)
                let position = {}
                race.Laps[0].Timings.forEach((d)=>{
                   position[d.driverId] = Number(d.position)
                 })
                setPositions(position)
            }
            //error
            else 
                navigate('/error', {replace: true})
        })

        axios.get(`https://ergast.com/api/f1/${searchParams.get('year')}/${searchParams.get('race')}/drivers.json`)
        .then(res=>{
            const driverInfo = res.data.MRData.DriverTable.Drivers
            setAllDriversInfo(driverInfo)
        })

        
    },[searchParams,navigate])



    return {
        race,
        positions,
        setPositions,
        allDriversInfo,
        drivers,
    }

}