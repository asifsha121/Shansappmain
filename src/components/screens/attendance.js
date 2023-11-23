import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker,Circle} from 'react-native-maps';
import * as Location from 'expo-location';
import geolib from "geolib";
import { getDistance } from 'geolib';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.button22}>
        <AntDesign name="left" size={14} color="black" />
        <Text style={styles.headertitle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const Attendance = ({navigation}) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  const formattedTime = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const [locationUser, setLocationUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const haversineDistance = (point1, point2) => {
   getDistance(point1, point2);
};

  const locationShop = { latitude: 8.5004812, longitude: 76.9481100 }; // Replace with your actual shop coordinates

  const checkin = () => {
    if (!locationUser) {
      // Handle the case where location is not available yet
      console.log("Location not available yet.");
      console.log(locationUser)
      return;
    }
    const distance = haversineDistance(
      locationUser,
      locationShop
    );
    if (distance <= 50) {
      Alert.alert('Check-in successful!', 'Your attendance has been noted.');
      console.log('Checked In!');
    } else {
      Alert.alert('Check-in failed', 'You are too far from the shop to check in.');
      console.log("Locations are more than 100 meters apart.");
    }
  };
  const shopRadius = 25;
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocationUser(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <CustomButton title="Mark Attendance" 
      onPress={() => navigation.goBack()}
       />
      <View style={styles.containermain}>
        <Text style={styles.greetingText}>Hai User</Text>
        <Text style={styles.liveDate}>{formattedDate}</Text>
        <Text style={styles.liveTime}>{formattedTime}</Text>
      </View>
      <View style={styles.checkin}>
        <TouchableOpacity style={styles.checkInButton} onPress={checkin}>
          <Text style={styles.checkInButtonText}>CHECK IN</Text>
        </TouchableOpacity>
      </View><View style={styles.simpletextview}>
      <Text style={styles.simpletext}>You should be inside your shop to mark your attendance</Text></View>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude:8.5004812,
            longitude:76.9481100,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
           {locationUser && locationUser.coords && (
      <>
        {/* User's location marker */}
        <Marker
          coordinate={{
            latitude: locationUser.coords.latitude,
            longitude: locationUser.coords.longitude,
          }}
          title="Your Location"
          pinColor="blue" // Optional: Customize the color
        />
        {/* Shop location marker */}
        <Marker
          coordinate={locationShop}
          title="Shop Location"
          pinColor="red" // Optional: Customize the color
        />
         <Circle
              center={locationShop}
              radius={shopRadius}
              fillColor="lightblue" // Adjust the color and opacity as needed
            />
      </>
    )}
  </MapView>
</View>
    </View>
  );
};
export default Attendance;

const styles = StyleSheet.create({
  container: {
   flex:1,
   width:415,
   backgroundColor:"#fff"
  },
  greetingText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight:"bold"
  },
  liveDate: {
    fontSize: 25,
    fontWeight: "800",
    marginBottom: 10,
  },
  liveTime: {
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 20,
  },
  checkin:{
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom:10
  },
  simpletextview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpletext: {
    fontSize: 17,
    color:"#66727A",
    textAlign: 'center',
    fontWeight:"700"
  },
  button22: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffa600',
  },
  headertitle: {
    marginLeft: 34,
    fontSize: 15,
    color: 'white',
  },
  containermain: {
    alignItems: "center",
    marginTop: 80,
  },
  checkInButtonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  checkInButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffa600',
    borderRadius: 5,
    width: 300
  }
});
