import { combineReducers } from 'redux'

import {
        RECEIVE_DECKS,
        RECEIVE_CARDS,
        RECEIVE_QUIZZES
      } from '../actions'

/**
*
* sample deck {
*   id:"j9r67uop34t",
*   title:"java"
* }
*/
function decks(state={},action){
  switch (action.type) {
    case RECEIVE_DECKS:
      const decks=action.decks
      const newState=JSON.parse(JSON.stringify(state))
      decks.forEach(deck=>{
          const newDeck=JSON.parse(JSON.stringify(deck))
          delete newDeck.cards
          newState[newDeck.id]=newDeck
      })
      return newState
    default:
      return state
  }
}

/**
* sample card {
*   id:"i8t36ytr9",
*   question:"q",
*   answer:"a",
*   deckId:"j9r67uop34t"
* }
*/
function cards(state={},action){
  switch (action.type) {
    case RECEIVE_CARDS:
      const cards=action.cards
      const newState=JSON.parse(JSON.stringify(state))
      cards.forEach(card=>{
          const newCard=JSON.parse(JSON.stringify(card))
          newState[newCard.id]=newCard
      })
      return newState
    default:
      return state
  }
}

/**
* sample quiz {
*   id:"op434fgt",
*   deckId:"j9r67uop34t",
*   score:90,
*   start:1509767251,
*   end: 15097689760,
*   cards:{
*     "i8t36ytr9":{
*         correct: true,
*         timestamp: 1509777995
*       }
*   }
* }
*/
function quizzes(state={},action){
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

export default combineReducers({decks,cards,quizzes})
