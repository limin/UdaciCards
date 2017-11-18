import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import { addDeck } from '../actions'
import theme from '../theme'

class AddDeck extends React.Component{
  state={
    text:""
  }
  submit=()=>{
    const {addDeck, gotoDecks}=this.props
    addDeck(this.state.text)
    gotoDecks()
  }
  render(){
    return (
      <View style={theme.container}>
        <TextInput placeholder="Deck Title" style={{height:40}} value={this.state.text}
          onChangeText={(text)=>this.setState({text})}/>
        <View style={theme.buttonBar}>
          <TouchableOpacity onPress={this.submit}>
            <Text style={theme.button}>Create Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch,{navigation}){
  return {
    addDeck: (title)=>dispatch(addDeck(title)),
    gotoDecks:()=>navigation.navigate("Decks")
  }
}

export default connect(null,mapDispatchToProps)(AddDeck)
