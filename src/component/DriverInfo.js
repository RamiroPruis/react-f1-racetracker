import { useEffect,useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from 'axios'
import noProfile from '../img/noPic.png'
import {SCUDERIA_COLOR, DEFAULT_COLOR} from '../utils/utils'
import { useEmitter } from "../context/Emitter"

function DriverInfo({driver}) {
    const [searchParams,setSearchParams] = useSearchParams()
    const [profileImage,setProfileImage] = useState('')
    const [scuderiaId,setScuderiaId] = useState('')
    const {setDataEvent} = useEmitter()


        

 
    useEffect(()=>{
        const wikiId = driver.url.split('/').pop()
        
        axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&titles=${wikiId}&prop=pageimages&format=json&pithumbsize=100`)
            .then((wikiData)=>{
                
                const pageID = Object.keys(wikiData.data.query.pages)
                const imgSource = wikiData.data.query.pages[pageID].thumbnail.source
                setProfileImage(imgSource)
            })
            .catch(()=>{
                setProfileImage(noProfile)
            })
        
        
        
    },[driver.url])

    useEffect(()=>{
        axios.get(`http://ergast.com/api/f1/${searchParams.get('year')}/${searchParams.get('race')}/drivers/${driver.driverId}/constructors.json`)
            .then(response=>{
                const value = response.data.MRData.ConstructorTable.Constructors[0].constructorId
                setScuderiaId(value)
                setDataEvent(SCUDERIA_COLOR[value] || DEFAULT_COLOR)
            })
    },[])


    return (
        <div className="flex transition-all hover:scale-125 hover:cursor-default items-center space-x-2 w-28">
            <div className=" hidden md:block rounded-full h-10 w-10 ">
             <img className={` rounded-full h-10 w-10 object-cover border-gray-500' border-2`} style={{borderColor: `${SCUDERIA_COLOR[scuderiaId] || DEFAULT_COLOR}`}} src={profileImage} alt=""/>
            </div>
            <h1 className=" text-left font-f1 font-semibold">{driver.code || driver.familyName}</h1>
        </div>
    )
}

export default DriverInfo
