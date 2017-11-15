import { AsyncStorage } from 'react-native'
import { uid } from '../utils'

const STORE_KEY="org.udacicards.data"
const getData=()=>{
  return AsyncStorage.getItem(STORE_KEY).then((value)=>{
    let data={}
    if(value==null){
      data={decks:{},cards:{}}
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
  return getData().then((data)=>{
    if(!deck.hasOwnProperty("id")){
      deck.id=uid()
    }
    if(data.decks){
      data.decks[deck.id]=deck
    }else{
      data.decks={[deck.id]:deck}
    }
    setData(data)
    return new Promise((resolve,reject)=>resolve(deck))
  })
}

const saveCard=(card)=>{
  return getData().then((data)=>{
    if(!card.hasOwnProperty("id")){
      card.id=uid()
    }
    if(data.cards){
      data.cards[card.id]=card
    }else{
      data.cards={[card.id]:card}
    }
    setData(data)
    return new Promise((resolve,reject)=>resolve(card))
  })
}

export const saveQuiz=(quiz)=>{
  return getData().then((data)=>{
    if(!quiz.hasOwnProperty("id")){
      quiz.id=uid()
    }
    if(data.quizzes){
      data.quizzes[quiz.id]=quiz
    }else{
      data.quizzes={[quiz.id]:quiz}
    }
    setData(data)
    return new Promise((resolve,reject)=>resolve(quiz))
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
  const deck={id:uid(),title}
  return saveDeck(deck)
}

export const addCard=(card)=>{
  const newCard={
    ...card,
    id:uid()
  }
  return saveCard(newCard)
}
