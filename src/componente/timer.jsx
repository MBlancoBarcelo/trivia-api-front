import { useEffect, useState } from "react";

function Timer({ endedAt , onFinish }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const end = new Date(endedAt);

    const interval = setInterval(() => {
      const remaining = Math.floor((end - new Date()) / 1000);

      if (remaining <= 0) {
        setTime(0);
        clearInterval(interval);
        if (onFinish) onFinish();
      }

      setTime(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [endedAt]);

  return (
    <>
        <h2>Tiempo restante: {time}</h2>
    </>
  )
}

export default Timer;