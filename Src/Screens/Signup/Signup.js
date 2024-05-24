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
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please Enter Your Password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please Confirm Your Password'),
});

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
    confirmPassword: '',
  };

  // useEffect(() => {
  //   const fetchState = async () => {
  //     try {
  //       var myHeaders = new Headers();
  //       myHeaders.append(
  //         'Cookie',
  //         'PHPSESSID=2a1286fffb4c2a53ccfdd18329031f71',
  //       );

  //       var formdata = new FormData();

  //       var requestOptions = {
  //         method: 'GET',
  //         headers: myHeaders,
  //         body: formdata,
  //         redirect: 'follow',
  //       };
  //       apiUrl =
  //         'https://koboautos.com/shipafrika/member/ajaxfiles/state_code.php?id=3811';

  //       const response = await fetch(apiUrl, requestOptions);
  //       const result = await response.json();
  //       if (result) {
  //       }
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };
  //   fetchState();
  // }, []);

  const onRoleChange = selectedRole => {
    setSelectedRole(selectedRole);
    setUserDetails({...userDetails, role: selectedRole});
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupValidationSchema}
      onSubmit={async value => {
        console.log('🚀 ~ Signup ~ value:', value);
        try {
          setLoad(true);

          const formdata = new FormData();
          formdata.append('username', value.name);
          formdata.append('name', value.name);
          formdata.append('type', selectedRole);
          formdata.append('email', value.email);
          formdata.append('password', value.password);

          // Define the API endpoint
          // const apiUrl ='https://fisdemoprojects.com/skilledman/api/otp_register.php';
          const apiUrl = `${BASE_URL}register`;

          var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
          };
          const response = await fetch(apiUrl, requestOptions);

          const result = await response.json();
          console.log('API response:', result);
          if (result && result.created_at) {
            navigation.navigate('Signin');
            Toast.showWithGravity('Account created', Toast.LONG, Toast.CENTER);

            setLoad(false);
            // global.id = result.id;
            // global.role = result.role;
            // global.name = result.name;
            // global.email = result.email;
            // global.password = result.password;
            // global.role = result.role;
            // if (!result.error) {
            //   navigation.navigate('OtpScreen', {result});
            // } else if (result.error) {
            //   Toast.showWithGravity(result.error, Toast.LONG, Toast.CENTER);
            // }
          } else {
            setLoad(false);
            // Handle the case where status is not true (e.g., show an error message)
            Alert.alert(JSON.stringify(result));
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
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
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
                handleSubmit(values);
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
