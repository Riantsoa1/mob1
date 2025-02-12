import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, alert } from 'react-native';

export default function App() {

const requestUserPermission = async() => {
    const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
}

useEffect(() => {
    if(requestUserPermission()){
    messaging().getToken().then(token => {
    console.log(token);})
    }
    else{
    console.log("Failed token status", authStatus)
    }

    messaging()
        .getInitialNotification()
        .then(async (remoteMesssage) => {
            if(remoteMesssage){
                console.log(
                'Notification caused app to open from quit state:',
                remoteMesssage.notification,
                );
            }
        });

        messaging().onNotificationOpenedApp( async (remoteMesssage) => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMesssage.notification,
            )
        })

        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message handled in the background!', remoteMessage);
        });

         const unsubscribe = messaging().onMessage(async remoteMessage => {
              Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            });

            return unsubscribe;

}, [])

  return (
    <View style={styles.container}>
      <Text>Mob1 cloud messaging react native app</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
