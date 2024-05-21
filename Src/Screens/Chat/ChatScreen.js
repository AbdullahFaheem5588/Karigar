import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import color from '../../Assets/colors/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ProfileHeader from '../../Components/ProfileHeader';
import ProfileCard from '../../Components/ProfileCard';
import Icon, {Icons} from '../../Components/Icons';
import firestore from '@react-native-firebase/firestore';
import WebSocket from 'react-native-websocket';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import { BASE_URL } from '../Signin/Signin';
const ChatScreen = props => {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const [getChat, setALlChat] = useState([]);
  const [countunread, setCountUnread] = useState('');

  const [isToggled, setIsToggled] = useState(false);
  const [SearchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  // useEffect(() => {
  //   // Replace 'ws://localhost:8000' with your WebSocket server URL
  //   const socket = new WebSocket('ws://localhost:8000');
  //   socket.onopen = () => {
  //     console.log('WebSocket connection opened');
  //     setSocketConnected(true);
  //   };
  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log('Received data from server:', data);
  //     // Assuming the server sends messages in the format { username, content }
  //     setReceivedMessage(`${data.username}: ${data.content}`);
  //   };
  //   socket.onclose = (event) => {
  //     console.log('WebSocket connection closed:', event.reason);
  //     setSocketConnected(false);
  //   };
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  // function onResult(QuerySnapshot) {
  //   console.log('Got Users collection result.', QuerySnapshot);
  // }

  // function onError(error) {
  //   console.error(error);
  // }
  useEffect(() => {
    // This effect runs once when the component mounts
    // createCollection(); // You can call the function to create the collection here if you want it to be created as soon as the component mounts
  
  
  }, []);
  
  // useEffect(() => {
  //   // Load documents when the component mounts
  //   getDocumentsFromCollection();
  // }, []);

  const getDocumentsFromCollection = async () => {
    try {
      const snapshot = await firestore().collection('chat').get();
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(docs);
    } catch (error) {
      console.error('Error getting documents:', error);
    }
  };


  // const createCollection = async () => {
  //   try {
  //     // Add a new collection named "users"
  //     await firestore()
  //       .collection('chat')
  //       .add({
  //         users: {name: 'John Doe', receiverId: '30'},
  //         age: 30,
  //         email: 'johndoe@example.com',
  //       });
  //     console.log('Collection "users" created successfully!');
  //   } catch (error) {
  //     console.error('Error creating collection:', error);
  //   }
  // };

  // firestore().listCollections().onSnapshot(onResult, onError);

  // firestore().collection('chat').onSnapshot(onResult, onError);
  // useEffect(() => {
  //   const unsubscribe = firestore()
  //   .collection('chat')
  //   .get()
  //   .then(documentSnapshot => {
  //     console.log('User exists: ', documentSnapshot.exists);

  //     if (documentSnapshot.exists) {
  //       console.log('User data: ', documentSnapshot.data());
  //     }
  //   })
  //   return () => unsubscribe();
  // }, []);

  // const sendMessage = async () => {
  //   await firestore().collection('messages').add({
  //     text,
  //     createdAt: firestore.FieldValue.serverTimestamp(),
  //   });
  //   setText('');
  // };
  const getCollections = async () => {
    try {
      const collectionRefs = await firestore().listCollections();
      const collectionNames = collectionRefs.map(
        collectionRef => collectionRef.id,
      );
      console.log('collectionRefs', collectionRefs);
      console.log('collectionNames', collectionNames);

      // setCollections(collectionNames);
    } catch (error) {
      console.error('Error getting collections:', error);
    }
  };

  
  useEffect(() => {
    const handleButtonPress = async () => {
      try{
      const myHeaders = new Headers();
      myHeaders.append("Cookie", "PHPSESSID=0lbflged6ief3f0ks6rsjd6hti");
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      fetch("https://theskilledman.com/api/firebase/chat.php", requestOptions)
      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      console.log(result,'result')
      if (result && result) {
        setALlChat(result);
      }
    } catch (error) {
      console.log('errorin get allfirebasechat');
    }
  };
  //handleButtonPress();
  });


  useEffect(() => {
    const gellAllChat = async () => {
      try {
        var myHeaders = new Headers();
        myHeaders.append('Cookie', 'PHPSESSID=634t4952888bd6bei50ea3d3aa');

        var formdata = new FormData();
        formdata.append('own_id', global.id);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };
        // const apiurl ='https://fisdemoprojects.com/skilledman/api/get_all_chats.php';
        const apiurl =`${BASE_URL}get_all_chats.php`;


        const response = await fetch(apiurl, requestOptions);
        const result = await response.json();
        if (result && result.chat) {
          setALlChat(result.chat);
        }
      } catch (error) {
        console.log('errorin get allchat');
      }
    };
    gellAllChat();
  }, [focus]);

  const totalunread = () => {
    let unread = getChat.reduce((total, item) => total + item.unread_count, 0);
    setCountUnread(unread);
    return unread;
  };

  // console.log('get all chats', getChat);
  useEffect(() => {
    totalunread();
  }, [getChat, countunread, focus]);

  // console.log('unread message', countunread);
  global.unreadmessage = countunread;
  const filteredData = getChat.filter(item =>
    item.name.toLowerCase().includes(SearchTerm.toLowerCase()),
  );
  // console.log(filteredData, 'filteredData');

  const parseDate = dateString => {
    const [date, time] = dateString.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    return new Date(year, month - 1, day, hour, minute);
  };
  const sortedData = filteredData.sort(
    (a, b) => parseDate(b.created_at) - parseDate(a.created_at),
  );

  return (
    <>
      <ProfileHeader
        rightIcon="search"
        screenTitle="Chat"
        onPress={() => {
          navigation.openDrawer();
        }}
        onPressnotification={() => {
          setIsToggled(!isToggled);
        }}
      />

      {isToggled ? (
        <View style={styles.searchContainer}>
          <Icons.FontAwesome name="search" size={18} color={color.default} />
          <TextInput
            style={{
              flex: 1,
              paddingLeft: 10,
              color: color.default,
            }}
            value={SearchTerm}
            placeholder="Search for Chats"
            placeholderTextColor={color.default}
            onChangeText={val => {
              setSearchTerm(val);
            }}
          />
        </View>
      ) : null}

      
        <FlatList
          data={sortedData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ProfileCard
              showProfile={() => {
                navigation.navigate('IndividualChat', {currentuser: item});
                //navigation.navigate('ConversationScreen', {currentuser: item});


              }}
              profile={item.image}
              cardTitle={item.name}
              time={item.created_at}
              msgTitle={item.message}
              noOfMsg={item.unread_count}
            />
          )}
        />
      
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    // maxHeight:"80%"
    maxHeight: height - height * 0.2,
  },

  inputCont: {
    marginVertical: 10,
    width: '100%',
  },

  inputCont: {
    marginVertical: 10,
    width: '100%',
  },
  inputstyle: {
    width: '100%',
    paddingVertical: 10,
    fontSize: 15,
    paddingHorizontal: 15,
    borderBottomColor: color.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: color.lightGray,
    backgroundColor: 'transparent',
    borderRadius: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: color.white,
    marginHorizontal: 10,
  },
  sliderStyle: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
