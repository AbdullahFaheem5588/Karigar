import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import color from '../Assets/colors/colors';
import {configureLayoutAnimations} from 'react-native-reanimated/lib/typescript/reanimated2/core';
const BtnComp = props => {
  const buttonStyle = [
    styles.loginBtn,
    {...props.BtnStyle},
    !props.isValid
      ? {backgroundColor: 'grey'} // Set color to red if isValid is false
      : {backgroundColor: color.default}, // Set default color if isValid is true
  ];

  return (
    <TouchableOpacity
      style={[styles.loginBtn, {...props.BtnStyle}]}
      // style={buttonStyle}
      onPress={props.onPressFunc}
      // disabled={!props.isValid} // Disable button if isValid is false
    >
      <Text style={[styles.btnText, {...props.btnTextStyle}]}>
        {props.btnText}
      </Text>
    </TouchableOpacity>
  );
};

export default BtnComp;
const styles = StyleSheet.create({
  loginBtn: {
    borderRadius: 20,
    backgroundColor: color.default,
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 5,
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
