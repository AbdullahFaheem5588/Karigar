import React, {useState} from 'react';
import {View, Text, Button, Image, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandedScreen from '../Screens/LandedScreen/LandedScreen';
import Signin from '../Screens/Signin/Signin';
import Signup from '../Screens/Signup/Signup';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import OtpScreen from '../Screens/OtpScreen/OtpScreen';
import SetPassword from '../Screens/SetPassword/SetPassword';
import AddBusiness from '../Screens/AddBusiness/AddBusiness';
import AddBank from '../Screens/AddBank/AddBank';
import AddTax from '../Screens/AddTax/AddTax';
import Congratulations from '../Screens/Congratulations/Congratulations';
import Parent from '../Screens/Parent';
import ForgotPassword from '../Screens/Forgot_Password/forgot_password';
import SettingForgetPassword from '../Screens/SettingForgetPassword/SettingForgetPassword';
import PrivacyPolicy from '../Screens/Drawer/PrivacyPolicy';
import PrivateRoute from './PrivateRoute';
import AddBankGoogle from '../Screens/AddBank/AddBankWithGoogle';
import Maplatln from '../Screens/Signup/Maps';
import GoogleMaps from '../Screens/Signup/Googlemap';
import {MyForm} from '../Components/MyForm';
import Forgetpassword1 from '../Screens/Forgot_Password/emailforget';
import ForgetpasswordOtpScreen from '../Screens/Forgot_Password/forget_password_otp';
const Stack = createNativeStackNavigator();

const PublicRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgetpassword1"
        component={Forgetpassword1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetpasswordOtpScreen"
        component={ForgetpasswordOtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={({navigation}) => ({
          headerShown: false,
          headerLeft: null, // This will hide the back button
        })}
      />
      <Stack.Screen
        name="MyForm"
        component={MyForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GoogleMaps"
        component={GoogleMaps}
        options={({navigation}) => ({
          headerShown: false,
          headerLeft: null, // This will hide the back button
        })}
      />
      <Stack.Screen
        name="Maplatln"
        component={Maplatln}
        options={({navigation}) => ({
          headerShown: false,
          headerLeft: null, // This will hide the back button
        })}
      />
      <Stack.Screen
        name="PrivateRoute"
        component={PrivateRoute}
        options={({navigation}) => ({
          headerShown: false,
          headerLeft: null, // This will hide the back button
        })}
      />
      <Stack.Screen
        name="LandedScreen"
        component={LandedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupScreen"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddBusiness"
        component={AddBusiness}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddBank"
        component={AddBank}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddBankGoogle"
        component={AddBankGoogle}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
                name="AddTax"
                component={AddTax}
                options={{ headerShown: false }}
            /> */}
      <Stack.Screen
        name="Congratulations"
        component={Congratulations}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{headerShown: false}}
        component={ForgotPassword}
      />
      <Stack.Screen
        name="SettingForgetPassword"
        options={{headerShown: false}}
        component={SettingForgetPassword}
      />
      <Stack.Screen
        name="privacy_policy"
        options={{headerShown: false}}
        component={PrivacyPolicy}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
