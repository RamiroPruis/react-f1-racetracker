import { useEffect,useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from 'axios'
import noProfile from '../img/noPic.png'
import {SCUDERIA_COLOR} from '../utils/utils'
import { useEmiiter } from "../context/Emitter"

function DriverInfo({id}) {
    const [searchParams,setSearchParams] = useSearchParams()
    const [driverName,setDriverName] = useState('')
    const [profileImage,setProfileImage] = useState('')
    const [scuderiaId,setScuderiaId] = useState('')
    const {setDataEvent} = useEmiiter()

    const fetchData = ()=>{
        axios.get(`http://ergast.com/api/f1/drivers/${id}.json`)
        .then((response)=>{
            const driverData = response.data.MRData.DriverTable.Drivers.pop()
            setDriverName(driverData.code)
            const wikiId = driverData.url.split('/').pop()
            axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&titles=${wikiId}&prop=pageimages&format=json&pithumbsize=100`)
            .then((wikiData)=>{
                const pageID = Object.keys(wikiData.data.query.pages)
                const imgSource = wikiData.data.query.pages[pageID].thumbnail.source
                setProfileImage(imgSource)
            })
            .catch((e)=>{
                setProfileImage(noProfile)
            })
        })

        axios.get(`http://ergast.com/api/f1/${searchParams.get('year')}/drivers/${id}/constructors.json`)
            .then(response=>{
                const value = response.data.MRData.ConstructorTable.Constructors[0].constructorId
                setScuderiaId(value)
                setDataEvent(SCUDERIA_COLOR[value])
            })
    }


    useEffect(()=>{
        fetchData()
    },)


    return (
        <div className="flex items-center space-x-2 w-28">
            <div className="rounded-full h-10 w-10 ">
             <img className={` rounded-full h-10 w-10 object-cover border-gray-500' border-2`} style={{borderColor: `${SCUDERIA_COLOR[scuderiaId]}`}} src={profileImage} alt=""/>
            </div>
            <h1 className=" text-left font-f1 font-semibold">{driverName}</h1>
        </div>
    )
}

export default DriverInfo
