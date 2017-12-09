import * as API from '../utils/API'
import {receiveDecks} from './DeckActions'
import {receiveCards} from './CardActions'
import {receiveQuizzes} from './QuizActions'

export * from './CardActions'
export * from './DeckActions'
export * from './QuizActions'

export function loadData(){
  return function(dispatch){
    API.getData().then((data)=>{
      dispatch(receiveDecks(Object.values(data.decks)))
      dispatch(receiveCards(Object.values(data.cards)))
      dispatch(receiveQuizzes(Object.values(data.quizzes)))
    })
  }
}
