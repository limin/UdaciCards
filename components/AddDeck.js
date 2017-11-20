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
        <View style={theme.topContent}>
          <Text style={theme.textLabel}>What's the title of your new Deck?</Text>
          <TextInput placeholder="Deck Title" style={theme.textInput} value={this.state.text}
            onChangeText={(text)=>this.setState({text})}/>
        </View>
        <View style={theme.buttonBar}>
          <TouchableOpacity onPress={this.submit}>
            <Text style={[theme.button,theme.submitButton]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch,{navigation}){
  return {
    addDeck: (title)=>dispatch(addDeck(title)),
    gotoDecks:()=>navigation.goBack()
  }
}

export default connect(null,mapDispatchToProps)(AddDeck)
