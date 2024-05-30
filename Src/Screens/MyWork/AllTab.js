import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import FlatListCard from '../../Components/FlatListCard';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';
import color from '../../Assets/colors/colors';
import {Modal} from 'react-native-paper';
import {Icons} from '../../Components/Icons';
import OngoingDropdown from '../../Components/OngoingDropdown';
import BtnComp from '../../Components/BtnComp';
import {BASE_URL} from '../Signin/Signin';
import {useSelector} from 'react-redux';
const AllTab = props => {
  //console.log(props.value, 'on all')
  const focus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedBusiness, setselectedBusiness] = useState('0');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const {token} = useSelector(state => state.TokenReducer);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    GetData();
  }, [focus]);

  const GetData = async () => {
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
          setData(result.bookings);
        } else {
          Alert.alert(JSON.stringify(result));
        }
      })
      .catch(error => console.error(error));
  };
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

    fetch(`${BASE_URL}update_booking/${selectedBookingId}`, requestOptions)
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
      <ScrollView style={[styles.container, {maxHeight: '51%'}]}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <FlatListCard
              cardTitle={item.name}
              bookingId={`Booking ID - ${item.id}`}
              date={item.booking_date && item.booking_date.split(' ')[0]}
              time={item.service_time}
              status={item.status}
              iconName="ellipsis-v"
              onPressShowProfile={() => {
                setSelectedBookingId(item.id); // Store the selected booking_id
                toggleModal();
              }}
              filepress={item.file}
            />
          )}
        />
        {/* <FlatListCard
        cardTitle={data[0].name}
        bookingId="Booking ID - 88745RE"
        date="Oct 11, 2023"
        time="1:00 PM"
        status="28%"
        iconName="ellipsis-v"
        onPressShowProfile={toggleModal}
      />
      <FlatListCard
        cardTitle="Hazle"
        bookingId="Booking ID - 88745RE"
        date="Oct 11, 2023"
        time="1:00 PM"
        status="28%"
        iconName="ellipsis-v"
        onPressShowProfile={toggleModal}
      />
      <FlatListCard
        cardTitle="Hazle"
        bookingId="Booking ID - 88745RE"
        date="Oct 11, 2023"
        time="1:00 PM"
        status="28%"
        iconName="ellipsis-v"
        onPressShowProfile={toggleModal}
      /> */}
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
              <OngoingDropdown
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
                  if (selectedBookingId) {
                    changestatus(selectedBusiness); // Pass the selected booking_id
                    toggleModal();
                  } else {
                    Alert.alert('Please select a booking before submitting.');
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AllTab;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginLeft: 0,
    marginRight: 0,
    height: '100%',
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
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
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
  modalHeader: {
    backgroundColor: color.default,
    alignItems: 'flex-end',
    paddingVertical: 17,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
