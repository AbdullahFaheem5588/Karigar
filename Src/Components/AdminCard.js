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

const AdminCard = props => {
  return (
    <View style={{flexDirection: 'row', flex: 1, width: '100%'}}>
      <View
        onPress={props.showProfile}
        style={[styles.textContainer, {...props.cardStyle}]}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.logoImg}
            resizeMode="contain"
            // source={props.iconUrl}
            source={{uri: 'https://dummyimage.com/hd1080'}}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.TextStyle}>{props.serviceTitle}</Text>
            <Text style={styles.TextStyle}>{'ali@gmail.com'}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 6}}>
          <TouchableOpacity
            style={{paddingHorizontal: 2}}
            onPress={props.onPressView}>
            <Icons.AntDesign name={'eye'} size={20} color={color.blueGreen} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdminCard;
const styles = StyleSheet.create({
  profileCont: {
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 13,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 0,
    width: '100%',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextStyle: {
    fontSize: 15,
    color: colors.default,
    fontWeight: '400',
    marginTop: 2,
    flexWrap: 'wrap',
    textAlign: 'left',
    marginHorizontal: 5,
  },
  logoImg: {
    width: 80,
    height: 60,
  },
});
