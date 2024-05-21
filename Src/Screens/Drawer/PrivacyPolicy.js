import * as React from 'react';
import {Text, View, Dimensions, StyleSheet, Image} from 'react-native';
import color from '../../Assets/colors/colors';
import {ScrollView} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';

const PrivacyPolicy = (props, {route, navigation}) => {
  return (
    <>
      <CustomHeader
        title="Privacy Policy"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView style={styles.containerStyle}>
        <View style={styles.headCont}>
          <Text style={styles.HeadStyle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <Text style={styles.HeadStyle}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: color.white,
    paddingTop: 20,
  },
  HeadStyle: {
    color: color.gray,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  headCont: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
