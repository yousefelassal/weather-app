import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from 'date-fns'

const Sidecast = ({country, weather}) => {
    const [now, setNow] = useState(null)
    useEffect(() => {
      setNow(document.getElementById('now'))
      if(now) {
        now.scrollIntoView({behavior: 'smooth', block: 'center'})
      }
    }, [weather, now])

    if(country.length === 0 || weather.length === 0) {
      return (
        <div className="flex flex-col px-4 py-3 fixed">
            <div className="grid place-items-center">
                <h2 className="text-lg">This Week</h2>
            </div>
            <div className="flex flex-col gap-2">
                <h2>Today</h2>
                <div className="flex gap-2 items-center w-[18.5rem] py-2">
                    <div className="skeleton h-20 w-16 rounded-md"></div>
                    <div className="skeleton h-20 w-16 rounded-md"></div>
                    <div className="skeleton h-20 w-16 rounded-md"></div>
                    <div className="skeleton h-20 w-16 rounded-md"></div>
                    <div className="skeleton h-20 w-16 rounded-md"></div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="skeleton h-24 rounded-md"></div>
                <div className="skeleton h-24 rounded-md"></div>
                <div className="skeleton h-24 rounded-md"></div>
            </div>
        </div>
      );
    }


    return (
        <motion.div 
          className="flex flex-col px-4 py-3 fixed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={weather.current.temp_c}
        >
            <div className="grid place-items-center">
              <h2 className="text-lg">This Week</h2>
            </div>
            <div className="flex flex-col gap-2">
              <h2>Today</h2>
              <div className="flex gap-2 items-center overflow-x-scroll w-[18.5rem] py-2">
                {
                  weather.forecast.forecastday[0].hour.map(hour => {
                    if(hour.time.split(' ')[1].split(':')[0] === weather.location.localtime.split(' ')[1].split(':')[0]
                    || 
                    // current time is displayed with a 0 (4:20) & day times are displayed with a 0 (04:20) so this is a fix for that
                    ['0'].concat(weather.location.localtime.split(' ')[1].split(':')[0]).join('') === hour.time.split(' ')[1].split(':')[0] ) 
                    return (
                      <div 
                        id="now" 
                        className="flex flex-col py-2 px-4 items-center justify-center rounded-md shadow-md" 
                        key={hour.time}
                        style={{
                          backgroundColor: weather.current.is_day ? '#84baf9' : '#223C53',
                        }}
                      >
                        <div
                          style={{
                            color: weather.current.is_day ? '#25629D' : '#ffffff',
                          }}
                        >
                          Now
                        </div>
                        <img src={hour.condition.icon} alt={hour.condition.text} height="50px" width="50px" />
                        <div
                          style={{
                            color: weather.current.is_day ? '#25629D' : '#ffffff',
                          }}
                        >
                          {hour.temp_c}°
                        </div>
                      </div>
                    )
                    return (
                    <div className="flex flex-col items-center gap-[0.125rem] justify-center px-1" key={hour.time}>
                      <div className="text-xs flex">{format(new Date(hour.time), 'ha')}</div>
                      <img src={hour.condition.icon} alt={hour.condition.text} />
                      <div>{hour.temp_c}°</div>
                    </div>
                    
                  )
                }
                  )
                }
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              {weather.forecast.forecastday.map((day, index) =>
                <motion.div 
                  className="flex justify-between relative items-center" key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .5, delay: index * 0.15 }}
                >
                  <div className="flex flex-col gap-1">
                    <div>{format(new Date(day.date), 'eeee')}</div>
                    <div className="font-light text-gray-500">{format(new Date(day.date), 'd MMM')}</div>
                  </div>
                  <div className="absolute top-6 left-32 font-semibold">{day.day.avgtemp_c}°</div>
                  <img src={day.day.condition.icon} alt={day.day.condition.text} />
                </motion.div>
              )}
            </div>
        </motion.div>
    )
  }

export default Sidecast;