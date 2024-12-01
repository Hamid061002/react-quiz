import React, { useEffect } from 'react'

const Timer = ({ secondsRemaining, dispatch }) => {
  let minute = Math.floor(secondsRemaining / 60)
  let seconds = Math.floor(secondsRemaining % 60)

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)
    return () => clearInterval(timer)
  }, [secondsRemaining])

  if (secondsRemaining == 0) {
    dispatch({ type: 'finish' })
  }

  return (
    <div className="timer">
      {minute} : {seconds}
    </div>
  )
}

export default Timer
