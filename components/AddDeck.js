import React from 'react'
import {View, TouchableOpacity, Text, TextInput } from 'react-native'
import {uid} from '../utils'

export default class AddDeck extends React.Component{
  state={
    text:""
  }
  submit=()=>{
    key=uid()
    title=this.state.text
    cardCount=0
    this.props.navigation.navigate('Deck',{title,cardCount})
  }
  render(){
    return (
      <View>
        <TextInput placeholder="title" style={{height:40}} value={this.state.text}
          onChangeText={(text)=>this.setState({text})}/>
        <TouchableOpacity onPress={this.submit}>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
