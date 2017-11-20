import { AsyncStorage } from 'react-native'
import { uid } from '../utils'

const STORE_KEY="org.udacicards.store"
const DECKS={
  "1":{
    id:"1",
    title:"Fun English word quizzes",
    timestamp:Date.now(),
  }
}

// from: http://iteslj.org/c/jokes-riddles.html
const CARDS={
  "11":{
    id:"11",
    question:"Why is nine afraid of seven?",
    answer:"Because seven eight(ate) nine",
    deckId:"1",
    timestamp:Date.now(),
  },
  "12":{
    id:"12",
    question:"What did zero say to eight?",
    answer:"Nice belt. (The 8 looks like a 0 with a belt around its waist.)",
    deckId:"1",
    timestamp:Date.now(),
  },
  "13":{
    id:"13",
    question:"What can't be used until it's broken?",
    answer:"An egg.",
    deckId:"1",
    timestamp:Date.now(),
  },
  "14":{
    id:"14",
    question:"Why did the man throw the butter out the window? ",
    answer:"He wanted to see the butterfly. ",
    deckId:"1",
    timestamp:Date.now(),
  },
  "15":{
    id:"15",
    question:"Do you know why birds fly to south in the winter?",
    answer:"Because it's too far to walk there.",
    deckId:"1",
    timestamp:Date.now(),
  },
  "16":{
    id:"16",
    question:"Which room has no doors, no windows?",
    answer:"A mushroom.",
    deckId:"1",
    timestamp:Date.now(),
  },
  "17":{
    id:"17",
    question:"A father and his son were in a car accident. The father died. The son was taken to the hospital. The doctor came in and said: I can't do surgery on him, because he's my son. Who was the doctor?",
    answer:"The doctor was his mother.",
    deckId:"1",
    timestamp:Date.now(),
  },
  "18":{
    id:"18",
    question:"Why did the student take a ladder to school?",
    answer:"Because he/she was going to high school!",
    deckId:"1",
    timestamp:Date.now(),
  },
  "19":{
    id:"19",
    question:"Why did the tomato blush?",
    answer:"Beacuse it saw the salad dressing!",
    deckId:"1",
    timestamp:Date.now(),
  },
  "20":{
    id:"20",
    question:"What do you call a deer with no eyes?",
    answer:"No idea. (No eye deer)",
    deckId:"1",
    timestamp:Date.now(),
  },
  "21":{
    id:"21",
    question:"What flowers have two lips?",
    answer:"Tulips",
    deckId:"1",
    timestamp:Date.now(),
  },
  "22":{
    id:"22",
    question:"They travel all over the world but end up in the corner, what are they?",
    answer:"Stamps",
    deckId:"1",
    timestamp:Date.now(),
  },
  "23":{
    id:"23",
    question:"What's a teacher's favorite nation?",
    answer:"Expla-nation.",
    deckId:"1",
    timestamp:Date.now(),
  },
  "24":{
    id:"24",
    question:"What is the longest word in the English language?",
    answer:"Smiles. (There is a mile between the first letter and the last letter.) ",
    deckId:"1",
    timestamp:Date.now(),
  },
  "25":{
    id:"25",
    question:"What did the fish say when he hit the wall?",
    answer:"Dam!",
    deckId:"1",
    timestamp:Date.now(),
  },
}

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
      data={decks:DECKS,cards:CARDS,quizzes:{}}
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
