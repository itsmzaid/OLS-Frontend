import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Header from '../../components/Header-SideBar/Header';

const PaymentMethod = ({navigation}: any) => {
  const [cardExpanded, setCardExpanded] = useState(true);
  const [isCOD, setIsCOD] = useState(false);
  const subtotal = 820;
  const deliveryCharges = 150;
  const total = subtotal + deliveryCharges;

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/back-button.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
      </View>

      <TouchableOpacity
        style={styles.cardSection}
        onPress={() => setCardExpanded(!cardExpanded)}>
        <View style={styles.cardTitleContainer}>
          <Image
            source={require('../../assets/icons/card.png')}
            style={styles.icon}
          />
          <Text style={styles.sectionTitle}>Credit/Debit Card</Text>
        </View>
        <Image
          source={require('../../assets/icons/dropdown.png')}
          style={[
            styles.dropdownIcon,
            !cardExpanded && {transform: [{rotate: '180deg'}]},
          ]}
        />
      </TouchableOpacity>

      {cardExpanded && (
        <View style={styles.cardForm}>
          <Text style={styles.infoText}>
            This feature will be available soon.
          </Text>
          <TextInput
            placeholder="Card Name"
            style={styles.input}
            placeholderTextColor="#888"
            editable={false}
          />
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Card Number"
              style={[styles.input, {flex: 1}]}
              placeholderTextColor="#888"
              editable={false}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              placeholder="MM/YY"
              style={[styles.input, styles.smallInput]}
              placeholderTextColor="#888"
              editable={false}
            />
            <TextInput
              placeholder="CVC"
              style={[styles.input, styles.smallInput]}
              placeholderTextColor="#888"
              editable={false}
            />
          </View>
        </View>
      )}

      <Pressable style={styles.codContainer} onPress={() => setIsCOD(!isCOD)}>
        <View style={[styles.checkbox, isCOD && styles.checkboxChecked]}>
          {isCOD && <View style={styles.checkboxInner} />}
        </View>
        <Text style={styles.codText}>Cash on Delivery</Text>
        <Image
          source={require('../../assets/icons/cod.png')}
          style={styles.codIcon}
        />
      </Pressable>

      <View style={styles.bottomContainer}>
        <View style={styles.priceDetails}>
          <Text style={styles.priceTitle}>Price details</Text>
          <View style={styles.priceBox}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>RS: {subtotal}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Charges</Text>
              <Text style={styles.priceValue}>RS: {deliveryCharges}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, styles.totalLabel]}>Total</Text>
              <Text style={[styles.priceValue, styles.totalValue]}>
                RS: {total}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate('ConfirmOrder')}>
          <Text style={styles.confirmText}>Order Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  cardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#004E70',
    marginLeft: 10,
  },
  dropdownIcon: {
    width: 28,
    height: 28,
  },
  cardForm: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
    fontFamily: 'Montserrat-Medium',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    width: '48%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  codContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  codText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#004E70',
    flex: 1,
  },
  codIcon: {
    width: 32,
    height: 32,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#004E70',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#004E70',
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  priceDetails: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  priceTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#004E70',
    marginBottom: 10,
  },
  priceBox: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#1398D0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  confirmText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },

  priceLabel: {
    fontSize: 16,
    color: '#004E70',
    fontFamily: 'Montserrat-Medium',
  },
  priceValue: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#004E70',
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#004E70',
  },
});

export default PaymentMethod;
