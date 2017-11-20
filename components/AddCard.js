import React from 'react'
import {connect} from 'react-redux'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { addCard } from '../actions'
import { uid } from '../utils'
import theme from '../theme'

class AddCard extends React.Component{
  state={
    question:"",
    answer:""
  }

  submit=()=>{
    const {deck,goBack,addCard}=this.props
    const card={
      ...this.state,
      deckId:deck.id,
    }
    addCard(card)
    goBack()
  }
  render(){
    return (
      <View style={theme.container}>
        <View style={theme.topContent}>
          <TextInput placeholder="question" style={theme.textInput} value={this.state.question}
            onChangeText={(text)=>this.setState({question:text})}/>
          <TextInput placeholder="answer" style={theme.textInput} value={this.state.answer}
            onChangeText={(text)=>this.setState({answer:text})}/>
        </View>
        <View style={theme.buttonBar}>
          <TouchableOpacity onPress={this.submit}>
            <Text style={[theme.button, theme.submitButton]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps({decks},{navigation}){
  return {
    deck: navigation.state.params,
    goBack:navigation.goBack
  }
}

function mapDispatchToProps(dispatch){
  return {
    addCard: (card)=>dispatch(addCard(card))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCard)
