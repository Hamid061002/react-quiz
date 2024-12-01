import { useEffect, useReducer } from 'react'
import './App.css'
import Header from './components/Header'
import MainElm from './components/MainElm'
import StartScreen from './components/StartScreen'
import Loader from './components/Loader'
import Question from './components/Question'
import Options from './components/Options'
import NextQuestion from './components/NextQuestion'
import FinishScreen from './components/FinishScreen'
import Progress from './components/Progress'
import Timer from './components/Timer'

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

function App() {
  const [{ questions, status, currIndex, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(reducer, initialValues)

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

  return (
    <div className="app">
      <Header />
      <MainElm>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={questions.length} />}
        {
          status === 'active' &&
          <>
            <Progress
              index={currIndex}
              answer={answer}
              points={points}
              numQuestions={questions.length}
              maxPossiblePoints={questions.reduce((prev, next) => prev + next.points, 0)}
            />
            <Question question={questions[currIndex]}>
              <Options
                options={questions[currIndex].options}
                correctAnswer={questions[currIndex].correctOption}
                dispatch={dispatch}
                answer={answer}
              />
            </Question>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextQuestion currIndex={currIndex} dispatch={dispatch} />
          </>
        }
        {
          status == 'finished' &&
          <FinishScreen
            dispatch={dispatch}
            points={points}
            maxPossiblePoints={questions.reduce((prev, next) => prev + next.points, 0)}
            highScore={highScore}
          />
        }
      </MainElm>
    </div>
  )
}

export default App
