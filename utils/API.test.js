import * as API from './API'
import {decks, cards} from './data'

test("addDeck",()=>{
  const title="test deck"
  return API.addDeck(title).then(newDeck=>{
    expect(newDeck.title).toEqual(title)
    expect(newDeck.id).not.toBeNull()
    expect(newDeck.timestamp).not.toBeNull()
  })
})

test("addCard",()=>{
  const card={
    question:"Why is nine afraid of seven?",
    answer:"Because seven eight(ate) nine",
    deckId:"1",
  }
  return API.addCard(card).then((newCard)=>{
    expect(newCard.id).not.toBeNull()
    expect(newCard.question).toEqual(card.question)
    expect(newCard.answer).toEqual(card.answer)
    expect(newCard.deckId).toEqual(card.deckId)
    expect(newCard.timestamp).not.toBeNull()
  })
})

test("saveQuiz",()=>{
  const quiz={
     deckId:"j9r67uop34t",
     score:90,
     start:1509767251,
     end: 15097689760,
     cards:{
       "i8t36ytr9":{
           correct: true,
           timestamp: 1509777995
         }
     }
  }
  return API.saveQuiz(quiz).then(newQuiz=>{
    quiz.id=newQuiz.id
    quiz.timestamp=newQuiz.timestamp
    expect(newQuiz.id).not.toBeNull()
    expect(newQuiz.timestamp).not.toBeNull()
    expect(newQuiz).toEqual(quiz)
  })
})

test("getDeck",()=>{
  const title="test"
  return API.addDeck(title).then(deck=>{
    return API.getDeck(deck.id).then(deck=>{
      expect(deck.title).toEqual(title)
    })
  })
})

test("getCard",()=>{
  const card={
    question:"Why is nine afraid of seven?",
    answer:"Because seven eight(ate) nine",
    deckId:"1",
  }
  return API.addCard(card).then(createdCard=>{
    return API.getCard(createdCard.id).then(foundCard=>{
      expect(foundCard.id).not.toBeNull()
      expect(foundCard.timestamp).not.toBeNull()
      card.id=foundCard.id
      card.timestamp=foundCard.timestamp
      expect(foundCard).toEqual(card)
    })
  })
})

describe("getData",()=>{
  test("get default data",()=>{
    return API.getData().then(data=>{
      expect(data.decks).toEqual(decks)
      expect(data.cards).toEqual(cards)
      expect(data.quizzes).toEqual({})
    })
  })
})
