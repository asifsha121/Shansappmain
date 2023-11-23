import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { baseUrl } from '../../api/const';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { FlatList } from 'react-native';
import { useIsFocused,useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';

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

const Marketstudies = ({ navigation }) => {
  const route = useRoute(); // Use useRoute hook to access route object
  const isFocused = useIsFocused();
  const [marketStudies, setMarketStudies] = useState([]);

 
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/viewMarketStudy`); // Replace with your actual API endpoint
        setMarketStudies(response.data.data); // Assuming your API returns an array under the 'data' key
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 useEffect(() => {
    fetchData();
  }, [isFocused ]);
  useEffect(() => {
    // Check for the 'refresh' parameter in the route object
    if (route.params && route.params.refresh) {
      // Reset the refresh parameter
      navigation.setParams({ refresh: false });
      fetchData();
    }
  }, [isFocused, route.params, navigation]);
  const renderItem = ({ item }) => (
    <View style={styles.Stylefordata}><TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('CustomerDetails', { item })}
    >
      <Text style={styles.customerName}>Customer Name: {item.customer_name}</Text>
      <Text style={styles.phoneNumber}>Phone Number: {item.contact_number}</Text>
      <Text style={styles.phoneNumber}>Type of Industry: {item.industry_type}</Text>
      {/* Add more fields as needed */}
    </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}><CustomButton title="Market Study"  onPress={() => navigation.goBack()} />
      <FlatList
        data={marketStudies}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <View style={styles.fab}>
        <FAB
          style={styles.fab}
          icon={() => <AntDesign name="plus" size={24} color="white" />}
          onPress={() => navigation.navigate('NewMarketstudy')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 30,
    backgroundColor: '#ffa600',
    borderRadius: 30,
    width: "auto",
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    padding: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#555',
  },
  industryType: {
    fontSize: 16,
    color: '#555',
  },
  Stylefordata: {
    borderRadius: 8,
    padding:20,
    margin: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 15, // Add elevation for a shadow effect
  },
  button22: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffa600",
    },
headertitle: {
    marginLeft: 34,
    fontSize: 15,
    color: "white"
    },
});

export default Marketstudies;
