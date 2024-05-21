import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import color from '../../Assets/colors/colors';
import NotificationCard from '../../Components/NotificationCard';
import {ScrollView} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';

const NotificationScreen = (props, {route, navigation}) => {
  return (
    <>
      <CustomHeader
        title="Notifications"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <NotificationCard
            orderPicked="Your request has been accepted"
            time="11:00 AM"
            icon="dots-three-horizontal"
            source={require('../../Assets/Images/user.jpg')}
          />
          <NotificationCard
            orderPicked="Your request  has been sent"
            time="12:00 PM"
            icon="dots-three-horizontal"
            source={require('../../Assets/Images/user.jpg')}
          />
          <NotificationCard
            orderPicked="Mpho cancel your request"
            time="03:00 PM"
            icon="dots-three-horizontal"
            source={require('../../Assets/Images/user.jpg')}
          />
          <NotificationCard
            orderPicked="Order Cancel"
            time="04:00 PM"
            icon="dots-three-horizontal"
            source={require('../../Assets/Images/user.jpg')}
          />
        </View>
        <Text style={styles.titleStyle}>Yesterday</Text>
        <NotificationCard
          styles={{backgroundColor: color.peach}}
          orderPicked="Your request has been accepted"
          time="06:00 PM"
          icon="dots-three-horizontal"
          source={require('../../Assets/Images/user.jpg')}
        />
        <NotificationCard
          styles={{backgroundColor: color.peach}}
          orderPicked="Your request has been accepted"
          time="05:33 PM"
          icon="dots-three-horizontal"
          source={require('../../Assets/Images/user.jpg')}
        />
        <NotificationCard
          styles={{backgroundColor: color.peach}}
          orderPicked="Your request has been accepted"
          time="04:00 PM"
          icon="dots-three-horizontal"
          source={require('../../Assets/Images/user.jpg')}
        />
      </ScrollView>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 0,
  },
  container: {
    // paddingHorizontal: 15,
    paddingVertical: 15,
  },
  HeadStyle: {
    fontSize: 19,
    fontWeight: '600',
    paddingVertical: 10,
    color: color.darkGreen,
  },
  iconStyle: {
    color: color.white,
    fontSize: 33,
    backgroundColor: color.darkGreen,
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  iconCont: {
    position: 'absolute',
    right: '2%',
    bottom: '3%',
  },
  backgroundImg: {
    height: '100%',
  },
  titleStyle: {
    color: color.default,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
    marginBottom: 15,
  },
  linearGradientStyle: {
    elevation: 0,
    borderRadius: 6,
  },
});
