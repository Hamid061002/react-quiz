import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

const Progress = () => {
  const { questions, currIndex, answer, points } = useQuiz()
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, next) => prev + next.points, 0)

  return (
    <header className="progress">
      <progress max={numQuestions} value={currIndex + Number(answer !== null)} />

      <p>
        Question <strong>{currIndex + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  )
}

export default Progress
