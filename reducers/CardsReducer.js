import {RECEIVE_CARDS} from '../actions/types'

const INIT_STATE={}
export default (state=INIT_STATE,action)=>{
  switch (action.type) {
    case RECEIVE_CARDS:
      const cards=action.cards
      const newState=JSON.parse(JSON.stringify(state))
      cards.forEach(card=>{
          const newCard=JSON.parse(JSON.stringify(card))
          newState[newCard.id]=newCard
      })
      return newState
    default:
      return state
  }
}
