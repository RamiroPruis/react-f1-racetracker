import { useEmitter } from "../context/Emitter"
import {POSITION_MULTIPLIER} from '../utils/utils'
function RaceBar({position,actualLap,laps}) {
    const p = actualLap*100/laps * POSITION_MULTIPLIER[position-1]
    const {data: color} = useEmitter()

    return (
        <div className='h-8 w-full'>
            <div className={`flex justify-end items-center transition-all duration-700 h-8 rounded-md`} style={{width: `${p.toFixed(1)}%`, backgroundColor: `${color}`}}>
                {   actualLap ? 
                    <div className="grid place-content-center bg-slate-800 text-white  h-5 w-5 rounded-full">{position}</div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default RaceBar
