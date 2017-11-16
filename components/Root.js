import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore,applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, Button,TouchableOpacity, UIManager, Platform, LayoutAnimation } from 'react-native'
import { StackNavigator } from 'react-navigation'
import reducer from '../reducers'
import AddDeck from '../components/AddDeck'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'
import { uid } from '../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Root extends React.Component{
  constructor(props){
    super(props)
    if(Platform.OS==='android'){
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }
  startAnimation() {
    /**
 presets
 easeInEaseOut: LayoutAnimationConfig
 linear:LayoutAnimationConfig
 spring: LayoutAnimationConfig
 */
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
  }
  render(){
    const data=this.props.decks
    const gotoNewCard=(navigation,{id, title,cards})=>{
      navigation.navigate("NewCard",{id, title,cards})
    }
    const gotoQuiz=(navigation,{id, title,cards})=>{
      this.startAnimation()
      navigation.navigate("StartQuiz",{id, title,cards})
    }
    const gotoDeck=(navigation,{id, title,cards})=>{
      navigation.navigate("Deck",{id, title,cards})
    }
    const gotoNewDeck=(navigation)=>{
      navigation.navigate("NewDeck")
    }

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

    const StartQuiz=({navigation})=>{
      return (
        <Quiz navigation={navigation}/>
      )
    }

    const Deck=({navigation})=>{
      const {id, title,cards}=navigation.state.params
      return (
        <View>
          <Text>{title}</Text>
          <Text>{cards.length}</Text>
          <Button title="Add Card" onPress={()=>gotoNewCard(navigation,{id, title, cards})}/>
          <Button title="Start Quiz" onPress={()=>gotoQuiz(navigation,{id, title, cards})}/>
        </View>
      )
    }

    const Decks= ({navigation})=>{
      const Deck=({id, title,cards})=>{
        return (
          <View>
            <TouchableOpacity onPress={()=>gotoDeck(navigation,{id, title, cards})}>
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
          <TouchableOpacity onPress={()=>gotoNewDeck(navigation)}>
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
      StartQuiz:{
        screen:StartQuiz,
        navigationOptions:({navigation})=>({
            title:"Quiz"
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
      deck.cards=Object.values(cards).filter((card)=>card.deckId===deck.id)
      return deck
    })
  }
}

export default connect(mapStateToProps)(Root)
