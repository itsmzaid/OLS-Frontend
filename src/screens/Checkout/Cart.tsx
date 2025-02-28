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

// Function to get an icon based on the product name
const getIcon = (name: string) => {
  const icons: {[key: string]: any} = {
    Hoodie: require('../../assets/icons/hoodie.png'),
    'T-Shirt': require('../../assets/icons/tshirt.png'),
    Jean: require('../../assets/icons/jeans.png'),
    Jacket: require('../../assets/icons/jacket.png'),
    Towel: require('../../assets/icons/towel.png'),
    Dress: require('../../assets/icons/dress.png'),
  };
  return icons[name] || require('../../assets/icons/hoodie.png');
};

type CartItem = {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
};

const Cart = ({navigation}: any) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart data from backend (Dummy for now)
  const fetchCartItems = async () => {
    try {
      // Simulating backend response
      const dummyData: CartItem[] = [
        {id: '1', name: 'T-Shirt', type: 'Wash', price: 180, quantity: 3},
        {id: '2', name: 'Dress', type: 'Iron', price: 240, quantity: 2},
        {id: '3', name: 'Jacket', type: 'Dry', price: 400, quantity: 2},
      ];
      setCartItems(dummyData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch cart items');
    }
  };

  // Function to update quantity in backend (Simulated)
  const updateCartInBackend = async (id: string, newQuantity: number) => {
    try {
      console.log(`Updating cart item ${id} to quantity ${newQuantity}`);
      // Simulating a backend update
    } catch (error) {
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  const handleIncrease = (id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
    updateCartInBackend(
      id,
      cartItems.find(item => item.id === id)!.quantity + 1,
    );
  };

  const handleDecrease = (id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 0
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
    updateCartInBackend(
      id,
      cartItems.find(item => item.id === id)!.quantity - 1,
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryCharges = 150;
  const total = subtotal + deliveryCharges;

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {/* Title */}
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/back-button.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.cartItem}>
            <Image source={getIcon(item.name)} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemType}>{item.type}</Text>
              <Text style={styles.itemPrice}>RS: {item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => handleDecrease(item.id)}>
                <Text style={styles.quantityButton}>➖</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrease(item.id)}>
                <Text style={styles.quantityButton}>➕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.cartList}
      />

      {/* Price Details */}
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

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton}>
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
    fontSize: 12,
    color: '#888',
    fontFamily: 'Montserrat-Medium',
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 22,
    color: '#1398D0',
    marginHorizontal: 10,
  },
  quantityText: {
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
    color: '#1398D0',
  },

  totalValue: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
  },

  priceDetails: {
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
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
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
