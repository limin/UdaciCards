import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Root from './components/Root'
import { setLocalNotification } from './utils'

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  loggerMiddleware = createLogger()
  store=createStore(reducer,{decks:{},cards:{},quizzes:{}},applyMiddleware(thunkMiddleware,this.loggerMiddleware ))
  render() {
    return (
      <Provider store={this.store}>
        <Root/>
      </Provider>
    )
  }
}
