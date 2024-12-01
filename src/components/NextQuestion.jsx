import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

const NextQuestion = () => {
  const { currIndex, dispatch } = useQuiz()

  if (currIndex == 14) return (
    <button onClick={() => dispatch({ type: 'finish' })} className="btn btn-ui">
      Finish
    </button>
  )
  if (currIndex < 14) return (
    <button onClick={() => dispatch({ type: 'nextQuestion' })} className="btn btn-ui">
      NextQuestion
    </button>
  )
}

export default NextQuestion
