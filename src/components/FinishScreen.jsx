import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

const FinishScreen = () => {
  const { questions, points, highScore, maxPossiblePoints, dispatch } = useQuiz()

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
