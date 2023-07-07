import LinePlot from "../components/LinePlot";
import { motion } from "framer-motion";
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {PiWindDuotone, PiDropDuotone} from 'react-icons/pi';
import {RiWindyFill} from 'react-icons/ri';
import { IconContext } from "react-icons";

const Weather = ({country, weather}) => {
    if (country.length === 0 || weather.length === 0) {
      return (
        <div className="skeleton h-72 rounded-lg mx-6">

        </div>
      );
    }

    const indexes = [6, 12, 19, 23];
    const data = weather.forecast.forecastday[0].hour.filter((d, i) => indexes.includes(i));
    const dayTime = ['Morning', 'Afternoon', 'Evening', 'Night']

    const info = {
      wind: {
        icon: <PiWindDuotone />,
        value: weather.current.wind_kph + 'km/h',
      },
      humidity: {
        icon: <PiDropDuotone />,
        value: weather.current.humidity + '%',
      },
      pressure: {
        icon: <RiWindyFill />,
        value: weather.current.pressure_mb + 'mb',
      },
    }

    return (
      <motion.div
        initial={{
          backgroundColor: weather.current.is_day ? '#84baf9' : '#223C53',
          color: weather.current.is_day ? '#25629D' : '#ffffff',
        }}
        animate={{
          backgroundColor: weather.current.is_day ? '#84baf9' : '#223C53',
          color: weather.current.is_day ? '#25629D' : '#ffffff',
        }}
        transition={{ duration: .5 }}
        className="flex justify-between p-4 rounded-lg shadow-md mx-6"
      >
      <div 
        className="flex flex-col w-full h-full mr-6"
      >
        <div 
          className="flex justify-between"
        >
          <div className="flex gap-1 items-center">
            <IconContext.Provider value={{size: '1.25rem'}} >
              <HiOutlineLocationMarker />
            </IconContext.Provider>
            <h3 className="font-semibold">{weather.location.name}</h3>
          </div>
          <div>{weather.location.localtime.split(' ')[1]}</div>
        </div>
          <div className="grid place-items-center gap-2 my-[4.5rem]">
            <motion.div 
              className="text-7xl font-medium pl-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={weather.current.temp_c}
            >
              {weather.current.temp_c}°
            </motion.div>
            <div>{weather.current.condition.text}</div>
          </div>

            <div className="flex justify-between w-full h-full">
            {
              Object.keys(info).map((key, i) => (
                <motion.div 
                  key={info[key].value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: .5, delay: i * .15 }}
                  className="flex gap-1 items-center"
                >
                  {info[key].icon} {info[key].value}
                </motion.div>
              ))
            }
            </div>
          </div>
          <div className="bg-white/30 rounded-lg flex flex-col justify-between p-4 h-[19rem] shadow-sm">
            <h2 
              className="font-bold"
              style={{
                color: weather.current.is_day ? '#25629D' : '#ffffff',
              }}
            >
              Temperature
            </h2>
            <div className="pt-12">
              <LinePlot data={data} />
            </div>
            <div className="flex gap-5">
              {
                data.map((d, i) => (
              <div 
                className="flex flex-col gap-1 items-center -mt-20" key={i}
                style={{
                  color: weather.current.is_day ? '#25629D' : '#ffffff',
                }}
              >
                <div className="text-xs">{dayTime[i]}</div>
                <div className="text-xs">{d.temp_c}°</div>
              </div>
                ))
              }
            </div>
          </div>
      </motion.div>
    );
  }

export default Weather;