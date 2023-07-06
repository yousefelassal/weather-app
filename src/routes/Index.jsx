import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Search = ({ search ,handleSearch, children, isOpen, setIsOpen }) => {

    return (
    <motion.div 
        className="searchbar flex flex-col items-center justify-center w-[40rem] absolute top-2 bg-white"
        data-isOpen={isOpen}
        layout
        transition={{ duration: .2}}
        style={{borderRadius: '2rem', borderWidth: '1px'}}
    >
        <motion.input
            type="text"
            className="searchbarInput w-[96%] px-4 py-2 rounded-full text-sm text-gray-600 outline-none pl-7"
            placeholder="Search country"
            value={search}
            onChange={handleSearch}
            onFocus={() => setIsOpen(true)}
            onBlur={() => 
                setTimeout(() => {
                    setIsOpen(false)
                }, 100)
            }
            
            layout
        />
        <motion.div layout className="searchResults w-full">
            {isOpen && (
            <>
                <motion.div 
                    layout
                    className="p-2 w-full"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .2, delay: .1 }}
                >
                    {children}
                </motion.div>
            </>
            )}
        </motion.div>
    </motion.div>
)};

const Country = ({country, handleCountryClick, setIsOpen}) => {
    if (country.length > 10) {
      return (
        <motion.div layout>Too many matches, keep typing!</motion.div>
      );
    }

    const handleClick = (country) => {
        console.log(country)
        handleCountryClick(country);
        setIsOpen(false);
    }
  
    if(country.length >= 1) {
      return (
        <motion.div
            layout
            className="flex flex-col gap-2 mb-1"
        >
          {country.map(country =>
            <button 
                onClick={() => handleClick(country)} 
                key={country.name.common}
                className="justify-between flex w-full items-center py-2 px-3 rounded-xl hover:bg-slate-200"
            >   
                <motion.div layout className="flex gap-2 items-center">
                    <img className="skeleton rounded-sm" src={country.flags.png} alt={country.flags.alt} width="35" />
                    {country.name.common} ({country.capital}) 
                </motion.div>
                <motion.div layout>
                    {country.cioc} 
                </motion.div>
            </button>
          )}
        </motion.div>
      )
    }
    
    return (
      <motion.div 
        layout
      >
        Search any valid country!
      </motion.div>
    );
  }

  const Weather = ({country, weather}) => {
    if (country.length === 0 || weather.length === 0) {
      return (
        <div>Weather data not available</div>
      );
    }
    return (
      <div>
        <h3>Weather in {weather.location.region}</h3>
        <div>temperature: {weather.current.temp_c} Celsius</div>
        <img src={weather.current.condition.icon} alt={weather.current.condition.text} width="100px" />
        <div>wind: {weather.current.wind_kph} k/h</div>
      </div>
    );
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
            <div className="flex min-h-screen justify-end flex-col w-[42rem]">
                <Weather country={countryToShow} weather={weather} />
            </div>
            <div className="h-full border-l border-l-gray-200">
            </div>
        </motion.div>
    );
  }