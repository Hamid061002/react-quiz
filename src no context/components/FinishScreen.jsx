import React from 'react'

const FinishScreen = ({ dispatch, points, maxPossiblePoints, highScore }) => {
  let percentage = (points / maxPossiblePoints) * 100

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  )
}

export default FinishScreen
