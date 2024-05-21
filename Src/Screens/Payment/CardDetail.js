import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import color from '../../Assets/colors/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomHeader from '../../Components/CustomHeader';
import {RadioButton} from 'react-native-paper';
import BtnComp from '../../Components/BtnComp';
import {Icons} from '../../Components/Icons';
import C_TextInput from '../../Components/C_TextInput';
import Toast from 'react-native-simple-toast';
import {WebView} from 'react-native-webview';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import Paystack from 'react-native-paystack-webview';
import {SlideInRight} from 'react-native-reanimated';
import { BASE_URL } from '../Signin/Signin';
const CardDetail = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const price = route.params?.price;

  const [value, setValue] = React.useState('first');
  const [paymenturl, setpaymentUrl] = React.useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  console.log('paystack', Paystack.render.Paystack);

  const [billingDetail, setBillingDetail] = useState({
    billingName: global.name,
    billingEmail: global.email,
    billingMobile: global.phone_number,
    billingAmount: global.pr,

    //  amount: '',
  });

  const sendrefnumber = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'PHPSESSID=i90vj6ggd2jn4cvnemsc6sj781');

    var formdata = new FormData();
    formdata.append('Reference', global.refnum);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    // fetch(
    //   'https://fisdemoprojects.com/skilledman/api/transaction_paystack.php',
    //   requestOptions,
    // )
    fetch(
      `${BASE_URL}transaction_paystack.php`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const handlePayment = async () => {
    if (
      billingDetail.billingName == '' ||
      billingDetail.billingEmail == '' ||
      billingDetail.billingMobile == '' ||
      billingDetail.billingAmount == ''
      // billingDetail.amount == ''
    ) {
      Toast.show('please fill the field');
      return;
    }
    try {
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=5ipls9jagm8spfor7fkpbj08ci');
      var formdata = new FormData();
      formdata.append('amount', billingDetail.billingAmount);
      formdata.append('email', billingDetail.billingEmail);
      formdata.append('name', billingDetail.billingName);

      formdata.append('booking_id', global.bookid);
      formdata.append('transaction_type', 'deposit');

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      const apiurl = 'https://fisdemoprojects.com/skilledman/api/paystack.php';
      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      if (result) {
        console.log('result', result);

        setpaymentUrl(result && result.data.authorization_url);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const handlePaymenttt = async () => {
    if (
      billingDetail.billingName == '' ||
      billingDetail.billingEmail == '' ||
      billingDetail.billingMobile == '' ||
      billingDetail.billingAmount == ''
    ) {
      Toast.show('Please fill in all fields');
      return;
    }

    try {
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=5ipls9jagm8spfor7fkpbj08ci');

      var formdata = new FormData();
      formdata.append('amount', billingDetail.billingAmount);
      formdata.append('email', billingDetail.billingEmail);
      // formdata.append('name', billingDetail.billingName);
      formdata.append('transaction_type', 'deposit');
      formdata.append('booking_id', global.bookid);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // const apiurl = 'https://fisdemoprojects.com/skilledman/api/paystack.php';
      const apiurl = `${BASE_URL}paystack.php`;

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      console.log('paystack respose', result);

      // Move this statement below the definition of referenceNumber
      if (result && result?.data && result?.data?.reference) {
        const referenceNumber = result?.data?.reference;
        global.refnum = referenceNumber;
        console.log('refe numberee', global.refnum);
        setpaymentUrl(result && result?.data?.authorization_url);

        // const transactionApiUrl =
        //   'https://fisdemoprojects.com/skilledman/api/transaction_paystack.php';

        //   console.log('Reference Number:', global.refnum);
        // var transactionFormdata = new FormData();

        // transactionFormdata.append('Reference', referenceNumber);

        // console.log('Referencededede Number:', referenceNumber);
        // var transactionRequestOptions = {
        //   method: 'POST',
        //   headers: myHeaders,
        //   body: transactionFormdata,
        //   redirect: 'follow',
        // };

        // const transactionResponse = await fetch(
        //   transactionApiUrl,
        //   transactionRequestOptions,
        // );
        //  const transactionResult = await transactionResponse.json();

        //console.log('Transaction Result:', transactionResult);
      } else {
        console.log('Invalid result format or missing reference number.');
      }
    } catch (error) {
      console.error('Error processing payment:', JSON.stringify(error));
    }

    //   if (result && result.data && result.data.reference) {
    //     const referenceNumber = result.reference;
    //     console.log('refe numberee', referenceNumber);
    //     setpaymentUrl(result && result.data.authorization_url);

    //     const transactionApiUrl =
    //       'https://fisdemoprojects.com/skilledman/api/transaction_paystack.php';
    //     var transactionFormdata = new FormData();
    //     transactionFormdata.append('reference', referenceNumber);

    //     var transactionRequestOptions = {
    //       method: 'POST',
    //       headers: myHeaders,
    //       body: transactionFormdata,
    //       redirect: 'follow',
    //     };

    //     const transactionResponse = await fetch(
    //       transactionApiUrl,
    //       transactionRequestOptions,
    //     );
    //     const transactionResult = await transactionResponse.json();

    //     console.log('Transaction Result:', transactionResult);
    //   } else {
    //     console.log('Invalid result format or missing reference number.');
    //   }
    // } catch (error) {
    //   console.error('Error processing payment:', error);
    // }
  };

  useEffect(() => {
    sendrefnumber();
  }, []);

  const handleOnchange = (text, input) => {
    setBillingDetail(prevState => ({...prevState, [input]: text}));
  };
  console.log('billing details', billingDetail);
  console.log('url', paymenturl);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setModalVisible(false); // Close the modal after 10 seconds
  //     navigation.navigate('PaymentCongratulations');
  //   }, 10000); // 10 seconds delay

  //   // Clean up the timer when the component is unmounted or modal is closed
  //   return () => clearTimeout(timer);
  // }, []); // Run only once on component mount

  const onNavigationStateChange = state => {
    console.log('state', state);
   // setLoading(state.loading); 
   //setModalVisible(false);
   
    navigation.navigate('CardDetail'); // Replace 'Home' with the name of your home screen

    //  Check if the current URL contains the callback URL
    // if (state.url.includes(callback_url)) {
    //    Payment success, navigate to the home screen
    //   navigation.navigate('CardDetail'); // Replace 'Home' with the name of your home screen
    // }
  };
  const handleCloseView = () => {
    setModalVisible(false); // Close the view
    navigation.navigate('PaymentCongratulations'); // Navigate to the CardDetail screen
  };
  console.log('Payment Url', paymenturl);
  if (paymenturl) {
    return (
      //   <Modal
      //   animationType="slide"
      //   transparent={false}
      //   visible={modalVisible}
      //   onRequestClose={() => {
      //     setModalVisible(false); // Close the modal if the user tries to close it
      //   }}
      // >
      //   <View style={styles.modalContainer}>
      //     <WebView
      //       source={{ uri: paymenturl }}
      //      // style={styles.webView}
      //       onNavigationStateChange={onNavigationStateChange}
      //     />
      //     <Button title="Close Modal" onPress={() => setModalVisible(false)} />
      //   </View>
      // </Modal>
      // );
      <View style={styles.container}>
       {modalVisible && (
        <View style={styles.viewContainer}>
          <WebView
            source={{ uri: paymenturl }}
            style={styles.webView}
            onNavigationStateChange={onNavigationStateChange}
          />
          {/* {loading && <ActivityIndicator size="large" color="#0000ff" />}  */}
          {/* <Button title="Close View" onPress={() => setModalVisible(false)}/> */}
          <Button title="Done" onPress={handleCloseView} />
        </View>
      )}
        
      </View>
      //  <WebView
      //     source={{uri: paymenturl}}

      //     style={{marginTop: 40,height:'100%',width:'100%'}}
      //     onNavigationStateChange={onNavigationStateChange}
      //   />
    );
  }

  return (
    <>
      <CustomHeader
        title="Card Detail"
        onPressBack={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.scrollView}>
        <View>
          <View>
            {/* <Text>Map Input Value: {price}</Text> */}
            {/* ... rest of your OtherScreen JSX ... */}
          </View>
          <C_TextInput
            placeholder="Billing Name"
            placeholderTextColor={color.default}
            value={billingDetail?.billingName}
            onChangeText={text => handleOnchange(text, 'billingName')}
            editable={false}
          />
          <C_TextInput
            placeholder="Billing Email"
            placeholderTextColor={color.default}
            value={billingDetail?.billingEmail}
            onChangeText={text => handleOnchange(text, 'billingEmail')}
            editable={false}
          />
          <C_TextInput
            placeholder="MobileNumber"
            placeholderTextColor={color.default}
            onChangeText={text => handleOnchange(text, 'billingMobile')}
            value={billingDetail?.billingMobile}
            editable={false}
          />
          <C_TextInput
            placeholder="Amount"
            placeholderTextColor={color.default}
            value={billingDetail?.billingAmount}
           // icon="dollar-sign"
            onChangeText={text => handleOnchange(text, 'billingAmount')}
            editable={false}
          />

          <View style={styles.lockCont}>
            <Icons.FontAwesome5
              name="lock"
              color={color.darkGray}
              size={28}
              style={styles.closeStyle}
            />
            <Text style={styles.methodName}>
              Your payment methods are saved and stored securely
            </Text>
          </View>
          <BtnComp
            onPressFunc={() => handlePaymenttt()}
            BtnStyle={styles.BtnStyle}
            btnText="Next"
          />
        </View>
      </ScrollView>
    </>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  viewContainer: {
    flex: 1,

 
  },
  webView: {
    flex: 1,

  },
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
    color: color.default,
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
  lockCont: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'center',
  },
});

// import React from 'react';
// import {WebView} from 'react-native-webview';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Button,
// } from 'react-native';

// export default function CardDetail() {
//   console.log('WebView----', WebView);

//   const authorization_url = 'https://checkout.paystack.com/rfkl1i2jzl57l0s';

//   return <WebView source={{uri: authorization_url}} style={{marginTop: 40}} />;
// }
