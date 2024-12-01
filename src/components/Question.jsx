import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

const Question = ({ children }) => {  
  const { questions, currIndex } = useQuiz()
  const question = questions[currIndex]

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {children}
      </div>
    </div>
  )
}

export default Question
