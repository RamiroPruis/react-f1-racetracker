import { useEffect, useState } from "react"
import axios from 'axios'

export const useSeasons = ()=> {
    const [seasons,setSeasons] = useState([])
    
    useEffect(() => {
        axios.get('https://ergast.com/api/f1/seasons.json?limit=100')
        .then(res => {
            const reverse = res.data.MRData.SeasonTable.Seasons.reverse()
            setSeasons(reverse.map(s=> s.season).filter(s => s >= 1996))
        })
        
    }, [])

    return {
        seasons
    }
}