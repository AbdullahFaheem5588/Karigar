import {Picker} from '@react-native-picker/picker';
import React, {useState, useEffect, useRef} from 'react';
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
  ALert,
  ActivityIndicator,
  Alert,
} from 'react-native';

import color from '../../Assets/colors/colors';
import CustomHeader from '../../Components/CustomHeader';
import Icon, {Icons} from '../../Components/Icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import BtnComp from '../../Components/BtnComp';
import DocumentPicker from 'react-native-document-picker';
import C_SkillInputs from '../../Components/C_SkillInput';
import Toast from 'react-native-simple-toast';
import {BASE_URL, Img_URL_USER} from '../Signin/Signin';
import {useSelector} from 'react-redux';

const ShowProviderDetails = props => {
  const pickerRef = useRef();
  const route = useRoute();
  const userData = route?.params?.currentData;
  console.log('🚀 ~ ShowProviderDetails ~ userData:', userData);
  const navigation = useNavigation();
  const {token} = useSelector(state => state.TokenReducer);
  const {data} = useSelector(state => state.ProfileReducer);

  const [NumberofEXp, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [file, setFile] = useState('');
  const [item, setItem] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('Select Business');
  const [load, setLoad] = React.useState(false);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('File picker result', result[0]);
      if (result) {
        setFile(result[0]);
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

  const handleBusinessSelect = selectedValue => {
    // You can do something with the selected value here, like set it in the state or use it in an API call.
    // console.log("Selected Business:", selectedValue);
    setSelectedBusiness(selectedValue);
  };
  const VerifiedUser = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}admin/verify-user/${userData?.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result && result?.message) {
          Toast.show(result?.message, Toast.LONG);
          navigation.navigate('DashBoard');
        }
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    const getOverall = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      fetch(`${BASE_URL}services-dropdown`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(result => {
          if (result && result.services) {
            console.log('result add skill', result.services);
            if (result.services.length > 0) {
              let newArray = result.services.map(item => {
                return {
                  key: item.id,
                  value: `${item.title}`,
                };
              });
              setItem(newArray);
            }
          } else if (result.error) {
            Alert.alert(result.error);
          }
        })
        .catch(error => console.error(error));
      // try {
      //   var myHeaders = new Headers();
      //   myHeaders.append('Authorization', `Bearer ${token}`);

      //   // var urlencoded = new URLSearchParams();

      //   var requestOptions = {
      //     method: 'Get',
      //     headers: myHeaders,
      //     // body: urlencoded,
      //     redirect: 'follow',
      //   };
      //  const apiurl = `${BASE_URL}get_skilled`;

      //   const response = await fetch(apiurl, requestOptions);
      //   const result = await response.json();
      //   if (result && result.add_skills) {
      //     console.log('result add skill', result.add_skills);
      //     setItem(result.add_skills);
      //   } else if (result.error) {
      //     ALert.alert(result.error);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    };

    getOverall();
  }, []);
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title="Provider Detail"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{padding: 20}}>
          {userData.image_path === null ? (
            <Image
              style={styles.logoImg}
              resizeMode="contain"
              // source={props.iconUrl}
              source={{uri: 'https://dummyimage.com/hd1080'}}
            />
          ) : (
            <Image
              style={styles.logoImg}
              resizeMode="contain"
              source={{uri: `${Img_URL_USER}${userData.image_path}`}}

              // source={{uri: 'https://dummyimage.com/hd1080'}}
            />
          )}
          <C_SkillInputs
            style={{color: color.gray}}
            value={userData.name || 'N/A'}
            disable={true}
            placeholder="Name"
            placeholderTextColor={color.gray}
          />
          <C_SkillInputs
            style={{color: color.gray}}
            value={userData.email || 'N/A'}
            disable={true}
            placeholder="Email"
            placeholderTextColor={color.gray}
          />

          <C_SkillInputs
            style={{color: color.gray}}
            value={userData?.username || 'N/A'}
            placeholder="User Name"
            placeholderTextColor={color.gray}
          />

          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={VerifiedUser}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingVertical: 10,
                backgroundColor: color.default,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white'}}>Action</Text>
            </TouchableOpacity>
          </View>
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
  inputContainer: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  DropDownContainer: {
    borderColor: color.default,
    borderWidth: 1,
    paddingHorizontal: 5,
    width: '100%',
    borderRadius: 6,
    marginTop: 6,
    paddingVertical: 3,
    backgroundColor: 'white',
  },
  logoImg: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
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
  addSkill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  plusCont: {
    color: color.default,
    marginRight: 5,
  },
  addMore: {
    fontWeight: '700',
    color: color.gray,
    fontSize: 15,
  },
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
});

export default ShowProviderDetails;
