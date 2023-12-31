import PieChart from "./PieChart";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Compass from "./Compass";
import NeedlePieChart from "./NeedlePieChart";

const MoreWeather = ({ weather }) => {
    const [rainText, setRainText] = useState('');

    useEffect(() => {
        if(weather.length === 0) return;
        if (weather.forecast.forecastday[0].day.daily_chance_of_rain < 50) {
            setRainText('Low')
        } else if (weather.forecast.forecastday[0].day.daily_chance_of_rain < 75) {
            setRainText('Mid')
        } else {
            setRainText('High')
        }
    }, [weather])



    if (weather.length === 0) {
    return (
        <div className="flex flex-wrap gap-6 m-6">
          <div className="bg-[#EDF3F8] skeleton rounded-lg w-[18.7rem] h-32">
          </div>
          <div className="bg-[#EDF3F8] skeleton rounded-lg w-[18.7rem] h-32">
          </div>
          <div className="bg-[#EDF3F8] skeleton rounded-lg w-[18.7rem] h-32">
          </div>
          <div className="bg-[#EDF3F8] skeleton rounded-lg w-[18.7rem] h-32">
          </div>
        </div>
    )
  }
  const dataDisplay = {
    Wind: {
        title: 'Wind',
        subtitle: 'Current wind speed',
        value: weather.current.wind_kph + 'km/h',
        dir: weather.current.wind_dir,
    },
    RainChance: {
        title: 'Rain Chance',
        subtitle: "Today's rain chance",
        value: weather.forecast.forecastday[0].day.daily_chance_of_rain + '%',
        rainChart: <PieChart value={weather.forecast.forecastday[0].day.daily_chance_of_rain} />,
    },
    Pressure:{
        title: 'Pressure',
        subtitle: 'Current pressure',
        value: weather.current.pressure_mb + 'mb',
        pressureChart: <NeedlePieChart 
            value={weather.current.pressure_mb} 
            data={[
                { name: 'A', value: 1500, color: 'blue' },
            ]} />,
    },
    UV:{
        title: 'UV Index',
        subtitle: 'Current UV index',
        value: weather.current.uv,
        uvChart: <NeedlePieChart 
            value={weather.current.uv} 
            data={[
                { name: 'A', value: 3, color: 'green' },
                { name: 'B', value: 3, color: 'yellow' },
                { name: 'C', value: 3, color: 'orange' },
                { name: 'C', value: 3, color: 'red' },
            ]} />,
    }
  }
  return(
    <div className="flex flex-wrap gap-6 m-6">
        {
            Object.keys(dataDisplay).map((key, index) => (
                <div key={index} className="bg-[#EDF3F8] rounded-lg w-[18.7rem] h-32 shadow-sm flex">
                    <div className="w-1/2 flex flex-col justify-center items-start pl-4 gap-1">
                        <h1 className="text-base font-semibold">{dataDisplay[key].title}</h1>
                        <p className="text-xs text-gray-500">{dataDisplay[key].subtitle}</p>
                        <h2 className="text-base font-semibold">{dataDisplay[key].value}</h2>
                    </div>
                    <div className="w-1/2 flex justify-center items-center relative">
                        {dataDisplay[key].rainChart ? 
                        <>
                            {dataDisplay[key].rainChart}
                            <motion.h3  key={rainText}
                                className="absolute top-[3.6rem] left-[3.585rem] grid place-items-center text-center text-sm font-semibold"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {rainText}
                            </motion.h3>
                        </>
                        : dataDisplay[key].dir ?
                        <Compass dir={dataDisplay[key].dir} />
                        : dataDisplay[key].uvChart ?
                        <>
                            {dataDisplay[key].uvChart}
                        </>
                        : dataDisplay[key].pressureChart ?
                        <>
                            {dataDisplay[key].pressureChart}
                        </>
                        : null
                        }
                    </div>
                </div>
            ))
        }
        
    </div> 
  )
}

export default MoreWeather;