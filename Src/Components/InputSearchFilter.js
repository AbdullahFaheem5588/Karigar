import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { Icons } from '../Components/Icons';
import LinearGradient from 'react-native-linear-gradient';

import color from '../Assets/colors/colors';
const InputSearchFilter = props => {
  const { mode = 'outlined', toggleModal } = props;
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  console.log(props.screen, 'toggle here');

  return (
    <View style={styles.searchContainer}>
      <Icons.FontAwesome name="search" size={18} color={color.default} />
      <TextInput
        style={{
          flex: 1,
          paddingLeft: 10,
          color:color.default
        }}
        value={props.value}
        placeholder="Search for services"
        placeholderTextColor={color.default}
        onChangeText={props.onChangeText}
      />
      {props.screen ? null :
        <TouchableOpacity onPress={toggleModal}>
          <LinearGradient
            style={styles.sliderStyle}
            colors={[color.linTopClr, color.linMidClr, color.linBotClr]}>
            <Icons.FontAwesome name="sliders" size={18} color={color.white} />
          </LinearGradient>
        </TouchableOpacity>
      }
    </View>
  );
};
export default InputSearchFilter;

const styles = StyleSheet.create({
  inputstyle: {
    width: '100%',
    paddingVertical: 10,
    fontSize: 15,
    paddingHorizontal: 15,
    borderBottomColor: color.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: color.lightGray,
    backgroundColor: 'transparent',
    borderRadius: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  sliderStyle: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
});