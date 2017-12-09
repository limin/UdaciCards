import {RECEIVE_DECKS} from './types'
import * as API from '../utils/API'

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(title){
  return function(dispatch){
    API.addDeck(title).then((deck)=>dispatch(receiveDecks([deck])))
  }
}
