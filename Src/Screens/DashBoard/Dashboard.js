import React, {useRef, useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  ToastAndroid,
  Image,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../../Assets/colors/colors';
import {ScrollView, useAccessibleColors, useSafeArea} from 'native-base';
import Modal from 'react-native-modal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import OpeningCard from '../../Components/OpeningCard';
import HomeStackwithoutsearch from '../../Components/HomeStackwithoutsearch';
import Two_Card from '../../Components/Two_Card';
import {BarChart} from 'react-native-chart-kit';
import {Icons} from '../../Components/Icons';
import {useAuth} from '../../context/AuthProvider';
import BtnComp from '../../Components/BtnComp';
import UserTabs from '../../BottomNavigator/UserTabs';
import DocumentPicker from 'react-native-document-picker';
import C_Dropdown from '../../Components/C_Dropdown';
import UploadfilewithIcon from '../../Components/UploadfilewithIcon';
import {Picker} from '@react-native-picker/picker';
import {Country, State, City, getAllCountries} from 'country-state-city';
import C_TextInput from '../../Components/C_TextInput';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../Signin/Signin';
const Dashboard = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const {state} = useAuth();
  const [certficate, setCertficate] = React.useState();
  const [Guarantor, setGuarantor] = React.useState();
  const [jobReferences, setJobReferences] = React.useState();
  const [selectedBusiness, setSelectedBusiness] = useState('Select Business');
  const [load, setLoad] = React.useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState('year of experience');
  const [item, setItem] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryError, setCountryError] = useState(false);
  const [number, setnumber] = useState('');
  const [address, setaddress] = useState('');
  const [association, setassociation] = useState('');
  const pickerRef = useRef();
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const focus = useIsFocused();
  const [selectedState, setSelectedState] = useState('');
  useEffect(() => {
    // Load the list of countries when the component mounts
    const countriesData = Country.getAllCountries();
    setCountries(countriesData);
  }, [focus]);

  const onCountryChange = countryCode => {
    setSelectedCountry(countryCode);
    setSelectedState('');
    const countryStates = State.getStatesOfCountry(countryCode);
    setStates(countryStates);
    // setCountryError(false);
  };

  const ExperienceOption = [
    {
      id: 1,
      select_bussiness: 'year of experience',
      select_bussiness: 'year of experience',
    },
    {id: 2, select_bussiness: '0-1', select_bussiness: '0-1'},
    {id: 3, select_bussiness: '1-2', select_bussiness: '1-2'},
    {id: 4, select_bussiness: '2-3', select_bussiness: '2-3'},
    {id: 5, select_bussiness: '3-4', select_bussiness: '3-4'},
    {id: 6, select_bussiness: '3-4', select_bussiness: '3-4'},
    {id: 7, select_bussiness: '4-5', select_bussiness: '4-5'},
  ];

  const handleFilePick = async value => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('image picker result', result[0]);
      console.log('placeholdervalue', value);
      if (value === 'Guarantor') {
        setGuarantor(result[0]);
      }
      if (value == 'Job References') {
        setJobReferences(result[0]);
      }
      if (value == 'Certificates') {
        setCertficate(result[0]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User canceled the document picker
      } else {
        console.log('error occur on document picking', error);
        throw error; // Throw the correct error
      }
    }
  };

  const handleBusinessSelect = selectedValue => {
    // You can do something with the selected value here, like set it in the state or use it in an API call.
    // console.log("Selected Business:", selectedValue);
    setSelectedBusiness(selectedValue);
  };

  const handleExperienceSelect = selectedValue => {
    // You can do something with the selected value here, like set it in the state or use it in an API call.
    // console.log("Selected Experience:", selectedValue);
    setSelectedExperience(selectedValue);
  };

  useEffect(() => {
    {
      state.isAuth == true
        ? //Alert.alert('Disclaimer notice')
          setModalVisible(true)
        : setsigninmodal(true);
    }
  }, []);
  console.log('globalstaus', global.states);

  const [signinmodal, setsigninmodal] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState();
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    // Check if the user has logged in for the first time
    const checkFirstLogin = async () => {
      try {
        const hasLoggedBefore = await AsyncStorage.getItem('hasLoggedBefore');
        if (!hasLoggedBefore) {
          // If it's the first login, show the modal
          setsigninmodal(true);
          setIsFirstLogin(true);
          // Save in AsyncStorage to mark that the user has logged in before
          await AsyncStorage.setItem('hasLoggedBefore', 'true');
        }
      } catch (error) {
        console.error('Error checking first login:', error);
      }
    };

    checkFirstLogin();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const closeModal = () => {
    setsigninmodal(false);
  };

  useEffect(() => {
    // Example: Check whether the user is signed in
    const userSignedIn = state.isAuth === true; // Adjust based on your authentication logic
    setIsUserSignedIn(userSignedIn);

    if (userSignedIn) {
      setsigninmodal(true);
    }
  }, [state.isAuth]);

  const HandleAdddetials = async () => {
    if (
      selectedBusiness == 'select_bussiness' ||
      selectedExperience == 'year of experience' ||
      !certficate ||
      !Guarantor ||
      !jobReferences
    ) {
      Toast.showWithGravity(
        'Please fill the required fields',
        Toast.LONG,
        Toast.CENTER,
      );
      return;
    }
    try {
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=evs4c146cvheh7fla9agaufmn3');

      var formdata = new FormData();
      formdata.append('provider_id', global.id);
      formdata.append('phone_number', number);
      formdata.append('country', selectedCountry);
      formdata.append('address', address);
      formdata.append('association', association);
      formdata.append('select_bussiness', selectedBusiness);
      formdata.append('working_experience', selectedExperience);
      formdata.append('certificates', certficate);
      formdata.append('job_references', jobReferences);
      formdata.append('gurantor', Guarantor);
      formdata.append('type', global.role);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // fetch(
      //   'https://fisdemoprojects.com/skilledman/api/add_users_detail.php',
      //   requestOptions,
      // )
      fetch(
        `${BASE_URL}add_users_detail.php`,
        requestOptions,
      )



        .then(response => response.text())
        .then(result => console.log(result));
      if (result.status) { 
        setLoad(false);
        navigation.navigate('AddBank');
      } else if (result.error) {
        setLoad(false);
        Alert.alert(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getOverall = async () => {
      try {
        var myHeaders = new Headers();
        myHeaders.append('Cookie', 'PHPSESSID=0g4vvcrd3mg6h7pr1q0c26ns09');

        var urlencoded = new URLSearchParams();

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow',
        };
        // const apiurl ='https://fisdemoprojects.com/skilledman/api/get_services.php';
        const apiurl =`${BASE_URL}get_services.php`;


        const response = await fetch(apiurl, requestOptions);
        const result = await response.json();
        if (result && result.add_skills) {
          console.log('result', result.add_skills);
          setItem(result.add_skills);
        } else if (result.error) {
          Alert.alert(result.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOverall();
  }, []);

  return (
    <>
      <HomeStackwithoutsearch
        onPress={() => {
          navigation.openDrawer();
        }}
        onPressnotification={() => {
          navigation.navigate('edit_profile');
        }}
      />
      <ScrollView style={{paddingHorizontal: 15, paddingVertical: 20}}>
        <Two_Card />
        <View style={styles.chartContainer}>
          <View style={styles.filterCont}>
            <Text style={styles.incomeStyle}>Income</Text>
            <Icons.FontAwesome name="filter" size={20} color={color.default} />
          </View>

          <BarChart
            data={{
              labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              datasets: [
                {
                  data: [0, 16, 33, 50, 66, 83, 100],
                },
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={300}
            chartConfig={{
              backgroundGradientFrom: color.white,
              backgroundGradientTo: color.gray,
              showBarTops: false,
              decimalPlaces: 0,
              barPercentage: 0.4,
              verticalLabelRotation: 90,
              withVerticalLabels: true,
              backgroundGradientToOpacity: 0,
              showBarTops: false,
              horizontalLines: false,
              withHorizontalLabels: false,
              fromZero: false,
              strokeWidth: 32,
              color: (opacity = 1) => color.yellow,
              style: {
                borderRadius: 16,
              },
              labelColor: (opacity = 1) => color.black,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Disclaimer Notice</Text>
            </View>

            <View style={styles.modalBody}>
              <ScrollView>
                <Text style={{color: 'black', textAlign: 'justify'}}>
                  The following disclaimer outlines the terms of use for
                  Skilledman App, a platform designed to connect artisans and
                  users. By accessing or using the Skilledman application, you
                  agree to comply with the terms and conditions outlined below.
                  Skilledman App serves as a medium for facilitating
                  communication and transactions between artisans and users.We
                  do not take responsibility for the quality, pricing, delivery,
                  or any other aspects of the products or services offered by
                  artisans. We do not endorse, guarantee, or take responsibility
                  for the accuracy, reliability, or legality of any content,
                  products, or services provided by artisans on the
                  platform.Users are advised to exercise their own discretion
                  and judgment before engaging in any transactions. Skilledman
                  App is not liable for any direct, indirect, incidental,
                  special, or consequential damages that may arise from the use
                  of the platform, including but not limited to, any losses
                  incurred from transactions with artisans. Users are
                  responsible for conducting their own due diligence, including
                  verifying the credentials, qualifications, and background of
                  artisans before engaging in any business transactions. We
                  reserve the right to suspend, terminate, or modify any part of
                  the platform without prior notice.We are not liable for any
                  damages or losses resulting from such actions. By using
                  Skilledman App, you acknowledge that you have read and
                  understood this disclaimer and agree to be bound by its terms
                  and conditions.If you do not agree with any part of this
                  disclaimer, please refrain from using the Skilledman
                  application. Click agree
                </Text>
              </ScrollView>
              <View style={styles.btnContainer}>
                <BtnComp
                  BtnStyle={styles.acceptStyle}
                  btnTextStyle={styles.btnTextStyle}
                  btnText="Agree"
                  onPressFunc={() => {
                    setModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={signinmodal}
        onRequestClose={() => setsigninmodal(false)}>
        <View style={styles.modalContainertwo}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Complete Profile</Text>
            </View>
            <View
             style={{marginTop:10}}
            >
              <Text style={{color: 'black', textAlign: 'center', fontSize: 22}}>
                Congragulation for Sign In
              </Text>
              <Text style={{color: 'black', textAlign: 'center', fontSize:22}}>
                Please Complete the Profile
              </Text>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.btnContainer}></View>
              <View style={styles.btnContainer}>
                <BtnComp
                  BtnStyle={styles.acceptStyle}
                  btnTextStyle={styles.btnTextStyle}
                  btnText="Add Bussiness"
                  onPressFunc={() => {
                    setsigninmodal(false);
                    navigation.navigate('PublicRoutes', {
                      screen: 'AddBusiness',
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal> */}
      {/* {!signinmodal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={signinmodal}
          onRequestClose={() => setsigninmodal(false)}>
          <View style={styles.modalContainertwo}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Complete Profile</Text>
              </View>
              <View style={{marginTop: 10}}>
                <Text
                  style={{color: 'black', textAlign: 'center', fontSize: 22}}>
                  Congratulation for Sign In
                </Text>
                <Text
                  style={{color: 'black', textAlign: 'center', fontSize: 22}}>
                  Please Complete the Profile
                </Text>
              </View>

              <View style={styles.modalBody}>
                <View style={styles.btnContainer}></View>
                <View style={styles.btnContainer}>
                  <BtnComp
                    BtnStyle={styles.acceptStyle}
                    btnTextStyle={styles.btnTextStyle}
                    btnText="Add Business"
                    onPressFunc={() => {
                      setsigninmodal(false);
                      navigation.navigate('PublicRoutes', {
                        screen: 'SetPassword',
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )} */}
      {/* <Modal
  animationType="slide"
  transparent={true}
  // visible={isUserSignedIn && signinmodal} 
  // onRequestClose={() => setsigninmodal(false)}
  visible={signinmodal}
  onRequestClose={closeModal}>
  
  <View style={styles.modalContainertwo}>
    <View style={styles.modalView}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Complete Profile</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 22 }}>
          Congratulation for Sign In
        </Text>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 22 }}>
          Please Complete the Profile
        </Text>
      </View>

      <View style={styles.modalBody}>
        <View style={styles.btnContainer}></View>
        <View style={styles.btnContainer}>
          <BtnComp
            BtnStyle={styles.acceptStyle}
            btnTextStyle={styles.btnTextStyle}
            btnText="Add Business"
            onPressFunc={() => {
              setsigninmodal(false);
              navigation.navigate('PublicRoutes', {
                screen: 'Addbusines',
              });
            }}
          />
        </View>
      </View>
    </View>
  </View>
</Modal> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={signinmodal}
        onRequestClose={() => setsigninmodal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                If Already Add busineess then dont submitted,Press Ok{' '}
              </Text>
            </View>

            <View style={styles.modalBody}>
              <ScrollView>
                <View style={styles.dropdownContainer}>
                  <C_Dropdown
                    selectedValue="Select Business"
                    options={item}
                    onValueChange={handleBusinessSelect}
                  />
                </View>
                <View style={styles.dropdownContainer}>
                  <C_Dropdown
                    selectedValue="Working Experience"
                    options={ExperienceOption}
                    onValueChange={handleExperienceSelect}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleFilePick('Certificates')}>
                  <View style={styles.inputContainer}>
                    <UploadfilewithIcon
                      placeholder="Certificates"
                      icon="upload"
                      // handleFilePick={handleFilePick}
                      title={certficate}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFilePick('Job References')}>
                  <View style={styles.inputContainer}>
                    <UploadfilewithIcon
                      placeholder="Job References"
                      icon="upload"
                      // handleFilePick={handleFilePick}
                      title={jobReferences}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilePick('Guarantor')}>
                  <View style={styles.inputContainer}>
                    <UploadfilewithIcon
                      placeholder="Guarantor"
                      icon="upload"
                      // handleFilePick={handleFilePick}
                      title={Guarantor}
                    />
                  </View>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                  <C_TextInput
                    placeholder="Phone Number"
                    placeholderTextColor={color.default}
                    onChangeText={setnumber}
                    //onBlur={handleBlur('phone_number')}
                    value={number}
                  />
                  {/* {touched.phone_number && errors.phone_number ? (
                  <Text style={styles.errorText}>{errors.phone_number}</Text>
                ) : null} */}
                </View>
                <View style={styles.inputContainer}>
                  <C_TextInput
                    placeholder="Address"
                    placeholderTextColor={color.default}
                    onChangeText={setaddress}
                    //  onBlur={handleBlur('address')}
                    value={address}
                  />
                  {/* {touched.address && errors.address ? (
                  <Text style={styles.errorText}>{errors.address}</Text>
                ) : null} */}
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.DropDownContainer}>
                    <Picker
                      ref={pickerRef}
                      selectedValue={selectedCountry}
                      onValueChange={itemValue => onCountryChange(itemValue)}
                      enabled={true}
                      mode={'dialog'}
                      dropdownIconColor={color.default}
                      selectionColor={color.yellow}
                      itemStyle={styles.itemsStyle}>
                      <Picker.Item
                        label="Select Country"
                        value=""
                        color={color.default}
                        fontWeight="bold"
                        fontSize={17}
                      />
                      {countries.map((country, index) => (
                        <Picker.Item
                          key={country.isoCode}
                          label={country.name}
                          value={country.isoCode}
                          color={color.default}
                          fontWeight="bold"
                          fontSize={17}
                        />
                      ))}
                    </Picker>
                  </View>
                  {countryError && (
                    <Text style={styles.errorText}>
                      Please select a country.
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    width: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginBottom: '22%',
                  }}>
                  <C_TextInput
                    placeholder="Association"
                    placeholderTextColor={color.default}
                    onChangeText={setassociation}
                    // onBlur={handleBlur('association')}
                    value={association}
                  />
                </View>
              </ScrollView>
              <View style={styles.btnContainer}>
                <BtnComp

                  BtnStyle={styles.BtnStyle}
                  btnText={
                    load ? (
                      <ActivityIndicator size={28} color="#f8f8ff" />
                    ) : (
                      'OK'
                    )
                  }
                  onPressFunc={() => {
                    HandleAdddetials();

                    setsigninmodal(false);
                    //navigation.navigate('AddBank');
                  }}
                />
                <BtnComp
                  BtnStyle={styles.BtnStyle}
                  btnText={
                    load ? (
                      <ActivityIndicator size={28} color="#f8f8ff" />
                    ) : (
                      'Add bank'
                    )
                  }
                  onPressFunc={() => {
                    //  navigation.navigate('edit_profile');
                    navigation.navigate('PublicRoutes', {
                      screen: 'AddBankGoogle',
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* <Modal
  animationType="slide"
  transparent={true}

  visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
  

          
  <View style={styles.container}>
          <Text style={styles.accountVer}>Add Business</Text>
          <View style={styles.dropdownContainer}>
            <C_Dropdown
              selectedValue="Select Business"
              options={item}
              onValueChange={handleBusinessSelect}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <C_Dropdown
              selectedValue="Working Experience"
              options={ExperienceOption}
              onValueChange={handleExperienceSelect}
            />
          </View>
          <TouchableOpacity onPress={() => handleFilePick('Certificates')}>
            <View style={styles.inputContainer}>
              <UploadfilewithIcon
                placeholder="Certificates"
                icon="upload"
                
                title={certficate}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilePick('Job References')}>
            <View style={styles.inputContainer}>
              <UploadfilewithIcon
                placeholder="Job References"
                icon="upload"
               
                title={jobReferences}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilePick('Guarantor')}>
            <View style={styles.inputContainer}>
              <UploadfilewithIcon
                placeholder="Guarantor"
                icon="upload"
              
                title={Guarantor}
              />
            </View>
          </TouchableOpacity>

          
          <View style={styles.inputContainer}>
                <C_TextInput
                  placeholder="Phone Number"
                  placeholderTextColor={color.default}
                onChangeText={setnumber}
                
                  value={number}
                  
                />
              
              </View>
              <View style={styles.inputContainer}>
                <C_TextInput
                  placeholder="Address"
                  placeholderTextColor={color.default}
                  onChangeText={setaddress}
                
                  value={address}
                />
                
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.DropDownContainer}>
                  <Picker
                    ref={pickerRef}
                    selectedValue={selectedCountry}
                    onValueChange={itemValue => onCountryChange(itemValue)}
                    enabled={true}
                    mode={'dialog'}
                    dropdownIconColor={color.default}
                    selectionColor={color.yellow}
                    itemStyle={styles.itemsStyle}>
                    <Picker.Item
                      label="Select Country"
                      value=""
                      color={color.default}
                      fontWeight="bold"
                      fontSize={17}
                    />
                    {countries.map((country, index) => (
                      <Picker.Item
                        key={country.isoCode}
                        label={country.name}
                        value={country.isoCode}
                        color={color.default}
                        fontWeight="bold"
                        fontSize={17}
                      />
                    ))}
                  </Picker>
                </View>
                {countryError && (
                  <Text style={styles.errorText}>Please select a country.</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                  <C_TextInput
                    placeholder="Association"
                    placeholderTextColor={color.default}
                    onChangeText={setassociation}
                
                    value={association}
                  />
              
                </View>

          <BtnComp
            BtnStyle={styles.BtnStyle}
            btnText={
              load ? <ActivityIndicator size={28} color="#f8f8ff" /> : 'Next'
            }
            onPressFunc={() => {
              HandleAdddetials();
              
             setModalVisible();
            }}
          />
        </View>
</Modal> */}
    </>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  BtnStyle: {
    marginTop: 15,
    width: '45%',
    margin: 4,
  },
  itemsStyle: {
    color: color.red,
    fontWeight: '400',
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  DropDownContainer: {
    borderColor: color.default,
    borderWidth: 1,
    paddingHorizontal: 5,
    width: '100%',
    borderRadius: 6,
    marginTop: 6,
    height: 53,
  },
  container: {
    backgroundColor: '#fff',
    height: '60%',
    elevation: 6,
  },
  backgroundImg: {
    height: '100%',
  },

  confirmBtn: {
    backgroundColor: color.darkGreen,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: '40%',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.white,
  },
  innercontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    width: '80%',
    flex: 0.8,
  },
  accountVer: {
    color: color.default,
    fontSize: 25,
    marginBottom: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    width: '80%',
  },
  // modalContainer: {
  //   borderTopRightRadius: 20,
  //   borderTopLeftRadius: 20,
  //   marginLeft: 0,
  //   marginRight: 0,
  // },
  iconCont: {
    width: '38%',
  },
  iconStyle: {
    fontSize: 30,
    color: color.darkGreen,
    position: 'absolute',
    right: -180,
    top: 10,
  },
  modalBody: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalView: {
    borderRadius: 12,
    width: '70%',
    alignSelf: 'center',
    backgroundColor: color.white,
  },
 
  successmodalBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  pendAppr: {
    fontWeight: 'bold',
    fontSize: 17,
    color: color.darkGreen,
    paddingTop: 5,
  },
  cardCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headStyle: {
    fontSize: 19,
    fontWeight: '700',
    color: color.black,
    paddingVertical: 10,
  },
  linearGradientStyle: {
    alignItems: 'center',
    elevation: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    justifyContent: 'center',
  },
  locationCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  chStyle: {
    fontSize: 17,
    fontWeight: '700',
    color: color.Green,
  },
  searchContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: color.lightgreen,
  },
  locStyle: {
    fontSize: 16,
    color: color.lightGray,
  },
  deliverStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: color.black,
    paddingHorizontal: 10,
  },
  imgStyle: {
    marginRight: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loginBtn: {
    borderRadius: 5,
    backgroundColor: 'transparent',
    width: '50%',
    marginTop: 7,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  prodName: {
    color: color.black,
    fontWeight: '700',
    fontSize: 20,
  },
  linearGradientStyle: {
    alignItems: 'center',
    elevation: 0,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
    justifyContent: 'center',
  },
  priceStyle: {
    fontSize: 16,
    color: color.Green,
    fontWeight: '600',
    marginTop: 7,
  },
  listimgStyle: {
    width: 80,
    height: 80,
  },
  CardContainer: {
    marginTop: -60,
  },
  cardContent: {
    width: '94%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 8,
    margin: 0,
  },
  chartContainer: {
    backgroundColor: color.white,
    marginTop: 20,
    borderRadius: 10,
    elevation: 1,
  },
  incomeStyle: {
    fontSize: 17,
    color: color.black,
    fontWeight: '500',
  },
  filterCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 100,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    height: '73%',
  },
  modalContainertwo: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 100,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    height: '30%',
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
    //backgroundColor:'red'
  },
});
