import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import colors from '../Assets/colors/colors';
import Card from './OpeningCard';
import OpeningCard from './OpeningCard';
import CashInHand from './CashInHand';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../Screens/Signin/Signin';
const Two_Card = props => {
  const Cash_Collect = props.sarcashcollect;
  const total_expense = props.total_expense;

  const [showBalance, setShowBalance] = useState('0');
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const pendingBalancefun = () => {
    try {
     // console.log("pending balance")
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "PHPSESSID=a5r6euihjq5g1magf2bfurdoi5");

      var formdata = new FormData();
      formdata.append("provider_id", global.id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      // fetch("https://fisdemoprojects.com/skilledman/api/balance_pending.php", requestOptions)
      fetch(`${BASE_URL}balance_pending.php`, requestOptions)

        .then(response => response.json()) // Parse response as JSON
        .then(result => {
          if (result && result.pending_balance) {
            console.log("pending balance result:", result.pending_balance);
            setShowBalance(result.pending_balance);
          }
        })
        .catch(error => console.log('Error:', error));
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    pendingBalancefun();
  }, [isBalanceVisible]);

  return (
    <View style={styles.MainContainer}>
      <View style={{ width: '100%' }}>
        <CashInHand cardTitle="Cash Pending:" price={showBalance} />
      </View>
      {/* <View
        style={{
          width: '49%',
        }}>
        <CashInHand cardTitle="Cash Collected" price="0" />
      </View> */}
    </View>
  );
};

export default Two_Card;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkyellow,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  Text: {
    color: colors.orange,
    fontSize: 15,
    fontWeight: '600',
  },
  MainContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 55,
  },
});