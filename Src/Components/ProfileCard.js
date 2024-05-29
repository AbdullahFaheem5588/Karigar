import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../Assets/colors/colors';
import {Icons} from './Icons';
import color from '../Assets/colors/colors';
import {Badge} from 'react-native-paper';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import {BASE_URL} from '../Screens/Signin/Signin';

const ProfileCard = props => {
  return (
    <TouchableOpacity
      onPress={props.showProfile}
      style={[styles.textContainer, {...props.cardStyle}]}>
      <View style={styles.profileCont}>
        <View style={[styles.openingStyle, {...styles.titleCont}]}>
          <Text style={styles.TextStyle}>{props.cardTitle}</Text>
        </View>
        <View style={styles.openingStyle}>
          <Text style={styles.msgTitle}>{props.msgTitle}</Text>
        </View>
        <Text style={styles.dateStyle}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;
const styles = StyleSheet.create({
  profileCont: {
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 11,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 1,
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextStyle: {
    fontSize: 17,
    color: colors.black,
    fontWeight: '700',
    textAlign: 'left',
  },
  msgTitle: {
    fontSize: 14,
    color: colors.default,
    fontWeight: '400',
    textAlign: 'left',
  },
  openingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '72%',
  },
  dateTimeCont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateStyle: {
    fontSize: 14,
    color: colors.lightGray,
    fontWeight: '400',
    textAlign: 'left',
  },
  statusStyle: {
    fontSize: 14,
    color: colors.red,
    fontWeight: '400',
  },
  noOfMsg: {
    backgroundColor: color.default,
    color: color.white,
    fontSize: 14,
  },
  logoImg: {
    width: width / 4.8,
    height: height / 10,
    borderRadius: 10,
    marginRight: 7,
  },
  titleCont: {
    paddingBottom: 18,
  },
});
