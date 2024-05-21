import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../Assets/colors/colors';
import {Image} from 'native-base';
import {Icons} from './Icons';
const ProfileHeader = (props, {navigation}) => {
  console.log(props);
  return (
    <View style={styles.containerStyle}>
      <View style={styles.topCont}>
        <TouchableOpacity onPress={props.onPress} style={styles.menuStyle}>
          <Icon name="menu" size={35} color={color.white} />
        </TouchableOpacity>
        <Text style={styles.userStyle}>{props.screenTitle}</Text>
        <TouchableOpacity onPress={props.onPressnotification}>
          <Icons.FontAwesome
            name={props.rightIcon}
            size={20}
            color={color.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  topCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: color.default,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  userStyle: {
    fontSize: 15,
    fontWeight: '800',
    color: color.white,
  },
});
