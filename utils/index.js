import {AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY="org.udacicards.notification"

export function uid(){
  const timestamp=Date.now().toString(36)
  const rdm=Math.random().toString(36).substring(2)
  return `${timestamp}${rdm}`
}

function createNotification(){
  return {
    title: 'Practice your flash card!',
    body: "don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data)=>{
    if(data==null){
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status})=>{
        if(status==='granted'){
            Notifications.cancelAllScheduledNotificationsAsync()
            let tomorrow=new Date()
            tomorrow.setDate(tomorrow.getDate()+1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)
            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                //time:(new Date()).getTime() + 60000, 
                time: tomorrow,
                repeat:"day"
              }
            )
        }
        AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
      })
    }
  })
}

export function clearLocalNotification(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
}
