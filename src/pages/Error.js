import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"


function Error() {




    return (
        <div className="bg-slate-200 h-screen w-screen overflow-auto flex flex-col justify-center items-center text-center">
            <FontAwesomeIcon className=' text-yellow-500 text-5xl' icon={faExclamationTriangle} />
            <h1 className="font-f1 font-bold text-5xl">ERROR</h1>
            <p>This race is not available yet</p>
            <Link className='m-5 transition-all text-white w-32 rounded-md px-4 py-3 bg-gradient-to-r from-indigo-900 to-violet-800 hover:scale-110 active:scale-100' to='/'>Home</Link>
        </div>
    )
}

export default Error
