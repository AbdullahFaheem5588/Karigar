import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import C_TextInput from '../../Components/C_TextInput';
import color from '../../Assets/colors/colors';
import BtnComp from '../../Components/BtnComp';
import {Checkbox} from 'react-native-paper';
import CustomHeaderIcon from '../../Components/CustomHeaderIcon';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import {Formik} from 'formik';
import * as yup from 'yup';
import {configureLayoutAnimations} from 'react-native-reanimated/lib/typescript/reanimated2/core';
import C_InputSecureEntry from '../../Components/C_InputSecureEntry';
import { BASE_URL } from '../Signin/Signin';
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 6 or 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SetPassword = props => {
  const navigation = useNavigation();

  const [checked, setChecked] = React.useState(false);
  const [hide, setHide] = React.useState(true);
  const [confirmhide, seConfirmtHide] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  console.log('email global', global.email);
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        // Handle form submission here
        console.log('password data submitted:', values);
        // Add your navigation logic here

        try {
          setLoad(true);
          var myHeaders = new Headers();
          myHeaders.append('Cookie', 'PHPSESSID=repq4egpdnsd7ikh50kjova7jd');

          var formdata = new FormData();
          formdata.append('email', global.email);
          formdata.append('password', values.password);

          const apiUrl =
            // 'https://fisdemoprojects.com/skilledman/api/register.php';
            `${BASE_URL}register.php`;

            

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          };
          const response = await fetch(apiUrl, requestOptions);
          const result = await response.json();
          console.log('confirm rresponse:', result);
          if (result && checked == true) {
            setLoad(false);
            global.id = result.id;
            if (result.role == 0) {
              navigation.navigate('AddBusiness');
            } else if (result.role == 1) {
              navigation.navigate('Congratulations');
            }
          } else {
            setLoad(false);
            Alert.alert('Check Terms and Conditions');
          }
        } catch (error) {
          setLoad(false);
          Alert.alert(error);
        }
        //
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <>
          <ImageBackground
            source={require('../../Assets/Images/bg.png')}
            resizeMode="cover"
            style={styles.backgroundImg}>
            <CustomHeaderIcon
              onPress={() => {
                props.navigation.goBack();
              }}
              headerIcon={styles.headerIcon}
            />
            <View style={styles.container}>
              <Text style={styles.accountVer}>Set Password</Text>
              <View style={styles.inputContainer}>
                <C_InputSecureEntry
                  placeholder="Password"
                  placeholderTextColor={color.default}
                  secureTextEntry={hide}
                  icon="eye-off"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  onPress={() => setHide(!hide)}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <C_InputSecureEntry
                  placeholder="Confirm Password"
                  placeholderTextColor={color.default}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  icon="eye-off"
                  secureTextEntry={confirmhide}
                  onPress={() => seConfirmtHide(!confirmhide)}
                />

                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}></Checkbox>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('privacy_policy');
                  }}>
                  <Text style={styles.rememberStyle}>
                    I agree with{' '}
                    <Text style={styles.termsStyle}>
                      terms of use & privacy policy
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <BtnComp
                BtnStyle={styles.BtnStyle}
                btnText={
                  load ? (
                    <ActivityIndicator size={28} color="#f8f8ff" />
                  ) : (
                    'Submit'
                  )
                }
                onPressFunc={() => {
                  handleSubmit(values);
                }}
              />
            </View>
          </ImageBackground>
        </>
      )}
    </Formik>
  );
};

export default SetPassword;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    width: '80%',
    flex: 0.6,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  signinText: {
    fontSize: 16,
    fontWeight: '400',
    color: color.white,
    textAlign: 'center',
    marginTop: 8,
  },
  BtnStyle: {
    marginTop: 25,
    width: '100%',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
  },
  rememberStyle: {
    fontSize: 13,
    fontWeight: '500',
    color: color.darkGray,
    lineHeight: 25,
  },
  termsStyle: {
    fontSize: 13,
    fontWeight: '500',
    color: color.default,
    flexWrap: 'wrap',
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '85%',
    paddingVertical: 10,
    flexWrap: 'wrap',
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
    width: '80%',
  },
  headerIcon: {
    paddingLeft: 20,
  },
  accountVer: {
    color: color.default,
    fontSize: 25,
    marginBottom: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
