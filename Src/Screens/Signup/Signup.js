import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import C_TextInput from '../../Components/C_TextInput';
import color from '../../Assets/colors/colors';
import BtnComp from '../../Components/BtnComp';
const {height, width} = Dimensions.get('window');
import {Picker} from '@react-native-picker/picker';
import {BASE_URL} from '../Signin/Signin';

const Signup = props => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const roles = [
    {key: 1, value: 'user'},
    {key: 2, value: 'provider'},
  ];
  const [selectedRole, setSelectedRole] = useState('');
  const pickerRef = useRef();
  const [userDetails, setUserDetails] = useState({
    name: '',
    username: '',
    password: '',
    role: selectedRole,
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const formdata = new FormData();
      formdata.append('name', userDetails.name);
      formdata.append('username', userDetails.username);
      formdata.append('password', userDetails.password);
      formdata.append('type', userDetails.role);

      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(BASE_URL + 'register', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error(error));
    } catch (error) {
      console.log('error', error);
    }
  };

  const onRoleChange = selectedRole => {
    setSelectedRole(selectedRole);
    setUserDetails({...userDetails, role: selectedRole});
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: color.default, height: '100%'}}>
      <View style={styles.container}>
        <Image
          source={require('../../Assets/icons/sign-up.png')}
          style={styles.image}
        />
        <Text style={styles.signUpToContinueText}>SignUp to continue</Text>
        <View style={styles.inputContainer}>
          <C_TextInput
            placeholder="Your Name"
            placeholderTextColor={color.default}
            onChangeText={val => setUserDetails({...userDetails, name: val})}
            value={userDetails.name}
          />
        </View>
        <View style={styles.inputContainer}>
          <C_TextInput
            placeholder="Email"
            placeholderTextColor={color.default}
            onChangeText={val =>
              setUserDetails({...userDetails, username: val})
            }
            value={userDetails.username}
          />
        </View>

        <View style={styles.inputContainer}>
          <C_TextInput
            placeholder="Password"
            placeholderTextColor={color.default}
            onChangeText={val =>
              setUserDetails({...userDetails, password: val})
            }
            value={userDetails.password}
          />
        </View>
        <View style={styles.inputContainer}>
          <C_TextInput
            placeholder="Confirm Password"
            placeholderTextColor={color.default}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.DropDownContainer}>
            <Picker
              ref={pickerRef}
              selectedValue={selectedRole}
              onValueChange={itemValue => onRoleChange(itemValue)}
              enabled={true}
              mode={'dialog'}
              dropdownIconColor={color.default}
              selectionColor={color.yellow}
              itemStyle={styles.itemsStyle}>
              <Picker.Item
                label="SignUp As"
                value=""
                color={color.default}
                fontWeight="bold"
                fontSize={17}
              />
              {roles.map((role, index) => (
                <Picker.Item
                  key={role.key}
                  label={role.value}
                  value={role.value}
                  color={color.default}
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    backgroundColor: 'white',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>

        <BtnComp
          BtnStyle={styles.BtnStyle}
          btnText={
            load ? <ActivityIndicator size={28} color="#f8f8ff" /> : 'SignUp'
          }
          onPressFunc={() => {
            const {name, username: email, password, role} = userDetails;
            if (
              [name, email, password, role].every(field => field.length > 0)
            ) {
              if (userDetails.password === confirmPassword) {
                handleSignUp();
                navigation.goBack();
              } else {
                ToastAndroid.show('Password Not Matched', ToastAndroid.SHORT);
              }
            } else {
              ToastAndroid.show(
                'Please fill in all fields',
                ToastAndroid.SHORT,
              );
            }
          }}
        />
        <TouchableOpacity
          style={styles.haveAccount}
          onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.rememberStyle}>Already have account? </Text>
          <Text style={styles.registerNow}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  phoneContainer: {
    width: '100%',
    height: 10,
  },
  textInput: {
    fontSize: 12,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingVertical: 20,
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
  logoImg: {
    width: width / 2,
    height: height / 5,
  },
  inputContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  numberinputContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: '5.5%',
    paddingVertical: 10,
    fontSize: 17,
    paddingHorizontal: 20,
    borderColor: color.default,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderRadius: 6,
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
    width: '80%',
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
    fontSize: 18,
    fontWeight: '500',
    color: color.darkGray,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 10,
  },
  registerNow: {
    color: color.default,
    fontWeight: '500',
    fontSize: 18,
    textDecorationLine: 'underline',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.default,
    borderRadius: 8,
  },
  switch: {
    opacity: 0,
    width: 0,
  },
  selectedText: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: 19,
    backgroundColor: color.default,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '30%',
    textAlign: 'center',
    borderRadius: 6,
  },
  unselectedText: {
    color: color.default,
    fontWeight: 'bold',
    fontSize: 19,
    backgroundColor: 'transparent',
    width: '30%',
    textAlign: 'center',
  },
  DropDownContainer: {
    borderColor: color.default,
    borderWidth: 1,
    paddingHorizontal: 5,
    width: '100%',
    borderRadius: 6,
    marginTop: 6,
    paddingVertical: 3,
    backgroundColor: 'white',
  },
  itemsStyle: {
    color: color.red,
    fontWeight: '400',
  },
  containerStyle: {
    zIndex: 100,
  },
  signUpToContinueText: {
    color: color.black,
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: 130,
    height: 130,
  },
});
