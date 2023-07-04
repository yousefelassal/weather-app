import { useState, useEffect, Children } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Search = ({ search ,handleSearch, children }) => {
    const [isOpen, setIsOpen] = useState(false);

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
            onBlur={() => setIsOpen(false)}
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

const Country = ({country, handleCountryClick}) => {
    if (country.length > 10) {
      return (
        <motion.div layout>Too many matches, keep typing!</motion.div>
      );
    }

    const handleClick = (country) => {
        console.log(country)
        handleCountryClick(country);
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
    if (country.length === 0) {
      return (
        <div>Weather data not available</div>
      );
    }
    return (
      <div>
        <h3>Weather in {country[0].capital}</h3>
        <div>temperature: {weather.main.temp} Celsius</div>
        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} width="100px" />
        <div>wind: {weather.wind.speed} m/s</div>
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
    
    const api_key = `48ba77efe4f42c00d19e8410277aeff1`;
    useEffect(() => {
        if(country.length === 1){
        console.log(country[0].capital)
        console.log(country[0])
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country[0].capital}&appid=${api_key}&units=metric`)
        .then(response => {
        setWeather(response.data);
        });
    }
    }, [country, api_key]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleCountryClick = (country) => {
        console.log(country)
        setCountry([country]);
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
            <Search search={search} handleSearch={handleSearch} >
                <Country country={country} handleCountryClick={handleCountryClick} />
            </Search>
            <div className="flex min-h-screen pt-14 flex-col w-[42rem]">
                {show ? <Weather country={country} weather={weather} />
                :
                    <Weather country={country} weather={weather} />
            }
            </div>
            <div className="h-full border-l border-l-gray-200">
            </div>
        </motion.div>
    );
  }