import {useState, useEffect} from 'react'
import { Link, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom'

function Home() {
    const [years, setYears] = useState([])
    const [circuits,setCircuits] = useState([])
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear().toString())
    const navigate = useNavigate()

    let raceSelected = ''

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        navigate({
            pathname:'/view',
            search: `?${createSearchParams({year:yearSelected,race:raceSelected})}`
        })
        
    }

    useEffect(() => {
        fetch('http://ergast.com/api/f1/seasons.json?limit=100')
        .then(data=> data.json())
        .then(res => {
            const reverse = res.MRData.SeasonTable.Seasons.reverse()
            setYears(reverse.map(s=> s.season))
        })
    }, [])

    useEffect(() => {
        if (yearSelected){
            fetch(`http://ergast.com/api/f1/${yearSelected}.json`)
            .then(data=>data.json())
            .then(res =>{
            setCircuits(res.MRData.RaceTable.Races)
            })
        }
    }, [yearSelected])


    return (
        <div className='grid place-content-center bg-red-800 text-white h-screen '>
            
            <div className='justify-left space-y-3'>
                <h1 className=' text-6xl font-bold '>F1 RACETRACKER</h1>
                <p className=' w-96 text-left'>Replay your favorites races <strong className=' font-f1'>lap by lap!</strong>. Just select the year and the race and see the animation</p>
            </div>

            <form className=' flex flex-col pt-5 items-center text-left  space-y-10' onSubmit={handleSubmit}>
                <label className='flex flex-col'>
                    Select a year
                    <select className='w-32 rounded-md px-3 py-2 text-center text-black' onChange={(e)=> {setYearSelected(e.target.value)}}>
                        {
                             years.map(year =>
                                <option key={year} value={year}>{year}</option>
                             )
                        }
                    </select>
                </label>
                
                <label className='flex flex-col'>
                    Select a Race
                <select className=' w-60 rounded-md px-3 py-2 text-center text-black' onChange={(e)=> {raceSelected = e.target.value}}>
                    {
                        circuits.map(circuit =>
                            <option key={circuit.date} value={circuit.round}>{circuit.round}. {circuit.raceName}</option>    
                        )
                    }
                </select>
                </label>
                
                <button type='submit' className='transition-all w-32 rounded-md px-4 py-3 bg-gradient-to-r from-indigo-900 to-violet-800 hover:scale-110 active:scale-100 '>
                 Replay race!
                </button>
                
            </form>
        </div>
    )
}

export default Home
