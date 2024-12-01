import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

const Options = () => {
  const { questions, currIndex, answer, dispatch, options } = useQuiz()
  const hasAnswered = answer != null
  
  const correctAnswer = questions[currIndex].correctOption

  return (
    <div className="options">
      {options.map((item, i) => (
        <button
          className={`btn btn-options ${answer == i && 'answer'} ${hasAnswered ? i == correctAnswer ? 'correct' : 'wrong' : ''}`}
          key={item}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: i })}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default Options
