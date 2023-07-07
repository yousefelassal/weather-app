import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Search from "../components/Searchbar";
import Sidecast from "../components/Sidecast";
import Country from "../components/CountryList";
import Weather from "../components/WeatherBox";
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
        chart: <PieChart value={weather.forecast.forecastday[0].day.daily_chance_of_rain} />,
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
                    <div className="w-1/2 flex justify-center items-center">
                        {dataDisplay[key].chart ? dataDisplay[key].chart : 
                        <img src={`https:${weather.current.condition.icon}`} alt="weather icon" className="w-24 h-24"/>
                        }
                    </div>
                </div>
            ))
        }
        
    </div> 
  )
}

export default function Index() {
    const [search, setSearch] = useState(null);
    const [country, setCountry] = useState([
        {
            name: {
                common: "Egypt",
            },
            capital: "Cairo",
            cioc: "EGY",
            flags: {
                png: "https://flagcdn.com/w320/eg.png",
                alt: "The flag of Egypt is composed of three equal horizontal bands of red, white and black, with Egypt's national emblem — a hoist-side facing gold eagle of Saladin — centered in the white band."
            }
        }
    ]);
    const [countries, setCountries] = useState([]);
    const [weather, setWeather] = useState([]);
    const [show, setShow] = useState(false);
    const [countryToShow, setCountryToShow] = useState(country);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data);
        });
    }, []);
    
    useEffect(() => {
        if (search) {
            const result = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
            console.log(result);
            setCountry(result);
        }
    }, [search, countries]);
    
    const api_key = `7cb55a05af4440e0a8d133511231106`;
    useEffect(() => {
        console.log(countryToShow[0].capital)
    axios
        .get(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${countryToShow[0].capital}&days=7&aqi=no&alerts=no`)
        .then(response => {
        setWeather(response.data);
        console.log(response.data)
        });
    }, [countryToShow, api_key]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleCountryClick = (country) => {
        console.log(country)
        setCountryToShow([country]);
        setSearch('');
        setShow(true);
      }

    return (
        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .15 }}
        className="h-full flex"
        >
            <Search search={search} handleSearch={handleSearch} isOpen={isOpen} setIsOpen={setIsOpen} >
                <Country country={country} handleCountryClick={handleCountryClick} setIsOpen={setIsOpen}/>
            </Search>
            <div className="flex min-h-screen pt-20 flex-col w-[42rem]">
                <Weather country={countryToShow} weather={weather} />
                <MoreWeather weather={weather} />
            </div>
            <div className="h-full border-l border-l-gray-200">
              <Sidecast country={countryToShow} weather={weather} />
            </div>
        </motion.div>
    );
  }