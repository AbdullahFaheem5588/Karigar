import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import SaveCard from '../../Components/SaveCard';
import CustomHeader from '../../Components/CustomHeader';
import DeliverTo from '../../Components/DeliverTo';
import color from '../../Assets/colors/colors';
import {Icons} from '../../Components/Icons';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import InputSearchFilter from '../../Components/InputSearchFilter';
import Modal from 'react-native-modal';
import BtnComp from '../../Components/BtnComp';
import {BASE_URL} from '../Signin/Signin';

const FindExpert = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params?.data;
  const [GetExpertProvider, setGetExpertProvider] = useState(data);
  console.log('data of specfic job', data);

  const accounts = [
    {
      id: '1',
      name: 'Verified',
    },
    {
      id: '2',
      name: 'Non Verified',
    },
  ];
  const [searchTerm, setsearchTerm] = useState('');

  console.log('===============searchTerm', searchTerm);

  const filteredData = GetExpertProvider.filter(item =>
    item.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  console.log('===============searchTerm filteredData', filteredData);

  const sortedData = filteredData.slice().sort((a, b) => {
    return a.user.name.localeCompare(b.user.name);
  });

  const ExpertsList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ExpertDetail', {item: item})}
        style={[styles.textContainer, {...props.cardStyle}]}>
        <Image
          style={styles.logoImg}
          resizeMode="contain"
          source={
            data.icon
              ? {uri: data.icon}
              : require('../../Assets/icons/defaultProfileIcon.png')
          }
        />

        <View style={styles.profileCont}>
          <View style={[styles.openingStyle, {...styles.titleCont}]}>
            <View style={styles.nameCont}>
              <Text style={styles.TextStyle}>{item.user.name}</Text>
              {item.user.verified ? (
                <Icons.FontAwesome5
                  name={'user-check'}
                  color={color.blue}
                  size={16}
                />
              ) : null}
            </View>

            <TouchableOpacity>
              <Icons.FontAwesome
                name={'commenting-o'}
                color={color.default}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.openingStyle}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.msgTitle}>{'Rating'}</Text>
              <View style={styles.starCont}>
                <Icons.FontAwesome
                  name={'star'}
                  color={color.yellow}
                  size={15}
                />
                <Text style={[styles.msgTitle, {marginLeft: 3}]}>3</Text>
              </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.msgTitle}>{'Description'}</Text>
              <Text style={styles.msgTitle}>{item.description || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <CustomHeader
          title={'Find an Expert'}
          onPressBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: height * 0.08}}>
          <View style={styles.mainCont}>
            <InputSearchFilter
              placeholder={'Search Expert'}
              value={searchTerm}
              onChangeText={setsearchTerm}
            />

            {sortedData.map(item => (
              <ExpertsList key={item.user.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightgray,
  },
  textContainer: {
    flexDirection: 'row',
    backgroundColor: color.white,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileCont: {
    flex: 1,
    marginLeft: 16,
  },
  titleCont: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  openingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.black,
    marginRight: 8,
  },
  msgTitle: {
    fontSize: 14,
    color: color.darkgray,
  },
  starCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listCont: {
    backgroundColor: color.white,
    marginVertical: 4,
    borderRadius: 8,
  },
  itemStyle: {
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    color: color.black,
  },
  mainCont: {
    padding: 16,
  },
  modalView: {
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.black,
  },
  modalBody: {
    marginTop: 16,
  },
  modalFooter: {
    marginTop: 16,
  },
});

export default FindExpert;
