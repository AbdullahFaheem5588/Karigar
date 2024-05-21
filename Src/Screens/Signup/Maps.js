import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {View, TouchableOpacity, PermissionsAndroid, Text} from 'react-native';
//import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import {Marker} from 'react-native-svg';

const Maplatln = () => {
  const [mlat, setmlat] = useState(0);
  const [mlong, setmlong] = useState(0);
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  global.lat = mlat;
  console.log('mlat', global.lat);
  global.long = mlong;
  console.log('mlong', global.long);
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
        setmlat(position.coords.latitude);
        setmlong(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: mlat,
          longitude: mlong,
          latitudeDelta: 0.0544443541,
          longitudeDelta: 0.03454355341,
        }}
        onRegionChange={x => {
          console.log(x);
        }}
        zoomEnabled={true}
        zoomControlEnabled={true}
        showsUserLocation={true}>
        <Marker coordinate={{latitude: mlat, longitude: mlong}} />
      </MapView>

      <TouchableOpacity
        onPress={() => {
          getLocation();
        }}
        style={{
          width: '60%',
          height: 50,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 20,
          backgroundColor: 'orange',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Get Current Location</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Maplatln;
