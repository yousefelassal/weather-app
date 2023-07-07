import PieChart from "../components/PieChart";

const MoreWeather = ({ weather }) => {
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
    RainChanse: {
        title: 'Rain Chanse',
        subtitle: "Today's rain chanse",
        value: weather.forecast.forecastday[0].day.daily_chance_of_rain + '%',
        rainChart: <PieChart value={weather.forecast.forecastday[0].day.daily_chance_of_rain} />,
    },
    Pressure:{
        title: 'Pressure',
        subtitle: 'Current pressure',
        value: weather.current.pressure_mb + 'mb',
    },
    UV:{
        title: 'UV Index',
        subtitle: 'Current UV index',
        value: weather.current.uv,
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
                            <h3 className="absolute top-12">{dataDisplay[key].value > 70 ? 
                            "High"
                            : dataDisplay[key].value > 50 ?
                            "Mid" : "Low"
                            }</h3>
                        </>
                        : 
                        <img src={`https:${weather.current.condition.icon}`} alt="weather icon" className="w-24 h-24"/>
                        }
                    </div>
                </div>
            ))
        }
        
    </div> 
  )
}

export default MoreWeather;