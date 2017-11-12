import * as API from '../utils/API'

export const RECEIVE_DECKS="RECEIVE_DECKS"
export const RECEIVE_CARDS="RECEIVE_CARDS"

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function receiveCards(cards){
  return {
    type: RECEIVE_CARDS,
    cards
  }
}

export function addDeck(title){
  return function(dispatch){
    API.addDeck(title).then((deck)=>dispatch(receiveDecks([deck])))
  }
}

export function addCard(card){
  return function(dispatch){
    API.addCard(card).then((card)=>dispatch(receiveCards([card])))
  }
}
