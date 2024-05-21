import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomHeader from '../../Components/CustomHeader';
import DeliverTo from '../../Components/DeliverTo';
import color from '../../Assets/colors/colors';
import {Icons} from '../../Components/Icons';
import BtnComp from '../../Components/BtnComp';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
// import {Modal} from 'react-native-paper';
import InputBookService from '../../Components/InputBookService';
import {SafeAreaView} from 'react-native-safe-area-context';
import C_TextInput from '../../Components/C_TextInput';
import StarRating from 'react-native-star-rating';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../Signin/Signin';

const ExpertDetail = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.item;
  console.log(item, 'dataaa on expertdetail');
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, settime] = useState(new Date());
  const [opentime, setOpentime] = useState(false);

  const [fullName, setFullName] = useState(global.name);
  const [phoneNumber, setPhoneNumber] = useState(global.phone_number);
  const [address, setAddress] = useState(global.address);
  const [price, setPrice] = useState('');
  const handleNavigate = () => {
    // Navigate to the OtherScreen and pass the map input value as a parameter
    navigation.navigate('SelectPaymentMethod', {price});
    // navigation.navigate('CardDetail', {price});
  };

  // price=global.price;

  const [selectedfile, setSelectedFile] = React.useState();
  const [submitReviewVisible, setsubmitReviewVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [Feedback, setFeedback] = useState('');
  const [load, setLoad] = useState(false);

  // console.log('specfic user dataitem to get provider id', item.id);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setReviewVisible(false);
  };
  const toggleReview = () => {
    setReviewVisible(!reviewVisible);
    setModalVisible(false);
  };
  const toggleSumbitReview = () => {
    setsubmitReviewVisible(!submitReviewVisible);
    setReviewVisible(false);
  };
  const formatTime = date => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const handleRating = rating => {
    setRating(rating);
    const value = rating * 1; // Convert rating to desired value range
    Alert.alert('Rating', `You rated ${rating} stars. Value: ${value}%`);
  };

  const SendRating = async () => {
    Alert.alert('uncomment api code');
    // console.log('enter')
    // console.log(global.id)
    // console.log(rating)
    // console.log(item?.id)
    // console.log(Feedback)
    // try {
    //   var myHeaders = new Headers();
    //   myHeaders.append("Cookie", "PHPSESSID=3ji07or75o4005elk3c5eeek6o");

    //   var formdata = new FormData();
    //   formdata.append("user_id", global.id);
    //   formdata.append("rating", rating);
    //   formdata.append("feedback", Feedback);
    //   formdata.append("provider_id", item?.id);

    //   var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: formdata,
    //     redirect: 'follow'
    //   };
    //   const apiurl = "https://fisdemoprojects.com/skilledman/api/user/feedback.php"
    //   const response = await fetch(apiurl, requestOptions)
    //   const result = await response.json()
    //   if (result.success) {
    //     Alert.alert(result && result.success);
    //   }
    //   else if (result.error) {
    //     Alert.alert(result.error)
    //   }
    // } catch (error) {
    //   console.log("error in review", error)
    // }
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('image picker result', result[0]);
      if (result) {
        setSelectedFile(result[0]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User canceled the document picker
      } else {
        console.log('error occur on document picking', error);
        throw error; // Throw the correct error
      }
    }
  };

  const Bookservice = async () => {
    const bookingdate = date.toISOString().split('T')[0];
    const bookingtime = formatTime(date);
    try {
      setLoad(true);
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=jmv28htgkulr4v5gmt5n7us8go');
      var formdata = new FormData();

      formdata.append('provider_id', item?.id);
      formdata.append('user_id', global?.id);
      formdata.append('servic_phone_no', phoneNumber);
      formdata.append('service_name', item?.service_name);
      formdata.append('service_date', bookingdate);
      formdata.append('address', address);
      formdata.append('service_time', bookingtime);
      formdata.append('price', price);
      formdata.append('file', selectedfile);
      global.pr = price;
      console.log('pricesssamoun', JSON.stringify(formdata));

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      // const apiurl ='https://fisdemoprojects.com/skilledman/api/user/book_service.php';
      const apiurl =`${BASE_URL}user/book_service.php`;

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();

      console.log('bookingidddd', result);
      global.bookid = result.booking_id;
      console.log('bokikiki', global.bookid);

      if (result && result.status) {
        setLoad(false);
        Toast.show(result.status);
        toggleModal();
        handleNavigate();

        // navigation.navigate('SelectPaymentMethod');
      } else if (result?.error) {
        setLoad(false);
        console.log(result);
        Alert.alert(result.error);
      }
    } catch (error) {
      setLoad(false);
      console.log('Error Book Services==>\n', error);
    }
  };
  const isAnyFieldEmpty =
    !fullName || !phoneNumber || !date || !address || !price;

  // console.log('priceceece',global.price)
  const ServicesList = ({item, index}) => {
    return (
      <View style={styles.serviceCont}>
        <Text style={styles.listStyle}>{index + 1}. </Text>
        <Text style={styles.listStyle}>{item}</Text>
      </View>
    );
  };
  const ReviewsList = ({item, index}) => {
    //console.log("🚀 ~ file: ExpertDetail.js:190 ~ ReviewsList ~ item:", item)
    return (
      <TouchableOpacity
        onPress={props.showProfile}
        style={styles.textContainer}
        key={index}>
        <View style={styles.profileCont}>
          {item ? (
            <Image
              style={styles.logoImg}
              resizeMode="contain"
              source={{
                // uri: `https://fisdemoprojects.com/skilledman/api/uploads//${item.profile}`,
                uri: `${BASE_URL}uploads//${item.profile}`,

              }}
            />
          ) : (
            <Image
              style={styles.logoImg}
              resizeMode="contain"
              source={{
                // uri: `https://fisdemoprojects.com/skilledman/api/uploads//dumy.png`,
                uri: `${BASE_URL}uploads//dumy.png`,

              }}
            />
          )}
          <View>
            <Text style={styles.TextStyle}>{item.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Icons.FontAwesome
                name={'star'}
                color={color.yellow}
                size={15}
                style={{marginRight: '4%'}}
              /> */}
              <Text style={styles.msgTitle}>{item.rating}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.msgTitle}>{item.feedback}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
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
            <View style={styles.iconCont}>
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
            </View>
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
            <TouchableOpacity style={styles.attachCont}>
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
      <Modal
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Book Service</Text>
          <TouchableOpacity style={styles.cancelCont} onPress={toggleModal}>
            <Icons.FontAwesome5
              name="times"
              color={color.white}
              size={20}
              style={styles.closeStyle}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={[styles.modalView, {paddingBottom: 6}]}>
          <View style={styles.modalBody}>
            <View>
              <Text style={styles.labelStyle}>Name</Text>
              <InputBookService
                placeholder="Enter Full Name"
                placeholderTextColor={color.default}
                icon="user"
                inputstyle={styles.inputContainer}
                inputIconStyle={styles.inputIconStyle}
                value={fullName}
                onChangeText={val => {
                  setFullName(val);
                }}
              />
            </View>
            <View>
              <Text style={styles.labelStyle}>Phone Number</Text>
              <InputBookService
                placeholder="Enter phone no"
                placeholderTextColor={color.default}
                icon="phone"
                inputstyle={styles.inputContainer}
                inputIconStyle={styles.inputIconStyle}
                value={phoneNumber}
                onChangeText={val => {
                  setPhoneNumber(val);
                }}
              />
            </View>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={styles.labelStyle}>Service Date</Text>

              <InputBookService
                placeholder="Date"
                placeholderTextColor={color.default}
                icon="calendar"
                inputstyle={styles.inputContainer}
                // inputIconStyle={styles.inputIconStyle}
                value={date.toISOString().split('T')[0]}
                onChangeText={val => {
                  setDate(val);
                }}
              />

              <DatePicker
                modal
                open={open}
                date={date} // Pass the date to the DatePicker
                onConfirm={selectedDate => {
                  setOpen(false);
                  setDate(selectedDate); // Update the date state with the selected date
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => setOpentime(true)}>
              <Text style={styles.labelStyle}>Service Time</Text>

              <InputBookService
                placeholder="HH:MM"
                placeholderTextColor={color.default}
                icon="clock"
                inputstyle={styles.inputContainer}
                inputIconStyle={styles.inputIconStyle}
                value={formatTime(time)}
              // onChangeText={(val) => { settime(val) }}
              />

              <DatePicker
                modal
                open={opentime}
                date={time} // Pass the date to the DatePicker
                onConfirm={selectedDate => {
                  setOpentime(false);
                  settime(selectedDate); // Update the date state with the selected date
                }}
                onCancel={() => {
                  setOpentime(false);
                }}
              />
            </TouchableOpacity> */}
            <View>
              <Text style={styles.labelStyle}>Address</Text>
              <InputBookService
                placeholder="Enter Address"
                placeholderTextColor={color.default}
                icon="map-pin"
                inputstyle={styles.inputContainer}
                inputIconStyle={styles.inputIconStyle}
                value={address}
                onChangeText={val => {
                  setAddress(val);
                }}
              />
            </View>
            <View>
              <Text style={styles.labelStyle}>Price</Text>
              <InputBookService
                placeholder="Enter Price"
                placeholderTextColor={color.default}
                icon="naira-sign"
                inputstyle={styles.inputContainer}
                inputIconStyle={styles.inputIconStyle}
                value={price}
                onChangeText={val => {
                  setPrice(val);
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.attachCont}
              onPress={() => {
                handleFilePick();
              }}>
              <Icons.Entypo
                name="attachment"
                size={20}
                style={styles.attachIcon}
                color={color.default}
              />

              <Text style={styles.labelStyle}>
                {selectedfile ? selectedfile.name : 'Choose Image'}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('SelectPaymentMethod')}
              style={[
                styles.attachCont,
                {justifyContent: 'space-between', width: '100%'},
              ]}>
              <Text style={[styles.labelStyle, {color: color.default}]}>
                Select a Payment Method
              </Text>
              <Icons.FontAwesome5
                name="arrow-right"
                size={20}
                style={styles.attachIcon}
                color={color.default}
              />
            </TouchableOpacity> */}
          </View>
          <BtnComp
            onPressFunc={() => {
              // Check if any required field is empty before booking service
              if (isAnyFieldEmpty) {
                // Display an alert or take appropriate action
                Alert.alert('Error', 'Please fill in all required fields');
              } else {
                // All required fields are filled, proceed to book service
                Bookservice();
              }
            }}
            BtnStyle={[styles.BtnStyle, {opacity: isAnyFieldEmpty ? 0.5 : 1}]}
            btnText={
              load ? (
                <ActivityIndicator size={28} color="#f8f8ff" />
              ) : (
                'Book Service'
              )
            }
            disabled={isAnyFieldEmpty} // Disable the button based on the condition
          />
          {/* 
          <BtnComp
            onPressFunc={() => {
              Bookservice();
             handleNavigate();
            }}
            BtnStyle={styles.BtnStyle}
            btnText={
              load ? (
                <ActivityIndicator size={28} color="#f8f8ff" />
              ) : (
                'Book Service'
              )
            }
          /> */}
        </ScrollView>
      </Modal>
      <CustomHeader
        title="Detail"
        onPressBack={() => {
          props.navigation.goBack();
        }}
        // dropDownIcon="ellipsis-v"
        // toggleReviewModal={toggleReview}
      />
      <ScrollView
        style={{paddingHorizontal: 20, paddingBottom: 0, maxHeight: '90%'}}>
        <View>
          <View style={styles.imgCont}></View>
          <Image
            style={styles.expertImg}
            resizeMode="contain"
            source={{
              // uri: `https://fisdemoprojects.com/skilledman/api/uploads//${item?.image}`,
              uri: `${BASE_URL}uploads//${item?.image}`,

            }}
          />
          <Text style={styles.expertTitle}>Expert {item?.service_name}</Text>
        </View>

        <View style={styles.contentStyle}>
          <View style={styles.displayFlex}>
            <Text style={styles.nameStyle}>{item?.name}</Text>
            {item?.verified == 'Verified' ? (
              <Icons.FontAwesome5
                name={'user-check'}
                color={color.blue}
                size={16}
              />
            ) : null}
          </View>

          <Icons.FontAwesome name="bookmark" color={color.default} size={15} />
        </View>

        <View style={styles.contentStyle}>
          <View style={styles.displayFlex}>
            <Icons.MaterialIcons
              name="location-on"
              color={color.default}
              size={20}
            />
            <Text style={styles.expStyle}>{item?.Address}</Text>
          </View>
          <Text style={styles.disStyle}>{item?.distance} Km away</Text>
        </View>

        <View style={styles.contentStyle}>
          <View style={styles.displayFlex}>
            <Icons.FontAwesome name="phone" color={color.default} size={20} />
            <Text style={styles.expStyle}>{item?.phone_number}</Text>
          </View>
          <Text style={styles.expStyle}>( {item?.experience} years Exp )</Text>
        </View>

        <View style={styles.ratingCont}>
          <View style={styles.ratContent}>
            <Text style={styles.ratTitle}>Rating</Text>
            <View style={styles.displayFlex}>
              <Icons.FontAwesome name="star" color={color.yellow} size={15} />
              <Text style={styles.totRat}>
                {item?.averageRating.toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.ratContent,
              {
                borderLeftColor: color.lightGray,
                borderLeftWidth: 2,
                width: '50%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                zIndex: -10,
              },
            ]}>
            <Text style={styles.ratTitle}>Total Jobs</Text>
            <Text style={[styles.totRat, {paddingRight: '13 %'}]}>
              {item?.totaljob}
            </Text>
          </View>
        </View>

        <View style={styles.contentStyle}>
          <Text style={styles.serInc}>Services Include</Text>
          <View style={styles.displayFlex}>
            <Text style={styles.licenseStyle}>License </Text>
            <Icons.FontAwesome
              name="file-text"
              color={color.default}
              size={20}
            />
          </View>
        </View>

        <View style={styles.listCont}>
          <FlatList
            data={item?.skills}
            renderItem={({item, index}) => (
              <ServicesList
                index={index}
                item={item}
                keyExtractor={({item, index}) => `service_${index}`}
              />
            )}
          />
        </View>
        <View style={styles.reviewCont}>
          <View style={styles.contentStyle}>
            <Text style={styles.serInc}>
              {item?.people_review.length} Reviews
            </Text>
            <TouchableOpacity>
              <Text style={[styles.licenseStyle, {fontWeight: '400'}]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            data={item?.people_review}
            renderItem={({item, index}) => (
              <ReviewsList
                item={item}
                index={index}
                keyExtractor={({item, index}) => `expert_${index}`}
              />
            )}
          />
        </View>
        <View style={styles.btnContainer}>
          <BtnComp
            onPressFunc={() =>
              navigation.navigate('IndividualChat', {currentuser: item})
             //  navigation.navigate('ConversationScreen', {currentuser: item})
            }
            btnText="Inbox"
            BtnStyle={styles.BtnStyle}
          />
          <BtnComp
            btnText="Book Service"
            BtnStyle={styles.BtnStyle}
            onPressFunc={toggleModal}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpertDetail;

const styles = StyleSheet.create({
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
    marginBottom: '10%',
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
