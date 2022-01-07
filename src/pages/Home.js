import {useState} from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { useRaces } from '../hooks/useRaces'
import { useSeasons } from '../hooks/useSeasons'
import Footer from '../component/Footer'

function Home() {
    const {seasons} = useSeasons()
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear().toString())
    const {circuits} = useRaces(yearSelected)
    const navigate = useNavigate()

    let raceSelected = ''

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        navigate({
            pathname:'/view',
            search: `?${createSearchParams({year:yearSelected,race:raceSelected})}`
        })
        
    }


    return (
        <div className='grid place-content-center bg-red-800 text-white h-screen w-screen overflow-auto '>
            
            <div className='w-96 space-y-3'>
                <h1 className='text-left text-6xl font-bold '>F1 RACETRACKER</h1>
                <p className='w-fit text-justify'>Replay your favorites races <strong className=' font-f1'>lap by lap!</strong>. Just select the year and the race and see the animation <i>(for now only works for races of 1996 or above)</i>.</p>
            </div>

            {/* Race Selection Form */}
            <form className=' flex flex-col pt-5 items-center text-left  space-y-10' onSubmit={handleSubmit}>
                <label className='flex flex-col'>
                    Select a year
                    <select className='w-32 rounded-md px-3 py-2 text-center text-black' onChange={(e)=> {setYearSelected(e.target.value)}}>
                        {
                             seasons.map(year =>
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

            <div className='bg-black h-28 w-screen fixed bottom-0'>
                <Footer />
            </div>
        </div>
    )
}

export default Home
