import { motion } from 'framer-motion'
import {CgArrowLongUpC} from 'react-icons/cg'

const Compass = ({ dir }) => {
    const compassDir = {
        N: 0,
        NNE: 22.5,
        NE: 45,
        ENE: 67.5,
        E: 90,
        ESE: 112.5,
        SE: 135,
        SSE: 157.5,
        S: 180,
        SSW: 202.5,
        SW: 225,
        WSW: 247.5,
        W: 270,
        WNW: 292.5,
        NW: 315,
        NNW: 337.5,
    }
    return (
        <div className="relative">
        <div className="flex justify-between gap-4 p-1 items-center text-sm font-thin h-20 w-20 rounded-full outline-dashed outline-[0.2px] outline-[#25629Dcc] outline-offset-2 border-dashed border-[0.2px] border-[#25629Dcc]">
            <h2>W</h2>
            <div className="flex flex-col justify-between gap-10 items-center">
                <h2>N</h2>
                <h2>S</h2>
            </div>
            <h2>E</h2>
        </div>
            <motion.div
                animate={{ rotate: compassDir[dir] }}
                transition={{ duration: 1 }}
                className="flex absolute top-4 left-5 justify-center items-center w-12 h-12"
                style={{
                    color: '#25629Dcc',
                }}
            >
                <CgArrowLongUpC size={40}/>
            </motion.div>
        </div>
    )
}

export default Compass