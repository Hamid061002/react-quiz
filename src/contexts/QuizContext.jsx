import React, { createContext, useContext, useEffect, useReducer } from 'react'

const QuizContext = createContext()

const SECS_PER_QUESTION = 30;

const initialValues = {
  questions: [],
  status: 'loading',
  currIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 300
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return { ...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTION }
    case 'newAnswer':
      const thisQuestion = state.questions[state.currIndex]
      return {
        ...state,
        answer: action.payload,
        points: action.payload == thisQuestion.correctOption ? state.points + thisQuestion.points : state.points
      }
    case 'nextQuestion':
      return { ...state, currIndex: state.currIndex + 1, answer: null }
    case 'finish':
      return { ...state, status: 'finished', answer: null, highScore: state.points > state.highScore ? state.points : state.highScore }
    case 'restart':
      return { ...initialValues, status: 'ready', questions: state.questions, highScore: state.highScore }
    case 'tick':
      return { ...state, secondsRemaining: state.secondsRemaining - 1 }
    default:
      break;
  }
}

const QuizProvider = ({ children }) => {
  const [{ questions, status, currIndex, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(reducer, initialValues)
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, next) => prev + next.points, 0)
  const options = questions[currIndex]?.options

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:8000/questions')
        const data = await res.json()
        dispatch({ type: 'dataReceived', payload: data })
      } catch (error) {
        dispatch({ type: 'dataFailed' })
      }
    }

    fetchData()
  }, [])

  return <QuizContext.Provider value={{
    questions,
    status,
    currIndex,
    answer,
    points,
    highScore,
    secondsRemaining,
    numQuestions,
    options,
    maxPossiblePoints,
    dispatch
  }}>
    {children}
  </QuizContext.Provider>
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context == undefined) throw new Error('QuizContext uses out of QuizProvider!')
  return context
}

export { QuizProvider, useQuiz }
