import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { uid } from '../utils'

export default class AddQuestion extends React.Component{
  state={
    question:"",
    answer:""
  }

  submit=()=>{
    const question={
      ...this.state,
      id: uid()
    }
    console.log(JSON.stringify(question))
    const {state,navigate}=this.props.navigation
    const deck=state.params
    deck.cardCount++
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
