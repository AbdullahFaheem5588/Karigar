import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import FlatListCard from '../../Components/FlatListCard';
import color from '../../Assets/colors/colors';
import {Modal} from 'react-native-paper';
import {Icons} from '../../Components/Icons';
import OngoingDropdown from '../../Components/OngoingDropdown';
import BtnComp from '../../Components/BtnComp';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';

import {BASE_URL} from '../Signin/Signin';
import {useSelector} from 'react-redux';
const CompleteTab = props => {
  const {token} = useSelector(state => state.TokenReducer);

  //console.log(props.value, 'on complete tab')
  const focus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
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
        if (result && Array.isArray(result.bookings)) {
          const confirmedBookings = result.bookings.filter(
            booking => booking.status === 'completed',
          );
          if (confirmedBookings.length > 0) {
            setData(confirmedBookings);
          } else {
            Toast.show('No bookings found.', Toast.LONG);
          }
        } else {
          Alert.alert(JSON.stringify(result));
        }
      })
      .catch(error => console.error(error));
  };
  return (
    <ScrollView style={[styles.container, {maxHeight: '51%'}]}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <FlatListCard
            cardTitle={item.name}
            bookingId={`Booking ID - ${item.id}`}
            date={item.service_date}
            time={item.service_time}
            paidTitle="Paid"
            status={item.status}
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
              <OngoingDropdown />
            </View>

            <View style={styles.btnContainer}>
              <BtnComp
                BtnStyle={styles.acceptStyle}
                btnTextStyle={styles.btnTextStyle}
                btnText="Submit"
                onPressFunc={toggleModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CompleteTab;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
