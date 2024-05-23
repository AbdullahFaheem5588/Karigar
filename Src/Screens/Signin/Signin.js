import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
} from 'react-native';
import C_TextInput from '../../Components/C_TextInput';
import color from '../../Assets/colors/colors';
import BtnComp from '../../Components/BtnComp';
import {Checkbox} from 'react-native-paper';
import CustomHeaderIcon from '../../Components/CustomHeaderIcon';
import {useSelector, useDispatch} from 'react-redux';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

import * as yup from 'yup';
import {useAuth} from '../../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import C_InputSecureEntrylogin from '../../Components/C_InputSecureEntrylogin';
import {getToken} from '../../utilis/notification';
import GoogleBtn from '../../Components/GoogelBtn';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import Modal from 'react-native-modal';

export const BASE_URL = 'http://karigar.home.hinews.in/api/';

const Signin = props => {
  const navigation = useNavigation();
  const [userName, setuserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hide, setHide] = React.useState(true);
  const [load, setLoad] = React.useState(false);

  const SignInApi = (email, password) => {
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://karigar.home.hinews.in/api/login', requestOptions)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  const onPressSignInBtn = async () => {
    try {
      if (userName && password) {
        await SignInApi(userName, password);
      } else {
        Toast.show('Please enter valid email and password');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  // useEffect(() => {
  //   GoogleSignin.configure();
  // }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}> KARIGAR </Text>
          <Text style={styles.loginToContinueText}> Login to continue </Text>
        </View>
        <View style={styles.inputContainer}>
          <C_TextInput
            placeholder="Email"
            placeholderTextColor={color.default}
            onChangeText={setuserName}
            value={userName}
          />

          {userName && !userName.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/) && (
            <Text style={styles.errorText}>Please enter a valid email</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <C_InputSecureEntrylogin
            placeholder="Password"
            placeholderTextColor={color.default}
            secureTextEntry={hide}
            icon="eye-off"
            onChangeText={setPassword}
            value={password}
            onPress={() => setHide(!hide)}
          />
          {password && password.length < 6 && (
            <Text style={styles.errorText}>
              Password must be at least 6 characters
            </Text>
          )}
        </View>
        <BtnComp
          BtnStyle={styles.BtnStyle}
          btnText={
            load ? <ActivityIndicator size={28} color="#f8f8ff" /> : 'Sign In'
          }
          onPressFunc={onPressSignInBtn}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.haveAccount}
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.rememberStyle}>Don't have an account? </Text>
          <Text style={styles.registerNow}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 10, // Adjust the font size
    marginTop: 3,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
  googleBtn: {
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.white,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnTextStyle: {
    color: color.default,
  },
  logoStyle: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 25,
  },
  logoImg: {
    width: width / 2,
    height: height / 4.6,
  },
  inputContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    fontSize: 16,
    fontWeight: '400',
    color: color.white,
    textAlign: 'center',
    marginTop: 8,
  },
  BtnStyle: {
    marginTop: 15,
    width: '90%',
  },
  fieldRequired: {
    color: color.darkRed,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontWeight: '600',
  },
  checkboxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: color.darkGray,
  },
  forgot: {
    fontSize: 13,
    fontWeight: '700',
    color: color.default,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 10,
  },
  registerNow: {
    color: color.default,
    fontWeight: '700',
    fontSize: 16,
  },
  haveAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerIcon: {
    paddingLeft: 20,
  },
  modalContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 100,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    height: '50%',
  },
  modalView: {
    borderRadius: 12,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: color.white,
  },
  modalHeader: {
    backgroundColor: color.default,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 19,
    color: color.white,
    fontWeight: '600',
  },
  modalBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: '90%',
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  titleText: {
    color: color.default,
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
  loginToContinueText: {
    color: color.black,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
});
