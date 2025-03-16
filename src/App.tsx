import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {OrderProvider} from './context/OrderContext';
import {LoaderProvider} from './context/LoaderContext';

const App = () => {
  return (
    <LoaderProvider>
      <OrderProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </OrderProvider>
    </LoaderProvider>
  );
};

export default App;
