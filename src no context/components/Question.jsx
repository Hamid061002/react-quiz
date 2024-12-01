import React, { useEffect } from 'react'

const Question = ({ question, children }) => {  

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
