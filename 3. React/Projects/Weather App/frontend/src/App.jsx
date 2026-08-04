import React, { useState, useEffect } from 'react';
import {
  Search, LocateFixed, Wind, Droplets, Sun, Eye, 
  Gauge, AlertCircle, Loader2, Cloud, CloudRain, CloudSun, 
  CloudSnow, CloudLightning, CloudFog, Sunrise
} from 'lucide-react';

// --- CONFIG & CONSTANTS ---
const API_KEY = 'd7ae1e06113eeb5b042f07a3da301b99'; // Your API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// --- HELPER FUNCTIONS ---

// Map weather conditions to Tailwind gradient classes
const getWeatherBackground = (weatherMain, isDay) => {
  if (!isDay) return 'from-slate-900 via-purple-950 to-slate-900'; // Night
  
  switch (weatherMain) {
    case 'Clear': return 'from-orange-400 via-amber-500 to-yellow-600'; // Sunny
    case 'Clouds': return 'from-slate-400 via-slate-500 to-slate-600'; // Cloudy
    case 'Rain':
    case 'Drizzle': return 'from-slate-600 via-blue-800 to-slate-900'; // Rain
    case 'Thunderstorm': return 'from-slate-800 via-purple-900 to-slate-900'; // Storm
    case 'Snow': return 'from-blue-200 via-slate-300 to-slate-400'; // Snow
    case 'Mist':
    case 'Fog':
    case 'Haze': return 'from-gray-400 via-gray-500 to-gray-600'; // Foggy
    default: return 'from-blue-400 via-blue-500 to-blue-600'; // Default
  }
};

// Render appropriate Lucide icon based on weather code
const getWeatherIcon = (weatherMain, size = 80) => {
  const props = { size, className: 'text-white drop-shadow-lg', strokeWidth: 1.5 };
  switch (weatherMain) {
    case 'Clear': return <Sun {...props} />;
    case 'Clouds': return <Cloud {...props} />;
    case 'Rain':
    case 'Drizzle': return <CloudRain {...props} />;
    case 'Snow': return <CloudSnow {...props} />;
    case 'Thunderstorm': return <CloudLightning {...props} />;
    case 'Mist':
    case 'Fog':
    case 'Haze': return <CloudFog {...props} />;
    default: return <CloudSun {...props} />;
  }
};

// Format date string
const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
};

// --- SUB-COMPONENTS ---

// Skeleton Loader
const SkeletonCard = () => (
  <div className="animate-pulse-fast flex flex-col gap-4 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 w-full max-w-md mx-auto">
    <div className="h-6 bg-white/20 rounded w-1/2"></div>
    <div className="h-16 bg-white/20 rounded w-1/3"></div>
    <div className="h-6 bg-white/20 rounded w-1/4"></div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {[...Array(6)].map((_, i) => <div key={i} className="h-20 bg-white/20 rounded-xl"></div>)}
    </div>
  </div>
);

// Metric Mini-Card
const MetricCard = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
    <div className="flex items-center gap-2 text-blue-200/80 text-sm font-medium">
      <Icon size={16} />
      <span>{label}</span>
    </div>
    <div className="text-xl font-semibold text-white">{value}</div>
  </div>
);


