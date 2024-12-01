import React from 'react'

const Options = ({ options, correctAnswer, dispatch, answer }) => {
  const hasAnswered = answer != null

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
