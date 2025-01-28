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
import {registerUser} from '../../../utils/api';

type UserSignUpProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const UserSignUp: React.FC<UserSignUpProps> = ({navigation}) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phoneNo: string;
    password: string;
  }>({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    phoneNo: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'phoneNo') {
      let formattedPhoneNo = value.replace(/[^0-9]/g, '');

      if (formattedPhoneNo.startsWith('03')) {
        formattedPhoneNo = '+92' + formattedPhoneNo.slice(1);
      } else if (
        formattedPhoneNo.startsWith('3') &&
        formattedPhoneNo.length === 10
      ) {
        formattedPhoneNo = '+92' + formattedPhoneNo;
      }

      setFormData(prev => ({
        ...prev,
        phoneNo: formattedPhoneNo,
      }));

      if (!/^\+923\d{9}$/.test(formattedPhoneNo)) {
        setErrors(prev => ({
          ...prev,
          phoneNo:
            'Phone number must start with +923 and be followed by 9 digits.',
        }));
      } else {
        setErrors(prev => ({...prev, phoneNo: ''}));
      }
    }

    if (field === 'password') {
      const messages: string[] = [];
      if (!/[A-Z]/.test(value)) messages.push('at least 1 uppercase letter');
      if (!/[a-z]/.test(value)) messages.push('at least 1 lowercase letter');
      if (!/\d/.test(value)) messages.push('at least 1 digit');
      if (value.length < 8 || value.length > 20)
        messages.push('between 8 and 20 characters');

      setErrors(prev => ({
        ...prev,
        password:
          messages.length > 0
            ? `Password must include ${messages.join(', ')}.`
            : '',
      }));
    }
  };

  const handleSignUp = async () => {
    const {name, email, phoneNo, password} = formData;

    if (!name || !email || !phoneNo || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (errors.phoneNo || errors.password) {
      Alert.alert('Error', 'Please fix the validation errors.');
      return;
    }

    try {
      const signUpData = {
        name,
        email,
        phoneNo,
        password,
      };

      console.log('Sending signup data to backend:', signUpData);
      if (await registerUser(signUpData)) {
        Alert.alert('Success', 'User registered successfully!');
        navigation.navigate('UserHome');
      }
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
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
          <Text style={styles.activeText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserLogin')}>
          <Text style={styles.inactiveText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#1398D0"
          value={formData.name}
          onChangeText={value => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#1398D0"
          value={formData.email}
          onChangeText={value => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number (e.g., 3XXXXXXXXX)"
          placeholderTextColor="#1398D0"
          keyboardType="phone-pad"
          value={formData.phoneNo}
          onChangeText={value => handleInputChange('phoneNo', value)}
        />
        {errors.phoneNo ? (
          <Text style={styles.errorText}>{errors.phoneNo}</Text>
        ) : null}

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
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#38B5EA',
    opacity: 0,
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
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#1398D0',
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#1398D0',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#1398D0',
    marginBottom: 10,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  signupButton: {
    backgroundColor: '#1398D0',
    paddingVertical: 15,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
  },
});
