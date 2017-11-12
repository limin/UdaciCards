import { AsyncStorage } from 'react-native'
import { uid } from '../utils'

const STORE_KEY="UdaciCards"
const getData=()=>{
  return AsyncStorage.getItem(STORE_KEY).then((data)=>{
    if(data==null){
      data={decks:{},cards:{}}
    }
    if(!data.hasOwnProperty("decks")){
      data.decks={}
    }
    if(!data.hasOwnProperty("cards")){
      data.cards={}
    }
    return new Promise((resolve,reject)=>resolve(data))
  });
}
const setData=(data)=>{
  return AsyncStorage.setItem(STORE_KEY, JSON.stringify(data))
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
