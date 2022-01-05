import { useEffect,useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from 'axios'
import noProfile from '../img/noPic.png'

function DriverInfo({id}) {
    const [searchParams,setSearchParams] = useSearchParams()
    const [driverName,setDriverName] = useState('')
    const [profileImage,setProfileImage] = useState('')
    

    const fetchData = ()=>{
        axios.get(`http://ergast.com/api/f1/drivers/${id}.json`)
        .then((response)=>{
            const driverData = response.data.MRData.DriverTable.Drivers.pop()
            setDriverName(driverData.code)
            const wikiId = driverData.url.split('/').pop()
            axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&titles=${wikiId}&prop=pageimages&format=json&pithumbsize=100`)
            .then((wikiData)=>{
                console.log({wikiData})
                const pageID = Object.keys(wikiData.data.query.pages)
                const imgSource = wikiData.data.query.pages[pageID].thumbnail.source
                setProfileImage(imgSource)
            })
            .catch((e)=>{
                setProfileImage(noProfile)
            })
        })

        
    }


    useEffect(()=>{
        fetchData()
    },)

    /*
    useEffect(()=>{
        const wikiId = driverName.url.split('/').pop()
        console.log(wikiId)
        fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&titles=${wikiId}&prop=pageimages&format=json&pithumbsize=100`)
        .then(data => data.json())
        .then(res =>{
            console.log({res})
        })
    },[]) 
    
    */
    return (
        <div className="flex items-center space-x-2 w-28">
            <div className="rounded-full h-10 w-10 ">
             <img className=' rounded-full h-10 w-10 object-cover border-slate-500 border-2' src={profileImage} alt=""/>
            </div>
            <h1 className=" text-left font-f1 font-semibold">{driverName}</h1>
        </div>
    )
}

export default DriverInfo
