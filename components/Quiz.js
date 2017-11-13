import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'

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
  state={
    index:0,
    flipped:false,
    quiz:{
    }
  }
  getScore=()=>{
    const answers=Object.values(quiz)
    if(answers.length==0){
      return 0
    }else{
      
    }
  }
  answer=(correct)=>{
    const card=this.props.deck.cards[this.state.index]
    this.setState({
      ...this.state,
      flipped:false,
      quiz:{
        ...this.state.quiz,
        [card.id]:{
          correct,
          timestamp:Date.now()
        }
      }
    })
    this.setState({
      index:this.state.index+1
    })
  }
  correct=()=>this.answer(true)
  incorrect=()=>this.answer(false)
  flip=()=>this.setState({flipped:!this.state.flipped})
  render(){
    const {deck}=this.props
    const {index,quiz}=this.state
    if(index===deck.cards.length){
      return (
        <View>
          <Text>Score:</Text>
          <TouchableOpacity>
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
        <Text>{index+1}/{deck.cards.length}</Text>
        {
          this.state.flipped?<Text>{deck.cards[index].answer}</Text>:<Text>{deck.cards[index].question}</Text>
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

export default connect(mapStateToProps)(Quiz)
