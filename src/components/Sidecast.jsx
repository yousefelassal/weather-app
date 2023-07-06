import { useEffect, useState } from "react";

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
        <div>Skeleton</div>
      );
    }


    return (
        <div className="flex flex-col mx-3 py-3">
            <div className="grid place-items-center">
              <h2 className="text-lg">This Week</h2>
            </div>
            <div className="flex flex-col gap-2">
              <h2>Today</h2>
              <div className="flex gap-2 items-center overflow-x-scroll w-72 py-2">
                {
                  weather.forecast.forecastday[0].hour.map(hour => {
                    if(hour.time.split(' ')[1].split(':')[0] === weather.location.localtime.split(' ')[1].split(':')[0]) return (
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
                    <div className="flex flex-col items-center justify-center" key={hour.time}>
                      <div>{hour.time.split(' ')[1]}</div>
                      <img src={hour.condition.icon} alt={hour.condition.text} />
                      <div>{hour.temp_c}°</div>
                    </div>
                    
                  )
                }
                  )
                }
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {weather.forecast.forecastday.map(day =>
                <div className="flex justify-between items-center" key={day.date}>
                  <div>{day.date}</div>
                  <div>{day.day.avgtemp_c}°</div>
                  <img src={day.day.condition.icon} alt={day.day.condition.text} />
                </div>
              )}
            </div>
        </div>
    )
  }

export default Sidecast;