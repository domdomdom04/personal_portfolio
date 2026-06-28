import { useWeather } from "../hooks/useWeather";
import { WeatherIcon } from "./WeatherIcon";
import "./WeatherWidget.css";

export function WeatherWidget() {
  const { temp, icon, loading, error } = useWeather();

  return (
    <div className="weather-widget" aria-live="polite">
      <WeatherIcon type={icon} size={16} />
      <span className="weather-widget__temp">
        {loading ? "—°C" : error || temp === null ? "—°C" : `${temp}°C`}
      </span>
    </div>
  );
}
