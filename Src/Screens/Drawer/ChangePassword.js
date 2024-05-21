import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  ImageBackground,
  TextInput,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from 'react-native';
import color from '../../Assets/colors/colors';
import CustomHeader from '../../Components/CustomHeader';
import Icon, {Icons} from '../../Components/Icons';
import ChangePassInput from '../../Components/ChangePassInput';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import { BASE_URL } from '../Signin/Signin';
const {width, height} = Dimensions.get('window');
const ChangePassword = props => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [load, setLoad] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [checked, setChecked] = React.useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    currentPasswordError: '',
    newPasswordError: '',
    ConfirmPasswordError: '',
  });
  //console.log(password, confirmPassword)
  const HandleUpdate = async () => {
    try {
      if (!password || !newPassword || !confirmPassword) {
        // Check if any of the fields are empty
        Toast.show('All fields are required.');
        return;
      }

      if (newPassword !== confirmPassword) {
        // Check if the new password and confirm password match
        Toast.show('New password and confirm password do not match.');
        return;
      }
      setLoad(true);
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=2fv2c4id6b75rbqb9k3h157uh4');

      var formdata = new FormData();
      formdata.append('id', global.id);
      formdata.append('password', confirmPassword);
      formdata.append('old_password', password);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // const APiurl ='https://fisdemoprojects.com/skilledman/api/user/resetpassword.php';
      const APiurl =`${BASE_URL}user/resetpassword.php`;


      const response = await fetch(APiurl, requestOptions);
      const result = await response.json(); // Assuming the response is JSON

      if (result.success === 'Password updated successfully.') {
        setLoad(false);
        // Successful update
        Toast.show('Password Updated successfully.');
        navigation.navigate('account_setting');
      } else {
        setLoad(false);
        // Handle other responses or errors
        Toast.show('Password Update Failed.');
      }
    } catch (error) {
      setLoad(false);
      Toast.show('Network Error.');
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader
        title="Change Password"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.first_View}>
          <View style={styles.textInputStyle}>
            <ChangePassInput
              style={{
                marginTop: 0,
                // borderColor: errors.currentPasswordError
                //   ? color.red
                //   : color.white,
              }}
              placeholder="Current Password"
              placeholderTextColor={
                errors.currentPasswordError ? color.red : color.default
              }
              // secureTextEntry={showCurrentPassword ? false : true}
              // onChangeText={val => setCurrentPassword(val)}
              // onChange={() => setErrors('')}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              value={password}
            />
            <Icons.FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              color={color.default}
              size={24}
              style={{
                position: 'absolute',
                right: 20,
              }}
              onPress={togglePasswordVisibility}
              //onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            />
          </View>
          {errors.currentPasswordError ? (
            <View>
              <Text style={{color: color.red}}>
                {errors.currentPasswordError}
              </Text>
            </View>
          ) : null}
          <View style={styles.textInputStyle}>
            <ChangePassInput
              style={{
                marginTop: 0,
                borderColor: errors.newPasswordError ? color.red : color.gray,
              }}
              secureTextEntry={showNewPassword ? false : true}
              placeholder="New Password"
              placeholderTextColor={
                errors.newPasswordError ? color.red : color.default
              }
              onChangeText={val => setNewPassword(val)}
              // onChange={() => setErrors('')}
            />
            <Icons.FontAwesome
              name={showNewPassword ? 'eye' : 'eye-slash'}
              color={color.default}
              size={24}
              style={{
                position: 'absolute',
                right: 20,
              }}
              onPress={() => setShowNewPassword(!showNewPassword)}
            />
          </View>

          <View style={styles.textInputStyle}>
            <ChangePassInput
              style={{
                marginTop: 0,
                borderColor: errors.ConfirmPasswordError
                  ? color.red
                  : color.white,
              }}
              placeholder="Confirm Password"
              placeholderTextColor={
                errors.ConfirmPasswordError ? color.red : color.default
              }
              secureTextEntry={showConfirmPassword ? false : true}
              onChangeText={val => setConfirmPassword(val)}
              // onChange={() => setErrors('')}
            />
            <Icons.FontAwesome
              name={showConfirmPassword ? 'eye' : 'eye-slash'}
              color={color.default}
              size={24}
              style={{
                position: 'absolute',
                right: 20,
              }}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              HandleUpdate();
            }}>
            <Text style={styles.btnText}>
              {load ? (
                <ActivityIndicator size={28} color="#f8f8ff" />
              ) : (
                'Update Password'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  first_View: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textInputStyle: {
    justifyContent: 'center',
    marginTop: 20,
  },
  loginBtn: {
    borderRadius: 5,
    backgroundColor: color.default,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 16,
    marginTop: 35,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
});
