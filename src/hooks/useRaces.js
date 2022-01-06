import { useEffect, useState } from "react"
import axios from 'axios'



export const useRaces = (yearSelected) =>{
    const [circuits,setCircuits] = useState([])

    useEffect(() => {
        if (yearSelected){
            axios.get(`http://ergast.com/api/f1/${yearSelected}.json`)
            .then(res =>{
            setCircuits(res.data.MRData.RaceTable.Races)
            })
        }
    }, [yearSelected])


    return {
        circuits
    }
}