// --- MAIN APP COMPONENT ---
export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // New states for search suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch city suggestions from OpenWeatherMap Geocoding API
  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  // Debounce effect for search suggestions
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (city) {
        fetchSuggestions(city);
      } else {
        setSuggestions([]);
      }
    }, 500); // Wait for 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [city]);

  // Fetch weather data from OpenWeatherMap API
  const fetchWeather = async (query) => {
    if (!query) return;
    setLoading(true);
    setError('');
    setWeatherData(null);
    setShowSuggestions(false); // Hide dropdown when searching

    try {
      // 1. Fetch Current Weather
      const weatherRes = await fetch(
        `${BASE_URL}/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      if (!weatherRes.ok) throw new Error('City not found');
      const weatherJson = await weatherRes.json();

      // 2. Fetch 5-day Forecast (using coordinates from current weather for accuracy)
      const forecastRes = await fetch(
        `${BASE_URL}/forecast?lat=${weatherJson.coord.lat}&lon=${weatherJson.coord.lon}&appid=${API_KEY}&units=metric`
      );
      const forecastJson = await forecastRes.json();

      // Process forecast: Get one entry per day (around 12:00 PM)
      const dailyData = forecastJson.list.filter(item => 
        item.dt_txt.includes('12:00:00')
      ).slice(0, 5);

      setWeatherData(weatherJson);
      setForecast(dailyData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather using Geolocation
  const fetchWeatherByLocation = () => {
    setLoading(true);
    setError('');
    setShowSuggestions(false);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const res = await fetch(
          `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error('Location not found');
        const data = await res.json();
        
        // Reuse fetchWeather with the resolved city name to get forecast too
        fetchWeather(data.name);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, (err) => {
      setError('Unable to retrieve location. Please allow location access.');
      setLoading(false);
    });
  };

  // Handle Search Submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  // Handle Suggestion Click
  const handleSuggestionClick = (suggestion) => {
    const fullName = `${suggestion.name}${suggestion.state ? ', ' + suggestion.state : ''}, ${suggestion.country}`;
    setCity(fullName);
    fetchWeather(fullName);
  };

  // Background logic
  const isDay = weatherData ? weatherData.weather[0].icon.includes('d') : true;
  const weatherMain = weatherData ? weatherData.weather[0].main : 'Default';
  const bgGradient = getWeatherBackground(weatherMain, isDay);

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${bgGradient} transition-colors duration-1000 flex flex-col items-center p-4 sm:p-6 lg:p-8`}>
      
      <div className="w-full max-w-5xl">
        
        {/* Header / Search */}
        <header className="w-full mb-8 animate-fade-in z-20 relative">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 z-10" size={20} />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click event to fire
                placeholder="Search city..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all relative z-10"
                autoComplete="off"
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full mt-2 w-full bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-30">
                  {suggestions.map((sug, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSuggestionClick(sug)}
                      className="px-4 py-3 cursor-pointer hover:bg-white/20 transition-colors text-white flex items-center gap-3 border-b border-white/5 last:border-0"
                    >
                      <Search size={16} className="text-white/50" />
                      <span>
                        {sug.name}
                        {sug.state ? <span className="text-white/60 text-sm">, {sug.state}</span> : null}
                        <span className="text-white/40 text-sm ml-1">({sug.country})</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <button 
              type="button" 
              onClick={fetchWeatherByLocation}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all text-white font-medium"
            >
              <LocateFixed size={20} />
              <span className="hidden sm:inline">My Location</span>
            </button>
          </form>
        </header>

        {/* Error Toast */}
        {error && (
          <div className="w-full max-w-md mx-auto mb-8 p-4 rounded-xl bg-red-500/20 backdrop-blur-md border border-red-400/30 text-white flex items-center gap-3 animate-fade-in">
            <AlertCircle className="text-red-200" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Content */}
        {loading ? (
          <SkeletonCard />
        ) : weatherData ? (
          <div className="w-full flex flex-col gap-6 animate-fade-in">
            
            {/* Main Weather & Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Main Weather Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between min-h-[300px] shadow-xl">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-wide">
                    {weatherData.name}, {weatherData.sys.country}
                  </h2>
                  <p className="text-white/70 mt-1">{formatDate(weatherData.dt)}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-6xl sm:text-7xl font-extralight tracking-tighter">
                      {Math.round(weatherData.main.temp)}°
                    </span>
                    <span className="text-xl text-white/80 mt-2 capitalize">
                      {weatherData.weather[0].description}
                    </span>
                  </div>
                  <div className="opacity-90 transform transition-transform hover:scale-110 duration-300">
                    {getWeatherIcon(weatherData.weather[0].main)}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                <MetricCard icon={Wind} label="Wind" value={`${Math.round(weatherData.wind.speed * 3.6)} km/h`} />
                <MetricCard icon={Droplets} label="Humidity" value={`${weatherData.main.humidity}%`} />
                <MetricCard icon={Sun} label="UV Index" value="6" /> {/* OpenWeather basic API doesn't return UV, leaving as placeholder */}
                <MetricCard icon={Gauge} label="Pressure" value={`${weatherData.main.pressure} hPa`} />
                <MetricCard icon={Eye} label="Visibility" value={`${(weatherData.visibility / 1000).toFixed(1)} km`} />
                <MetricCard icon={Sunrise} label="Feels Like" value={`${Math.round(weatherData.main.feels_like)}°C`} />
              </div>
              
            </div>

            {/* 5-Day Forecast */}
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-white/90 mb-4">5-Day Forecast</h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {forecast.map((day, idx) => (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 w-28 flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 transition-all duration-300 cursor-default"
                  >
                    <span className="text-sm text-white/70 font-medium">
                      {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    {getWeatherIcon(day.weather[0].main, 32)}
                    <div className="flex flex-col items-center text-sm mt-1">
                      <span className="font-bold text-white">{Math.round(day.main.temp_max)}°</span>
                      <span className="text-white/50 text-xs">{Math.round(day.main.temp_min)}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          !error && (
            <div className="flex flex-col items-center justify-center text-center text-white/80 mt-20 animate-fade-in">
              <Sun size={64} className="mb-4 text-yellow-300 drop-shadow-lg animate-pulse" />
              <h2 className="text-2xl font-semibold">Welcome to SkyCast</h2>
              <p className="mt-2 max-w-md text-white/60">
                Search for a city to get the latest weather updates, or click "My Location" to check the weather in your area.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}