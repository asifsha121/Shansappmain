import React, { useEffect,useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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

const CustomerDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const handleEditPress = () => {
    // Navigate to the EditScreen with the item data
    navigation.navigate('Marketstudy', { item });
  };
  const [updatedItem, setUpdatedItem] = useState(item);

  // Function to update delivery_preference if needed
  const updateDeliveryPreference = () => {
    // Check if delivery_preference is equal to '   Enter Preferences' (with extra spaces)
    if (item.delivery_preference.trim() === 'Enter Preferences') {
      // Update item.delivery_preference to an empty string
      setUpdatedItem(prevItem => ({
        ...prevItem,
        delivery_preference: '',
      }));
    }
  };
  // Call the function to update delivery_preference
  useEffect(() => {
    updateDeliveryPreference();
  }, []);
  return (
    <View><CustomButton title="Customer Details"  onPress={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Customer Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Customer Name:</Text>
          <Text style={styles.detailText}>{item.customer_name}</Text>

          <Text style={styles.detailLabel}>Company Name:</Text>
          <Text style={styles.detailText}>{item.company_name}</Text>

          <Text style={styles.detailLabel}>Type of Industry:</Text>
          <Text style={styles.detailText}>{item.industry_type}</Text>
          <Text style={styles.detailLabel}>Contact Number:</Text>
          <Text style={styles.detailText}>{item.contact_number}</Text>

          <Text style={styles.detailLabel}>WhatsApp Number:</Text>
          <Text style={styles.detailText}>{item.whatsapp_number}</Text>

          <Text style={styles.detailLabel}>Emirate:</Text>
          <Text style={styles.detailText}>{item.emirate}</Text>

          <Text style={styles.detailLabel}>Location Map:</Text>
          <Text style={styles.detailText}>{item.location_map}</Text>

          <Text style={styles.detailLabel}>Products/Services Required:</Text>
          <Text style={styles.detailText}>{item.products_services_required}</Text>

          <Text style={styles.detailLabel}>Contact Person:</Text>
          <Text style={styles.detailText}>{item.contact_person}</Text>

          <Text style={styles.detailLabel}>Owner's Name:</Text>
          <Text style={styles.detailText}>{item.owners_name}</Text>

          <Text style={styles.detailLabel}>Owner's Contact Number:</Text>
          <Text style={styles.detailText}>{item.owners_contact_number}</Text>

          <Text style={styles.detailLabel}>Number of Staffs:</Text>
          <Text style={styles.detailText}>{item.number_of_staffs}</Text>

          <Text style={styles.detailLabel}>Shop/Company Age:</Text>
          <Text style={styles.detailText}>{item.shop_company_age}</Text>

          <Text style={styles.detailLabel}>Current Supplier:</Text>
          <Text style={styles.detailText}>{item.current_supplier}</Text>

          <Text style={styles.detailLabel}>Average Spare Parts Purchase Per Month:</Text>
          <Text style={styles.detailText}>{item.average_spare_parts_purchase_per_month}</Text>

          <Text style={styles.detailLabel}>Delivery Preference:</Text>
          <Text style={styles.detailText}>{updatedItem.delivery_preference}</Text>

          <Text style={styles.detailLabel}>Salesperson Assigned:</Text>
          <Text style={styles.detailText}>{item.salesperson_assigned}</Text>

          <Text style={styles.detailLabel}>Expected Monthly Purchase:</Text>
          <Text style={styles.detailText}>{item.expected_monthly_purchase}</Text>

          <Text style={styles.detailLabel}>Payment Terms with Supplier:</Text>
          <Text style={styles.detailText}>{item.payment_terms_with_supplier}</Text>

          <Text style={styles.detailLabel}>Agreed Credit Period:</Text>
          <Text style={styles.detailText}>{item.agreed_credit_period}</Text>

          <Text style={styles.detailLabel}>Credit Limit:</Text>
          <Text style={styles.detailText}>{item.credit_limit}</Text>

          <TouchableOpacity style={styles.doneButton} onPress={handleEditPress}>
            <Text style={styles.editButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView></View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    height:1600
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '80%',
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 15,
  },
  doneButton: {
    backgroundColor: "#ffa600",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  button22: {
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
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default CustomerDetails;
