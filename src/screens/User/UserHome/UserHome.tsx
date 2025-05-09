import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import Sidebar from '../../../components/Header-SideBar/Sidebar';
import {getConfirmedOrders} from '../../../api/order';
import {useLoader} from '../../../context/LoaderContext';

type Order = {
  orderId: string;
  orderNumber: string;
  status: string;
};

const UserHome: React.FC<{navigation: any}> = ({navigation}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const {showLoader, hideLoader} = useLoader(); // Loader context

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      showLoader(); // Loader Start
      try {
        const data = await getConfirmedOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch confirmed orders:', error);
      } finally {
        hideLoader(); // Loader Stop
      }
    };
    fetchOrders();
  }, []);

  const handleOrderHistory = () => {
    navigation.navigate('OrderHistory');
  };

  return (
    <View style={styles.container}>
      {isSidebarOpen && (
        <View style={styles.sidebarOverlay}>
          <Sidebar
            onClose={() => setIsSidebarOpen(false)}
            navigation={navigation}
          />
        </View>
      )}

      <View style={styles.header}>
        <View style={styles.header_nav}>
          <TouchableOpacity
            onPress={() => setIsSidebarOpen(!isSidebarOpen)}
            style={styles.menuButton}>
            <Image
              source={
                isSidebarOpen
                  ? require('../../../assets/icons/close.png')
                  : require('../../../assets/icons/HomeMenu.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../../../assets/icons/HomeCart.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../../../assets/images/userIcon.png')}
            style={styles.welcomeIcon}
          />
          <Text style={styles.welcomeText}>Welcome, Zaid!</Text>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={styles.servicesTitle}>Services</Text>
        <View style={styles.servicesIcons}>
          <TouchableOpacity
            style={styles.serviceBox}
            onPress={() => navigation.navigate('Wash')}>
            <Image
              source={require('../../../assets/icons/wash1.png')}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceText}>Wash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.serviceBox}
            onPress={() => navigation.navigate('Iron')}>
            <Image
              source={require('../../../assets/icons/iron1.png')}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceText}>Iron</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.serviceBox}
            onPress={() => navigation.navigate('DryClean')}>
            <Image
              source={require('../../../assets/icons/dry1.png')}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceText}>Dry Clean</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.serviceBox}
            onPress={() => navigation.navigate('FullService')}>
            <Image
              source={require('../../../assets/icons/fullwash1.png')}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceText}>Full Clean</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={styles.activeOrdersContainer}>
          <View style={styles.activeOrdersHeader}>
            <Text style={styles.activeOrdersTitle}>
              Active Orders ({orders.length})
            </Text>
            <TouchableOpacity
              style={styles.orderHistoryButton}
              onPress={handleOrderHistory}>
              <Text style={styles.orderHistoryText}>Order History</Text>
            </TouchableOpacity>
          </View>

          {/* Orders List */}
          <View style={styles.ordersList}>
            {orders.length > 0 ? (
              orders.map(order => (
                <View key={order.orderId} style={styles.orderCard}>
                  <Text style={styles.orderNumber}>
                    Order No: {order.orderNumber}
                  </Text>
                  <Text style={styles.orderStatus}>
                    Order Status: {order.status}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noOrdersText}>
                There are no active orders at the moment.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
  header: {
    backgroundColor: '#1398D0',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 30,
    paddingTop: 20,
    height: 220,
    paddingHorizontal: 20,
  },
  header_nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    zIndex: 1000,
  },
  icon: {
    width: 40,
    height: 40,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  welcomeIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
  },
  servicesContainer: {
    marginTop: -60,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  servicesTitle: {
    fontSize: 20,
    color: '#1398D0',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
  servicesIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serviceBox: {
    alignItems: 'center',
  },
  serviceIcon: {
    width: 50,
    height: 50,
  },
  serviceText: {
    fontSize: 14,
    color: '#004E70',
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5,
  },
  activeOrdersContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  activeOrdersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  activeOrdersTitle: {
    fontSize: 22,
    color: '#004E70',
    fontFamily: 'Montserrat-Bold',
  },
  orderHistoryButton: {
    backgroundColor: '#1398D0',

    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
  },
  orderHistoryText: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
  },
  ordersList: {
    gap: 10,
  },
  orderCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderNumber: {
    fontSize: 16,
    color: '#1398D0',
    fontFamily: 'Montserrat-Bold',
  },
  orderStatus: {
    fontSize: 14,
    color: '#004E70',
    fontFamily: 'Montserrat-Medium',
    marginTop: 5,
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    fontFamily: 'Montserrat-Medium',
  },
});
