import { createSelector } from 'reselect'

export const getDerivedDecks=createSelector([state=>state.decks,state=>state.cards],(decks,cards)=>{
  return Object.values(decks).map((d)=>{
    const deck=Object.assign({},d)
    deck.cards=Object.values(cards).filter((card)=>card.deckId===deck.id).sort((c1,c2)=>c1.timestamp-c2.timestamp).reverse()
    return deck
  }).sort((d1,d2)=>d1.timestamp-d2.timestamp).reverse()
})
