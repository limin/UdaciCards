import React from 'react'
import {connect} from 'react-redux'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { addCard } from '../actions'
import { uid } from '../utils'

class AddCard extends React.Component{
  state={
    question:"",
    answer:""
  }

  submit=()=>{
    const {deck,navigate,addCard}=this.props
    const card={
      ...this.state,
      parentId:deck.id
    }
    addCard(card)
    navigate("Deck",deck)
  }
  render(){
    return (
      <View>
        <TextInput placeholder="question" style={{height:40}} value={this.state.question}
          onChangeText={(text)=>this.setState({question:text})}/>
        <TextInput placeholder="answer" style={{height:40}} value={this.state.answer}
          onChangeText={(text)=>this.setState({answer:text})}/>
        <TouchableOpacity onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps({decks},{navigation}){
  return {
    deck: navigation.state.params,
    navigate:navigation.navigate
  }
}

function mapDispatchToProps(dispatch){
  return {
    addCard: (card)=>dispatch(addCard(card))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCard)
