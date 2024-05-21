import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView, Alert, FlatList
} from 'react-native';
import React, { useState, useEffect } from 'react';
import color from '../../Assets/colors/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BookingCard from '../../Components/BookingCard';
import DrawerTitleProfileHeader from '../../Components/DrawerTitleProfileHeader';
import CustomHeader from '../../Components/CustomHeader';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import FlatListCard from '../../Components/FlatListCard';
import { BASE_URL } from '../Signin/Signin';

const UserHistory = props => {
    const navigation = useNavigation();
    const focus = useIsFocused();
    const [Book_Data, setBook_Data] = useState([]);
    useEffect(() => {
        BookingData();
    }, [focus])
    const BookingData = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Cookie", "PHPSESSID=2d0j4je2t3mdtg29p1ncvpab0b");

            var formdata = new FormData();
            formdata.append("user_id", global.id);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            // fetch("https://fisdemoprojects.com/skilledman/api/user/request_booking_service.php", requestOptions)
            //     .then(response => response.json())

            fetch(`${BASE_URL}user/request_booking_service.php`, requestOptions)
                .then(response => response.json())

                .then(result => {
                    console.log(result, '1234')
                    if (result.booking_request) {
                        setBook_Data(result.booking_request)
                    }
                    if (result.error) {
                        Toast.show(result.error);
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            Alert.alert(error)
        }
    }

    return (
        <ScrollView style={styles.scrollViewStyle}>
            <CustomHeader
                title="History"
                onPressBack={() => props.navigation.goBack()}
            />
            <View style={styles.cardContainer}>
                <FlatList
                    data={Book_Data}
                    renderItem={({ item }) => (
                        <BookingCard
                            cardTitle={item.name}
                            bookingId={`Booking ID - ${item.booking_id}`}
                            expertise={item.service}
                            status={item.status}
                            paidTitle={item.service_date}
                            dateCont={styles.dateCont}
                            filepress={item.file}
                        />
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default UserHistory;

const styles = StyleSheet.create({
    cardStyle: {
        paddingTop: 0,
    },
    linearGradientStyle: {
        elevation: 0,
        borderRadius: 6,
        height: '100%',
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingVertical: 6,
    },
    vegetableTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: color.black,
    },
    inputCont: {
        marginVertical: 10,
        width: '100%',
    },

    iconCont: {
        width: '38%',
    },
    iconStyle: {
        fontSize: 30,
        color: color.darkGreen,
        position: 'absolute',
        right: -180,
        top: 10,
    },

    pendAppr: {
        fontWeight: 'bold',
        fontSize: 17,
        color: color.black,
        paddingVertical: 5,
    },
    cardContainer: {
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 27,
    },
    scrollViewStyle: {
        marginBottom: 40,
        paddingBottom: 40,
    },
    modalHeader: {
        backgroundColor: color.default,
        alignItems: 'flex-end',
        paddingVertical: 17,
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    logoImg: {
        width: width / 4,
        height: height / 8,
        marginTop: -55,
        borderRadius: 10,
    },
    bookingStyle: {
        fontSize: 14,
        color: color.gray,
        fontWeight: '400',
        textAlign: 'left',
    },
    openingStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '93%',
        marginBottom: 15,
    },
    dateTimeCont: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 6,
    },
    dateStyle: {
        fontSize: 14,
        color: color.yellow,
        fontWeight: '400',
        textAlign: 'left',
    },

    btnTextStyle: {
        fontSize: 13,
    },
    acceptStyle: {
        width: '47%',
    },
    rejectStyle: {
        backgroundColor: color.red,
        borderColor: color.red,
        borderWidth: 2,
        width: '47%',
    },
    getDir: {
        color: color.default,
        fontWeight: '700',
        paddingTop: 5,
    },
    dateCont: {
        fontWeight: '400',
        color: color.gray,
    },
});