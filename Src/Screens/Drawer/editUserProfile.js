import {Picker} from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from 'react-native';
import color from '../../Assets/colors/colors';
import CustomHeader from '../../Components/CustomHeader';
import Icon, {Icons} from '../../Components/Icons';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import {launchImageLibrary} from 'react-native-image-picker';
import InputWithIcon from '../../Components/InputWithIcon';
import BtnComp from '../../Components/BtnComp';
import InputEditProfile from '../../Components/InputEditProfile';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../Signin/Signin';
const EditUserProfile = props => {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const [profileData, setprofileData] = useState(null);
  //console.log(profileData,'profiel')
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setemail] = useState(null);
  const [name, setName] = useState(null);
  const [profileimg, setprofileimg] = useState(null);
  const [image, setImage] = useState('');
  const [load, setLoad] = React.useState(false);
  useEffect(() => {
    if (profileData) {
      setPhone(profileData.phone_number);
      setAddress(profileData.address);
      setemail(profileData.email);
      setName(profileData.name);
      setprofileimg(profileData.profile);
    }
  }, [profileData, focus]);
  //console.log(profileData?.profile, '1234')
  const onGallery = async () => {
    const options = {
      title: 'Select Image',
      type: 'library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
    };
    const result = await launchImageLibrary(options);
    console.log(result.assets[0]);
    // setImage(result.assets[0])

    if (result.didCancel) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('You cancel the Gallery', ToastAndroid.SHORT);
      } else {
        alert('You cancel the Gallery');
      }
    } else if (result.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (result.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      setImage(result.assets[0], 'gallery');
    }
  };

  const UpdateProfiledata = async () => {
    try {
      setLoad(true);
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=jmv28htgkulr4v5gmt5n7us8go');

      var formdata = new FormData();
      formdata.append('id', global.id);
      formdata.append('name', name);
      formdata.append('email', email);
      formdata.append('phone_number', phone);
      formdata.append('address', address);
      {
        image
          ? formdata.append('profile', {
              uri: image.uri,
              name: image.fileName,
              type: image.type,
            })
          : null;
      }
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      // const apiurl ='https://fisdemoprojects.com/skilledman/api/user/profile.php';
     const apiurl =`${BASE_URL}user/profile.php`;


      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      if (result) {
        setLoad(false);
        Toast.show('Profile Updated.');
        global.name = result.name;
        global.profile = result.profile;

        navigation.navigate('DashBoard');
      } else if (result && result.error) {
        setLoad(false);
        Alert.alert(result.error);
      }
    } catch (error) {
      setLoad(false);
      console.log('ërror occur durrin update prodfile', error);
    }
  };

  const GetProfileData = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=nehf3e2dgdauiaooraluprccv7');

      var formdata = new FormData();
      formdata.append('id', global.id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // fetch(
      //   'https://fisdemoprojects.com/skilledman/api/user/get_profile.php',
      //   requestOptions,
      // )

      
      fetch(
        `${BASE_URL}user/get_profile.php`,
        requestOptions,
      )

        .then(response => response.json())
        .then(result => {
          console.log(result);

          if (result) {
            setprofileData(result);
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    GetProfileData();
  }, [global.id, focus]);

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title="Edit Profile"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <View style={{alignItems: 'center', marginBottom: 16}}>
            {image ? (
              <Image
                source={{uri: image.uri}}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                  marginVertical: 20,
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: color.default,
                }}
              />
            ) : profileimg && profileimg.profile !== null ? (
              <Image
                source={{
                  // uri: `https://fisdemoprojects.com/skilledman/api/uploads/${profileData?.profile}`,
                  uri: `${BASE_URL}uploads/${profileData?.profile}`,

                }}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                  marginVertical: 20,
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: color.default,
                }}
              />
            ) : (
              <Image
                source={require('../../Assets/Images/user.jpg')}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                  marginVertical: 20,
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: color.default,
                }}
              />
            )}

            <TouchableOpacity
              onPress={onGallery}
              style={{
                position: 'absolute',
                bottom: 15,
                backgroundColor: color.darkGray,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
                right: '35%',
              }}>
              <Icons.FontAwesome name="camera" color={color.white} size={20} />
            </TouchableOpacity>
          </View>
          <InputEditProfile
            style={{color: color.gray}}
            value={name}
            placeholder="Name"
            placeholderTextColor={color.gray}
            onChangeText={val => setName(val)}
            icon="user"
          />
          <InputEditProfile
            style={{color: color.gray}}
            value={email}
            placeholder="Email"
            placeholderTextColor={color.gray}
            icon="mail"
          />
          <InputEditProfile
            style={{color: color.gray}}
            value={phone}
            placeholder="Phone Number"
            placeholderTextColor={color.gray}
            onChangeText={val => setPhone(val)}
            icon="phone"
          />
          <InputEditProfile
            style={{color: color.gray}}
            value={address}
            placeholder="Address"
            placeholderTextColor={color.gray}
            onChangeText={val => setAddress(val)}
            icon="map-pin"
          />

          <BtnComp
            BtnStyle={styles.BtnStyle}
            onPressFunc={() => {
              UpdateProfiledata();
            }}
            btnText={
              load ? <ActivityIndicator size={28} color="#f8f8ff" /> : 'Update'
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Register_Text: {
    marginTop: 20,
    color: color.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginBtn: {
    borderRadius: 5,
    backgroundColor: color.darkgreen,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '70%',
    paddingVertical: 12,
    marginTop: 35,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  BtnStyle: {
    width: '100%',
    elevation: 1,
  },
  certContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  iconCont: {
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  certiStyle: {
    fontWeight: '600',
  },
  addSkill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  plusCont: {
    color: color.default,
    marginRight: 5,
  },
  addMore: {
    fontWeight: '700',
    color: color.default,
    fontSize: 15,
  },
});

export default EditUserProfile;
