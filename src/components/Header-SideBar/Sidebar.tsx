import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

type SidebarProps = {
  onClose: () => void;
  navigation: any; // This allows you to use navigation here if needed
};

const Sidebar: React.FC<SidebarProps> = ({onClose, navigation}) => {
  const handleLogout = async () => {
    // Remove the token from AsyncStorage on logout
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('UserLogin'); // Redirect to login screen after logout
  };

  return (
    <View style={styles.sidebarContainer}>
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Manage Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.copyrightText}>copyright © 2025 OLS</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sidebar: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: '70%',
    height: '100%',
    backgroundColor: '#1398D0',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },

  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  menuText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  logoutButton: {
    marginTop: 'auto',
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff50',
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  copyrightText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    top: 10,
  },
});

export default Sidebar;
