import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { React, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../Assets/colors/colors';
import { Image } from 'native-base';
import { Icons } from './Icons';
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../Screens/Signin/Signin';
const DrawerTitleProfileHeader = (props, { navigation }) => {
  //const navigation = useNavigation();
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
        <Text style={styles.userStyle}>{props.screenTitle}</Text>
        <TouchableOpacity onPress={props.userProfile}>
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
  );
};

export default DrawerTitleProfileHeader;

const styles = StyleSheet.create({
  topCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: color.default,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  userStyle: {
    fontSize: 15,
    fontWeight: '800',
    color: color.white,
  },
  imgStyle: {
    height: 50,
    width: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.white,
  },
});