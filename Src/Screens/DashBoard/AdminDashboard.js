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
  Modal,
} from 'react-native';
import color from '../../Assets/colors/colors';
import {ScrollView, useAccessibleColors} from 'native-base';
//import Modal from 'react-native-modal';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Icons} from '../../Components/Icons';
import HeaderWithSearchFilter from '../../Components/HeaderWithSearchFilter';
import ServiceCard from '../../Components/ServiceCard';
import BtnComp from '../../Components/BtnComp';
import {useAuth} from '../../context/AuthProvider';
import {BASE_URL, Img_URL} from '../Signin/Signin';
import {useSelector} from 'react-redux';
import ProductList from '../Drawer/ProductList';
import ProductsCard from '../../Components/ProductsCard';
import ProductOptions from '../../Components/producOptions';
import AdminCard from '../../Components/AdminCard';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const locations = [
  {
    id: '1',
    name: 'Eastern Cape',
  },
  {
    id: '2',
    name: 'Gauteng',
  },
  {
    id: '3',
    name: 'KwaZulu-Natal',
  },
  {
    id: '4',
    name: 'Limpopo',
  },
  {
    id: '5',
    name: 'Nort West',
  },
  {
    id: '6',
    name: 'Rawalpindi',
  },
];

const accounts = [
  {
    id: '1',
    name: 'Verified',
  },
  {
    id: '2',
    name: 'Non Verified',
  },
];
const AdminDashboard = () => {
  const isfocused = useIsFocused();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [showJob, setShowJob] = useState(false); // Initially show the Job section
  const [showLocation, setShowLocation] = useState(false); // Initially show the Location section
  const [showAccount, setShowAccount] = useState(false); // Initially show the Account section
  const [modalTitle, setModalTitle] = useState('Filter');
  const [searchTerm, setsearchTerm] = useState('');
  const {token} = useSelector(state => state.TokenReducer);

  const [skill, setskill] = useState([]); //
  const [selectedshowJob, setselectedShowJob] = useState('');
  const [selectedslocation, setselectedsLocation] = useState('');
  const [selectedAccount, setselectedAccount] = useState('');
  const {state} = useAuth();
  const [signinmodal, setsigninmodal] = useState();
  //   const toggleModal = () => {
  //     setModalVisible(!modalVisible);
  //     setShowLocation(false);
  //     setShowJob(false);
  //     setShowAccount(false);
  //   };

  const toggleBack = () => {
    setShowLocation(false);
    setShowJob(false);
    setShowAccount(false);
  };

  // Function to toggle the visibility of the Job section
  const toggleJob = () => {
    setShowJob(true);
    console.log(showJob);
    setModalTitle(showJob ? 'Filter' : 'Job');
  };

  // Function to toggle the visibility of the Location section
  const toggleLocation = () => {
    setShowLocation(true);
    console.log(showLocation);
    setModalTitle(showLocation ? 'Filter' : 'Location');
  };

  // Function to toggle the visibility of the Account section
  const toggleAccount = () => {
    setShowAccount(true);
    console.log(showAccount);
    setModalTitle(showAccount ? 'Filter' : 'Account');
  };

  const handleAccount = value => {
    setselectedAccount(value);
  };
  const handleLocation = value => {
    setselectedsLocation(value);
  };
  const handleJob = value => {
    setselectedShowJob(value);
  };
  const [selectedBusiness, setselectedBusiness] = useState('0');

  console.log('selectedShow JOB filter', selectedshowJob);
  console.log('selectedShow JOB filterlocation', selectedslocation);
  console.log('selectedShow Account filter', selectedAccount);

  const applyFilter = async () => {
    // navigation.navigate('FindExpert')
    try {
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=djpeho05m1o2dmm2p8k1vaill4');
      var formdata = new FormData();
      formdata.append('job', selectedshowJob);
      formdata.append('Location', selectedslocation);
      formdata.append('accounts', selectedAccount);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      const apiurl =
        'https://fisdemoprojects.com/skilledman/api/user/getdata.php';

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      if (result.add_skills) {
        console.log('result useeffect', result.add_skills);

        Alert.alert(JSON.stringify(result.add_skills));
      } else if (result.error) {
        Alert.alert(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // api
  const Fetchspecficdata = async value => {
    console.log('value to fetch', value);

    try {
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=lccmaap9lnt4db1mjf1247d3md');

      var formdata = new FormData();
      formdata.append('job', value);
      formdata.append('user_id', global.id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      // const apiurl ="https://fisdemoprojects.com/skilledman/api/user/providers_job.php"
      const apiurl = `${BASE_URL}user/providers_job.php`;

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      console.log('result of expert ', result);

      if (result && result.add_skills) {
        console.log(`result of ${value}`, result);
        navigation.navigate('FindExpert', {data: result.add_skills});
      } else if (result.error) {
        Alert.alert(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // alert

    {
      state.isAuth == true
        ? //Alert.alert('Disclaimer notice')
          setModalVisible(true)
        : null;
    }

    const getOverall = async () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}admin/user-list`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result && result?.all_users) {
            console.log(
              '🚀 ~ getOverall ~ result?.all_users:',
              result?.all_users,
            );
            setskill(result?.all_users);
          }
        })
        .catch(error => console.error(error));
    };

    getOverall();
  }, []);

  const filteredData = skill.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={{flex: 1}}>
      <HeaderWithSearchFilter
        onPress={() => {
          navigation.openDrawer();
        }}
        onPressNotifiction={() => {
          navigation.navigate('notification_screen');
        }}
        onPressProfile={() => {
          navigation.navigate('editUserProfile');
        }}
        titleText="What are you looking for?"
        bellIcon="bell"
        // toggleModal={toggleModal}
        onChangeText={val => {
          setsearchTerm(val);
        }}
        value={searchTerm}
        screen={'user'}
      />
      <ScrollView
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
          marginTop: 15,
          marginBottom: 50,
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            flex: 1,
            marginBottom: 30,
          }}>
          {filteredData?.map((itemdata, ind) => (
            <AdminCard
              onPressView={() =>
                navigation.navigate('providerDetail', {currentData: itemdata})
              }
              key={ind}
              showProfile={() => {
                Fetchspecficdata(itemdata.name);
              }}
              email={itemdata.email}
              serviceTitle={itemdata.name}
              // iconUrl={require('../../Assets/icons/Mechanics.png')}
              // iconUrl={`https://fisdemoprojects.com/skilledman/api/uploads//${itemdata.image}`}
              iconUrl={itemdata.image_path}
            />
          ))}
        </View>
        <View style={{marginTop: '17%'}} />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => toggleModal()}>
                <Icons.FontAwesome5
                  name="times"
                  color={color.white}
                  size={20}
                  style={styles.closeStyle}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.successmodalBody}>
              <ProductOptions
                selectedBusiness={selectedBusiness}
                setselectedBusiness={setselectedBusiness}
              />
            </View>

            <View style={styles.btnContainer}>
              <BtnComp
                BtnStyle={styles.acceptStyle}
                btnTextStyle={styles.btnTextStyle}
                btnText="Submit"
                onPressFunc={() => {
                  // Pass the selected booking_id
                  toggleModal();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={signinmodal}
        onRequestClose={() => setsigninmodal()}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Account Type</Text>
            </View>

            <View style={styles.modalBody}>
            <View style={styles.btnContainer}>
                <BtnComp
                  BtnStyle={styles.acceptStyle}
                  btnTextStyle={styles.btnTextStyle}
                  btnText="Sign In As User"
                  onPressFunc={() => {
                    setsigninmodal(false);
                  }}
                />
              </View>
              <View style={styles.btnContainer}>
                <BtnComp
                  BtnStyle={styles.acceptStyle}
                  btnTextStyle={styles.btnTextStyle}
                  btnText="Sign In As Provider"
                  onPressFunc={() => {
                    setsigninmodal(false);
                    navigation.navigate('PublicRoutes', { screen: 'AddBusiness' });
                  }}
                />
              </View>
               
             
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default AdminDashboard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  modalStyle: {
    // shadowOffset: {width: 100, height: 0},
    // shadowOpacity: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginLeft: 0,
    marginRight: 0,
    height: '100%',
  },
  modalBody: {
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalView: {
    borderRadius: 12,
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
  modalHeader: {
    backgroundColor: color.default,
    alignItems: 'flex-end',
    paddingVertical: 17,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
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

  modalView: {
    borderRadius: 12,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: color.white,
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  modalBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: '90%',
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: color.default,
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
  logoImg: {
    width: width / 4,
    height: height / 8,
    marginTop: -55,
    borderRadius: 10,
  },
  bookingStyle: {
    fontSize: 14,
    color: color.gray,
    fontWeight: '400',
    textAlign: 'left',
  },
  openingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    marginBottom: 15,
  },
  dateTimeCont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 6,
  },
  dateStyle: {
    fontSize: 14,
    color: color.yellow,
    fontWeight: '400',
    textAlign: 'left',
  },

  modalTitle: {
    fontSize: 19,
    color: color.white,
    fontWeight: '600',
  },
  cancelCont: {
    position: 'absolute',
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  angleRight: {
    marginLeft: 5,
  },
  jobsCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: color.gray,
    paddingBottom: 5,
    marginTop: 20,
  },
  BtnStyle: {
    marginVertical: 15,
  },

  listCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  itemStyle: {
    backgroundColor: color.ligthOrange,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 6,
    width: '97%',
    marginBottom: 5,
  },
  flatCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  itemName: {
    color: color.white,
    textAlign: 'center',
  },
});
