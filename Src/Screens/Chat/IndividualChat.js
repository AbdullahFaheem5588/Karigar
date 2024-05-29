import React, {useState, useEffect, memo} from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import color from '../../Assets/colors/colors';
import Icon, {Icons} from '../../Components/Icons';
import ChatUserHeader from '../../Components/ChatUserHeader';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Modal} from 'react-native-paper';
import BtnComp from '../../Components/BtnComp';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/messaging';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import io from 'socket.io-client';
import Toast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker';
import {TOUCHABLE_STATE} from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import ConversationScreen from '../../utilis/Firebasechat';
import {googleMapIsInstalled} from 'react-native-maps/lib/decorateMapComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {BASE_URL} from '../Signin/Signin';
import {useSelector} from 'react-redux';
const IndividualChat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentprovider = route.params?.currentuser;
  // global.providerid = currentprovider.id;
  //console.log("🚀 ~ file: IndividualChat.js:26 ~ IndividualChat ~ currentprovider:", currentprovider.id)
  const [isModalVisible, setModalVisible] = useState(false);
  const focus = useIsFocused();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const {token} = useSelector(state => state.TokenReducer);
  const {data} = useSelector(state => state.ProfileReducer);
  const [addChat, setAddChat] = useState('');

  const handleSend = () => {
    if (addChat != '') {
      sendMessage();
    } else {
      Toast.show('Enter Message First', Toast.LONG);
    }
  };
  console.log('🚀 ~ IndividualChat ~ data:', data);
  const sendMessage = () => {
    const myHeaders = new Headers();

    myHeaders.append('Authorization', `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append('receiver_id', currentprovider?.sender_id);
    formdata.append('message', addChat);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}chat/send`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('🚀 ~ sendMessage ~ result:', result);

        if (result && result.message === 'Message sent successfully') {
          console.log('🚀 ~ sendMessage ~ resulsbjkshjkhdskjhskjt:', result);
          getchat();
        } else {
          Alert.alert(JSON.stringify(result));
        }
      })
      .catch(error => console.error(error));
  };
  const getchat = async () => {
    const myHeaders = new Headers();

    myHeaders.append('Authorization', `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append('sender_id', data?.id);
    formdata.append('receiver_id', currentprovider?.sender_id);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}chats-fetch-all-converstion`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result && result.messages) {
          setMessages(result.messages);
        } else if (result) {
          Alert.alert(JSON.stringify(result));
        }
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error));
      });
  };
  useEffect(() => {
    getchat();
  }, [focus]);

  const SenderMessage = memo(({item, index}) => {
    return (
      <>
        <View
          style={[
            {
              backgroundColor:
                item.sender_id == data?.id
                  ? color.default
                  : color.lightgreen
                  ? color.lightgreen
                  : color.lightgreen,
              alignSelf: item.sender_id == data?.id ? 'flex-end' : 'flex-start',
              padding: 15,
              flexDirection: 'row',
              borderRadius: 12,
              maxWidth: '80%',
              alignItems: 'flex-end',
              marginTop: 10,
            },
          ]}>
          <Text
            style={{flex: 1}}
            color={
              item.sender_id == data?.id
                ? color.default
                : color.lightgreen
                ? color.lightgreen
                : color.lightgreen
            }
            type="m16">
            {item.message}
          </Text>
          <Text color={color.gray} style={{paddingLeft: 10}} type="r12">
            {item.created_at && item.created_at.split('T')[1].split('.')[0]}
          </Text>
        </View>
      </>
    );
  });

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? '50' : null}
        style={styles.container}>
        <FlatList
          data={messages}
          // onContentSizeChange={() => {
          //   if (dataChat.length > 0) {
          //     flatListRef.current.scrollToEnd({animated: true});
          //   }
          //   if (dataChat.length > 0) {
          //     if (indexToAccess >= 0 && indexToAccess < dataChat.length) {
          //       const elementAtIndex1 = dataChat[indexToAccess];
          //       console.log(elementAtIndex1, 'index');
          //     } else {
          //       console.log('Index is out of bounds.');
          //     }
          //   }
          // }}
          renderItem={({item, index}) => (
            <SenderMessage item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{marginHorizontal: 20}}
        />
        <View style={[styles.rowCenter, styles.inputContainer]}>
          <TextInput
            placeholder="Type a message..."
            value={addChat}
            onChangeText={text => {
              setAddChat(text);
            }}
            autoCapitalize="none"
            style={[styles.input, {backgroundColor: color.default}]}
            onFocus={() => console.log('Input focused')}
            onBlur={() => console.log('Input blurred')}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={[styles.sendBtn, {backgroundColor: color.default}]}>
            <Feather name="send" size={24} color={color.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 1,
    color: color.black,
    fontWeight: '600',
  },
  container: {
    flex: 0.98,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f0f0f0',
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e4e4e4',
    paddingVertical: 17,
    borderRadius: 8,
    marginBottom: 4,
    paddingHorizontal: 10,
    width: '80%',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: color.default,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 4,
    width: '78%',
    paddingHorizontal: 10,
  },
  messageText: {
    color: color.lightGray, // For sender messages
    fontSize: 16,
    flexWrap: 'wrap',
  },
  receiverText: {
    color: color.white, // For sender messages
    fontSize: 16,
    flexWrap: 'wrap',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
    color: color.lightGray,
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: '21%',
  },
  timeStyle: {
    fontSize: 12,
    marginTop: 2,
    color: color.lightGray,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: '21%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e4e4e4',
    padding: 4,
    borderRadius: 12,
    marginTop: 8,
    elevation: 0,
  },
  input: {
    color: 'black',
    flex: 1,
    paddingHorizontal: 16,
  },
  sendButton: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  sendStyle: {
    marginLeft: 7,
    backgroundColor: color.default,
    color: color.white,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  imageStyle: {
    height: 55,
    width: 55,
    borderRadius: 8,
    marginRight: 6,
  },
  imgContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  recImg: {
    marginLeft: 6,
  },
  imagemodal: {
    height: '80%',
    width: '80%',
    borderRadius: 8,
    marginRight: 6,
  },
  modalContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  modalBody: {
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalView: {
    borderRadius: 12,
    width: '70%',
    height: 320,
    alignSelf: 'center',
    backgroundColor: color.white,
  },
  btnContainer: {
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  successmodalBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  modalStyle: {},
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '90%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 20,
  },
  sendBtn: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
  },
});

export default IndividualChat;
