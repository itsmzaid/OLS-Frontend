import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

const RiderLogin = ({navigation}: any) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const validUsername = 'olsrider';
  const validPassword = '12345678';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    const {username, password} = formData;
    if (username === validUsername && password === validPassword) {
      navigation.navigate('RiderHome');
    } else {
      Alert.alert(
        'Invalid Credentials',
        'Please enter correct Username and Password.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/RiderLogin.png')}
        style={styles.topImage}
        resizeMode="cover"
      />
      <View style={styles.mask} />

      <Text style={styles.heading}>Welcome!</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#1398D0"
          value={formData.username}
          onChangeText={value => handleInputChange('username', value)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#1398D0"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={value => handleInputChange('password', value)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.iconContainer}>
            <Image
              source={
                showPassword
                  ? require('../../../assets/icons/view.png')
                  : require('../../../assets/icons/hide.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.loginButton,
          {opacity: formData.username && formData.password ? 1 : 0.7},
        ]}
        onPress={handleLogin}
        disabled={!formData.username || !formData.password}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RiderLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#38B5EA',
    opacity: 0.1,
  },
  topImage: {
    width: '100%',
    height: '40%',
  },
  heading: {
    fontSize: 28,
    color: '#1398D0',
    fontFamily: 'Montserrat-ExtraBold',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  loginText: {
    fontSize: 22,
    color: '#1398D0',
    fontFamily: 'Montserrat-ExtraBold',
    marginHorizontal: 15,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#1398D0',
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#1398D0',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#1398D0',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1398D0',
    fontFamily: 'Montserrat-Regular',
  },
  iconContainer: {
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#1398D0',
  },
  loginButton: {
    backgroundColor: '#1398D0',
    paddingVertical: 15,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  loginButtonText: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
  },
});
