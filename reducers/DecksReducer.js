import {RECEIVE_DECKS} from '../actions/types'

const INIT_STATE={}
export default (state=INIT_STATE,action)=>{
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
