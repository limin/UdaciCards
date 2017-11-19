const classic={
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContent:{
    justifyContent: 'center',
    alignContent: 'center',
  },
  listHeader:{
    height:2,
    backgroundColor:'#fff'
  },
  listFooter:{
    height:2,
    backgroundColor:'#fff'
  },
  listItemSeparator:{
    height:1,
    backgroundColor:'#eee'
  },
  listItem:{
    padding:12
  },
  listItemTitle:{
    textAlign:'center',
    fontSize:26
  },
  listItemSubtitle:{
    textAlign:'center',
    color:'#666',
    fontSize:16
  },
  textInput: {
    height:40,
    padding: 8
  },
  deckTitle:{
    textAlign:'center',
    fontSize:36
  },
  deckCardCount:{
    textAlign:'center',
    color:'#666',
    fontSize:16
  },
  quizIndex:{
    textAlign: 'left',
    fontSize: 16,
    color: '#000'
  },
  quizContent:{
    textAlign:'center',
    fontSize:36
  },
  quizToggleButton:{
    textAlign:'center',
    fontSize:26,
    color: '#660000',
    paddingTop: 16,
    paddingBottom:16,
  },
  quizScore:{
    textAlign:'center',
    fontSize:36
  },
  contentContainer: {
    // the below style will cause overflow disfunction.
    //flex: 1,
    //justifyContent:'center'
  },
  buttonBar: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flex: 0,
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26,
    margin: 3,
    backgroundColor: '#4097ce',
    color: '#fff',
    fontSize:28
  }
}

export default classic
