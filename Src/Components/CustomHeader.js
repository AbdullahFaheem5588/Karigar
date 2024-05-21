import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {Icons} from './Icons';
import color from '../Assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
const CustomHeader = (props, {navigation}) => {
  console.log(props);
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerStyle} onPress={props.onPressBack}>
        <Icons.Ionicons name="arrow-back" size={30} color={color.white} />
        <Text style={styles.titleStyle}>{props.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerStyle}
        onPress={props.toggleReviewModal}>
        <Icons.FontAwesome
          name={props.dropDownIcon}
          size={35}
          color={color.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.default,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  rightCont: {
    flexDirection: 'row',
  },
  notIcon: {
    marginLeft: 5,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    width: '90%',
    color: color.white,
  },
});
