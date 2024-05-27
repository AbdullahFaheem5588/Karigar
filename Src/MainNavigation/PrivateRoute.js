import React from 'react';
import {View, Text, Button, Image, BackHandler} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import Parent from '../Screens/Parent';
import UserChat from '../Screens/Chat/UserChat';
import IndividualChat from '../Screens/Chat/IndividualChat';
import EditProfileScreen from '../Screens/Drawer/editProfile';
import EditUserProfile from '../Screens/Drawer/editUserProfile';
import AddSkill from '../Screens/Drawer/AddSkill';
import FindExpert from '../Screens/Expert/FindExpert';
import ExpertDetail from '../Screens/Expert/ExpertDetail';
import SelectPaymentMethod from '../Screens/Payment/SelectPaymentMethod';
import PaymentCongratulations from '../Screens/Payment/Congratulations';
import CardDetail from '../Screens/Payment/CardDetail';
import NotificationScreen from '../Screens/Drawer/NotificationScreen';
import AccountSetting from '../Screens/Drawer/AccountSetting';
import ChangePassword from '../Screens/Drawer/ChangePassword';
import HistoryScreen from '../Screens/Drawer/HistoryScreen';
import PrivacyPolicy from '../Screens/Drawer/PrivacyPolicy';
import TermsConditions from '../Screens/Drawer/TermsConditions';
import AboutUs from '../Screens/Drawer/AboutUs';
import ForgotPassword from '../Screens/Forgot_Password/forgot_password';
import SettingForgetPassword from '../Screens/SettingForgetPassword/SettingForgetPassword';
import UserHistory from '../Screens/UserHistory/UserHistory';
import PublicRoutes from './PublicRoutes';
import {MyForm} from '../Components/MyForm';
import Socketdemo from '../Screens/Chat/socketiodemo';
import ConversationScreen from '../utilis/Firebasechat';
import SellerDashBoard from '../Screens/DashBoard/sellerDashboard';
import AddProducts from '../Screens/Drawer/addproducts';
import ShowProviderDetails from '../Screens/Drawer/ShowProviderDetail';
const Stack = createNativeStackNavigator();

const PrivateRoute = () => {
  return (
    <Stack.Navigator initialRouteName="Parent">
      <Stack.Screen
        name="Parent"
        component={Parent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addProducts"
        component={AddProducts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="providerDetail"
        component={ShowProviderDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConversationScreen"
        component={ConversationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Socketdemo"
        component={Socketdemo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserChat"
        component={UserChat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyForm"
        component={MyForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PublicRoutes"
        component={PublicRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IndividualChat"
        component={IndividualChat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="edit_profile"
        options={{headerShown: false}}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="editUserProfile"
        options={{headerShown: false}}
        component={EditUserProfile}
      />
      <Stack.Screen
        name="AddSkill"
        component={AddSkill}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="FindExpert"
        component={FindExpert}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ExpertDetail"
        component={ExpertDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectPaymentMethod"
        component={SelectPaymentMethod}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentCongratulations"
        component={PaymentCongratulations}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CardDetail"
        component={CardDetail}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="notification_screen"
        options={{headerShown: false}}
        component={NotificationScreen}
      />

      <Stack.Screen
        name="account_setting"
        options={{headerShown: false}}
        component={AccountSetting}
      />

      <Stack.Screen
        name="ChangePassword"
        options={{headerShown: false}}
        component={ChangePassword}
      />

      <Stack.Screen
        name="HistoryScreen"
        options={{headerShown: false}}
        component={HistoryScreen}
      />

      <Stack.Screen
        name="privacy_policy"
        options={{headerShown: false}}
        component={PrivacyPolicy}
      />

      <Stack.Screen
        name="terms_condidtions"
        options={{headerShown: false}}
        component={TermsConditions}
      />

      <Stack.Screen
        name="AboutUs"
        options={{headerShown: false}}
        component={AboutUs}
      />
      <Stack.Screen
        name="UserHistory"
        options={{headerShown: false}}
        component={UserHistory}
      />
    </Stack.Navigator>
  );
};

export default PrivateRoute;
