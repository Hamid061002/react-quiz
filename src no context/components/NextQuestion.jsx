import React from 'react'

const NextQuestion = ({ dispatch, currIndex }) => {

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
