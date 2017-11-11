import React from 'react'
import { StyleSheet, Text, View, FlatList, Button,TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import AddDeck from './components/AddDeck'
import AddQuestion from './components/AddQuestion'
import { uid } from './utils'



const Decks= ({navigation})=>{
  //key is required to solve warning: "VirtualizedList: missing keys for items"
  const deck1={id:uid(),title:"java",cardCount:3}
  const deck2={id:uid(),title:"javascript",cardCount:0}
  const deck3={id:uid(),title:"python",cardCount:6}
  const data=[
    {key:deck1.id,deck:deck1},
    {key:deck2.id,deck:deck2},
    {key:deck3.id,deck:deck3},
  ]

  const Deck=({id, title,cardCount})=>{
    return (
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate('Deck',{id, title,cardCount})}>
          <Text>{title}</Text>
        </TouchableOpacity>
        <Text>{cardCount}</Text>
      </View>
    )
  }

  const renderItem=({item})=>{
    return <Deck {...item.deck}/>
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

const NewDeck=({navigation})=>{
  return (
    <AddDeck navigation={navigation}/>
  )
}

const NewQuestion=({navigation})=>{
  return (
    <AddQuestion navigation={navigation}/>
  )
}

const Deck=({navigation})=>{
  const {id, title,cardCount}=navigation.state.params
  return (
    <View>
      <Text>{title}</Text>
      <Text>{cardCount}</Text>
      <Button title="Add Card" onPress={()=>navigation.navigate("NewQuestion",{id, title,cardCount})}/>
      <Button title="Start Quiz" onPress={()=>alert('Start Quiz')}/>
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
  NewQuestion:{
    screen: NewQuestion,
    navigationOptions:({navigation})=>({
      title: "NEW QUESTION"
    })
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Stack/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
