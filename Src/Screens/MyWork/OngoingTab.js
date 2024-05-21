import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import FlatListCard from '../../Components/FlatListCard';
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../Signin/Signin';
const OngoingTab = (props) => {
  const focus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState()

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    GetData();
  }, [focus, props?.value])
  const GetData = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "PHPSESSID=pqe6giac1t2jjjqkr6sh3r747i");

      var formdata = new FormData();
      formdata.append("provider_id", global.id);
      formdata.append("status", "progress");
      if (props?.value) {
        formdata.append("searchTerm", props?.value);
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      // const apiurl = "https://fisdemoprojects.com/skilledman/api/provider_status.php"
      const apiurl = `${BASE_URL}provider_status.php`

      const response = await fetch(apiurl, requestOptions)
      const result = await response.json();
      if (result && result.booking_request) {
        setData(result.booking_request)
      }
      else if (result && result.error) {
        Toast.show(result.error);
      }
      //console.log(result)
    }
    catch (error) {
      Alert.alert(error)
    }

  }

  return (
    <ScrollView style={[styles.container, { maxHeight: "51%" }]}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <FlatListCard
            cardTitle={item.name}
            bookingId={`Booking ID - ${item.booking_id}`}
            date={item.service_date}
            time={item.service_time}
            paidTitle="Paid"
            status="28%"
            filepress={item.file}
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