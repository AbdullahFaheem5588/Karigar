import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import color from '../Assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import DrawerCustomBtn from '../Components/DrawerCustomBtn';
import DrawerUser from '../Components/DrawerUser';
import {useAuth} from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const CustomDrawer = () => {
  const {state, dispatch} = useAuth();
  const navigation = useNavigation();

  const logOut = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('role');
    dispatch({type: 'LOGOUT'});
    //navigation.closeDrawer();
    navigation.navigate('Signin');
  };

  //const [userInfo, setUserInfo] = useState(null);
  // const _signOut = async () => {
  //   try {
  //     const isSignedIn = await GoogleSignin.isSignedIn();

  //     if (isSignedIn) {
  //       await GoogleSignin.revokeAccess();
  //       await GoogleSignin.signOut();
  //       setUserInfo(null); // Reset the user info state
  //       // Add any additional cleanup or logout logic here
  //     } else {
  //       console.log('User is not signed in.');
  //     }
  //   } catch (error) {
  //     console.error('Error signing out', error);
  //   }
  // };

  return (
    <LinearGradient
      colors={['#965c00', '#bc7900', '#f3a200']}
      style={styles.linearGradientStyle}>
      <DrawerUser />
      <DrawerCustomBtn
        DrawerBtnPress={() => navigation.navigate('DashBoard')}
        title="Dashboard"
        drawerIcon="th-large"
      />
      <DrawerCustomBtn
        DrawerBtnPress={() => navigation.navigate('AboutUs')}
        title="About Us"
        drawerIcon="exclamation"
      />

      <DrawerCustomBtn
        DrawerBtnPress={() => navigation.navigate('privacy_policy')}
        title="Privacy Policy"
        drawerIcon="file-powerpoint-o"
      />
      <DrawerCustomBtn
        DrawerBtnPress={() => navigation.navigate('terms_condidtions')}
        title="Terms & Conditions"
        drawerIcon="files-o"
      />

      {global.role == 0 ? (
        <DrawerCustomBtn
          DrawerBtnPress={() => navigation.navigate('HistoryScreen')}
          title="History"
          drawerIcon="history"
        />
      ) : (
        <DrawerCustomBtn
          DrawerBtnPress={() => navigation.navigate('UserHistory')}
          title="History"
          drawerIcon="history"
        />
      )}

      <DrawerCustomBtn
        DrawerBtnPress={() => navigation.navigate('account_setting')}
        title="Setting"
        drawerIcon="cog"
      />

      <View style={styles.logoutStyle}>
        <DrawerCustomBtn
          title="Logout"
          drawerIcon="sign-out"
          DrawerBtnPress={() => {
            logOut();
            // _signOut();
            // handleSignOut();
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  containerStyle: {},
  contStyle: {
    color: color.white,
  },
  linearGradientStyle: {
    height: '100%',
    overflow: 'hidden',
  },
  accSet: {
    borderTopWidth: 0.4,
    borderTopColor: color.white,
    borderBottomColor: color.white,
    borderBottomWidth: 0.4,
    width: '100%',
    marginVertical: 10,
  },
  logoutStyle: {
    position: 'absolute',
    bottom: '2%', // Adjust this value as needed
    left: '5%', // Adjust this value as needed
    width: '90%', // Adjust this value as needed
    borderTopWidth: 0.4,
    borderTopColor: color.white,
  },
});
