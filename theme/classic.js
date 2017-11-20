const classic={
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContent:{
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  centerContent:{
    flex: 1,
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
  textLabel: {
    textAlign: 'center',
    padding: 8,
    margin: 8,
    fontSize: 36,
  },
  textInput: {
    height:40,
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000'
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
    width:280,
    textAlign:'center',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26,
    margin: 3,
    backgroundColor: '#fff',
    color: '#000',
    fontSize:28,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000'
  },
  submitButton:{
    backgroundColor: '#000',
    color: '#fff',
  },
  addCardButton:{
    backgroundColor: '#fff',
    color: '#000',
  },
  addDeckButton:{
    backgroundColor: '#fff',
    color: '#000',
  },
  startQuizButton:{
    backgroundColor: '#000',
    color: '#fff',
  },
  correctButton:{
    backgroundColor: '#008000',
    borderColor: '#008000',
    color: '#fff',
  },
  incorrectButton:{
    backgroundColor: '#d4271b',
    borderColor: '#d4271b',
    color: '#fff',
  }
}

export default classic
