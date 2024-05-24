import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ProviderTabs from '../BottomNavigator/ProviderTabs';
import UserTabs from '../BottomNavigator/UserTabs';
import {useSelector, useDispatch} from 'react-redux';
import {useAuth} from '../context/AuthProvider';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../Screens/Signin/Signin';
import {setProfile} from '../Redux/Actions/profileAction';
const Main = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [value, setValue] = useState('0');
  const {token} = useSelector(state => state.TokenReducer);
  const getProfileData = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}profile`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.id) {
          dispatch(setProfile(data));
        } else {
          alert('Error: Profile data not found');
        }
      })
      .catch(error => console.error(error));
  };
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('role');
  //   //  console.log(value, 'VALUE HJAK');
  //     if (value !== null) {
  //     //  console.log('value in main', value);
  //       setValue(value);
  //       // value previously stored
  //     }
  //   } catch (e) {
  //     // error reading value
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    getProfileData();
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
