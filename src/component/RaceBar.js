function RaceBar({color,position,actualLap,laps}) {
    const p = actualLap*100/laps


    return (
        <div className='h-8 w-full'>
            <div className={` transition-all duration-1000 ${color} h-8`} style={{width: `${p.toFixed(1)}%`}}>
            </div>
        </div>
    )
}

export default RaceBar
