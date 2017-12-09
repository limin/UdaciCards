import { combineReducers } from 'redux'
import DecksReducer from './DecksReducer'
import CardsReducer from './CardsReducer'
import QuizzesReducer from './QuizzesReducer'

export default combineReducers({
  decks:DecksReducer,
  cards:CardsReducer,
  quizzes:QuizzesReducer
})
