import {RECEIVE_CARDS} from "./types"
import * as API from '../utils/API'

export function receiveCards(cards){
  return {
    type: RECEIVE_CARDS,
    cards
  }
}

export function addCard(card){
  return function(dispatch){
    API.addCard(card).then((card)=>dispatch(receiveCards([card])))
  }
}
