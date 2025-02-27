import {createStackNavigator} from '@react-navigation/stack';
import {screens} from './ScreenConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'UserHome' : 'UserHome'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Disable swipe gestures to go back
      }}>
      {Object.entries(screens).map(([name, {component, options}]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AppNavigator;
