import { createSelector } from 'reselect'

export const getDerivedDecks=createSelector([state=>state.decks,state=>state.cards],(decks,cards)=>{
  return Object.values(decks).map((deck)=>{
    deck.cards=Object.values(cards).filter((card)=>card.deckId===deck.id)
    return deck
  })
})
