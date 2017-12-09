import {RECEIVE_QUIZZES} from '../actions/types'

const INIT_STATE={}
export default (state=INIT_STATE,action)=>{
  switch (action.type) {
    case RECEIVE_QUIZZES:
      const quizzes=action.quizzes
      const newState=JSON.parse(JSON.stringify(state))
      quizzes.forEach(quiz=>{
          const newQuiz=JSON.parse(JSON.stringify(quiz))
          newState[newQuiz.id]=newQuiz
      })
      return newState
    default:
      return state
  }
}
