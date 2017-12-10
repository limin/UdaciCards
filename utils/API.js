import { AsyncStorage } from 'react-native'
import { uid } from '../utils'
import {decks, cards} from './data.js'

const STORE_KEY="org.udacicards.store"

/**
sample quiz
{
   id:"op434fgt",
   deckId:"j9r67uop34t",
   score:90,
   start:1509767251,
   end: 15097689760,
   timestamp:1509767253,
   cards:{
     "i8t36ytr9":{
         correct: true,
         timestamp: 1509777995
       }
   }
}
*/
/**
* @description Get data from AsyncStorage
* @return A promise of data
*/
export const getData=()=>{
  return AsyncStorage.getItem(STORE_KEY).then((value)=>{
    let data={}
    if(value==null){
      data={decks,cards,quizzes:{}}
    }else{
      data=JSON.parse(value)
    }
    if(!data.hasOwnProperty("decks")){
      data.decks={}
    }
    if(!data.hasOwnProperty("cards")){
      data.cards={}
    }
    if(!data.hasOwnProperty("quizzes")){
      data.quizzes={}
    }
    return new Promise((resolve,reject)=>resolve(data))
  },(error)=>console.log(error)).catch((error)=>console.log(error))
}
const setData=(data)=>{
  return AsyncStorage.setItem(STORE_KEY, JSON.stringify(data)).catch((error)=>console.log(error))
}
const saveDeck=(deck)=>{
  const newDeck={
    ...deck,
    timestamp:Date.now(),
  }
  return getData().then((data)=>{
    if(!newDeck.hasOwnProperty("id")){
      newDeck.id=uid()
    }
    if(data.decks){
      data.decks[newDeck.id]=newDeck
    }else{
      data.decks={[newDeck.id]:newDeck}
    }
    setData(data)
    return new Promise((resolve,reject)=>resolve(newDeck))
  })
}

const saveCard=(card)=>{
  const newCard={
    ...card,
    timestamp:Date.now(),
  }
  return getData().then((data)=>{
    if(!newCard.hasOwnProperty("id")){
      newCard.id=uid()
    }
    if(data.cards){
      data.cards[newCard.id]=newCard
    }else{
      data.cards={[newCard.id]:newCard}
    }
    setData(data)
    return new Promise((resolve,reject)=>resolve(newCard))
  })
}

/**
* @description Save quiz into AsyncStorage
* @param {object} Quiz
* @return A promise of saved quiz
*/
export const saveQuiz=(quiz)=>{
  const newQuiz={
    ...quiz,
    timestamp:Date.now(),
  }

  return getData().then((data)=>{
    if(!newQuiz.hasOwnProperty("id")){
      newQuiz.id=uid()
    }
    if(data.quizzes){
      data.quizzes[newQuiz.id]=newQuiz
    }else{
      data.quizzes={[newQuiz.id]:newQuiz}
    }
    setData(data)
    return new Promise((resolve,reject)=>resolve(newQuiz))
  })
}

/**
* @description Get card by its id
* @param {string} id
* @return A promise of found card or null if no card is found
*/
export const getCard=(id)=>{
  return getData().then((data)=>{
    return new Promise((resolve,reject)=>data.cards?resolve(data.cards[id]):resolve(null))
  })
}

/**
* @description Get deck by its id
* @param {string} id
* @return A promise of found deck or null if no deck is found
*/
export const getDeck=(id)=>{
  return getData().then((data)=>{
    return new Promise((resolve,reject)=>data.decks?resolve(data.decks[id]):resolve(null))
  })
}

/**
* @description Add deck into storage
* @param { string } title
* @return A promise of added deck
*/
export const addDeck=(title)=>{
  const deck={
    id:uid(),
    title,
  }
  return saveDeck(deck)
}

/**
* @description Add card into AsyncStorage
* @param { object } card
* @return A promise of added card
*/
export const addCard=(card)=>{
  const newCard={
    ...card,
    id:uid(),
  }
  return saveCard(newCard)
}
