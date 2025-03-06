import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header-SideBar/Header';
import {fetchServiceItems} from '../../api/items';

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getIcon = (name: string) => {
  const icons: {[key: string]: any} = {
    hoodie: require('../../assets/icons/hoodie.png'),
    't-shirt': require('../../assets/icons/tshirt.png'),
    jean: require('../../assets/icons/jeans.png'),
    jacket: require('../../assets/icons/jacket.png'),
    towel: require('../../assets/icons/towel.png'),
    dress: require('../../assets/icons/dress.png'),
  };

  return icons[name.toLowerCase()] || require('../../assets/icons/hoodie.png');
};

type Product = {
  id: string;
  name: string;
  price: number;
};

const FullService = ({navigation}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchServiceItems('fullwash');
      const updatedData = data.map((item: any, index: number) => ({
        ...item,
        id: item.id ? String(item.id) : `temp-${index}`,
      }));

      setProducts(updatedData);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const handleIncrease = (id: string) => {
    setQuantities(prev => ({...prev, [id]: (prev[id] || 0) + 1}));
  };

  const handleDecrease = (id: string) => {
    setQuantities(prev => ({...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0}));
  };

  const isPickupEnabled = Object.values(quantities).some(qty => qty >= 1);

  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.itemContainer}>
      <Image source={getIcon(item.name)} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{capitalizeFirstLetter(item.name)}</Text>
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
          <Text style={styles.header}>Full Wash Services</Text>
        </View>

        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={[
            styles.pickupButton,
            !isPickupEnabled && styles.disabledButton,
          ]}
          onPress={() => {
            if (isPickupEnabled) {
              navigation.navigate('DeliveryDetails');
            }
          }}
          disabled={!isPickupEnabled}>
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
  disabledButton: {
    backgroundColor: '#A9A9A9',
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
