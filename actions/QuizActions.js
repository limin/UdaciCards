import * as API from '../utils/API'
import {RECEIVE_QUIZZES} from './types'

export function receiveQuizzes(quizzes){
  return {
    type: RECEIVE_QUIZZES,
    quizzes
  }
}

export function saveQuiz(quiz){
  return function(dispatch){
    API.saveQuiz(quiz).then((quiz)=>dispatch(receiveQuizzes([quiz])))
  }
}
