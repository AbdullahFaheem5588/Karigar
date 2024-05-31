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
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import color from '../../Assets/colors/colors';
import {
  createNavigationContainerRef,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import BookingCard from '../../Components/BookingCard';
import DrawerTitleProfileHeader from '../../Components/DrawerTitleProfileHeader';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import StarRating from 'react-native-star-rating';
import {Icons} from '../../Components/Icons';
import C_TextInput from '../../Components/C_TextInput';
import BtnComp from '../../Components/BtnComp';
import Share from 'react-native-share';
import {BASE_URL} from '../Signin/Signin';
import {useSelector} from 'react-redux';
const BookingScreen = () => {
  const focus = useIsFocused();
  const navigation = useNavigation();
  const {data} = useSelector(state => state.ProfileReducer);
  const {token} = useSelector(state => state.TokenReducer);
  console.log('🚀 ~ BookingScreen ~ token:', token);

  const [Book_Data, setBook_Data] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitReviewVisible, setsubmitReviewVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [Feedback, setFeedback] = useState('');
  const [Details, setDetails] = useState({});
  const [bookid, setBookid] = useState('');
  const [provideid, setSkilledId] = useState('');
  useEffect(() => {
    BookingData();
  }, [focus]);
  const BookingData = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}bookings-details`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.bookings) {
            console.log('🚀 ~ BookingData ~ result.bookings:', result.bookings);
            setBook_Data(result.bookings);
          } else {
            Alert.alert(JSON.stringify(result));
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      Alert.alert(error);
    }
  };

  const SendRating = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append('comment_text', Feedback);
    formdata.append('skilled_id', provideid);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}comments`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('🚀 ~ .then ~ result:', result);
      })
      .catch(error => console.error(error));
  };
  const handleRating = rating => {
    setRating(rating);
    const value = rating * 1; // Convert rating to desired value range
    Alert.alert('Rating', `You rated ${rating} stars. Value: ${value}%`);
  };
  const toggleReview = (bookingid, providerId) => {
    console.log('booking ID', bookingid, 'providerId', providerId);
    setBookid(bookingid);
    setSkilledId(providerId);
    setReviewVisible(!reviewVisible);
    setModalVisible(false);
  };
  const toggleSumbitReview = () => {
    setsubmitReviewVisible(!submitReviewVisible);
    setReviewVisible(false);
  };

  const getDetails = obj => {
    setDetails(JSON.stringify(obj));
  };

  const shareImage = async () => {
    try {
      const options = {
        title: 'Share Image',
        message: Details,
      };

      await Share.open(options);

      console.log('Image shared successfully');
    } catch (error) {
      //ToastAndroid.show('User did not share', ToastAndroid.LONG);
      console.log('An error occurred:', error);
    }
  };

  return (
    // <ScrollView style={styles.scrollViewStyle}>
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={submitReviewVisible}
        onRequestClose={() => setsubmitReviewVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Your Opinion matters to us!</Text>
            <TouchableOpacity
              style={styles.cancelCont}
              onPress={toggleSumbitReview}>
              <Icons.FontAwesome5
                name="times"
                color={color.white}
                size={20}
                style={styles.closeStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            {/* <View style={styles.iconCont}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={rating}
                halfStarEnabled // Enable half-star selection
                selectedStar={handleRating}
                containerStyle={{marginVertical: 10}}
                starSize={40}
                starStyle={{marginRight: 5}}
                //iconSet="MaterialIcons"
                emptyStarColor="lightgray"
                fullStarColor="gold"
                halfStarColor="orange"
              />
            </View> */}
            <C_TextInput
              styles={{fontWeight: '400'}}
              numberOfLines={5}
              placeholder="Give your feedback"
              placeholderTextColor={color.lightGray}
              onChangeText={val => {
                setFeedback(val);
              }}
            />
            <BtnComp
              onPressFunc={() => {
                SendRating();
                setsubmitReviewVisible(!submitReviewVisible);
                setReviewVisible(false);
              }}
              BtnStyle={{marginTop: 25}}
              btnText="Submit"
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={reviewVisible}
        onRequestClose={() => setReviewVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Book Service</Text>
            <TouchableOpacity style={styles.cancelCont} onPress={toggleReview}>
              <Icons.FontAwesome5
                name="times"
                color={color.white}
                size={20}
                style={styles.closeStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TouchableOpacity
              style={[styles.attachCont, {...styles.revListing}]}>
              <Icons.FontAwesome5
                name="exclamation-circle"
                size={20}
                style={styles.attachIcon}
                color={color.default}
              />
              <Text style={styles.labelStyle}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleSumbitReview}
              style={styles.attachCont}>
              <Icons.FontAwesome5
                name="edit"
                size={20}
                style={styles.attachIcon}
                color={color.default}
              />
              <Text style={styles.labelStyle}>Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                shareImage();
              }}
              style={styles.attachCont}>
              <Icons.Feather
                name="share-2"
                size={20}
                style={styles.attachIcon}
                color={color.default}
              />
              <Text style={styles.labelStyle}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DrawerTitleProfileHeader
        screenTitle="Booked Services"
        onPress={() => {
          navigation.openDrawer();
        }}
        userProfile={() => {
          navigation.navigate('editUserProfile');
        }}
        imgUrl={require('../../Assets/Images/user.jpg')}
      />
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.cardContainer}>
          <FlatList
            data={Book_Data}
            renderItem={({item}) => (
              <BookingCard
                cardTitle={item.provider_name}
                bookingId={`Booking ID - ${item.id}`}
                expertise={`Expert ${(item.service && item.service) || 'N/A'}`}
                status={item.status}
                paidTitle={item.booking_date && item.booking_date.split(' ')[0]}
                dateCont={styles.dateCont}
                toggleReviewModal={() => {
                  toggleReview(item.id, item.skilled_id);
                  getDetails(item);
                }}
                // toggleReviewModal={() => console.log("helo baby ", "provideer id", item.booking_id, item.provider_id)}
              />
            )}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default BookingScreen;

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
  modalContainer: {
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
  cardContainer: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 27,
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
  dateCont: {
    fontWeight: '400',
    color: color.gray,
  },
  // add css for modal
  inputContainer: {
    marginBottom: 10,
  },
  scrollView: {
    paddingHorizontal: 15,
    marginTop: 20,
  },

  inputCont: {
    marginVertical: 10,
    width: '100%',
  },
  deliverCont: {
    paddingBottom: 15,
  },

  profileCont: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContainer: {
    paddingHorizontal: 11,
    paddingVertical: 11,
    backgroundColor: color.white,
    borderRadius: 10,
    elevation: 1,
    marginBottom: 10,
    marginRight: 10,
    width: 280,
  },
  TextStyle: {
    fontSize: 20,
    color: color.black,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 5,
  },
  msgTitle: {
    fontSize: 16,
    color: color.gray,
    fontWeight: '400',
    textAlign: 'left',
    paddingVertical: 6,
  },
  statusStyle: {
    fontSize: 14,
    color: color.red,
    fontWeight: '400',
  },
  logoImg: {
    width: width / 6,
    height: height / 15,
    borderRadius: 10,
    marginRight: 7,
  },
  titleCont: {
    paddingBottom: 18,
  },
  nameCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  expertImg: {
    width: '100%',
    height: height / 3,
  },
  imgCont: {
    position: 'absolute',
    width: '100%',
    height: height / 3.43,
    elevation: 1,
    backgroundColor: color.default,
    zIndex: 900,
    opacity: 0.3,
    top: 19,
  },
  expertTitle: {
    position: 'absolute',
    bottom: '11%',
    left: '5%',
    fontWeight: 'bold',
    fontSize: 20,
    color: color.white,
    zIndex: 9000,
  },
  contentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  displayFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 23,
    color: color.default,
    marginRight: 5,
  },
  disStyle: {
    fontSize: 16,
    color: color.default,
  },
  expStyle: {
    fontSize: 16,
    color: color.gray,
    paddingLeft: 6,
  },
  ratingCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    backgroundColor: '#e8e8e8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 1,
  },
  ratContent: {
    justifyContent: 'flex-start',
  },
  ratTitle: {
    fontSize: 18,
    color: color.gray,
    paddingBottom: 7,
  },
  totRat: {
    fontSize: 18,
    color: color.black,
    paddingLeft: 5,
    fontWeight: '600',
    textAlign: 'center',
  },
  serInc: {
    fontSize: 18,
    color: color.default,
    fontWeight: '600',
  },
  licenseStyle: {
    fontSize: 18,
    color: color.default,
    fontWeight: '600',
    paddingRight: 6,
  },
  serviceCont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 4,
  },
  listStyle: {
    fontSize: 17,
    color: color.gray,
    fontWeight: '400',
    paddingRight: 2,
  },
  listCont: {
    marginBottom: 10,
  },
  btnContainer: {
    //position: 'absolute',
    //bottom: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    //zIndex: 1,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  BtnStyle: {
    width: '46%',
    marginTop: 0,
  },

  modalContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 100,
  },
  modalView: {
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: color.white,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    width: '100%',
  },
  modalBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    zIndex: 100,
  },
  cancelCont: {
    position: 'absolute',
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 19,
    color: color.white,
    fontWeight: '600',
  },
  labelStyle: {
    fontSize: 19,
    color: color.black,
    fontWeight: '600',
  },
  attachCont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  attachIcon: {
    marginRight: 5,
  },
  revListing: {
    paddingHorizontal: 6,
  },
  iconCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});
