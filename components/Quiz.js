import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import update from 'immutability-helper'
import { uid, clearLocalNotification, setLocalNotification } from '../utils'
import { saveQuiz } from '../actions'
import theme from '../theme'

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
    const { saveQuiz, deck }=this.props
    let { index }=this.state
    const card=deck.cards[index++]
    const correctAnswerCount=Object.values(this.state.quiz.cards).reduce(
      (count,answer)=>answer.correct?++count:count,
      correct?1:0)
    const score=Math.round(correctAnswerCount*100/deck.cards.length)
    //setState is shllow merge, use immutability-helper to deep merge state
    const newState=update(this.state,{
      index:{$set: index},
      flipped:{$set: false},
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
    saveQuiz(newState.quiz)
    clearLocalNotification().then(setLocalNotification)
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
        <View style={theme.container}>
          <View style={[theme.container,theme.centerContent]}>
            <Text style={theme.quizScore}>Score: {quiz.score}</Text>
          </View>
          <View style={theme.buttonBar}>
            <TouchableOpacity onPress={this.reset}>
              <Text style={theme.button}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.backToDeck()}>
              <Text style={theme.button}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <View style={theme.container}>
        <Text style={theme.quizIndex}>{index+1}/{cards.length}</Text>
        <ScrollView contentContainerStyle={theme.contentContainer}>
          {
            this.state.flipped?<Text style={theme.quizContent}>{cards[index].answer}</Text>:<Text style={theme.quizContent}>{cards[index].question}</Text>
          }
        </ScrollView>
        {
          this.state.flipped?<TouchableOpacity onPress={this.flip}><Text style={theme.quizToggleButton}>Question</Text></TouchableOpacity>:<TouchableOpacity onPress={this.flip}><Text style={theme.quizToggleButton}>Answer</Text></TouchableOpacity>
        }
        <View style={theme.buttonBar}>
          <TouchableOpacity onPress={this.correct}><Text style={theme.button}>Correct</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.incorrect}><Text style={theme.button}>Incorrect</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps({decks,cards,quizzes},{navigation}){
  const deck=navigation.state.params
  return {
    deck,
    backToDeck:()=>navigation.goBack()
  }
}

function mapDispatchToProps(dispatch){
  return {
    saveQuiz: (quiz)=>dispatch(saveQuiz(quiz))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz)
