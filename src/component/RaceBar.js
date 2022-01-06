import { useEmiiter } from "../context/Emitter"

function RaceBar({position,actualLap,laps}) {
    const p = actualLap*100/laps
    const {data: color} = useEmiiter()

    return (
        <div className='h-8 w-full'>
            <div className={`transition-all h-8`} style={{width: `${p.toFixed(1)}%`, backgroundColor: `${color}`}}>
            </div>
        </div>
    )
}

export default RaceBar
