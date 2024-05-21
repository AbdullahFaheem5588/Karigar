import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import color from '../../Assets/colors/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation,useRoute } from '@react-navigation/native';
import CustomHeader from '../../Components/CustomHeader';
import { RadioButton } from 'react-native-paper';
import BtnComp from '../../Components/BtnComp';
import { Icons } from '../../Components/Icons';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const SelectPaymentMethod = props => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState('Cash on Delivery');
  // const handleNavigate = () => {
  //   // Navigate to the OtherScreen and pass the map input value as a parameter
  //  // navigation.navigate('SelectPaymentMethod',{price});
  //  navigation.navigate('CardDetail', {price});
  // };
  // const route = useRoute();
  // const price = route.params?.price;
  console.log("value u selected", value)
  return (
    <>
      <CustomHeader
        title="Select Payment Method"
        onPressBack={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.paymentTitle}>Select Payment Method </Text>
          <RadioButton.Group
            onValueChange={value => setValue(value)}
            value={value}>
            <View style={styles.radioStyle}>
              <RadioButton value="Pay Online" />
              <Icons.FontAwesome5
                name="credit-card"
                color={color.gray}
                size={28}
                style={styles.closeStyle}
              />
              <Text style={styles.methodName}>Pay Online</Text>
            </View>
            <View style={styles.radioStyle}>
              <RadioButton value="Cash on Delivery" />
              <Icons.FontAwesome5
                name="money-bill-alt"
                color={color.darkGray}
                size={28}
                style={styles.closeStyle}
              />
              <Text style={styles.methodName}>Cash on Delivery</Text>
            </View>
          </RadioButton.Group>


          {value == "Cash on Delivery" ? <BtnComp
            onPressFunc={() => navigation.navigate('PaymentCongratulations')}
            BtnStyle={styles.BtnStyle}
            btnText="Next"
          /> : <BtnComp
            onPressFunc={() => 
             // handleNavigate();
              navigation.navigate('CardDetail')}
            BtnStyle={styles.BtnStyle}
            btnText="Next"
          />}
        </View>
      </ScrollView>
    </>
  );
};

export default SelectPaymentMethod;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 3,
  },
  methodName: {
    fontSize: 17,
    fontWeight: '500',
    color: color.default
  },
  paymentTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: color.default,
    marginBottom: 15,
  },
  BtnStyle: {
    marginTop: 35,
  },
  closeStyle: {
    marginHorizontal: 8,
  },
});
