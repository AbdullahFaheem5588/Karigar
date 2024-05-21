import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import HomeStackwithoutsearch from '../../Components/HomeStackwithoutsearch';
import Two_Card from '../../Components/Two_Card';
import Card from '../../Components/OpeningCard';
import TargetCard from '../../Components/TargetCard';
import color from '../../Assets/colors/colors';
const WishlistScreen = ({route, navigation}) => {
  return (
    <>
      <Text
        style={{
          fontSize: 19,
          fontWeight: '600',
          color: color.darkgreen,
          alignSelf: 'center',
          paddingVertical: 10,
        }}>
        Welcome Jhon!
      </Text>
    </>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
