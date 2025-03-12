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
import {useOrder} from '../../context/OrderContext';

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

const Wash = ({navigation}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const {selectedItems, addItem, removeItem} = useOrder();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchServiceItems('wash');
      const updatedData = data.map((item: any, index: number) => ({
        ...item,
        id: item.id ? String(item.id) : `temp-${index}`,
      }));

      setProducts(updatedData);
      resetQuantities(updatedData);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const resetQuantities = (data: Product[]) => {
    const initialQuantities: {[key: string]: number} = {};
    data.forEach(item => {
      initialQuantities[item.id] = 0;
    });
    setQuantities(initialQuantities);
  };

  const handleIncrease = (item: Product) => {
    addItem({
      itemId: item.id,
      itemName: item.name,
      serviceName: 'wash',
      quantity: 1,
      price: item.price,
    });

    setQuantities(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleDecrease = (itemId: string) => {
    removeItem(itemId, true);
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const handleNext = () => {
    if (selectedItems.length > 0) {
      resetQuantities(products);
      navigation.navigate('DeliveryDetails', {selectedItems});
    }
  };

  const renderItem = ({item}: {item: Product}) => {
    const quantity = quantities[item.id] || 0;

    return (
      <View style={styles.itemContainer}>
        <Image source={getIcon(item.name)} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>
            {capitalizeFirstLetter(item.name)}
          </Text>
          <Text style={styles.itemPrice}>RS: {item.price}</Text>
        </View>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={[styles.counterButton]}
            onPress={() => handleDecrease(item.id)}
            disabled={quantity === 0}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => handleIncrease(item)}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
          <Text style={styles.header}>Wash Services</Text>
        </View>

        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <TouchableOpacity
          style={[
            styles.pickupButton,
            selectedItems.length === 0 && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={selectedItems.length === 0}>
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
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  pickupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
});

export default Wash;
