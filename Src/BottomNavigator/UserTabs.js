import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {Icons} from '../Components/Icons';
import * as Animatable from 'react-native-animatable';
import color from '../Assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import ChatScreen from '../Screens/Chat/ChatScreen';
import UserDashboard from '../Screens/DashBoard/UserDashboard';
import BookingScreen from '../Screens/Booking/BookingScreen';
import SaveScreen from '../Screens/Save/SaveScreen';
const TabArr = [
  // {
  //   route: 'ConversationScreen',
  //   label: 'Chat',
  //   type: Icons.FontAwesome,
  //   icon: 'commenting-o',
  //   component: ConversationScreen,
  //   color: color.darkgreen,
  //   alphaClr: color.white,
  // },
  // {
  //   route: 'ChatScreen',
  //   label: 'Chat',
  //   type: Icons.FontAwesome,
  //   icon: 'commenting-o',
  //   component: ChatScreen,
  //   color: color.darkgreen,
  //   alphaClr: color.white,
  // },
  {
    route: 'DashBoard',
    label: 'Home',
    type: Icons.FontAwesome,
    icon: 'home',
    component: UserDashboard,
    color: color.darkgreen,
    alphaClr: color.white,
  },
  {
    route: 'SaveScreen',
    label: 'Save',
    type: Icons.FontAwesome,
    icon: 'bookmark',
    component: SaveScreen,
    color: color.darkgreen,
    alphaClr: color.white,
  },

  {
    route: 'BookingScreen',
    label: 'Booking',
    type: Icons.MaterialIcons,
    icon: 'home-filled',
    component: BookingScreen,
    color: color.darkgreen,
    alphaClr: color.white,
  },
  {
    route: 'ChatScreen',
    label: 'Chat',
    type: Icons.FontAwesome,
    icon: 'commenting-o',
    component: ChatScreen,
    color: color.darkgreen,
    alphaClr: color.white,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);
  const [getChat, setALlChat] = useState([]);
  const [countunread, setCountUnread] = useState(0);

  useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

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
      const apiurl =
        'https://fisdemoprojects.com/skilledman/api/get_all_chats.php';

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      if (result && result.chat) {
        setALlChat(result.chat);
      }
    } catch (error) {
      console.log('errorin get allchat');
    }
  };

  const totalunread = () => {
    let unread = getChat.reduce((total, item) => total + item.unread_count, 0);
    setCountUnread(unread);
    console.log('unread count', unread);
  };

  useEffect(() => {
    gellAllChat();
    totalunread();
  }, [focused]);

  console.log('total unread', getChat);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 1}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject]}
        />
        <View
          style={[
            styles.btnStyle,
            {backgroundColor: focused ? 'transparent' : item.white},
            {borderBottomWidth: focused ? 3 : 0},
            {borderBottomColor: focused ? color.white : 'transparent'},
          ]}>
          {item.icon == 'commenting-o' && countunread > 0 ? (
            <>
              <View
                style={[
                  styles.noOfMsg,
                  {
                    position: 'absolute',
                    bottom: 31,
                    zIndex: 99,
                    right: -5,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Text>{countunread}</Text>
              </View>

              <Icon
                type={item.type}
                name={item.icon}
                color={focused ? color.white : color.white}
                size={27}
              />
            </>
          ) : (
            <Icon
              type={item.type}
              name={item.icon}
              color={focused ? color.white : color.white}
              size={27}
            />
          )}

          <Text style={styles.labelStyle}>{item.label}</Text>
          <Animatable.View ref={textViewRef}></Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 55,
          position: 'absolute',
          bottom: 0,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[color.linTopClr, color.linMidClr]}
            style={{flex: 1}}></LinearGradient>
        ),
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.default,
    width: '100%',
  },
  btnStyle: {
    alignItems: 'center',
    paddingBottom: 3,
    marginTop: 5,
  },
  labelStyle: {
    fontSize: 11,
    fontWeight: '500',
    color: color.white,
  },
  noOfMsg: {
    backgroundColor: 'red',
    color: color.white,
    // position: "absolute",
    fontSize: 7,
  },
});
