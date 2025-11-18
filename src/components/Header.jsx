import React, { useEffect, useState } from "react";

const Header = () => {
  const [now, setNow] = useState(new Date());
  const [blink, setBlink] = useState(true);

  const [battery, setBattery] = useState({
    level: 1,
    charging: false,
  });

  const [weather, setWeather] = useState({
    temperature: null,
    wind: null,
    code: null,
  });

  // Weather Icons Map
  const weatherIcons = {
    0: "☀️", // Clear
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    61: "🌧️",
    71: "❄️",
    95: "⛈️",
  };

  /* ---------------------- LIVE CLOCK ---------------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      setBlink((prev) => !prev);
    }, 650);

    return () => clearInterval(timer);
  }, []);

  /* ---------------------- BATTERY ---------------------- */
  useEffect(() => {
    const loadBattery = async () => {
      try {
        const batt = await navigator.getBattery();

        const update = () =>
          setBattery({
            level: batt.level,
            charging: batt.charging,
          });

        update();
        batt.addEventListener("levelchange", update);
        batt.addEventListener("chargingchange", update);
      } catch (e) {
        console.log("Battery API not supported", e);
      }
    };

    loadBattery();
  }, []);

  const batteryPercent = Math.round(battery.level * 100);

  /* ---------------------- WEATHER ---------------------- */
  useEffect(() => {
    const getWeather = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`;

        const res = await fetch(url);
        const data = await res.json();

        setWeather({
          temperature: data.current.temperature_2m,
          wind: data.current.wind_speed_10m,
          code: data.current.weather_code,
        });
      });
    };

    getWeather();
  }, []);

  /* ---------------------- TIME & DATE ---------------------- */
  const formattedDate = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hours = now.getHours();
  const displayHours = String(hours % 12 || 12).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  return (
    <header
      className="h-20 bg-white/10 backdrop-blur-xl border border-white/20 
      rounded-2xl flex items-center justify-between px-8 shadow-lg"
    >
      {/* LEFT */}
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Welcome, <span className="text-amber-500 font-bold">Abu Bakar</span>
        </h1>

        {/* Avatar */}
        <span className="w-12 h-12 rounded-full relative shadow-md">
          <img
            src="https://i.pinimg.com/1200x/ff/de/ac/ffdeacae8d5f1a9d432406e560e101b3.jpg"
            className="w-full h-full object-cover rounded-full"
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* DATE */}
        <span
          className="text-lg font-medium text-gray-800 bg-blue-100/60 backdrop-blur-sm 
          px-4 py-1.5 rounded-xl shadow-sm border border-blue-200/50"
        >
          {formattedDate}
        </span>

        {/* TIME */}
        <span
          className="text-lg font-semibold text-gray-800 bg-green-100/60 backdrop-blur-sm 
          px-4 py-1.5 rounded-xl shadow-sm border border-green-200/50 flex items-center"
        >
          {displayHours}
          <span
            className={`mx-1 ${
              blink ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            :
          </span>
          {minutes}
          <span className="text-sm ml-2 text-gray-600">{ampm}</span>
        </span>

        {/* WEATHER */}
        <div
          className="flex items-center gap-2 bg-sky-100/60 border border-sky-300 
          backdrop-blur-sm px-4 py-1.5 rounded-xl shadow-sm"
        >
          <span className="text-xl">{weatherIcons[weather.code] || "🌥️"}</span>

          <span className="text-sm font-semibold text-gray-800">
            {weather.temperature !== null ? `${weather.temperature}°C` : "—"}
          </span>
        </div>

        {/* BATTERY */}
        <div
          className="flex items-center gap-2 bg-yellow-100/60 border border-yellow-300 
          backdrop-blur-sm px-4 py-1.5 rounded-xl shadow-sm"
        >
          <div className="relative w-8 h-4 border-2 border-gray-700 rounded-sm flex items-center">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${batteryPercent}%` }}
            ></div>
            <div className="absolute -right-1.5 w-1.5 h-2.5 bg-gray-700 rounded-sm"></div>
          </div>

          <span className="text-sm font-semibold text-gray-800 flex items-center gap-1">
            {batteryPercent}% {battery.charging && <span>⚡</span>}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
