import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

const RiderStart = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/riderStart.png')}
        style={styles.background}
        resizeMode="contain">
        <View style={styles.mask} />

        <View style={styles.topContainer}>
          <Text style={styles.heading}>Let’s Get Started</Text>
          <Text style={styles.paragraph}>
            Ride with purpose, own the journey. We’ve got your back every step
            of the way!
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('RiderLogin')}>
            <Text style={styles.buttonText}>Login</Text>
            <Image
              source={require('../../../assets/images/UserLogin.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RiderStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#38B5EA',
    opacity: 0.1,
  },
  topContainer: {
    marginTop: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 38,
    color: '#1398D0',
    textAlign: 'center',
    fontFamily: 'Montserrat-ExtraBold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 18,
    color: '#1398D0',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    paddingRight: 20,
    paddingLeft: 20,
  },
  bottomContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1398D0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
    width: '70%',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});
