import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import update from 'immutability-helper'
import { uid } from '../utils'
import { saveQuiz } from '../actions'

/**
* sample quiz {
*   id:"op434fgt",
*   deckId:"j9r67uop34t",
*   score:90,
*   start:1509767251,
*   end: 15097689760,
*   cards:{
*     "i8t36ytr9":{
*         correct: true,
*         timestamp: 1509777995
*       }
*   }
* }
*/
class Quiz extends React.Component{
  reset=()=>{
    const { deck }=this.props
    this.setState({
      index:0,
      flipped:false,
      quiz:{
        id: uid(),
        deckId: deck.id,
        score:0,
        start:Date.now(),
        cards:{}
      }
    })
  }

  answer=(correct)=>{
    const { cards }=this.props.deck
    let { index }=this.state
    const card=cards[index++]
    const correctAnswerCount=Object.values(this.state.quiz.cards).reduce(
      (count,answer)=>answer.correct?++count:count,
      correct?1:0)
    const score=Math.round(correctAnswerCount*100/cards.length)
    //setState is shllow merge, use immutability-helper to deep merge state
    const newState=update(this.state,{
      index:{$set: index},
      quiz:{
        score:{$set:score},
        end:{$set: Date.now()},
        cards:{$merge:{
          [card.id]:{
            correct,
            timestamp:Date.now()
          }}
        }
    }})
    this.setState(newState)
  }

  correct=()=>this.answer(true)
  incorrect=()=>this.answer(false)
  flip=()=>this.setState({flipped:!this.state.flipped})
  componentWillMount(){
    this.reset()
  }
  render(){
    const {cards}=this.props.deck
    const {index,quiz}=this.state
    if(index===cards.length){
      return (
        <View>
          <Text>Score: {quiz.score}</Text>
          <TouchableOpacity onPress={()=>this.reset()}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.gotoDeck}>
            <Text>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View>
        <Text>{index+1}/{cards.length}</Text>
        {
          this.state.flipped?<Text>{cards[index].answer}</Text>:<Text>{cards[index].question}</Text>
        }
        {
          this.state.flipped?<TouchableOpacity onPress={this.flip}><Text>Question</Text></TouchableOpacity>:<TouchableOpacity onPress={this.flip}><Text>Answer</Text></TouchableOpacity>
        }
        <TouchableOpacity onPress={this.correct}><Text>Correct</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.incorrect}><Text>Incorrect</Text></TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps({},{navigation}){
  const deck=navigation.state.params
  return {
    deck,
    gotoDeck:()=>navigation.navigate("Deck",deck)
  }
}

function mapDispatchToProps(dispatch){
  return {
    saveQuiz: (quiz)=>dispatch(saveQuiz(quiz))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz)