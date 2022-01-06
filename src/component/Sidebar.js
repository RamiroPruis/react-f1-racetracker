import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFlagCheckered, faPause, faUndo} from '@fortawesome/free-solid-svg-icons'


function Sidebar({isClicked,onClick,setActualLap}) {
    return (
        <div className=" bg-slate-400 flex flex-col justify-center items-center space-y-8 w-[40%]">
                <button className=" text-white transition-all w-15 rounded-full px-4 py-4 bg-gradient-to-r drop-shadow-md shadow-indigo-500  from-indigo-900 to-violet-800 hover:scale-110 active:scale-100" onClick={onClick}>
                    {
                        !isClicked ? (
                            <div className="flex place-items-center font-f1 space-x-2">
                                <p>Start</p>
                                <FontAwesomeIcon icon={faFlagCheckered}/>
                            </div>
                        ) :
                        (
                            <div className="flex place-items-center font-f1 space-x-2">
                                <p>Pause</p>
                                <FontAwesomeIcon icon={faPause} />
                            </div>
                        )
                    }
                </button>

                <button className={`group text-white transition-all w-15 rounded-full px-4 py-4 bg-gradient-to-r drop-shadow-md shadow-indigo-500  from-indigo-900 to-violet-800  ${isClicked ? ' opacity-50' : 'hover:scale-110 active:scale-100'}`} onClick={()=> !isClicked ? setActualLap(0) : 0}>
                    <div className="flex place-items-center font-f1 space-x-2">
                        <p>Restart</p>
                        <FontAwesomeIcon className={`transition-all duration-500 ${isClicked ? '' : 'group-hover:-rotate-[360deg]'}`}icon={faUndo} />
                    </div>
                </button>
            </div>
    )
}

export default Sidebar
