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
import {loginUser} from '../../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserLoginProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const UserLogin: React.FC<UserLoginProps> = ({navigation}) => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleLogin = async () => {
    const {email, password} = formData;

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    setLoading(true); // ✅ Start loading
    try {
      const response = await loginUser(email, password);

      if (response.idToken) {
        // ✅ Token store karna
        await AsyncStorage.setItem('userToken', response.idToken);
        console.log('Token stored successfully');

        navigation.navigate('UserHome');
      } else {
        Alert.alert(
          'Invalid Credentials',
          'Please enter correct Email and Password.',
        );
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/userLoginSignUp.png')}
        style={styles.topImage}
        resizeMode="contain"
      />
      <View style={styles.mask} />

      <Text style={styles.heading}>Welcome!</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity>
          <Text style={styles.activeText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserSignUp')}>
          <Text style={styles.inactiveText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#1398D0"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={value => handleInputChange('email', value)}
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
          {opacity: formData.email && formData.password ? 1 : 0.7},
        ]}
        onPress={handleLogin}
        disabled={!formData.email || !formData.password || loading}>
        <Text style={styles.loginButtonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserLogin;

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
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  activeText: {
    fontSize: 22,
    color: '#1398D0',
    fontFamily: 'Montserrat-ExtraBold',
    marginHorizontal: 15,
    opacity: 0.7,
  },
  inactiveText: {
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
