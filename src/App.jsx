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
import { useQuiz } from './contexts/QuizContext'

function App() {
  const { status } = useQuiz()

  return (
    <div className="app">
      <Header />
      <MainElm>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {
          status === 'active' &&
          <>
            <Progress />
            <Question>
              <Options />
            </Question>
            <Timer />
            <NextQuestion />
          </>
        }
        {
          status == 'finished' &&
          <FinishScreen />
        }
      </MainElm>
    </div>
  )
}

export default App
