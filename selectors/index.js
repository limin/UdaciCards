import { createSelector } from 'reselect'

export const getDerivedDecks=createSelector([state=>state.decks,state=>state.cards],(decks,cards)=>{
  return Object.values(decks).map((d)=>{
    const deck=Object.assign({},d)
    deck.cards=Object.values(cards).filter((card)=>card.deckId===deck.id)
    return deck
  })
})
