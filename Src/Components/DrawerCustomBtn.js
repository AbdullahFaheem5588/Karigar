import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import color from '../Assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import icon, {Icons} from '../Components/Icons';
import {Hidden} from 'native-base';
const DrawerCustomBtn = props => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity style={styles.loginBtn} onPress={props.DrawerBtnPress}>
        <Icons.FontAwesome name={props.drawerIcon} style={styles.iconStyle} />
        <Text style={styles.btnText}>{props.title}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    textAlign: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomColor: color.white,
    borderBottomWidth: 0,
    width: '100%',
    paddingHorizontal: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    width: '100%',
  },
  iconStyle: {
    fontSize: 27,
    color: color.white,
    width: '15%',
  },
});

export default DrawerCustomBtn;
