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

const DeliveryDetails = ({navigation}: any) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    phone: '',
    pickupDate: new Date(),
    pickupTime: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        setFormData(prev => ({
          ...prev,
          email: userData.email,
          name: userData.name,
          phone: userData.phoneNo,
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
                value={formData.email}
                editable={false}
              />
              <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Name"
                placeholderTextColor="#000"
                value={formData.name}
                editable={false}
              />
              <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Address"
                placeholderTextColor="#000"
                value={formData.address}
                onChangeText={text => handleChange('address', text)}
              />
              <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Phone"
                placeholderTextColor="#000"
                keyboardType="numeric"
                value={formData.phone}
                editable={false}
              />

              {/* Pickup Date */}
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
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Cart')}>
              <Text style={styles.checkoutText}>Checkout ➤</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  Subcontainer: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#1398D0',
  },
  form: {
    flex: 1,
  },
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
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    width: 30,
    height: 30,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 'auto',
  },
  checkoutButton: {
    backgroundColor: '#1398D0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
});

export default DeliveryDetails;
