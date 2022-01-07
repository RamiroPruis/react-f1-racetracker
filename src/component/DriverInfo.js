import { useEffect,useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from 'axios'
import noProfile from '../img/noPic.png'
import {SCUDERIA_COLOR, DEFAULT_COLOR} from '../utils/utils'
import { useEmitter } from "../context/Emitter"

function DriverInfo({driver}) {
    const [searchParams,setSearchParams] = useSearchParams()
    const [profileImage,setProfileImage] = useState('')
    const [constructor,setConstructor] = useState({})
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
                const value = response.data.MRData.ConstructorTable.Constructors[0]
                setConstructor(value)
                setDataEvent(SCUDERIA_COLOR[value.constructorId] || DEFAULT_COLOR)
            })
    },[])


    return (
        <div className="flex group transition-all hover:scale-125 hover:cursor-default items-center space-x-2">
            <span className="transition-all scale-0 fixed right-24 group-hover:scale-100 text-white  font-f1 w-40 bg-slate-800 rounded-md drop-shadow-md pr-5 pl-5">
                <h2>{driver.givenName} {driver.familyName}</h2>
                <h3 className="inline-block text-xs text-slate-200">{constructor.name}</h3>
                <div className="inline-block w-2 h-2 rounded-full ml-2" style={{backgroundColor: `${SCUDERIA_COLOR[constructor.constructorId] || DEFAULT_COLOR}`}}></div>
            </span>
            <div className=" hidden md:block rounded-full h-10 w-10 ">
             <img className={` rounded-full h-10 w-10 object-cover border-gray-500' border-2`} style={{borderColor: `${SCUDERIA_COLOR[constructor.constructorId] || DEFAULT_COLOR}`}} src={profileImage} alt=""/>
            </div>
            <h1 className=" text-left font-f1 font-semibold w-10 over">{driver.code || driver.familyName}</h1>
        </div>
    )
}

export default DriverInfo
