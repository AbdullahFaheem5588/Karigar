import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import color from '../../Assets/colors/colors';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import HomeStackWithSearch from '../../Components/HomeStackWithSearch';
import { Modal } from 'react-native-paper';
import Icon, { Icons } from '../../Components/Icons';
import FlatListCard from '../../Components/FlatListCard';
import BtnComp from '../../Components/BtnComp';
import OngoingDropdown from '../../Components/OngoingDropdown';
import MyWorkTabs from './AllTabs';
import { BASE_URL } from '../Signin/Signin';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const MyWork = () => {
  const navigation = useNavigation();
  const [searchTerm, setsearchTerm] = useState('');
  return (
    <SafeAreaView>
      <HomeStackWithSearch
        onPress={() => {
          navigation.openDrawer();
        }}
        onPressnotification={() => {
          navigation.navigate('edit_profile');
        }}
        onChangeText={(val) => { setsearchTerm(val) }}
        value={searchTerm}
      />
      <MyWorkTabs value={searchTerm} />
    </SafeAreaView>
  );
};

export default MyWork;

const styles = StyleSheet.create({
  linearGradientStyle: {
    elevation: 0,
    borderRadius: 6,
    height: '100%',
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  vegetableTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: color.black,
  },
  inputCont: {
    marginVertical: 10,
    width: '100%',
  },

  pendAppr: {
    fontWeight: 'bold',
    fontSize: 17,
    color: color.black,
    paddingVertical: 5,
  },
  cardContainer: {
    marginHorizontal: 15,
    marginTop: 40,
    marginBottom: 27,
  },
  scrollViewStyle: {
    marginBottom: 40,
    paddingBottom: 40,
  },

  bookingStyle: {
    fontSize: 14,
    color: color.gray,
    fontWeight: '400',
    textAlign: 'left',
  },
  openingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    marginBottom: 15,
  },
  dateTimeCont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 6,
  },
  dateStyle: {
    fontSize: 14,
    color: color.yellow,
    fontWeight: '400',
    textAlign: 'left',
  },
  logoImg: {
    width: width / 4,
    height: height / 8,
    marginTop: -55,
    borderRadius: 10,
  },
  btnTextStyle: {
    fontSize: 13,
  },
  acceptStyle: {
    width: '47%',
  },
  rejectStyle: {
    backgroundColor: color.red,
    borderColor: color.red,
    borderWidth: 2,
    width: '47%',
  },
  getDir: {
    color: color.default,
    fontWeight: '700',
    paddingTop: 5,
  },
});