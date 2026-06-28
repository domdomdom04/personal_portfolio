import { useEffect, useState } from "react";
import type { WeatherIconType } from "../components/WeatherIcon";

type WeatherState = {
  temp: number | null;
  icon: WeatherIconType;
  loading: boolean;
  error: boolean;
};

const REFRESH_MS = 10 * 60 * 1000;

function weatherIconType(code: number): WeatherIconType {
  if (code >= 200 && code < 300) return "storm";
  if (code >= 300 && code < 600) return "rain";
  if (code >= 600 && code < 700) return "snow";
  if (code >= 700 && code < 800) return "mist";
  if (code === 800) return "clear";
  if (code === 801 || code === 802) return "partly-cloudy";
  return "cloudy";
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    temp: null,
    icon: "partly-cloudy",
    loading: true,
    error: false,
  });

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!apiKey) {
      setState({ temp: null, icon: "partly-cloudy", loading: false, error: true });
      return;
    }

    let cancelled = false;

    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Auckland,NZ&units=metric&appid=${apiKey}`
        );
        if (!res.ok) throw new Error("Weather fetch failed");
        const data = await res.json();
        if (cancelled) return;
        setState({
          temp: Math.round(data.main.temp),
          icon: weatherIconType(data.weather[0]?.id ?? 804),
          loading: false,
          error: false,
        });
      } catch {
        if (cancelled) return;
        setState((prev) => ({ ...prev, loading: false, error: true }));
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return state;
}
