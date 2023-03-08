import { useEffect, useState } from 'react'

export const useTimer = (seconds: number = 0) => {
  const [timeLeft, setTimeLeft] = useState(seconds)

  const isTimerEnded = timeLeft <= 0

  useEffect(() => {
    if (isTimerEnded) {
      return
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  return { timeLeft, setTimeLeft, isTimerEnded }
}
