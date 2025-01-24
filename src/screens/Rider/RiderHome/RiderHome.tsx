import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

const RiderHome = () => {
  const [selectedTab, setSelectedTab] = useState('Pickup'); // Default to Pickup tab
  const [statusTab, setStatusTab] = useState('Active');

  // Dummy data for orders
  const pickupOrders = [
    {id: '1001', description: 'Pickup from Restaurant A'},
    {id: '1002', description: 'Pickup from Shop B'},
    {id: '1003', description: 'Pickup from Store C'},
  ];

  const deliveryOrders = [
    {id: '2001', description: 'Deliver to Customer X'},
    {id: '2002', description: 'Deliver to Customer Y'},
    {id: '2003', description: 'Deliver to Customer Z'},
  ];

  const orders = selectedTab === 'Pickup' ? pickupOrders : deliveryOrders;

  const handleCardPress = (orderId: string) => {
    if (statusTab === 'Active') {
      Alert.alert('Order Selected', `You clicked on Order #${orderId}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerNav}>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/icons/HomeMenu.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/icons/wallet.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userDetails}>
            <Image
              source={require('../../../assets/images/userIcon.png')}
              style={styles.personIcon}
            />
            <Text style={styles.userName}>Ali Yasin</Text>
          </View>
        </View>
        <View>
          <Text style={styles.userBalance}>Current Balance</Text>
          <Text style={styles.balanceAmount}>
            {statusTab === 'Active' ? 'Rs 948.48' : 'Rs -----'}
          </Text>
        </View>
        {/* Tabs Section */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Delivery' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('Delivery')}>
              <Text
                style={
                  selectedTab === 'Delivery'
                    ? styles.activeTabText
                    : styles.tabText
                }>
                Delivery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Pickup' && styles.activeTab]}
              onPress={() => setSelectedTab('Pickup')}>
              <Text
                style={
                  selectedTab === 'Pickup'
                    ? styles.activeTabText
                    : styles.tabText
                }>
                Pickup
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tab, statusTab === 'Inactive' && styles.activeTab]}
              onPress={() => setStatusTab('Inactive')}>
              <Text
                style={
                  statusTab === 'Inactive'
                    ? styles.activeTabText
                    : styles.tabText
                }>
                Inactive
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, statusTab === 'Active' && styles.activeTab]}
              onPress={() => setStatusTab('Active')}>
              <Text
                style={
                  statusTab === 'Active' ? styles.activeTabText : styles.tabText
                }>
                Active
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Orders Section */}
      <View style={styles.ordersContainer}>
        <Text style={styles.ordersTitle}>
          {selectedTab === 'Pickup' ? 'Pickup Orders' : 'Delivery Orders'}
        </Text>
        <ScrollView style={styles.ordersList}>
          {orders.map(order => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              activeOpacity={0.7}
              onPress={() => handleCardPress(order.id)}
              disabled={statusTab !== 'Active'}>
              <Text style={styles.orderNumber}>Order No: #{order.id}</Text>
              <Text style={styles.orderDescription}>{order.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default RiderHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    backgroundColor: '#1398D0',
    height: '40%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 20,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 30,
    height: 30,
  },
  userInfo: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  userName: {
    fontSize: 24,
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
  },
  userBalance: {
    marginTop: 20,
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
  },
  balanceAmount: {
    fontSize: 24,
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
  },
  tabsContainer: {
    marginTop: 20,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#D2D2D2',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#FFF',
  },
  tabText: {
    color: '#1398D0',
    fontFamily: 'Montserrat-Bold',
  },
  activeTabText: {
    color: '#1398D0',
    fontFamily: 'Montserrat-Bold',
  },
  ordersContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  ordersTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
    marginBottom: 15,
  },
  ordersList: {
    flex: 1,
  },
  orderCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderNumber: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#1398D0',
  },
  orderDescription: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#333',
    marginVertical: 5,
  },
});
