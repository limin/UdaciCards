import { combineReducers } from 'redux'

import {
        RECEIVE_DECKS,
        RECEIVE_CARDS,
      } from '../actions'

function decks(state={},action){
  switch (action.type) {
    case RECEIVE_DECKS:
      const decks=action.decks
      const newState=JSON.parse(JSON.stringify(state))
      decks.forEach(deck=>{
          const newDeck=JSON.parse(JSON.stringify(deck))
          delete newDeck.cards
          newState[deck.id]=newDeck
      })
      return newState
    default:
      return state
  }
}

function cards(state={},action){
  switch (action.type) {
    case RECEIVE_CARDS:
      const cards=action.cards
      const newState=JSON.parse(JSON.stringify(state))
      cards.forEach(card=>{
          const newCard=JSON.parse(JSON.stringify(card))
          newState[card.id]=newCard
      })
      return newState
    default:
      return state
  }
}

export default combineReducers({decks,cards})
