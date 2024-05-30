import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../Assets/colors/colors';
import {Icons} from './Icons';
import color from '../Assets/colors/colors';

const FlatListCard = props => {
  const openFile = () => {
    const fileURL = `https://fisdemoprojects.com/skilledman/api/uploads/${props.filepress}`;

    // Use Linking to open the file URL
    Linking.openURL(fileURL).catch(err => {
      console.error(`Error opening file: ${err}`);
      // You can show an error message to the user if the file can't be opened
    });
  };
  return (
    <View style={[styles.textContainer, {...props.cardStyle}]}>
      <View style={styles.openingStyle}>
        <Text style={styles.TextStyle}>{props.cardTitle}</Text>
        <View style={styles.rightCont}>
          <Text style={[styles.paidStyle, {...props.dateCont}]}>
            {props.paidTitle}
          </Text>
        </View>
      </View>
      <View style={styles.openingStyle}>
        <Text style={styles.bookingStyle}>{props.bookingId}</Text>
        <TouchableOpacity onPress={props.onPressShowProfile}>
          <Icons.FontAwesome
            name={props.iconName}
            size={30}
            color={color.darkGray}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.openingStyle}>
        <View style={styles.dateTimeCont}>
          <Text style={styles.dateStyle}>{props.date} </Text>
          {/* <Text style={styles.bookingStyle}>({props.time})</Text> */}
        </View>
        <Text style={styles.statusStyle}>{props.status}</Text>
      </View>
    </View>
  );
};

export default FlatListCard;
const styles = StyleSheet.create({
  balanceStyle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'left',
    paddingTop: 10,
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 0,
    width: '100%',
    marginBottom: 10,
  },
  TextStyle: {
    fontSize: 15,
    color: colors.black,
    fontWeight: '700',
    textAlign: 'left',
  },
  bookingStyle: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '400',
    textAlign: 'left',
  },
  openingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  dateTimeCont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateStyle: {
    fontSize: 14,
    color: colors.yellow,
    fontWeight: '400',
    textAlign: 'left',
  },
  statusStyle: {
    fontSize: 14,
    color: colors.red,
    fontWeight: '400',
  },
  rightCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  paidStyle: {
    fontSize: 17,
    color: colors.default,
    fontWeight: 'bold',
  },
});
