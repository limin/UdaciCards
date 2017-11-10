import React from 'react';
import { StyleSheet, Text, View, FlatList, Button,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation'
import AddDeck from './components/AddDeck'
import { uid } from './utils'


const Decks= ({navigation})=>{
  //key is required to solve warning: "VirtualizedList: missing keys for items"
  const data=[
    {key:uid(),title:"java",cardCount:3},
    {key:uid(),title:"javascript",cardCount:0},
    {key:uid(),title:"python",cardCount:6},
  ]

  const Deck=({title,cardCount})=>{
    return (
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate('Deck',{title,cardCount})}>
          <Text>{title}</Text>
        </TouchableOpacity>
        <Text>{cardCount}</Text>
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

const NewDeck=({navigation})=>{
  return (
    <AddDeck navigation={navigation}/>
  )
}

const Deck=({navigation})=>{
  return (
    <View>
      <Text>{navigation.state.params.title}</Text>
      <Text>{navigation.state.params.cardCount}</Text>
      <Button title="Add Card" onPress={()=>alert('Add Card')}/>
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
