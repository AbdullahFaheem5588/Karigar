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
import {setToken} from '../../Redux/Actions/tokenAction';
const Signin = props => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const navigation = useNavigation();
  const [userName, setuserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hide, setHide] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const [isSwitchOn, setIsEnabled] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  //const [userRole, setUserRole] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // const _signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userinfo = await GoogleSignin.signIn();
  //     console.log(userinfo);
  //     setuserInfo(userinfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       Alert.alert('Cancel');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       Alert.alert('Signin in progress');
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  // const SigninGoogle = async () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append('Cookie', 'PHPSESSID=gh7fv4e977bp9rldljr4siihlh');

  //   var formdata = new FormData();
  //   formdata.append('email', 'abccefg11g12@gmail.com');
  //   formdata.append('password', 'abcdef12');
  //   formdata.append('token', '123');
  //   formdata.append('name', 'abcdef12');
  //   formdata.append('photo', fileInput.files[0], '[PROXY]');
  //   formdata.append('role', '1');

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: 'follow',
  //   };

  //   fetch(
  //     'https://fisdemoprojects.com/skilledman/api/google_login.php',
  //     requestOptions,
  //   )
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // };

  // const SigninGoogle = async userInfo => {
  //   try {
  //     var myHeaders = new Headers();
  //     myHeaders.append('Cookie', 'PHPSESSID=gh7fv4e977bp9rldljr4siihlh');

  //     var formdata = new FormData();
  //     formdata.append('email', userInfo.user.email);

  //     // Use the user's Google ID as the password (you may want to customize this logic)
  //     formdata.append('password', userInfo.user.id);

  //     // Use the user's authentication ID as the token (you may want to customize this logic)
  //     formdata.append('token', userInfo.user.auth?.id || '');

  //     formdata.append('name', userInfo.user.name);
  //     formdata.append('photo', userInfo.user.photo, '[PROXY]');

  //     formdata.append('role', userRole);
  //     //formdata.append('role', '1');

  //     var requestOptions = {
  //       method: 'POST',
  //       headers: myHeaders,
  //       body: formdata,
  //       redirect: 'follow',
  //     };

  //     const response = await fetch(
  //       'https://fisdemoprojects.com/skilledman/api/google_login.php',
  //       requestOptions,
  //     );
  //     console.log('userinfo', userInfo);
  //     const result = await response.json();
  //     console.log(result);

  //     //   if (result.includes('success')) {
  //     //     // Now you can use the userRole in your logic
  //     //     console.log('User Role:', userRole);

  //     //     // Example: If role is '1', navigate to 'Parent'
  //     //     if (userRole === '1') {

  //     //       // If userRole is '1', navigate to 'Parent'
  //     //       navigation.navigate('Parent');

  //     //     } else if (userRole === '2') {

  //     //       // If userRole is '2', open the modal or navigate to 'AddBusiness'
  //     //       setModalVisible(true);
  //     //     } else {
  //     //       // Handle other roles or conditions
  //     //       console.log('Unsupported role:', userRole);
  //     //     }
  //     //   } else {
  //     //     // Handle other conditions or errors
  //     //     console.log('Login was not successful.');
  //     //   }
  //     // } catch (error) {
  //     //   console.error('Error processing Google login:', error);
  //     // }
  //     // };
  //     // const result = await response.text();
  //     console.log(result);
  //     if (result.success) {
  //       // If successful, navigate to 'UserDashboard'

  //       console.log('User Role:', userRole);

  //       //     // Example: If role is '1', navigate to 'Parent'
  //       // if (userRole === '1') {
  //       //   navigation.navigate('AddBusiness');

  //       //   // If userRole is '1', navigate to 'Parent'
  //       // } else if (userRole === '0') {
  //       //   navigation.navigate('PrivateRoute', {screen: 'Parent'});
  //       //   // If userRole is '2', open the modal or navigate to 'AddBusiness'
  //       //   setModalVisible(true);
  //       // }
  //       if (userRole == 1 || userRole == 0) {
  //         navigation.navigate('PrivateRoute', {screen: 'Main'});
  //       } else {
  //         // Handle other roles or conditions
  //         console.log('Unsupported role:', userRole);
  //       }
  //     } else {
  //       // Handle other conditions or errors
  //       console.log('Login was not successful.');
  //     }
  //     //navigation.navigate('UserDashboard');
  //   } catch (error) {
  //     console.error('Error processing Google login:', error);
  //   }
  // };
  // const SigninGoogle = async (userInfo, userRole) => {
  //   try {
  //     var myHeaders = new Headers();
  //     myHeaders.append('Cookie', 'PHPSESSID=gh7fv4e977bp9rldljr4siihlh');

  //     var formdata = new FormData();
  //     formdata.append('email', userInfo.user.email);
  //     formdata.append('password', userInfo.user.id);
  //     formdata.append('token', userInfo.user.auth?.id || '');
  //     formdata.append('name', userInfo.user.name);
  //     formdata.append('photo', userInfo.user.photo, '[PROXY]');
  //     formdata.append('role', userRole ? userRole.toString() : ''); // Convert to string

  //     var requestOptions = {
  //       method: 'POST',
  //       headers: myHeaders,
  //       body: formdata,
  //       redirect: 'follow',
  //     };

  //     const response = await fetch(
  //       'https://fisdemoprojects.com/skilledman/api/google_login.php',
  //       requestOptions,
  //     );
  //     console.log('userinfo', userInfo);
  //     const result = await response.json();
  //     console.log(result);

  //     if (result.success) {
  //       console.log('User Role:', userRole);

  //       if (userRole === 1 || userRole === 0) {
  //         navigation.navigate('PrivateRoute', {screen: 'Parent'});
  //       } else {
  //         console.log('Unsupported role:', userRole);
  //       }
  //     } else {
  //       console.log('Login was not successful.');
  //     }
  //   } catch (error) {
  //     console.error('Error processing Google login:', error);
  //   }
  // };
  const [userRole, setUserRole] = useState('');
  //const {signinGoogle} = useAuth();
  //const { signinGoogle } = useContext(AuthContext);
  // const SigninGoogle = async userInfo => {
  //   try {
  //     await signinGoogle(userInfo);
  //     if (userInfo && userInfo.user) {
  //       // Rest of your code remains unchanged
  //       var myHeaders = new Headers();
  //       myHeaders.append('Cookie', 'PHPSESSID=gh7fv4e977bp9rldljr4siihlh');

  //       var formdata = new FormData();
  //       formdata.append('email', userInfo.user.email);

  //       // Use the user's Google ID as the password (you may want to customize this logic)
  //       formdata.append('password', userInfo.user.id);

  //       // Use the user's authentication ID as the token (you may want to customize this logic)
  //       formdata.append('token', userInfo.user.auth?.id || '');

  //       formdata.append('name', userInfo.user.name);
  //       formdata.append('photo', userInfo.user.photo, '[PROXY]');

  //       // formdata.append('role', userRole ? userRole.toString() : ''); // Ensure userRole is a string
  //       formdata.append('role', userRole);

  //       var requestOptions = {
  //         method: 'POST',
  //         headers: myHeaders,
  //         body: formdata,
  //         redirect: 'follow',
  //       };

  //       // const response = await fetch('https://fisdemoprojects.com/skilledman/api/google_login.php', requestOptions,);
  //       const response = await fetch(
  //         `${BASE_URL}google_login.php`,
  //         requestOptions,
  //       );

  //       console.log('userinfo', userInfo);
  //       const result = await response.json();
  //       console.log(result, 'resultabbasi');

  //       global.gid = result.id;
  //       console.log('result.id', global.gid);
  //       if (result.success) {
  //         await AsyncStorage.setItem('user', JSON.stringify(result));
  //         await AsyncStorage.setItem('role', result.role);
  //         dispatch({
  //           type: 'LOGIN',
  //           payload: {user: result, role: result.role},
  //         });
  //         global.roleg = result.role;
  //         global.gid = result.id;

  //         console.log('result.id', global.gid);
  //         console.log('resultgooglerole', global.roleg);

  //         // global.usrole=userRole;
  //         // console.log('globalroleuser',global.usrole);
  //         console.log('buttonuserrole', userRole);

  //         // Customized the code from here
  //         if (result.role == 0 || result.role == 1) {
  //           //navigation.navigate('PrivateRoute', {screen: 'Parent'});
  //           navigation.navigate('Parent');
  //         } else {
  //           console.log('Unsupported role:', result.role);
  //         }
  //       }
  //     } else {
  //       console.error('Error: userInfo or userInfo.user is null or undefined');
  //     }
  //   } catch (error) {
  //     Alert.alert(
  //       'Error',
  //       `This email is already registered: ${error.message}`,
  //     );
  //     console.error('Error processing Google login:', error);
  //   }
  // };

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
      .then(({access_token, message}) => {
        if (access_token) {
          dispatch(setToken(access_token));
          navigation.navigate('PrivateRoute', {screen: 'Parent'});
        } else {
          Alert.alert(JSON.stringify(message));
        }
      })
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
