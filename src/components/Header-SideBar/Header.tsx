import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Sidebar from './Sidebar';

type HeaderProps = {
  navigation: any;
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {isSidebarOpen && (
        <View style={styles.sidebarOverlay}>
          <Sidebar
            onClose={() => setIsSidebarOpen(false)}
            navigation={navigation}
          />
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setIsSidebarOpen(!isSidebarOpen)}
          style={styles.menuButton}>
          <Image
            source={
              isSidebarOpen
                ? require('../../assets/icons/close.png') // Cross Icon when open
                : require('../../assets/icons/menu.png') // Menu Icon when closed
            }
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../../assets/icons/cart.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  menuButton: {
    zIndex: 1000,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Header;
