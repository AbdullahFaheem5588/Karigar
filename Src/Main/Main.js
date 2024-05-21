import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ProviderTabs from '../BottomNavigator/ProviderTabs';
import UserTabs from '../BottomNavigator/UserTabs';
import {useSelector} from 'react-redux';
import {useAuth} from '../context/AuthProvider';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Main = ({navigation}) => {
  const {state, dispatch} = useAuth();
  const isFocused = useIsFocused();
  const [value, setValue] = useState('');
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('role');
    //  console.log(value, 'VALUE HJAK');
      if (value !== null) {
      //  console.log('value in main', value);
        setValue(value);
        // value previously stored
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  // console.log('data in context', state.role);

  // console.log(navigation, 'Navigation');
  // const { providersa } = useSelector(state => state.ProvidersReducer);
  // console.log('🚀 ~ file: Main.js:9 ~ Main ~ providersa:', providersa.type);
  // {
  //   console.log('global.rolevalue on navigation', global.role);
  // }

  return (
    <View style={{flex: 1}}>
      {value && value === '1' ? (
        <UserTabs />
      ) : value && value === '0' ? (
        <ProviderTabs />
      ) : null}
    </View>
  );
};

export default Main;
