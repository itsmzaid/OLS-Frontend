import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ConfirmOrder = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/icons/Applogo.png')}
          style={styles.logo}
        />
        <Text style={styles.serviceText}>Laundry Service</Text>
      </View>

      <View style={styles.messageContainer}>
        <Image
          source={require('../../assets/icons/check.png')}
          style={styles.checkmark}
        />
        <Text style={styles.confirmationText}>Your Order is Confirmed</Text>
        <Text style={styles.thankYouText}>Thank you for your order</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('UserHome')}
        style={styles.backButton}>
        <Text style={styles.backText}>Back To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  serviceText: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
    marginTop: 5,
    textAlign: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  checkmark: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  confirmationText: {
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
    textAlign: 'center',
  },
  thankYouText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#004E70',
    marginTop: 5,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#1398D0',
    width: '100%',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  backText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
});

export default ConfirmOrder;
