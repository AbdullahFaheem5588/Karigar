import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import colors from '../Assets/colors/colors';
import {Wrap} from 'native-base';
import Icon, {Icons} from '../Components/Icons';

const NotificationCard = props => {
  return (
    <View style={[styles.MainContainer, {...props.styles}]}>
      <View style={styles.imgCont}>
        <Image
          source={props.source}
          style={styles.imgStyle}
          resizeMode="contain"
        />
        <View style={styles.contStyle}>
          <Text style={styles.catStyle}>{props.orderPicked}</Text>
          <Text style={[styles.catStyle, {marginTop: 6}]}>{props.time}</Text>
        </View>
      </View>
      <Icons.Entypo name={props.icon} style={styles.iconStyle} />
    </View>
  );
};

export default NotificationCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgreen,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  priceStyle: {
    color: colors.gray,
    fontSize: 15,
    fontWeight: '400',
  },
  MainContainer: {
    width: '100%',
    backgroundColor: colors.lightgreen,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  catStyle: {
    fontSize: 16,
    color: colors.black,
    flexWrap: 'wrap',
  },
  imgStyle: {
    borderRadius: 50,
    height: 80,
    width: 80,
    marginRight: 10,
    // marginLeft: -10,
  },
  imgCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: '90%',
  },
  iconStyle: {
    fontSize: 25,
    color: colors.black,
  },
  contStyle: {},
});
