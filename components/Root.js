import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore,applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { Text, View, FlatList,TouchableOpacity, UIManager, Platform, LayoutAnimation } from 'react-native'
import { StackNavigator } from 'react-navigation'
import reducer from '../reducers'
import AddDeck from '../components/AddDeck'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'
import DeckList from '../components/DeckList'
import DeckDetail from '../components/DeckDetail'
import {loadData} from '../actions'
import { uid } from '../utils'
import theme from '../theme'

class Root extends React.Component{
  constructor(props){
    super(props)
    if(Platform.OS==='android'){
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }
  componentWillMount(){
    this.props.loadData()
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
      return (
        <DeckDetail navigation={navigation}/>
      )
    }

    const Decks= ({navigation})=>{
      return (
        <DeckList navigation={navigation}/>
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
          title: "Add Card"
        })
      }
    })

    return (
        <Stack/>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadData:()=>dispatch(loadData())
  }
}

export default connect(null,mapDispatchToProps)(Root)
