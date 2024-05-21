import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  FlatList,
  Linking
} from 'react-native';
import React, { useState, useEffect } from 'react';
import color from '../../Assets/colors/colors';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import HomeStackWithSearch from '../../Components/HomeStackWithSearch';
import { Modal } from 'react-native-paper';
import Icon, { Icons } from '../../Components/Icons';
import FlatListCard from '../../Components/FlatListCard';
import BtnComp from '../../Components/BtnComp';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../Signin/Signin';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const RequestScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const focused = useIsFocused();
  const [booklist, setbooklist] = useState([])
  const [currentitem, setCurrentItem] = useState()
  const [searchTerm, setsearchTerm] = useState('');

  const toggleModal = (item) => {
    console.log(item, "modal item")
    setModalVisible(!modalVisible);
    setCurrentItem(item);
    console.log("current item", currentitem)

  };


  useEffect(() => {
    const getBookingRequest = async () => {

      const myHeaders = new Headers();
      myHeaders.append("Cookie", "PHPSESSID=5sfeloifjcmrpti44vvqmr763q");

      const formdata = new FormData();
      formdata.append("provider_id", global.id);
      if (searchTerm !== '') {
        formdata.append("searchTerm", searchTerm);
      }
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // const apiurl = "https://fisdemoprojects.com/skilledman/api/provider_status.php";
      const apiurl = `${BASE_URL}provider_status.php`;


      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();

      if (result && result.booking_request) {
        setbooklist(result.booking_request)
        console.log("Getting all user requests to me", result);
      }
      else if (result && result.error) {
        Toast.show(result.error);
      }
    };
    getBookingRequest();
  }, [focused, searchTerm]);


  const changestatus = async (v) => {
    // const remainingItems = booklist.filter((item) => (item.booking_id != currentitem.booking_id))
    // setbooklist(remainingItems)
    // console.log(v, 'vvvvvsvvvvv')
    try {
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "PHPSESSID=5sfeloifjcmrpti44vvqmr763q");
      var formdata = new FormData()
      formdata.append("id", currentitem.booking_id);
      formdata.append("status", v)

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // const apiurl = "https://fisdemoprojects.com/skilledman/api/status_update.php";
      const apiurl = `${BASE_URL}status_update.php`;

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      if (result.success) {
        Toast.show(result.success);
        setbooklist(booklist)
      }
    } catch (error) {
      Alert.alert(error)
    }

  };
  const openFile = () => {
    // const fileURL = `https://fisdemoprojects.com/skilledman/api/uploads/${currentitem.file}`;
    const fileURL = `${BASE_URL}uploads/${currentitem.file}`;


    // Use Linking to open the file URL
    Linking.openURL(fileURL)
      .catch((err) => {
        console.error(`Error opening file: ${err}`);
        // You can show an error message to the user if the file can't be opened
      });
  };

  // useEffect(() => {
  // //   console.log("current item", currentitem);
  // // }, [currentitem]);
  //console.log(searchTerm, 'reuwsygsv')
  return (
    <>
      <ScrollView style={styles.scrollViewStyle}>
        <HomeStackWithSearch
          onPress={() => {
            navigation.openDrawer();
          }}
          onPressnotification={() => {
            navigation.navigate('edit_profile');
          }}
          onChangeText={(val) => { setsearchTerm(val) }}
          value={searchTerm}
        />
        <View style={styles.cardContainer}>

          <FlatList
            data={booklist}
            renderItem={({ item, index }) => (
              <FlatListCard
                index={index}
                cardTitle={item.name}
                bookingId={`Booking ID - ${item.booking_id}`}
                date={item.service_date}
                time={item.service_time}
                status={item.status}
                onPressShowProfile={() => toggleModal(item)}
                iconName="ellipsis-v"
                filepress={item.file}
              />
            )}
          />

        </View>
        {/* Modal and its content go here */}

      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={toggleModal}>
                <Icons.FontAwesome5
                  name="times"
                  color={color.white}
                  size={20}
                  style={styles.closeStyle}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.successmodalBody}>
              {currentitem?.profile ?
                <Image
                  style={styles.logoImg}
                  resizeMode="contain"
                  // source={{ uri: `https://fisdemoprojects.com/skilledman/api/uploads/${currentitem.profile}` }}
                  source={{ uri: `${BASE_URL}uploads/${currentitem.profile}` }}

                />
                :
                <Image
                  style={styles.logoImg}
                  resizeMode="contain"
                  source={require('../../Assets/Images/profile.jpg')}
                />
              }

              <Text style={styles.pendAppr}>{currentitem && currentitem.name}</Text>
              <Text style={styles.bookingStyle}>Booking ID- {currentitem && currentitem.booking_id}</Text>
              <View style={styles.dateTimeCont}>
                <Text style={styles.dateStyle}>{currentitem && currentitem.service_date}</Text>
                <Text style={styles.bookingStyle}>({currentitem && currentitem.service_time})</Text>
              </View>
              <View style={styles.dateTimeCont}>
                <TouchableOpacity onPress={openFile} style={{ flexDirection: 'row' }}>
                  <Icons.FontAwesome
                    name="file-text"
                    size={22}
                    color={color.darkGray}
                  />
                  <Text style={styles.bookingStyle}> Service Detail</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.getDir}> Get Direction</Text>
            </View>

            <View style={styles.btnContainer}>
              <BtnComp
                BtnStyle={styles.acceptStyle}
                btnTextStyle={styles.btnTextStyle}
                btnText="Accept"
                onPressFunc={() => {
                  changestatus('progress')
                  setModalVisible(false)
                }}
              />
              <BtnComp
                BtnStyle={styles.rejectStyle}
                btnTextStyle={styles.btnTextStyle}
                btnText="Reject"
                onPressFunc={() => {
                  changestatus('reject')
                  setModalVisible(false)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RequestScreen;



const styles = StyleSheet.create({
  linearGradientStyle: {
    elevation: 0,
    borderRadius: 6,
    height: '100%',
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  vegetableTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: color.black,
  },
  inputCont: {
    marginVertical: 10,
    width: '100%',
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
  cardContainer: {
    marginHorizontal: 15,
    marginTop: 40,
    marginBottom: 27,

  },

  modalContainer: {
    // flex:1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  modalBody: {
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalView: {
    borderRadius: 12,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: color.white,
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
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
    color: color.black,
    paddingVertical: 5,
  },

  scrollViewStyle: {
    marginBottom: 40,
    paddingBottom: 40,
  },
  modalHeader: {
    backgroundColor: color.default,
    alignItems: 'flex-end',
    paddingVertical: 17,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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

  btnTextStyle: {
    fontSize: 13,
  },
  acceptStyle: {
    width: '47%',
  },
  rejectStyle: {
    backgroundColor: color.red,
    borderColor: color.red,
    borderWidth: 2,
    width: '47%',
  },
  getDir: {
    color: color.default,
    fontWeight: '700',
    paddingTop: 5,
  },
});