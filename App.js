import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainNavigationHub from './Src/MainNavigation/MainNavigationHub';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { Store } from './Src/Redux/Store/store';
import { requestUserPermission, notificationListener } from './Src/utilis/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './Src/context/AuthProvider';


const App = () => {

  useEffect(() => {
    requestUserPermission()
    notificationListener("bookservice")

    AsyncStorage.removeItem("fcmtoken")
  }, [])
  return (
    <Provider store={Store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <AuthProvider>
            <MainNavigationHub />
          </AuthProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet, FlatList,TouchableOpacity,TextInput} from 'react-native';
// import Signin from './Src/Screens/Signin/Signin';
// import {socket} from './Src/Socket_io';
// import {ConnectionState} from './Src/Components/ConnectionState';
// import {ConnectionManager} from './Src/Components/ConnectionManager';
// //import { MyForm } from './Src/Components/MyForm';
// // import { MyForm } from './Src/Components/MyForm';
// import {MyForm} from './Src/Components/MyForm';

// // import { MyForms } from './Src/Components/MyForms';
// export default function App() {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [fooEvents, setFooEvents] = useState([]);
//   const [value, setValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);



//   const onSubmit = () => {
//     setIsLoading(true);

//     socket.timeout(5000).emit('create-something', value, () => {
//       setIsLoading(false);
//     });
//     console.log(value,'value')
//   };

//   useEffect(() => {
//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     function onFooEvent(value) {
//       setFooEvents(previous => [...previous, value]);
//     }

//     socket.on('connect', onConnect);
//     socket.on('disconnect', onDisconnect);
//     socket.on('foo', onFooEvent);

//     return () => {
//       socket.off('connect', onConnect);
//       socket.off('disconnect', onDisconnect);
//       socket.off('foo', onFooEvent);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ConnectionState isConnected={isConnected} />
//       <FlatList
//         data={fooEvents}
//         renderItem={({item, index}) => (
//           <View style={styles.eventItem}>
//             <Text>{item}</Text>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//       <ConnectionManager />
//       <View>
//       <TextInput
//         label="Value"
//         value={value}
//         onChangeText={(text) => setValue(text)}
//       />

//       <TouchableOpacity
//         style={{
//           backgroundColor: isLoading ? 'gray' : 'blue',
//           padding: 10,
//           borderRadius: 5,
//           marginTop: 10,
//           alignItems: 'center',
//         }}
//         onPress={onSubmit}
//         disabled={isLoading}
//       >
//         <Text style={{ color: 'white' }}>Submit</Text>
//       </TouchableOpacity>
//     </View>
       
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   eventItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });
