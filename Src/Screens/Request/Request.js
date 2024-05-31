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
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import color from '../../Assets/colors/colors';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import HomeStackWithSearch from '../../Components/HomeStackWithSearch';
import {Modal} from 'react-native-paper';
import Icon, {Icons} from '../../Components/Icons';
import FlatListCard from '../../Components/FlatListCard';
import BtnComp from '../../Components/BtnComp';
import Toast from 'react-native-simple-toast';
import {BASE_URL} from '../Signin/Signin';
import {useSelector} from 'react-redux';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const RequestScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const focused = useIsFocused();
  const [booklist, setbooklist] = useState([]);
  const [currentitem, setCurrentItem] = useState();
  const [searchTerm, setsearchTerm] = useState('');

  const toggleModal = item => {
    setModalVisible(!modalVisible);
    setCurrentItem(item);
  };

  const {token} = useSelector(state => state.TokenReducer);

  useEffect(() => {
    const getBookingRequest = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}provider_bookings`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result && result.bookings) {
            setbooklist(result.bookings);
          } else {
            Alert.alert(JSON.stringify(result));
          }
        })
        .catch(error => console.error(error));
    };
    getBookingRequest();
  }, [focused, searchTerm]);

  const changestatus = async status => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const raw = JSON.stringify({
      status: status,
      notes: `Booking ${status} by Expert`,
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}update_booking/${currentitem.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (
          result &&
          result?.message === 'Booking status updated successfully'
        ) {
          if (status === 'cancelled') {
            Toast.show('You cancelled the booking', Toast.LONG);
          } else {
            Toast.show('You confirmed the booking', Toast.LONG);
          }
        } else {
          Alert.alert(JSON.stringify(result));
        }
      })
      .catch(error => console.error(error));
  };

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
          onChangeText={val => {
            setsearchTerm(val);
          }}
          value={searchTerm}
        />
        <View style={styles.cardContainer}>
          <FlatList
            data={booklist}
            renderItem={({item, index}) => (
              <FlatListCard
                index={index}
                cardTitle={item.name}
                bookingId={`Booking ID - ${item.id}`}
                date={item.created_at.split('T')[0]}
                time={item.service_time}
                status={item.status}
                onPressShowProfile={() => toggleModal(item)}
                iconName="ellipsis-v"
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
              <Image
                style={styles.logoImg}
                resizeMode="contain"
                source={require('../../Assets/Images/profile.jpg')}
              />

              <Text style={styles.pendAppr}>
                {currentitem && currentitem.name}
              </Text>
              <Text style={styles.bookingStyle}>
                Booking ID- {currentitem && currentitem.id}
              </Text>
              <View style={styles.dateTimeCont}>
                <Text style={styles.dateStyle}>
                  {currentitem &&
                    currentitem.created_at &&
                    currentitem.created_at.split('T')[0]}
                </Text>
                <Text style={styles.bookingStyle}>
                  (
                  {currentitem &&
                    currentitem.created_at &&
                    currentitem.created_at.split('T')[1].split('.')[0]}
                  )
                </Text>
              </View>
            </View>

            <View style={styles.btnContainer}>
              <BtnComp
                BtnStyle={styles.acceptStyle}
                btnTextStyle={styles.btnTextStyle}
                btnText="Accept"
                onPressFunc={() => {
                  changestatus('confirmed');
                  setModalVisible(false);
                }}
              />
              <BtnComp
                BtnStyle={styles.rejectStyle}
                btnTextStyle={styles.btnTextStyle}
                btnText="Reject"
                onPressFunc={() => {
                  changestatus('cancelled');
                  setModalVisible(false);
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
