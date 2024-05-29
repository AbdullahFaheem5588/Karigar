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
import {BASE_URL} from '../Signin/Signin';
import {useSelector} from 'react-redux';
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

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const {token} = useSelector(state => state.TokenReducer);

  useEffect(() => {
    const gellAllChat = async () => {
      const myHeaders = new Headers();

      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}get-all-chats-list`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result && result.chats) {
            console.log('🚀 ~ gellAllChat ~ result.chats:', result.chats);
            setALlChat(result.chats);
          }
        })
        .catch(error => console.error(error));
    };
    gellAllChat();
  }, [focus]);

  // console.log('get all chats', getChat);

  // console.log('unread message', countunread);

  // console.log(filteredData, 'filteredData');

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
        data={getChat}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ProfileCard
            showProfile={() => {
              navigation.navigate('IndividualChat', {currentuser: item});
              //navigation.navigate('ConversationScreen', {currentuser: item});
            }}
            cardTitle={item.sender_name}
            time={item.created_at}
            msgTitle={item.message}
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
