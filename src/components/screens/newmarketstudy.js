import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView,TouchableWithoutFeedback} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { baseUrl } from '../../api/const';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
const industries = [
  { label: '   No Specific Industry', value: 'No Specific industry' },
  { label: '   Computer Servicing', value: 'Computer Servicing' },
  { label: '   Computer Store', value: 'Computer Store' },
  { label: '   Mobile Servicing', value: 'Mobile Servicing' },
  { label: '   Electronic Store', value: 'Electronic Store' }
];
const deliveryPreferenceOptions = [
  { label: '   Yes, Deliver the items', value: 'Delivery The Products' },
  { label: '   No, Pick up from the shop', value: 'Pickup From Shop' },
];
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

const NewMarketStudies = () => {
    const navigation = useNavigation();
  const [industry, setIndustry] = useState("  Enter an industry");
  const [emirate, setEmirate] = useState('');
  const[coordinates,setCoordinates]=useState("")
  const [productService, setProductService] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerContactNumber, setOwnerContactNumber] = useState('');
  const [staffCount, setStaffCount] = useState('');
  const [companyAge, setCompanyAge] = useState('');
  const [currentSupplier, setCurrentSupplier] = useState('');
  const [monthlyPurchase, setMonthlyPurchase] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [creditPeriodLimit, setCreditPeriodLimit] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [deliveryPreference, setDeliveryPreference] = useState('   Enter Preferences');
  const [salesperson, setSalesperson] = useState('');
  const [expectedMonthlyPurchase, setExpectedMonthlyPurchase] = useState('');
  const [showMapView, setShowMapView] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const handleDonePress = async () => {
    if (industry === '  Enter an industry' || !customerName || !contactNumber) {
      alert('Please fill in mandatory fields:\n-Type of Industry,\n-Customer/Company Name,\n-and Contact Number.');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/createMarketStudy`, {
        customer_name: customerName,
        company_name: customerName,
        industry_type: industry,
        emirate: emirate,
        location_map: coordinates,
        products_services_required: productService,
        contact_person: contactPerson,
        contact_number: contactNumber,
        whatsapp_number: contactNumber,
        owners_name: ownerName,
        owners_contact_number: ownerContactNumber,
        number_of_staffs: parseInt(staffCount),
        shop_company_age: parseInt(companyAge),
        current_supplier: currentSupplier,
        average_spare_parts_purchase_per_month: parseInt(monthlyPurchase),
        delivery_preference: deliveryPreference,
        salesperson_assigned: salesperson,
        expected_monthly_purchase: parseInt(expectedMonthlyPurchase),
        payment_terms_with_supplier: paymentTerms,
        agreed_credit_period:  parseInt(creditPeriodLimit),
        credit_limit: parseInt(creditLimit),
      });

      // Assuming your API returns a JSON response
      const responseData = response.data;

      // Handle the response data as needed
      console.log('API response:', responseData);

      // Optionally, you can navigate to another screen after a successful API call
      // navigation.navigate('NextScreen');
    } catch (error) {
      console.error('Error making API request:', error);
    }
   
    console.log('Form submitted!');
    navigation.navigate('Marketstudy', { refresh: true })
  };
  const handlePress = () => {
    setShowMapView(true);
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log('Selected Location:', { latitude, longitude });
    setSelectedLocation({ latitude, longitude });
  };
  

  const handleSelectLocation = () => {
    setShowMapView(false);
    setCoordinates(`${selectedLocation.latitude},${selectedLocation.longitude}`);
  };

  return (
    <View><CustomButton title="New Market Study"  onPress={() => navigation.goBack()} />
  <ScrollView>
    <View style={styles.container2}><View style={styles.container}>
      <Text style={styles.labeldrop}>Type of Industry:*</Text>
      <Dropdown
      style={styles.dropdown}
      data={industries}
      onChange={(item) => setIndustry(item.value)}
      labelField="label"
      valueField="value"
      placeholder={industry}
      />
<Text style={styles.label}>Emirate:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Emirate"
        value={emirate}
        onChangeText={(text) => setEmirate(text)}
      />
     <Text style={styles.label}>Location Map:</Text>
        <View style={styles.mapContainer}>
          <TextInput
            style={styles.inputloc}
            placeholder="Select Location"
            value={coordinates}
            editable={false}
          />
          <TouchableOpacity style={styles.mapButton} onPress={handlePress}>
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
        </View>
      {showMapView && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude:25.2291335,
            longitude:55.3081943,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
          onPress={handleMapPress}
        >
          {!!selectedLocation.latitude && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
            />
          )}
        </MapView>
      )}
       {showMapView && (
        <TouchableOpacity
          style={styles.selectLocationButton}
          onPress={handleSelectLocation}
        >
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.label}>Product/Service Required:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Product/Service Required"
              value={productService}
              onChangeText={(text) => setProductService(text)}
            />
      <Text style={styles.labelmain}>Customer/Company Name:*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Customer/Company Name"
        value={customerName}
        onChangeText={(text) => setCustomerName(text)}
      />

      <Text style={styles.label}>Contact Person:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Contact Person"
        value={contactPerson}
        onChangeText={(text) => setContactPerson(text)}
      />

      <Text style={styles.labelmain}>Contact Number/WhatsApp Number:*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Contact/Whatsupp Number"
        keyboardType='numeric'
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
      />

      <Text style={styles.label}>Owner Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Owner Name"
        value={ownerName}
        onChangeText={(text) => setOwnerName(text)}
      />

      <Text style={styles.label}>Contact Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Contact Number"
        keyboardType='numeric'
        value={ownerContactNumber}
        onChangeText={(text) => setOwnerContactNumber(text)}
      />

      <Text style={styles.label}>Number of Staffs:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter No of Staffs"
        value={staffCount}
        keyboardType='numeric'
        onChangeText={(text) => setStaffCount(text)}
      />

      <Text style={styles.label}>How Old is the Shop/Company(in Months):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Age of compony"
        keyboardType='numeric'
        value={companyAge}
        onChangeText={(text) => setCompanyAge(text)}
      />

      <Text style={styles.label}>Current Supplier:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Current Supplier"
        value={currentSupplier}
        onChangeText={(text) => setCurrentSupplier(text)}
      />

      <Text style={styles.label}>Average Spare Parts Purchase in a Month:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Average Purchase"
        keyboardType='numeric'
        value={monthlyPurchase}
        onChangeText={(text) => setMonthlyPurchase(text)}
      />

      <Text style={styles.label}>Would the Customer Prefer to Have the Items Delivered or Pick Them Up from the Shop?</Text>
      <Dropdown
      style={styles.dropdown1}
      data={deliveryPreferenceOptions}
      onChange={(item) => setDeliveryPreference(item.value)}
      labelField="label"
      valueField="value"
      placeholder={deliveryPreference}
      />
      <Text style={styles.label}>Salesperson Assigned:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Salesperson"
        value={salesperson}
        onChangeText={(text) => setSalesperson(text)}
      />

      <Text style={styles.label}>Expected Monthly Purchase:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Expected Monthly Purchase"
        value={expectedMonthlyPurchase}
        keyboardType='numeric'
        onChangeText={(text) => setExpectedMonthlyPurchase(text)}
      />

      <Text style={styles.label}>Payment Terms Agreed with Supplier:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Payment Terms"
        value={paymentTerms}
        onChangeText={(text) => setPaymentTerms(text)}
      />

      <Text style={styles.label}>Agreed Credit Period(in Days):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Credit Period "
        value={creditPeriodLimit}
        keyboardType='numeric'
        onChangeText={(text) => setCreditPeriodLimit(text)}
      />

<Text style={styles.label}>Agreed Credit Limit(in Days):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Credit Limit"
        value={creditLimit}
        keyboardType='numeric'
        onChangeText={(text) => setCreditLimit(text)}
      />

      <TouchableOpacity style={styles.button}
       onPress={handleDonePress}
       >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity></View>
    </View></ScrollView></View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // paddingTop:50,
    width:370,
    backgroundColor:"#fff",
    marginLeft:20

  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  mapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapButton: {
    backgroundColor: '#ffa600',
    padding: 10,
    borderRadius: 8,
    marginLeft: 20,
    marginBottom:15 // Adjust the spacing as needed
  },
  selectLocationButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: .5,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ffa600',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  map: {
    height: 300, // You can adjust the height as needed
    margintop:50,
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: .5,
    // borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
    selectLocationButton: {
    backgroundColor: '#00b38b',
    padding: 10,
    marginTop:100,
    marginLeft:125,
    width:100,
    borderRadius: 5,
  },
okButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
  },
  labeldrop: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight:"800"
  },
  inputloc: {
    height: 40,
    borderWidth: .5,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    width:275
  },container2:{
    height:1700,
    backgroundColor:"#fff"
  },dropdown1: {
    backgroundColor: 'white',
    borderWidth: .5,
    // borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    marginTop:5
  },button22: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffa600",
    },
headertitle: {
    marginLeft: 34,
    fontSize: 15,
    color: "white"
    },
    labelmain: {
    fontSize: 16,
    marginBottom: 5,
  fontWeight:"800"}});
export default NewMarketStudies;