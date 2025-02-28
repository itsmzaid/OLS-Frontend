import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header-SideBar/Header';

type Service = {
  id: string;
  name: string;
  price: number;
  image: any;
};

const services: Service[] = [
  {
    id: '1',
    name: 'Hoodie',
    price: 100,
    image: require('../../assets/icons/hoodie.png'),
  },
  {
    id: '2',
    name: 'T-Shirt',
    price: 80,
    image: require('../../assets/icons/tshirt.png'),
  },
  {
    id: '3',
    name: 'Jean',
    price: 120,
    image: require('../../assets/icons/jeans.png'),
  },
  {
    id: '4',
    name: 'Jacket',
    price: 250,
    image: require('../../assets/icons/jacket.png'),
  },
  {
    id: '5',
    name: 'Towel',
    price: 200,
    image: require('../../assets/icons/towel.png'),
  },
  {
    id: '6',
    name: 'Dress',
    price: 220,
    image: require('../../assets/icons/dress.png'),
  },
];

const FullService = ({navigation}: any) => {
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  const handleIncrease = (id: string) => {
    setQuantities(prev => ({...prev, [id]: (prev[id] || 0) + 1}));
  };

  const handleDecrease = (id: string) => {
    setQuantities(prev => ({...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0}));
  };

  const handleSchedulePickup = async () => {
    const selectedItems = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const service = services.find(service => service.id === id);
        return service
          ? {id: service.id, name: service.name, price: service.price, quantity}
          : null;
      })
      .filter(item => item !== null);

    if (selectedItems.length === 0) {
      alert('Please select at least one item before scheduling a pickup.');
      return;
    }

    try {
      const response = await fetch('https://your-backend-api.com/Order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: selectedItems,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Order placed successfully!');
        navigation.navigate('DeliveryDetails', {selectedItems});
      } else {
        alert(`Failed to Place Order: ${result.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const renderItem = ({item}: {item: Service}) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>RS: {item.price}</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => handleDecrease(item.id)}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{quantities[item.id] || 0}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => handleIncrease(item.id)}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('UserHome')}>
            <Image
              source={require('../../assets/icons/back-button.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Full Clean Services</Text>
        </View>

        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.pickupButton}
          onPress={() => navigation.navigate('DeliveryDetails')}>
          <Text style={styles.pickupButtonText}>Schedule a Pickup</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 28,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#1398D0',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#004E70',
  },
  itemPrice: {
    fontSize: 13,
    color: '#1398D0',
    fontFamily: 'Montserrat-Medium',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#1398D0',
    padding: 2,
    borderRadius: 10,
    width: 30,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  counterText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraBold',
  },
  counterValue: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
  },
  pickupButton: {
    backgroundColor: '#1398D0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  pickupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
});

export default FullService;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
