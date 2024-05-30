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
import {BASE_URL} from '../Signin/Signin';
import {useSelector} from 'react-redux';
const OngoingTab = props => {
  const focus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const {token} = useSelector(state => state.TokenReducer);

  useEffect(() => {
    GetData();
  }, [focus]);
  const GetData = async () => {
    try {
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
            console.log('🚀 ~ GetData ~ result.bookings:', result.bookings);
            const confirmedBookings = result.bookings.filter(
              booking => booking.status === 'pending',
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
      //console.log(result)
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <ScrollView style={[styles.container, {maxHeight: '51%'}]}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <FlatListCard
            cardTitle={item.name}
            bookingId={`Booking ID - ${item.id}`}
            date={item.booking_date && item?.booking_date.split(' ')[0]}
            paidTitle="Paid"
            status={item?.status}
          />
        )}
      />
      {/* <FlatListCard
        cardTitle="Hazle"
        bookingId="Booking ID - 88745RE"
        date="Oct 11, 2023"
        time="1:00 PM"
        paidTitle="Paid"
        status="28%"
      />
      <FlatListCard
        cardTitle="Hazle"
        bookingId="Booking ID - 88745RE"
        date="Oct 11, 2023"
        time="1:00 PM"
        status="28%"
        paidTitle="Paid"
      />
      <FlatListCard
        cardTitle="Hazle"
        bookingId="Booking ID - 88745RE"
        date="Oct 11, 2023"
        time="1:00 PM"
        paidTitle="Paid"
        status="28%"
      /> */}
    </ScrollView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
