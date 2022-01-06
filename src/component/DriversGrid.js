import DriverInfo from "../component/DriverInfo"
import RaceBar from "../component/RaceBar"
import Emitter from "../context/Emitter"
import FinishLine from "./FinishLine"

function DriversGrid({actualLap,allDriversInfo,race,positions,laps,drivers}) {
    

    const searchDriver=(id)=>{
        return allDriversInfo.find(driver => driver.driverId === id)
    }


    return (
        <div className=" grid place-items-center w-full">

                <h1 className=" font-bold text-3xl">{race.season} {race.raceName?.toUpperCase()} </h1>
                <h2 className=" font-bold text-xl"> Lap {actualLap} / {laps.length}</h2>

        
                {/* All drivers */}
                    <div className=" flex flex-col w-[100%]">
                {   allDriversInfo.length ? (
                    drivers.map(driver => 
                    <div className= ' flex space-x-3 ' key={`${race.season}${race.raceName}${driver.driverId}`} >
                        <Emitter>
                                <DriverInfo className= ' flex-1  'driver={searchDriver(driver.driverId)}  />
                            <RaceBar  className='flex-2'  position={positions[driver.driverId]} actualLap={actualLap} laps={laps.length}></RaceBar>
                        </Emitter>
                    </div>
                    )
                )
                    :
                        <div></div>
                }
                      
                 </div>
            </div>
    )
}

export default DriversGrid
