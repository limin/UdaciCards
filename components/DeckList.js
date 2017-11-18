import React from 'react'
import { connect } from 'react-redux'
import { Text, View, FlatList,TouchableOpacity } from 'react-native'
import theme from '../theme'
import {getDerivedDecks} from '../selectors'

class DeckList extends React.Component{
  gotoDeck=({id, title,cards})=>{
    this.props.navigation.navigate("Deck",{id, title,cards})
  }
  gotoNewDeck=()=>{
    this.props.navigation.navigate("NewDeck")
  }

  renderItem=({index,item})=>{
    return (
      <View>
        <TouchableOpacity onPress={()=>this.gotoDeck({...item})}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
        <Text>{item.cards.length}</Text>
      </View>
    )
  }

  render(){
    const {decks}=this.props
    return (
      <View style={theme.container}>
        <FlatList data={decks}
                  renderItem={this.renderItem}
                  ListHeaderComponent={()=>{return (<View style={theme.listHeader}/>)}}
                  ListFooterComponent={()=>{return (<View style={theme.listFooter}/>)}}
                  ItemSeparatorComponent={()=>{return (<View style={theme.listItemSeparator}/>)}}
                  />
        <View style={theme.buttonBar}>
          <TouchableOpacity onPress={this.gotoNewDeck}>
            <Text style={theme.button}>Add Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps({decks,cards}){
  return {
    decks:getDerivedDecks({decks,cards}).map((deck)=>{
      deck.key=deck.id
      return deck
    })
  }
}

export default connect(mapStateToProps)(DeckList)