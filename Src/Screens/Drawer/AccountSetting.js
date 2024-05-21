import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import {Switch} from 'react-native-paper';
import Icon, {Icons} from '../../Components/Icons';
import color from '../../Assets/colors/colors';
import CustomHeader from '../../Components/CustomHeader';
import {useNavigation} from '@react-navigation/native';

const AccountSetting = props => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title="Settings"
        onPressBack={() => props.navigation.goBack()}
      />
      <View style={styles.accountContainer}>
        <Icons.FontAwesome
          name="user-circle-o"
          size={30}
          color={color.default}
        />
        <Text style={styles.headStyle}>Account</Text>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => navigation.navigate('editUserProfile')}>
          <Text style={styles.subTitle}>Edit Profile</Text>
          <Icons.FontAwesome name="angle-right" color={color.gray} size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.subTitle}>Change Password</Text>
          <Icons.FontAwesome name="angle-right" color={color.gray} size={28} />
        </TouchableOpacity>
      </View>
      <View style={[styles.accountContainer, {marginTop: 20}]}>
        <Icons.FontAwesome name="bell" size={30} color={color.default} />

        <Text style={styles.headStyle}>Notification</Text>
      </View>
      <View style={[styles.settingButton, {paddingHorizontal: 20}]}>
        <Text style={styles.subTitle}>Notification</Text>
        <TouchableOpacity>
          <Switch
            value={isSwitchOn}
            onValueChange={() => setIsSwitchOn(!isSwitchOn)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accountContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: color.gray,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: color.default,
    paddingLeft: 8,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: color.darkGray,
  },
});
export default AccountSetting;
