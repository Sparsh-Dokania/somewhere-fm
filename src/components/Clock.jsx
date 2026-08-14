// src/components/Clock.jsx

import {
  useEffect,
  useState,
} from "react";

function Clock() {
  const getTime = () =>
    new Intl.DateTimeFormat(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      },
    ).format(new Date());

  const [time, setTime] =
    useState(getTime());

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        setTime(getTime());
      }, 1000);

    return () =>
      window.clearInterval(
        interval,
      );
  }, []);

  return (
    <span>
      {time}
    </span>
  );
}

export default Clock;