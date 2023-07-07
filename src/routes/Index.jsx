import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Search from "../components/Searchbar";
import Sidecast from "../components/Sidecast";
import Country from "../components/CountryList";
import Weather from "../components/WeatherBox";
import MoreWeather from "../components/MoreWeather";

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
            setCountry(result);
        }
    }, [search, countries]);
    
    const api_key = `7cb55a05af4440e0a8d133511231106`;
    useEffect(() => {
    axios
        .get(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${countryToShow[0].capital}&days=7&aqi=no&alerts=no`)
        .then(response => {
        setWeather(response.data);
        console.log(response.data);
        });
    }, [countryToShow, api_key]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleCountryClick = (country) => {
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