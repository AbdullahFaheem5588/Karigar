import React, {useState, useEffect, useRef} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import C_TextInput from '../../Components/C_TextInput';
import color from '../../Assets/colors/colors';
import BtnComp from '../../Components/BtnComp';
import {Checkbox, TextInput} from 'react-native-paper';
import CustomHeaderIcon from '../../Components/CustomHeaderIcon';
import GoogleBtn from '../../Components/GoogelBtn';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import {Formik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-simple-toast';
import {Country, State, City, getAllCountries} from 'country-state-city';
import {Picker} from '@react-native-picker/picker';
//import PhoneInput, {getCountryCallingCode} from 'react-native-phone-input';
import PhoneInput from 'react-native-phone-input';
import {_signInwithGoogle} from '../../utilis/firbase';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '';
import Modal from 'react-native-modal';
import Maplatln from './Maps';
import C_TextInputno from '../../Components/C_TExtinputno';
import {BASE_URL} from '../Signin/Signin';

const SignupValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Too Short')
    .max(70, 'Too Long')
    .required('Please Enter Your First Name'),
  email: yup
    .string()
    .required('Please Enter Your  Email')
    .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Please enter valid email'),
});

const Signup = props => {
  const navigation = useNavigation();
  const [load, setLoad] = React.useState(false);
  const roles = [
    {key: 1, value: 'user'},
    {key: 2, value: 'provider'},
  ];
  const [selectedRole, setSelectedRole] = useState('');
  const [states, setStates] = useState([]);
  const [roleError, setRoleError] = useState(false);
  const pickerRef = useRef();

  const [confirmPassword, setConfirmPassword] = useState('');

  const focus = useIsFocused();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  useEffect(() => {
    const fetchState = async () => {
      try {
        var myHeaders = new Headers();
        myHeaders.append(
          'Cookie',
          'PHPSESSID=2a1286fffb4c2a53ccfdd18329031f71',
        );

        var formdata = new FormData();

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };
        apiUrl =
          'https://koboautos.com/shipafrika/member/ajaxfiles/state_code.php?id=3811';

        const response = await fetch(apiUrl, requestOptions);
        const result = await response.json();
        if (result) {
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchState();
  }, []);

  const onRoleChange = selectedRole => {
    setSelectedRole(selectedRole);
    // setCountryError(false);
  };

  // async function googleSignIn() {
  //   _signInwithGoogle().then(data => {
  //     if (!data) {
  //       console.log('=>Error:', 'No Data');
  //       return;
  //     }
  //     console.log('=>Success', data);
  //   });
  // }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupValidationSchema}
      onSubmit={async value => {
        // Handle form submission here
        console.log('Form data submitted:', states);
        console.log('Form data selectedStatesubmitted:', selectedState);
        console.log('Form data selectedCountrysubmitted:', confirmPassword);
        // navigation.navigate('OtpScreen');
        try {
          setLoad(true);
          var myHeaders = new Headers();

          // if (selectedCountry == '' || selectedState == '') {
          //   return;
          // }
          myHeaders.append('Cookie', 'PHPSESSID=repq4egpdnsd7ikh50kjova7jd');

          const formdata = new FormData();

          formdata.append('name', value.name);
          formdata.append('role', selectedRole);
          formdata.append('email', value.email);
          formdata.append('password', value.password);

          // Define the API endpoint
          // const apiUrl ='https://fisdemoprojects.com/skilledman/api/otp_register.php';
          const apiUrl = `${BASE_URL}otp_register.php`;

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          };
          const response = await fetch(apiUrl, requestOptions);

          const result = await response.json();
          console.log('API response:', result);
          if (result) {
            setLoad(false);
            global.id = result.id;
            global.role = result.role;
            global.name = result.name;
            global.email = result.email;
            global.password = result.password;
            global.role = result.role;
            if (!result.error) {
              navigation.navigate('OtpScreen', {result});
            } else if (result.error) {
              Toast.showWithGravity(result.error, Toast.LONG, Toast.CENTER);
            }
          } else {
            setLoad(false);
            // Handle the case where status is not true (e.g., show an error message)
            console.error('API response indicates an error.');
          }
        } catch (error) {
          setLoad(false);
          console.error('API error:', error);
        }
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <ScrollView>
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
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <C_TextInput
                placeholder="Email"
                placeholderTextColor={color.default}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <C_TextInput
                placeholder="Password"
                placeholderTextColor={color.default}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <C_TextInput
                placeholder="Confirm Password"
                placeholderTextColor={color.default}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
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
              {roleError && (
                <Text style={styles.errorText}>Please select a country.</Text>
              )}
            </View>

            <BtnComp
              BtnStyle={styles.BtnStyle}
              btnText={
                load ? (
                  <ActivityIndicator size={28} color="#f8f8ff" />
                ) : (
                  'SignUp'
                )
              }
              onPressFunc={() => {
                if (values.password == confirmPassword) {
                  handleSubmit(values);
                  navigation.goBack();
                } else
                  ToastAndroid.show('Password Not Matched', ToastAndroid.SHORT);
              }}
              isValid={isValid}
            />
            <TouchableOpacity
              style={styles.haveAccount}
              onPress={() => navigation.navigate('Signin')}>
              <Text style={styles.rememberStyle}>Already have account? </Text>
              <Text style={styles.registerNow}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
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
    width: '90%',
    paddingVertical: 20,
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
    // borderBottomColor: color.default,
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

  //
  DropDownContainer: {
    borderColor: color.default,
    borderWidth: 1,
    paddingHorizontal: 5,
    width: '100%',
    borderRadius: 6,
    marginTop: 6,
    height: 57,
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
    width: 200,
    height: 200,
  },
});
