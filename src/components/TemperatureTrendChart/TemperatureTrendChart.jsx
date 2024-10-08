import React from "react";
import { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../ThemeContext";

const TemperatureTrendChart = ({ forecastData }) => {
  const { theme } = useContext(ThemeContext);
  const chartData = forecastData.map((day) => ({
    name: new Date(day.day).toLocaleDateString("en-US", { weekday: "short" }),
    High: day.all_day.temperature_max.toFixed(1),
    Low: day.all_day.temperature_min.toFixed(1),
  }));

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-blue-100 text-gray-800"
          : "bg-gray-800 text-gray-300"
      }w-full h-48 bg-blue-100 `}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="High" stroke="#ff7300" />
          <Line type="monotone" dataKey="Low" stroke="#387908" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureTrendChart;
