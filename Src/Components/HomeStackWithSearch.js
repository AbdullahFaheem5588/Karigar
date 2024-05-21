import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { React, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../Assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'native-base';
import OpeningCard from './OpeningCard';
import SearchInput from './SearchInput';
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../Screens/Signin/Signin';
const HomeStackWithSearch = (props, { navigation }) => {
  const focus = useIsFocused();
  const [profileData, setprofileData] = useState(null);
  const [name, setName] = useState(null);
  const [profileimg, setprofileimg] = useState(null)
  useEffect(() => {
    if (profileData) {
      setName(profileData.name);
      setprofileimg(profileData.profile)
    }
  }, [profileData, focus]);

  //console.log(props);
  useEffect(() => {
    GetProfileData();
  }, [global.id, focus]);
  const GetProfileData = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "PHPSESSID=nehf3e2dgdauiaooraluprccv7");

      var formdata = new FormData();
      formdata.append("id", global.id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      // fetch("https://fisdemoprojects.com/skilledman/api/user/get_profile.php", requestOptions)
      fetch(`${BASE_URL}user/get_profile.php`, requestOptions)

        .then(response => response.json())
        .then(result => {
          console.log(result)

          if (result) {
            setprofileData(result)
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      Alert.alert(error)
    }
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.topCont}>
        <TouchableOpacity onPress={props.onPress} style={styles.menuStyle}>
          <Icon name="menu" size={35} color={color.white} />
        </TouchableOpacity>
        <View style={styles.rightCont}>
          <TouchableOpacity onPress={props.onPressnotification}>
            {(profileimg && profileimg.profile !== null) ?
              <Image
                // source={{ uri: `https://fisdemoprojects.com/skilledman/api/uploads/${profileData?.profile}` }}
                source={{ uri: `${BASE_URL}uploads/${profileData?.profile}` }}

                resizeMode="cover"
                style={styles.imgStyle}
              //alt="user"
              />
              :
              <Image
                source={require('../Assets/Images/user.jpg')}
                resizeMode="cover"
                style={styles.imgStyle}
              //alt="user"
              />
            }
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.userStyle}>Hi, {name}</Text>
      <View style={styles.searchStyle}>
        <SearchInput
          onChangeText={props.onChangeText}
          value={props.value}
        />
      </View>
    </View>
  );
};

export default HomeStackWithSearch;

const styles = StyleSheet.create({
  OpeningBalanceCard: {
    position: 'absolute',
    top: '100%',
    alignSelf: 'center',
  },
  topCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: color.default,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingBottom: 20,
  },
  linearGradientStyle: {
    elevation: 0,
    paddingHorizontal: 12,
    borderRadius: 10,
    paddingVertical: 10,
  },

  rightCont: {
    flexDirection: 'row',
  },
  notIcon: {
    marginLeft: 5,
  },

  imgStyle: {
    height: 50,
    width: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.white,
  },
  userStyle: {
    fontSize: 15,
    fontWeight: '800',
    color: color.white,
    marginBottom: 20,
  },
  searchStyle: {
    position: 'absolute',
    bottom: -25,
    alignSelf: 'center',
    width: '100%',
    elevation: 1,
  },
});