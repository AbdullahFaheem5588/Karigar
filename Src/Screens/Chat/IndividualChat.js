import React, {useState, useEffect} from 'react';
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
} from 'react-native';
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
const IndividualChat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentprovider = route.params?.currentuser;
  global.providerid = currentprovider.id;
  console.log(global.providerid, 'globalproviderid');
  //console.log("🚀 ~ file: IndividualChat.js:26 ~ IndividualChat ~ currentprovider:", currentprovider.id)
  const [isModalVisible, setModalVisible] = useState(false);
  const focus = useIsFocused();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [fetchmessage, setFetchMessage] = useState('');
  const [P_Data, setP_Data] = useState([]);
  // console.log(P_Data, 'provider data for send');
  const [selectedfile, setSelectedFile] = React.useState();

  const userId = global.id;

  const toggleModal = () => {
    console.log('Button pressed');
    setModalVisible(!isModalVisible);
  };
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('image picker result', result[0]);
      if (result) {
        setSelectedFile(result[0]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User canceled the document picker
      } else {
        console.log('error occur on document picking', error);
        throw error; // Throw the correct error
      }
    }
  };

  const chatData = [
    {
      id: '1',
      text: 'Hello!',
      user: 'sender',
      image: require('../../Assets/Images/user3.jpg'),
      timestamp: '12:00 PM',
    },
    {
      id: '2',
      text: 'Hi there!',
      user: 'receiver',
      image: require('../../Assets/Images/user1.jpg'),
      timestamp: '12:05 PM',
    },
  ];

  const convertDateFormat = dateString => {
    // Split the date string into date and time parts
    const [datePart, timePart] = dateString.split(', ');

    // Split the date part into day, month, and year
    const [day, month, year] = datePart.split('/');

    // Rearrange the components to the desired format
    const formattedDate = `${year}-${month}-${day}, ${timePart}`;

    return formattedDate;
  };

  const sendmessage = async () => {
    const currentTime = new Date().toLocaleString();
    const formateddatetime = convertDateFormat(currentTime);

    if (message == '') {
      Toast.show('please write message', Toast.LONG);
      return;
    }

    try {
      var formdata = new FormData();
      formdata.append('sender_id', global.id);
      formdata.append('receiver_id', currentprovider.id);
      formdata.append('message', message);
      //  formdata.append('timestamp', formateddatetime);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };
      const apiurl = 'https://fisdemoprojects.com/skilledman/api/chats.php';

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      console.log('result');
      if (result) {
        setMessage('');
      }
    } catch (error) {
      console.log('error ');
    }
  };

  const getData = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=lald5h7dkr1bhde44c2fjs2g79');

      var formdata = new FormData();
      formdata.append('provider_id', currentprovider?.id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // const response = await fetch( 'https://fisdemoprojects.com/skilledman/api/user/get_providers_detail.php',
      //   requestOptions,
      // );
      const response = await fetch(
        `${BASE_URL}user/get_providers_detail.php`,
        requestOptions,
      );
      const result = await response.json();
      if (result && result.add_skills) {
        setP_Data(result.add_skills);
      } else if (result && result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [focus]);

  useEffect(() => {
    const getchat = async () => {
      try {
        var myHeaders = new Headers();
        myHeaders.append('Cookie', 'PHPSESSID=3d9kvsuans5bspuffue8v5m5hu');

        var formdata = new FormData();
        formdata.append('sender_id', global.id);
        formdata.append('receiver_id', currentprovider.id);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };
        // const apiurl ='https://fisdemoprojects.com/skilledman/api/get_chats.php';
        const apiurl = `${BASE_URL}get_chats.php`;

        const response = await fetch(apiurl, requestOptions);
        const result = await response.json();
        if (result && result.chats) {
          setMessages(result.chats);
        } else if (result.error) {
          Toast.show(result.error);
        }
      } catch (error) {
        Alert.alert(error);
      }
    };
    getchat();
  }, [focus, message]);

  useEffect(() => {
    const Changestatus = async () => {
      try {
        var myHeaders = new Headers();
        myHeaders.append('Cookie', 'PHPSESSID=634t4952888bd6bei50ea3d3aa');

        var formdata = new FormData();
        formdata.append('receiver_id', global.id);
        formdata.append('sender_id', currentprovider.id);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };
        // const apiurl ='https://fisdemoprojects.com/skilledman/api/chats_status.php';
        const apiurl = `${BASE_URL}chats_status.php`;

        const response = await fetch(apiurl, requestOptions);
        const result = await response.json();
        if (result && result.status) {
          // console.log('staus of message', result.status);
        }
      } catch (error) {}
    };
    Changestatus();
  }, [focus, message]);

  // Render each chat message
  const renderChatMessage = ({item}) => {
    console.log(item, 'item--------');

    return (
      <>
        <View style={styles.imgContainer}>
          {item.sender_id == global.id && (
            <Image
              source={{
                // uri: `https://fisdemoprojects.com/skilledman/api/uploads//${global.profile}`,
                uri: `${BASE_URL}uploads//${global.profile}`,
              }}
              style={styles.imageStyle}
            />
          )}
          <View
            style={
              item.sender_id == global.id
                ? styles.receiverMessage
                : styles.senderMessage
            }>
            <Text
              style={
                item.sender_id == global.id
                  ? styles.receiverText
                  : styles.messageText
              }>
              {item.message}
            </Text>
          </View>
          {item.sender_id == currentprovider.id && (
            <Image
              source={{
                // uri: `https://fisdemoprojects.com/skilledman/api/uploads//${currentprovider.image}`,
                uri: `${BASE_URL}uploads//${currentprovider.image}`,
              }}
              style={[styles.imageStyle, {...styles.recImg}]}
            />
          )}
        </View>

        <Text
          style={
            item.sender_id == global.id ? styles.timestamp : styles.timeStyle
          }>
          {item.created_at}
        </Text>

        {/*  */}
        {/* <View style={styles.imgContainer}>
          {item.sender_id == currentprovider.id && (
            <Image source={{ uri: `https://fisdemoprojects.com/skilledman/api/uploads//${currentprovider.image}` }} style={styles.imageStyle} />
          )}
          <View
            style={
              item.sender_id == global.id
                ? styles.senderMessage
                : styles.receiverMessage
            }>
            <Text
              style={
                item.sender_id == global.id
                  ? styles.messageText
                  : styles.receiverText
              }>
              {item.message}
            </Text>
          </View>
          {item.sender_id == global.id  && (
            <Image
              source={{ uri: `https://fisdemoprojects.com/skilledman/api/uploads//${global.profile}` }}
              style={[styles.imageStyle, { ...styles.recImg }]}
            />
          )}
        </View>

        <Text
          style={item.sender_id == global.id ? styles.timestamp : styles.timeStyle}>
          {item.created_at}
        </Text> */}
      </>
    );
  };

  const ConversationScreen21 = () => {
    const userId = global.id;
    const providerId = global.providerid;
    const route = useRoute();
    const currentprovider = route.params?.currentuser;
    global.providerid = currentprovider.id;
    console.log(global.providerid, 'globalproviderid');
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [attachment, setAttachment] = useState(null); // State to store selected attachment
    const conversationId = [userId, providerId].sort().join('_'); // Unique conversation ID

    useEffect(() => {
      const unsubscribe = firestore()
        .collection('chat')
        .doc(conversationId)
        .collection('message')
        .orderBy('timestamp', 'asc') // Order messages by timestamp
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(messages);
        });

      return () => unsubscribe();
    }, [conversationId]);

    const sendMessage = async () => {
      if (messageText.trim() === '' && !attachment) return; // Prevent sending empty messages and attachments
      const messageData = {
        userId,
        providerId,
        text: messageText.trim(),
        timestamp: firestore.FieldValue.serverTimestamp(),
      };

      if (attachment) {
        // If an attachment is selected, upload it to Firebase storage
        const response = await fetch(attachment.uri);
        const blob = await response.blob();
        const filename = attachment.name || 'attachment';
        const storageRef = storage().ref(`attachments/${filename}`);
        await storageRef.put(blob);
        const downloadUrl = await storageRef.getDownloadURL();
        messageData.attachment = {
          type: attachment.type,
          uri: downloadUrl,
          name: filename,
        };
        setAttachment(null); // Clear the attachment state after sending
      }

      await firestore()
        .collection('chat')
        .doc(conversationId)
        .collection('message')
        .add(messageData);

      setMessageText(''); // Clear the message input after sending
    };

    const pickAttachment = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        setAttachment(res);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker');
        } else {
          console.log('Error while picking file:', err);
        }
      }
    };

    return (
      <ScrollView style={{flex: 1}}>
        {messages.map(message => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
              justifyContent:
                message.userId === userId ? 'flex-end' : 'flex-start',
              marginVertical: 5,
              paddingHorizontal: 10,
            }}
            key={message.id}>
            {message.userId !== userId && (
              <Image
                source={{
                  uri: `https://fisdemoprojects.com/skilledman/api/uploads//${currentprovider.image}`,
                }}
                style={{height: 55, width: 55, borderRadius: 8, marginRight: 6}}
              />
            )}
            <View
              style={{
                backgroundColor:
                  message.userId === userId ? '#965c00' : '#e4e4e4',
                borderRadius: 14,
                padding: 10,
                width: '60%',
              }}>
              {message.attachment &&
              message.attachment.type.startsWith('image') ? (
                <TouchableOpacity
                  onPress={() => {
                    /* Handle image preview */
                  }}>
                  <Image
                    source={{uri: message.attachment.uri}}
                    style={{width: 200, height: 200, borderRadius: 10}}
                  />
                </TouchableOpacity>
              ) : (
                <Text style={{color: 'black'}}>{message.text}</Text>
              )}
              {message.attachment && (
                <Text style={{fontSize: 12, color: 'grey', marginTop: 5}}>
                  {message.attachment.name}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 2,
                  color: color.lightGray,
                  alignSelf: 'flex-start',
                  marginBottom: 5,
                  marginRight: '1%',
                }}>
                {message?.timestamp &&
                  new Date(message?.timestamp?.toDate())?.toLocaleString()}
              </Text>
            </View>

            {message.userId === userId && (
              <Image
                source={{
                  uri: `https://fisdemoprojects.com/skilledman/api/uploads//${global.profile}`,
                }}
                style={{height: 55, width: 55, borderRadius: 8, marginRight: 6}}
              />
            )}
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#e4e4e4',
            padding: 4,
            borderRadius: 12,
            marginTop: 8,
            elevation: 0,
          }}>
          <TextInput
            style={{
              color: 'black',
              flex: 1,
              paddingHorizontal: 16,
            }}
            placeholder="Send Message"
            placeholderTextColor={color.lightGray}
            value={messageText}
            onChangeText={text => setMessageText(text)}
          />

          <View
            style={{marginLeft: 8, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={pickAttachment}>
              <Icons.AntDesign
                name="paperclip"
                size={25}
                color={color.lightGray}
              />
              <Text
                style={{
                  fontSize: 1,
                  color: color.black,
                  fontWeight: '600',
                }}>
                {attachment ? attachment.name : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage}>
              <Icons.FontAwesome
                name="send"
                size={20}
                color={color.lightGray}
                style={{
                  marginLeft: 7,
                  backgroundColor: color.default,
                  color: color.white,
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                  borderRadius: 6,
                }}
              />
            </TouchableOpacity>
            {/* <Button title="Send" onPress={sendMessage} /> */}
          </View>
        </View>
      </ScrollView>
    );
  };

    const handleButtonPress = () => {
      const myHeaders = new Headers();
      myHeaders.append("Cookie", "PHPSESSID=0lbflged6ief3f0ks6rsjd6hti");
      
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      fetch("https://theskilledman.com/api/firebase/chat.php", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log('chatresult',result))

        .catch((error) => console.error(error));
  };

  const NewMessage = () => {
    const userId = global.id;
    const providerId = global.providerid;
    const route = useRoute();
    const currentprovider = route.params?.currentuser;
    global.providerid = currentprovider.id;
    console.log(global.providerid, 'globalproviderid');
    const [messages, setMessages] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [conversationId, setConversationId] = useState('');

    // useEffect(() => {
    //   const newConversationId = [userId, providerId].sort().join('_');
    //   setConversationId(newConversationId);
    //   const querySnapShot = firestore()
    //     .collection('chat')
    //     .doc(newConversationId)
    //     .collection('message')
    //     .orderBy('createdAt', 'desc');
    //   querySnapShot.onSnapshot(snapShot => {
    //     const allMessages = snapShot.docs.map(snap => {
    //       return {...snap.data(), createdAt: new Date()};
    //     });
    //     setMessages(allMessages);
    //   });
    // }, [userId, providerId, currentprovider]);

    useEffect(() => {
      const newConversationId = [userId, providerId].sort().join('_');
      setConversationId(newConversationId);
      const querySnapShot = firestore()
        .collection('chat')
        .doc(newConversationId)
        .collection('message')
        .orderBy('createdAt', 'desc');
      querySnapShot.onSnapshot(snapShot => {

        console.log('allMessages',allMessages);
        const allMessages = snapShot.docs.map(snap => {
          return {...snap.data(), createdAt: snap?.data()?.createdAt?.toDate()};
          // Use toDate() to convert Firestore timestamp to JavaScript Date object
        });
       
        setMessages(allMessages);
      });
    }, [userId, providerId, currentprovider]);



    
    const onSend = messageArray => {
      //console.log('fsfsf');
      let myMsg = null;
      if (imageUrl !== '') {
        const msg = messageArray[0];
        myMsg = {
          ...msg,
          senderId: userId,
          receiverId: providerId,
          image: imageUrl,
        };
      } else {
        const msg = messageArray[0];
        myMsg = {
          ...msg,
          senderId: userId,
          receiverId: providerId,
          image: '',
        };
      }
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, myMsg),
      );
      firestore()
        .collection('chat')
        .doc(conversationId)

        .collection('message')
        .add({
          ...myMsg,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setImageUrl('');
      setImageData(null);
      handleButtonPress();
    };
    const openCamera = async () => {
      const result = await launchCamera({mediaType: 'photo'});
      console.log(result);
      if (result.didCancel && result.didCancel == true) {
      } else {
        setImageData(result);
        uplaodImage(result);
      }
    };
    const uplaodImage = async imageData => {
      if (imageData && imageData.assets && imageData.assets.length > 0) {
        const blob = await fetch(imageData.assets[0].uri).then(response =>
          response.blob(),
        );
        const reference = storage().ref(
          'gs://skilledman-17d40.appspot.com',
        );
        try {
          await reference.put(blob);
          const url = await reference.getDownloadURL();
          console.log('url', url);
          setImageUrl(url);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        console.log('Invalid imageData');
      }
    };

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <GiftedChat
          alwaysShowSend
          isTyping={true}
          renderSend={props => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 60,
                }}>
                {imageUrl !== '' ? (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: '#fff',
                      marginRight: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setImageUrl('');
                      }}>
                      <Icons.AntDesign
                        name="picture"
                        size={30}
                        color={color.default}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
                <TouchableOpacity
                  style={{marginRight: 20}}
                  onPress={() => {
                    openCamera();
                  }}>
                  <Icons.AntDesign
                    name="camera"
                    size={30}
                    color={color.default}
                  />
                </TouchableOpacity>
                <Send {...props} containerStyle={{justifyContent: 'center'}}>
                  <Icons.FontAwesome
                    name="send"
                    size={20}
                    color={color.lightGray}
                    style={{
                      marginLeft: 7,
                      marginRight: 13,
                      backgroundColor: color.default,
                      color: color.white,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 6,
                      marginBottom: 5,
                    }}
                  />
                </Send>
              </View>
            );
          }}
          messages={messages}
          onSend={messages => onSend(messages)}
        
          user={{
            _id: userId,
          }}
          renderInputToolbar={props => {
            {
              return (
                <InputToolbar
                  {...props}
                  containerStyle={{
                    borderRadius: 15,

                    backgroundColor: '#e4e4e4',
                  }}
                />
              );
            }
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: color.default,
                  },
                }}
              />
            );
          }}
        />
      </View>
    );
  };

  const ConversationScreen3 = () => {
    const userId = global.id;
    const providerId = global.providerid;
    const route = useRoute();
    const currentprovider = route.params?.currentuser;
    global.providerid = currentprovider.id;
    console.log(global.providerid, 'globalproviderid');

    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState('');
    const [attachment, setAttachment] = useState(null); // State to store selected attachment
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
      const newConversationId = [userId, providerId].sort().join('_');
      setConversationId(newConversationId);

      // const  FetchUri =  await fetch(data?.attachment?.path)
      // const response = FetchUri.blob()
      const unsubscribe = firestore()
        .collection('chat')
        .doc(newConversationId) // Use the updated conversationId state value
        .collection('message')
        .orderBy('timestamp', 'asc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs
            .map(doc => {
              if (!doc.exists) {
                return null;
              }
              const data = doc.data();
              return {
                _id: doc.id,
                text: data.text,
                createdAt: data.timestamp ? data.timestamp.toDate() : null,
                user: {
                  _id: data.userId === userId ? userId : providerId,
                  name: data.userId === userId ? 'You' : currentprovider.name,
                  avatar:
                    data.userId === userId
                      ? `https://fisdemoprojects.com/skilledman/api/uploads//${global.profile}`
                      : `https://fisdemoprojects.com/skilledman/api/uploads//${currentprovider.image}`,
                },

                image:
                  data.attachment && data.attachment.type.startsWith('image')
                    ? data.attachment.uri
                    : null,
                video: null,
                sent: true,
                received: true,
                pending: false,
              };
            })
            .filter(message => message !== null);
          setMessages(messages);
        });

      return () => unsubscribe();
    }, [userId, providerId, currentprovider]);

    const onSend = async newMessages => {
      const message = newMessages[0];
      const messageData = {
        userId,
        providerId,
        text: message.text,
        timestamp: firestore.FieldValue.serverTimestamp(),
        image: imageUrl,
      };
      console.log(messageData, 'messageimage');
      // Check if there's an image or file attachment
      // if (message.image || message.file) {
      //   try {
      //     // Fetch the image or file
      //     const response = await fetch(message.image || message.file);
      //     const blob = await response.blob();
      //     // console.log(response,'sdsdsds');

      //     // Generate a filename and storage reference
      //     const filename = message.image ? 'image.jpg' : 'file.pdf';
      //     const storageRef = storage().ref(`attachments/${filename}`);

      //     // Upload the blob to Firebase Storage
      //     await storageRef.put(blob);

      //     // Get the download URL of the uploaded file
      //     const downloadUrl = await storageRef.getDownloadURL();

      //     // Add the attachment field to messageData with the download URL
      //     messageData.attachment = {
      //       uri: downloadUrl,
      //     };
      //   } catch (error) {
      //     console.error('Error uploading attachment:', error);
      //   }
      // }
      // console.log('messgaedataata', messageData),
      // Save the messageData to Firestore
      await firestore()
        .collection('chat')
        .doc(conversationId)
        .collection('message')
        .add(messageData);

      setImageUrl('');
      setImageData(null);
    };

    const openCamera = async () => {
      const result = await launchCamera({mediaType: 'photo'});
      console.log(result, 'opencamera');

      if (result.didCancel && result.didCancel == true) {
      } else {
        setImageData(result);
        uplaodImage(result);
      }
    };
    // const uplaodImage = async imageDataa => {
    //   if (imageDataa && imageDataa.assets && imageDataa.assets.length > 0) {
    //     const reference = storage().ref(imageDataa.assets[0].fileName);
    //     const pathToFile = imageDataa.assets[0].uri;
    //     try {
    //       await reference.putFile(pathToFile);
    //       const url = await storage()
    //         .ref(imageDataa.assets[0].fileName)
    //         .getDownloadURL();
    //       console.log('url', url);
    //       setImageUrl(url);
    //     } catch (error) {
    //       console.error("Error uploading file:", error);
    //     }
    //   } else {
    //     console.log("Invalid imageDataa");
    //   }
    // };

    const uplaodImage = async imageData => {
      if (imageData && imageData.assets && imageData.assets.length > 0) {
        const blob = await fetch(imageData.assets[0].uri).then(response =>
          response.blob(),
        );
        const reference = storage().ref(
          'gs://skilledman-notification.appspot.com',
        );
        try {
          await reference.put(blob);
          const url = await reference.getDownloadURL();
          console.log('url', url);
          setImageUrl(url);
          return url;
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        console.log('Invalid imageData');
      }
    };

    console.log('urlimage', imageUrl);

    const pickAttachment = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images, DocumentPicker.types.pdf], // Allow both images and PDF files
        });
        setAttachment(res);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker');
        } else {
          console.log('Error while picking file:', err);
        }
      }
    };
    const renderCustomSend = props => (
      <View style={{marginLeft: 8, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={pickAttachment}>
          <Icons.AntDesign name="paperclip" size={25} color={color.lightGray} />
          <Text
            style={{
              fontSize: 1,
              color: color.black,
              fontWeight: '600',
            }}>
            {attachment ? attachment.name : ''}
          </Text>
        </TouchableOpacity>
        <Send {...props}>
          <Icons.FontAwesome
            name="send"
            size={20}
            color={color.lightGray}
            style={{
              marginLeft: 7,
              marginRight: 13,
              backgroundColor: color.default,
              color: color.white,
              paddingVertical: 8,
              paddingHorizontal: 8,
              borderRadius: 6,
            }}
          />
        </Send>
        {/* <View
        
        >
          {imageUrl !== '' ? (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: '#fff',
                marginRight: 10,
              }}>
              <Image
                source={{uri: imageData.assets[0].uri}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  position: 'absolute',
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  setImageUrl('');
                }}>
                <Icons.AntDesign name="paperclip" size={25} color={color.red} />
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => {
              openCamera();
            }}>
            <Icons.AntDesign name="paperclip" size={25} color={color.red} />
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() => {
            openCamera();
          }}>
          <Icons.AntDesign name="paperclip" size={25} color={color.red} />
        </TouchableOpacity>

        <View style={{}}>
          {imageUrl ? (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: '#fff',
                marginRight: 10,
              }}>
              <Image
                source={{uri: imageUrl}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  position: 'absolute',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setImageUrl('');
                }}>
                <Icons.AntDesign name="paperclip" size={25} color={color.red} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {/* <Button title="Send" onPress={sendMessage} /> */}
      </View>
    );

    return (
      <View style={{flex: 1}}>
        <GiftedChat
          alwaysShowSend
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: userId,
          }}
          renderInputToolbar={props => {
            {
              return (
                <InputToolbar
                  {...props}
                  containerStyle={{
                    borderRadius: 15,
                    height: 50,

                    backgroundColor: '#e4e4e4',
                  }}
                />
              );
            }
          }}
          // renderSend={renderCustomSend}
          renderSend={props => {
            return (
              <View
                style={{
                  marginLeft: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {/* <TouchableOpacity onPress={pickAttachment}>
                  <Icons.AntDesign
                    name="paperclip"
                    size={25}
                    color={color.lightGray}
                  />
                  <Text
                    style={{
                      fontSize: 1,
                      color: color.black,
                      fontWeight: '600',
                    }}>
                    {attachment ? attachment.name : ''}
                  </Text>
                </TouchableOpacity> */}
                <View style={{flexDirection: 'row'}}>
                  {imageUrl !== '' ? (
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        marginRight: 10,
                      }}>
                      <Image
                        source={{uri: imageData.assets[0].uri}}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          position: 'absolute',
                        }}
                      />

                      <TouchableOpacity
                        onPress={() => {
                          setImageUrl('');
                        }}>
                        <Icons.AntDesign
                          name="picture"
                          size={30}
                          color={color.default}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    onPress={() => {
                      openCamera();
                    }}>
                    <Icons.AntDesign
                      name="camera"
                      size={30}
                      color={color.default}
                    />
                  </TouchableOpacity>
                </View>
                <Send {...props}>
                  <Icons.FontAwesome
                    name="send"
                    size={20}
                    color={color.lightGray}
                    style={{
                      marginLeft: 7,
                      marginRight: 13,
                      backgroundColor: color.default,
                      color: color.white,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 6,
                      marginBottom: 5,
                    }}
                  />
                </Send>

                {/* <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { openCamera(); }}>
          <Icons.AntDesign name="paperclip" size={25} color={color.red} />
        </TouchableOpacity>
      
          <View style={{  }}>
        {imageUrl ? (
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#fff', marginRight: 10 }}>
            <Image source={{ uri: imageUrl }} style={{ width: 40, height: 40, borderRadius: 10, position: 'absolute' }} />
            <TouchableOpacity onPress={() => { setImageUrl(''); }}>
              <Icons.AntDesign name="paperclip" size={25} color={color.red} />
            </TouchableOpacity>
          </View>
        ) : null}
       
      </View> */}
                {/* <Button title="Send" onPress={sendMessage} /> */}
              </View>
            );
          }}
          inverted={false}
          isTyping={true}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: color.default,
                  },
                }}
              />
            );
          }}
        />
      </View>
    );
  };
  const NewMessagepdf = () => {
    const userId = global.id;
    const providerId = global.providerid;
    const route = useRoute();
    const currentprovider = route.params?.currentuser;
    global.providerid = currentprovider.id;
    // console.log(global.providerid, 'globalproviderid');
    const [messages, setMessages] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [conversationId, setConversationId] = useState('');
    useEffect(() => {
      const newConversationId = [userId, providerId].sort().join('_');
      setConversationId(newConversationId);
      const querySnapShot = firestore()
        .collection('chat')
        .doc(newConversationId)
        .collection('message')
        .orderBy('createdAt', 'desc');
      querySnapShot.onSnapshot(snapShot => {
        const allMessages = snapShot.docs.map(snap => {
          return {...snap.data(), createdAt: new Date()};
        });
        setMessages(allMessages);
      });
    }, [userId, providerId, currentprovider]);

    // const onSend = messageArray => {
    //   console.log('fsfsf');
    //   let myMsg = null;
    //   if (imageUrl !== '') {
    //     const msg = messageArray[0];
    //     myMsg = {
    //       ...msg,
    //       senderId: userId,
    //       receiverId: providerId,
    //       image: imageUrl,
    //     };
    //   } else {
    //     const msg = messageArray[0];
    //     myMsg = {
    //       ...msg,
    //       senderId: userId,
    //       receiverId: providerId,
    //       image: '',
    //     };
    //   }
    //   setMessages(previousMessages =>
    //     GiftedChat.append(previousMessages, myMsg),
    //   );
    //   firestore()
    //     .collection('chat')
    //     .doc(conversationId)

    //     .collection('message')
    //     .add({
    //       ...myMsg,
    //       createdAt: firestore.FieldValue.serverTimestamp(),
    //     });
    //   setImageUrl('');
    //   setImageData(null);
    // };

    // Modify the onSend function to include PDF URL in the message object

    //

    //this code send image url instead image url
    // const onSend = async messagesArray => {
    //     let myMsg = null;
    //     if (imageUrl !== '') {
    //       // If an image is attached, include the image URL in the message object
    //       const msg = messagesArray[0];
    //       myMsg = {
    //         ...msg,
    //         senderId: userId,
    //         receiverId: providerId,
    //         image: imageUrl,
    //       };
    //     } else if (pdfUrl !== '') {
    //       // If a PDF is attached, include the PDF URL in the message object
    //       const msg = messagesArray[0];
    //       myMsg = {
    //         ...msg,
    //         senderId: userId,
    //         receiverId: providerId,
    //         pdf: pdfUrl,
    //       };
    //     } else {
    //       // If neither image nor PDF is attached, send a regular message
    //       const msg = messagesArray[0];
    //       myMsg = {
    //         ...msg,
    //         senderId: userId,
    //         receiverId: providerId,
    //         image: '',
    //         pdf: '',
    //       };
    //     }

    //     // Add the message to the Firestore database
    //     firestore()
    //       .collection('chat')
    //       .doc(conversationId)
    //       .collection('message')
    //       .add({
    //         ...myMsg,
    //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //       });

    //     // Clear the image and PDF URLs after sending the message
    //     setImageUrl('');
    //     setPdfUrl('');
    //   };

    // Add a function to open the file picker for selecting PDF files
    // const openFilePicker = async () => {
    //   const options = {
    //     mediaType: 'document',
    //   };
    //   launchImageLibrary(options, async response => {
    //     if (!response.didCancel) {
    //       const pdfUrl = await uploadPdf(response);
    //       setPdfUrl(pdfUrl);
    //     }
    //   });
    // };

    const uploadDocument = async documentData => {
      try {
        if (documentData) {
          const blob = await fetch(documentData.uri).then(response =>
            response.blob(),
          );
          const filename = documentData.name ?? 'document'; // Use a default filename if not provided
          const reference = storage().ref(
            'gs://skilledman-notification.appspot.com',
          );
          await reference.put(blob);
          const url = await reference.getDownloadURL();
          console.log('Document uploaded successfully. URL:', url);
          setImageUrl(url);
        } else {
          console.log('Invalid document data');
        }
      } catch (error) {
        console.error('Error uploading document:', error);
      }
    };

    // Modify the onSend function to include document URL in the message object
    const onSend = async messagesArray => {
      let myMsg = null;
      if (imageUrl !== '') {
        // If an image is attached, include the image URL in the message object
        const msg = messagesArray[0];
        myMsg = {
          ...msg,
          senderId: userId,
          receiverId: providerId,
          image: imageUrl,
        };
      } else if (documentUrl !== '') {
        // If a document is attached, include the document URL in the message object
        const msg = messagesArray[0];
        myMsg = {
          ...msg,
          senderId: userId,
          receiverId: providerId,
          document: documentUrl,
        };
      } else {
        // If neither image nor document is attached, send a regular message
        const msg = messagesArray[0];
        myMsg = {
          ...msg,
          senderId: userId,
          receiverId: providerId,
          image: '',
          document: '',
        };
      }

      // Add the message to the Firestore database
      firestore()
        .collection('chat')
        .doc(conversationId)
        .collection('message')
        .add({
          ...myMsg,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

      // Clear the image and document URLs after sending the message
      setImageUrl('');
      setDocumentUrl('');
    };

    const openDocumentPicker = async () => {
      try {
        const response = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        uploadDocument(response);
      } catch (error) {
        console.log('Document picker error:', error);
      }
    };

    const [documentUrl, setDocumentUrl] = useState('');
    // Add the PDF state variable
    const [pdfUrl, setPdfUrl] = useState('');

    const openCamera = async () => {
      const result = await launchCamera({mediaType: 'photo'});
      console.log(result);
      if (result.didCancel && result.didCancel == true) {
      } else {
        setImageData(result);
        uplaodImage(result);
      }
    };
    const uplaodImage = async imageData => {
      if (imageData && imageData.assets && imageData.assets.length > 0) {
        const blob = await fetch(imageData.assets[0].uri).then(response =>
          response.blob(),
        );
        const reference = storage().ref(
          'gs://skilledman-notification.appspot.com',
        );
        try {
          await reference.put(blob);
          const url = await reference.getDownloadURL();
          console.log('url', url);
          setImageUrl(url);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        console.log('Invalid imageData');
      }
    };

    // Add the function to upload PDF files
    const uploadPdf = async pdfData => {
      if (pdfData && pdfData.assets && pdfData.assets.length > 0) {
        const blob = await fetch(pdfData.assets[0].uri).then(response =>
          response.blob(),
        );
        // const reference2 = storage().ref().child('pdfs/' + pdfData.assets[0].fileName); // Adjust the path as needed
        const reference = storage().ref(
          'gs://skilledman-notification.appspot.com',
        );
        try {
          await reference.put(blob);
          const url = await reference.getDownloadURL();
          console.log('PDF uploaded successfully. URL:', url);
          return url; // Return the URL for further use
        } catch (error) {
          console.error('Error uploading PDF:', error);
          return null; // Return null in case of error
        }
      } else {
        console.log('Invalid PDF data');
        return null; // Return null if pdfData is invalid
      }
    };

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <GiftedChat
          alwaysShowSend
          // Modify the renderSend method to include the file picker for PDFs
          // renderSend={props => (
          //   <View
          //     style={{flexDirection: 'row', alignItems: 'center', height: 60}}>
          //     {imageUrl !== '' && (
          //       <View
          //         style={{
          //           width: 40,
          //           height: 40,
          //           borderRadius: 10,
          //           backgroundColor: '#fff',
          //           marginRight: 10,
          //         }}>
          //         <TouchableOpacity
          //           onPress={() => {
          //             setImageUrl('');
          //           }}>
          //           <Icons.AntDesign
          //             name="picture"
          //             size={30}
          //             color={color.default}
          //           />
          //         </TouchableOpacity>
          //       </View>
          //     )}
          //     {pdfUrl !== '' && (
          //       <View
          //         style={{
          //           width: 40,
          //           height: 40,
          //           borderRadius: 10,
          //           backgroundColor: '#fff',
          //           marginRight: 10,
          //         }}>
          //         <TouchableOpacity
          //           onPress={() => {
          //             setPdfUrl('');
          //           }}>
          //           <Icons.AntDesign
          //             name="filetext1"
          //             size={30}
          //             color={color.default}
          //           />
          //         </TouchableOpacity>
          //       </View>
          //     )}
          //     <TouchableOpacity
          //       style={{marginRight: 20}}
          //       onPress={() => {
          //         openCamera();
          //       }}>
          //       <Icons.AntDesign
          //         name="camera"
          //         size={30}
          //         color={color.default}
          //       />
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //       style={{marginRight: 20}}
          //       onPress={() => {
          //         openFilePicker();
          //       }}>
          //       <Icons.AntDesign
          //         name="filetext1"
          //         size={30}
          //         color={color.default}
          //       />
          //     </TouchableOpacity>
          //     <Send {...props} containerStyle={{justifyContent: 'center'}}>
          //       <Icons.FontAwesome
          //         name="send"
          //         size={20}
          //         color={color.lightGray}
          //         style={{
          //           marginLeft: 7,
          //           marginRight: 13,
          //           backgroundColor: color.default,
          //           color: color.white,
          //           paddingVertical: 10,
          //           paddingHorizontal: 10,
          //           borderRadius: 6,
          //           marginBottom: 5,
          //         }}
          //       />
          //     </Send>
          //   </View>
          // )}

          renderSend={props => (
            <View
              style={{flexDirection: 'row', alignItems: 'center', height: 60}}>
              {imageUrl !== '' && (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    marginRight: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setImageUrl('');
                    }}>
                    <Icons.AntDesign
                      name="picture"
                      size={30}
                      color={color.default}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {documentUrl !== '' && (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    marginRight: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setDocumentUrl('');
                    }}>
                    <Icons.AntDesign
                      name="filetext1"
                      size={30}
                      color={color.default}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => {
                  openCamera();
                }}>
                <Icons.AntDesign
                  name="camera"
                  size={30}
                  color={color.default}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => {
                  openDocumentPicker();
                }}>
                <Icons.AntDesign
                  name="filetext1"
                  size={30}
                  color={color.default}
                />
              </TouchableOpacity>
              <Send {...props} containerStyle={{justifyContent: 'center'}}>
                <Icons.FontAwesome
                  name="send"
                  size={20}
                  color={color.lightGray}
                  style={{
                    marginLeft: 7,
                    marginRight: 13,
                    backgroundColor: color.default,
                    color: color.white,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 6,
                    marginBottom: 5,
                  }}
                />
              </Send>
            </View>
          )}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: userId,
          }}
          renderInputToolbar={props => {
            {
              return (
                <InputToolbar
                  {...props}
                  containerStyle={{
                    borderRadius: 15,

                    backgroundColor: '#e4e4e4',
                  }}
                />
              );
            }
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: color.default,
                  },
                }}
              />
            );
          }}
        />
      </View>
    );
  };

  return (
    <>
      <ChatUserHeader
        recieverdata={currentprovider}
        onPress={() => navigation.goBack()}
        backIcon="arrow-left"
        titleText="Ahmad"
        dollarIcon="file-invoice-dollar"
        phoneIcon="phone"
        searchIcon="ellipsis-v"
        onShowModal={toggleModal}
        navigation={navigation}
        onProfilePress={() => {
          if (global.role === '1') {
            navigation.navigate('ExpertDetail', {item: P_Data[0]});
          } else {
            toggleModal();
          }
          // {
          //   global.role == '1'
          //     ? navigation.navigate('ExpertDetail', {item: P_Data[0]})
          //     : null;
          // }
        }}
      />
      <View style={{flex: 1, height: '100%', backgroundColor: 'white'}}>
        {/* <ConversationScreen3 /> */}
        <NewMessage />
      </View>

      {/* <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderChatMessage}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            style={styles.input}
            placeholder="Send Message"
            placeholderTextColor={color.lightGray}
          />
          <View style={styles.sendButton}>
            <TouchableOpacity
              onPress={() => {
                handleFilePick();
              }}>
              <Icons.AntDesign
                name="paperclip"
                size={25}
                color={color.lightGray}
              />
              <Text style={styles.labelStyle}>
                {selectedfile ? selectedfile.name : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendmessage}>
              <Icons.FontAwesome
                name="send"
                size={20}
                color={color.lightGray}
                style={styles.sendStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View> */}

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={toggleModal}>
                <Icons.FontAwesome5
                  name="times"
                  color={color.white}
                  size={20}
                  style={styles.closeStyle}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={{
                backgroundColor: '#965c00',
                width: 50,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '80%',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}>
                X
              </Text>
            </TouchableOpacity>
            <View style={styles.successmodalBody}>
              <Image
                source={{
                  // uri: `https://fisdemoprojects.com/skilledman/api/uploads//${currentprovider.image}`,
                  uri: `${BASE_URL}uploads//${currentprovider.image}`,
                }}
                style={[styles.imagemodal, {...styles.recImg}]}
              />
              {/* <Text style={styles.pendAppr}>Kamu</Text>
              <Text style={styles.bookingStyle}>Booking ID- 453827</Text>
              <View style={styles.dateTimeCont}>
                <Text style={styles.dateStyle}>Sep 10, 2023</Text>
                <Text style={styles.bookingStyle}>(4:45 PM)</Text>
              </View>
              <View style={styles.dateTimeCont}>
                <Icons.FontAwesome
                  name="file-text"
                  size={22}
                  color={color.darkGray}
                />
                <Text style={styles.bookingStyle}> Service Detail</Text>
              </View> */}

              {/* <Text style={styles.getDir}> Get Direction</Text> */}
            </View>

            <View style={styles.btnContainer}>
              {/* <TouchableOpacity
           onPress={() => toggleModal()}
           style={{backgroundColor:'#965c00',width:50,height:30,alignItems:'center',justifyContent:'center'}}
          >
        <Text
        style={{alignItems:'center',justifyContent:'center',color:'white'}}
        >X</Text>
          </TouchableOpacity> */}

              {/* <BtnComp
             
             BtnStyle={{width:100}}
             btnTextStyle={styles.btnTextStyle}
             btnText="Close"
           /> */}
              {/* <BtnComp
                BtnStyle={styles.rejectStyle}
                btnTextStyle={styles.btnTextStyle}
                btnText="Reject"
              /> */}
            </View>
          </View>
        </View>
      </Modal>
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
});

export default IndividualChat;
