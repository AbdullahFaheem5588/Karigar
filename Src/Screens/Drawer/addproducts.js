import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import color from '../../Assets/colors/colors';
import CustomHeader from '../../Components/CustomHeader';
import Icon, {Icons} from '../../Components/Icons';
import {useNavigation} from '@react-navigation/native';
import BtnComp from '../../Components/BtnComp';
import DocumentPicker from 'react-native-document-picker';
import C_SkillInputs from '../../Components/C_SkillInput';
import Toast from 'react-native-simple-toast';
import {BASE_URL} from '../Signin/Signin';
import {useSelector} from 'react-redux';

const AddProducts = props => {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.TokenReducer);

  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(false);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (result) {
        setFile(result[0]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User canceled the document picker
      } else {
        console.error('Error occurred while picking document:', error);
        throw error;
      }
    }
  };

  const addNewProduct = async () => {
    if (!description || !name || !price || !stock || !file) {
      Toast.show('Please fill all required fields', Toast.SHORT);
      return;
    }

    try {
      setLoad(true);
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const formdata = new FormData();
      formdata.append('name', name);
      formdata.append('description', description);
      formdata.append('price', price);
      formdata.append('stock', stock);
      formdata.append('image', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });

      const apiUrl = `${BASE_URL}products`;

      const requestOptions = {
        method: 'POST',
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await fetch(apiUrl, requestOptions);
      const result = await response.json();

      setLoad(false);

      if (result) {
        Toast.show('New Product Added Successfully', Toast.SHORT);
        navigation.navigate('DashBoard');
      } else if (result.error) {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      setLoad(false);
      console.error('Error occurred while adding product:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title="Add Products"
        onPressBack={() => props.navigation.goBack()}
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <C_SkillInputs
            style={{color: color.gray}}
            value={name}
            placeholder="Name"
            placeholderTextColor={color.gray}
            onChangeText={text => setName(text)}
          />
          <C_SkillInputs
            style={{color: color.gray}}
            value={price}
            placeholder="Price"
            placeholderTextColor={color.gray}
            onChangeText={text => setPrice(text)}
          />
          <C_SkillInputs
            style={{color: color.gray}}
            value={description}
            placeholder="Description"
            placeholderTextColor={color.gray}
            onChangeText={text => setDescription(text)}
          />
          <C_SkillInputs
            style={{color: color.gray}}
            value={stock}
            placeholder="Stock"
            placeholderTextColor={color.gray}
            onChangeText={text => setStock(text)}
          />
          <TouchableOpacity style={styles.addSkill} onPress={handleFilePick}>
            <Icons.Feather
              name="paperclip"
              size={25}
              color={color.default}
              style={styles.plusCont}
            />
            <Text style={styles.addMore}>
              {file ? file.name : 'Choose File'}
            </Text>
          </TouchableOpacity>
          <BtnComp
            BtnStyle={styles.BtnStyle}
            onPressFunc={addNewProduct}
            btnText={
              load ? <ActivityIndicator size={28} color="#f8f8ff" /> : 'Save'
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

export default AddProducts;
