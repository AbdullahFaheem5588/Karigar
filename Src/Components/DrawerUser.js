import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import { React, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import color from '../Assets/colors/colors';
import icon, { Icons } from '../Components/Icons';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../Screens/Signin/Signin';
const ImageUrl = 'https://https://theskilledman.com/../../freshfood/public/riderlog/';
//const ImageUrl = 'https://fisdemoprojects.com/../../freshfood/public/riderlog/';


const DrawerUser = props => {
  const navigation = useNavigation();
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
    <TouchableOpacity
      style={styles.MainContainer}
      onPress={() => {
        navigation.navigate('account_setting');
      }}>
      {global.logo === null ? (
        <Image
          source={require('../Assets/Images/user.jpg')}
          style={styles.imgStyle}
        />
      ) : (
        <Image source={{ uri: ImageUrl + global.logo }} style={styles.imgStyle} />
      )}

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
      <Text style={styles.userName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default DrawerUser;
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: color.white,
    borderBottomWidth: 0.4,
    width: '100%',
    paddingBottom: 15,
    marginBottom: 10,
  },
  userName: {
    color: color.white,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  imgStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    borderColor: color.orange,
    borderWidth: 3,
  },
});