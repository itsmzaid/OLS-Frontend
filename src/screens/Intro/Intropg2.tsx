import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const Intropg2 = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.mask} />
      <Image
        source={require('../../assets/images/intro2BG.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.heading}>Continue As</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserStart')}>
          <Image
            source={require('../../assets/images/userIcon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RiderStart')}>
          <Image
            source={require('../../assets/images/riderIcon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.buttonText}>User</Text>
        <Text style={styles.buttonText}>Rider</Text>
      </View>

      <Text style={styles.footerText}>Save time, wear clean!</Text>
    </View>
  );
};

export default Intropg2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#38B5EA',
    opacity: 0.1,
  },
  image: {
    width: '100%',
    height: '40%',
  },
  heading: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 36,
    color: '#1398D0',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#1398D0',
    width: 130,
    height: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  icon: {
    width: 70,
    height: 70,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '58%',
    marginTop: 5,
  },
  buttonText: {
    fontSize: 30,
    color: '#1398D0',
    fontFamily: 'Montserrat-ExtraBold',
  },
  footerText: {
    fontSize: 24,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#1398D0',
    position: 'absolute',
    bottom: 40,
  },
});
