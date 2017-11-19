import React from 'react'
import {View, ScrollView, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import theme from '../theme'
import { getDerivedDecks } from '../selectors'

class DeckDetail extends React.Component{
  gotoQuiz=(navigation,{id, title,cards})=>{
    navigation.navigate("StartQuiz",{id, title,cards})
  }
  gotoNewCard=(navigation,{id, title,cards})=>{
    navigation.navigate("NewCard",{id, title,cards})
  }

  render(){
    const {deck,navigation}=this.props
    return (
      <View style={theme.container}>
        <View style={[theme.container, theme.centerContent]}>
          <Text style={theme.deckTitle}>{deck.title}</Text>
          <Text style={theme.deckCardCount}>{deck.cards.length}</Text>
        </View>
        <View style={theme.buttonBar}>
          <TouchableOpacity onPress={()=>this.gotoNewCard(navigation,deck)}><Text style={theme.button}>Add Card</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.gotoQuiz(navigation,deck)}><Text style={theme.button}>Start Quiz</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps({decks,cards},{navigation}){
  const deck=navigation.state.params
  return {
    deck: getDerivedDecks({decks,cards}).filter(d=>d.id===deck.id)[0]
  }
}

export default connect(mapStateToProps)(DeckDetail)
