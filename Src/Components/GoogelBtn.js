import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import color from '../Assets/colors/colors';
import {Icons} from './Icons';
const GoogleBtn = props => {
  return (
    <TouchableOpacity
      style={[styles.loginBtn, {...props.BtnStyle}]}
      onPress={props.onPressFunc}>
      <Text style={[styles.btnText, {...props.btnTextStyle}]}>
        {props.btnText}{' '}
      </Text>
      <Icons.FontAwesome
        name={props.iconName}
        size={22}
        color={color.default}
      />
    </TouchableOpacity>
  );
};

export default GoogleBtn;
const styles = StyleSheet.create({
  loginBtn: {
    borderRadius: 8,
    backgroundColor: color.default,
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 13,
    elevation: 1,
    borderWidth: 2,
    borderColor: color.default,
  },
  btnText: {
    color: color.white,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
});
