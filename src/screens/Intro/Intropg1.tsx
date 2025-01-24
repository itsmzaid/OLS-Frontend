import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ImageBackground} from 'react-native';

const Intropg1 = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/intro1BG.png')}
        style={styles.background}
        resizeMode="contain">
        <View style={styles.mask} />

        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.logoText}>Laundry Service</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Intropg2')}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Intropg1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#38B5EA',
    opacity: 0.1,
  },
  logo: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 50,
  },
  logoText: {
    position: 'absolute',
    top: 130,
    fontSize: 30,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#1398D0',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#1398D0',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
});
