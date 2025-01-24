import {createStackNavigator} from '@react-navigation/stack';
import {screens} from './ScreenConfig';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Intropg1">
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
