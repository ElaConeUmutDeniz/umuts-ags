import { createPoll } from "ags/time";
import { execAsync } from "ags/process";

export const Weather = createPoll("☀️ --°C", 600000, async () => {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,is_day,precipitation,rain,snowfall,cloud_cover&forecast_days=1";
    const res = await execAsync(["curl", "-s", url]);
    const data = JSON.parse(res);
    const {
      temperature_2m,
      is_day,
      precipitation,
      rain,
      snowfall,
      cloud_cover,
    } = data.current;

    let emoji = "☀️";

    if (snowfall > 0 || (precipitation > 0 && temperature_2m <= 0)) {
      if (cloud_cover > 50) {
        emoji = "🌨️";
      } else {
        emoji = "❄️";
      }
    } else if (rain > 0) {
      emoji = "🌧️";
    } else if (precipitation > 0.1 && precipitation < 1) {
      emoji = "🌦️";
    } else if (cloud_cover > 80) {
      emoji = "☁️";
    } else if (cloud_cover > 30) {
      if (is_day === 0) {
        emoji = "<span foreground='#89cff0'></span>";
      } else {
        emoji = "⛅";
      }
    } else if (is_day === 0) {
      emoji = "🌙";
    } else {
      emoji = "☀️";
    }

    return `${emoji}\n${Math.round(temperature_2m)}°C`;
  } catch {
    return "☀️ --°C";
  }
});
