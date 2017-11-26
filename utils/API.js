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

export const getCard=(id)=>{
  return getData().then((data)=>{
    return new Promise((resolve,reject)=>data.cards?resolve(data.cards[id]):resolve(null))
  })
}

export const getDeck=(id)=>{
  return getData().then((data)=>{
    return new Promise((resolve,reject)=>data.decks?resolve(data.decks[id]):resolve(null))
  })
}

export const addDeck=(title)=>{
  const deck={
    id:uid(),
    title,
  }
  return saveDeck(deck)
}

export const addCard=(card)=>{
  const newCard={
    ...card,
    id:uid(),
  }
  return saveCard(newCard)
}
