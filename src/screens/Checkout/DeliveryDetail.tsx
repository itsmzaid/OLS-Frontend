import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../components/Header-SideBar/Header';
import {getUserData} from '../../api/user';
import {createOrder} from '../../api/order';
import {useOrder} from '../../context/OrderContext';

const DeliveryDetails = ({navigation}: any) => {
  const {selectedItems, clearOrder} = useOrder(); // Added clearOrder to reset context
  console.log(selectedItems);

  const [formData, setFormData] = useState({
    userEmail: '',
    userName: '',
    userPhoneNo: '',
    address: '',
    pickupDate: new Date(),
    pickupTime: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        setFormData(prev => ({
          ...prev,
          userEmail: userData.email,
          userName: userData.name,
          userPhoneNo: userData.phoneNo,
        }));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (key: string, value: any) => {
    setFormData({...formData, [key]: value});
  };

  const isFormValid =
    formData.userEmail &&
    formData.userName &&
    formData.userPhoneNo &&
    formData.address.trim() !== '';

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const orderData = {
      userEmail: formData.userEmail,
      userName: formData.userName,
      userPhoneNo: formData.userPhoneNo,
      address: formData.address,
      status: 'Pending',
      deliveryCharges: 150,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime.toLocaleTimeString(),
      paymentMethod: 'Cash on Delivery',
      orderItems: selectedItems,
    };

    try {
      setLoading(true);
      await createOrder(orderData);
      clearOrder(); // Clear order context after successful order creation
      setLoading(false);
      navigation.navigate('Cart'); // Navigate after clearing cart
    } catch (error) {
      console.error('Failed to place order:', error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Header navigation={navigation} />

          <View style={styles.Subcontainer}>
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../assets/icons/back-button.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.title}>Delivery Details</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Email"
                placeholderTextColor="#000"
                value={formData.userEmail}
                editable={false}
              />
              <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Name"
                placeholderTextColor="#000"
                value={formData.userName}
                editable={false}
              />
              <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Phone"
                placeholderTextColor="#000"
                value={formData.userPhoneNo}
                editable={false}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Address"
                placeholderTextColor="#000"
                value={formData.address}
                onChangeText={text => handleChange('address', text)}
              />

              <TouchableOpacity
                style={[styles.inputWithIcon, styles.shadow]}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateText}>
                  {formData.pickupDate.toDateString()}
                </Text>
                <Image
                  source={require('../../assets/icons/calendar.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  value={formData.pickupDate}
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) handleChange('pickupDate', date);
                  }}
                />
              )}

              <TouchableOpacity
                style={[styles.inputWithIcon, styles.shadow]}
                onPress={() => setShowTimePicker(true)}>
                <Text style={styles.dateText}>
                  {formData.pickupTime.getHours()}:
                  {formData.pickupTime.getMinutes()}
                </Text>
                <Image
                  source={require('../../assets/icons/clock.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  value={formData.pickupTime}
                  onChange={(event, time) => {
                    setShowTimePicker(false);
                    if (time) handleChange('pickupTime', time);
                  }}
                />
              )}
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                !isFormValid && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid || loading}>
              <Text style={styles.checkoutText}>
                {loading ? 'Placing Order...' : 'Checkout ➤'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  scrollContainer: {flexGrow: 1, justifyContent: 'space-between'},
  Subcontainer: {padding: 20},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {width: 35, height: 35, marginRight: 10},
  title: {fontSize: 24, fontFamily: 'Montserrat-ExtraBold', color: '#1398D0'},
  form: {flex: 1},
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    height: 60,
    color: '#000',
    fontSize: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    height: 60,
  },
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
  },
  dateText: {fontSize: 16, color: '#000'},
  icon: {width: 30, height: 30},
  footer: {paddingHorizontal: 20, paddingBottom: 20, marginTop: 'auto'},
  checkoutButton: {
    backgroundColor: '#1398D0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {color: '#FFF', fontSize: 18, fontFamily: 'Montserrat-Bold'},
  disabledButton: {backgroundColor: '#A9A9A9'},
});

export default DeliveryDetails;
