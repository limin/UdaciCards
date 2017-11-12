import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Root from './components/Root'

export default class App extends React.Component {
  loggerMiddleware = createLogger()
  store=createStore(reducer,{decks:{},cards:{}},applyMiddleware(thunkMiddleware,this.loggerMiddleware ))
  render() {
    return (
      <Provider store={this.store}>
        <Root/>
      </Provider>
    )
  }
}
