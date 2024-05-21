import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { configureLayoutAnimations } from 'react-native-reanimated/lib/typescript/reanimated2/core';
import color from '../Assets/colors/colors';
const Disablebtn = props => {

    const buttonStyle = [
        styles.loginBtn,
        { ...props.BtnStyle },
        !props.isValid
            ? { backgroundColor: 'grey' } // Set color to red if isValid is false
            : { backgroundColor: color.default }, // Set default color if isValid is true
    ];

    return (
        <View
            style={[styles.loginBtn, { ...props.BtnStyle }]}
        >
            <Text style={[styles.btnText, { ...props.btnTextStyle }]}>
               Disable
            </Text>
        </View>)
};

export default Disablebtn;
const styles = StyleSheet.create({
    loginBtn: {
        borderRadius: 8,
        backgroundColor:"gray",
        width: '80%',
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 13,
        elevation: 1,
        borderWidth: 2,
        borderColor:"white",
    },
    btnText: {
        color: color.white,
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
    },
});
