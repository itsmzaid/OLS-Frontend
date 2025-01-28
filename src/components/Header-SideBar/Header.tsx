import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Sidebar from './Sidebar';

type HeaderProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
          <Image
            source={require('../../assets/icons/HomeMenu.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../../assets/icons/HomeCart.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Header;
