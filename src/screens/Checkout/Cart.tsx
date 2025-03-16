import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Header from '../../components/Header-SideBar/Header';
import {getPendingOrder, updateOrderStatus} from '../../api/order';

const getIcon = (name: string) => {
  const icons: {[key: string]: any} = {
    't-shirt': require('../../assets/icons/tshirt.png'),
    hoodie: require('../../assets/icons/hoodie.png'),
    jean: require('../../assets/icons/jeans.png'),
    jacket: require('../../assets/icons/jacket.png'),
    towel: require('../../assets/icons/towel.png'),
    dress: require('../../assets/icons/dress.png'),
  };
  return icons[name.toLowerCase()] || require('../../assets/icons/hoodie.png');
};

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

type CartItem = {
  itemName: string;
  serviceName: string;
  price: number;
  quantity: number;
};

const Cart = ({navigation}: any) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryCharges, setDeliveryCharges] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await getPendingOrder();
      console.log('Response:', response);

      setCartItems(response.orderItems);
      setDeliveryCharges(response.deliveryCharges);
      setOrderId(response.orderId); // Store order ID

      const calculatedSubtotal = response.orderItems.reduce(
        (acc: number, item: CartItem) => acc + item.price * item.quantity,
        0,
      );
      setSubtotal(calculatedSubtotal);
      setTotal(calculatedSubtotal + response.deliveryCharges);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch cart items');
    }
  };

  const handleProceedToPayment = async () => {
    if (!orderId) {
      Alert.alert('Error', 'Order ID not found');
      return;
    }

    try {
      await updateOrderStatus(orderId, 'Confirmed');
      navigation.navigate('PaymentMethod');
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status');
    }
  };

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
        <Text style={styles.title}>Checkout</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.cartItem}>
            <Image source={getIcon(item.itemName)} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>
                {capitalizeFirstLetter(item.itemName)}
              </Text>
              <Text style={styles.itemType}>{item.serviceName}</Text>
            </View>
            <View style={styles.priceDetails}>
              <Text style={styles.itemPrice}>RS: {item.price}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.priceContainer}>
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
        style={styles.proceedButton}
        onPress={handleProceedToPayment}>
        <Text style={styles.proceedText}>Proceed to payment ➤</Text>
      </TouchableOpacity>
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
  cartList: {
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#004E70',
  },
  itemType: {
    fontSize: 14,
    color: '#1398D0',
    fontFamily: 'Montserrat-Medium',
  },
  priceDetails: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#004E70',
  },
  priceContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
  priceLabel: {
    fontSize: 16,
    color: '#004E70',
    fontFamily: 'Montserrat-Medium',
  },
  priceValue: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
  },
  proceedButton: {
    backgroundColor: '#1398D0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  proceedText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
});

export default Cart;
