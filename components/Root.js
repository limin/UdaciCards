import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore,applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, Button,TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import reducer from '../reducers'
import AddDeck from '../components/AddDeck'
import AddCard from '../components/AddCard'
import { uid } from '../utils'

const NewDeck=({navigation})=>{
  return (
    <AddDeck navigation={navigation}/>
  )
}

const NewCard=({navigation})=>{
  return (
    <AddCard navigation={navigation}/>
  )
}

const Deck=({navigation})=>{
  const {id, title,cards}=navigation.state.params
  return (
    <View>
      <Text>{title}</Text>
      <Text>{cards.length}</Text>
      <Button title="Add Card" onPress={()=>navigation.navigate("NewCard",{id, title,cards})}/>
      <Button title="Start Quiz" onPress={()=>alert('Start Quiz')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Root extends React.Component{
  render(){
    const data=this.props.decks
    const Decks= ({navigation})=>{
      const Deck=({id, title,cards})=>{
        return (
          <View>
            <TouchableOpacity onPress={()=>navigation.navigate('Deck',{id, title,cards})}>
              <Text>{title}</Text>
            </TouchableOpacity>
            <Text>{cards.length}</Text>
          </View>
        )
      }

      const renderItem=({item})=>{
        return <Deck {...item}/>
      }

      return (
        <View style={styles.container}>
          <FlatList data={data} renderItem={renderItem}/>
          <TouchableOpacity onPress={()=>navigation.navigate("NewDeck")}>
            <Text>Add Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    const Stack = StackNavigator({
      Decks:{
        screen:Decks,
        navigationOptions:({navigation})=>({
            title:"DECKS"
        })
      },
      NewDeck:{
        screen:NewDeck,
        navigationOptions:({navigation})=>({
            title:"NEW DECK"
        })
      },
      Deck:{
        screen:Deck,
        navigationOptions:({navigation})=>({
          title:navigation.state.params.title
        })
      },
      NewCard:{
        screen: NewCard,
        navigationOptions:({navigation})=>({
          title: "NEW QUESTION"
        })
      }
    })

    return (
        <Stack/>
    )
  }
}

function mapStateToProps({decks,cards}){
  return {
    decks:Object.values(decks).map((deck)=>{
      deck.key=deck.id
      deck.cards=Object.values(cards).filter((card)=>card.parentId===deck.id)
      return deck
    })
  }
}

export default connect(mapStateToProps)(Root)
