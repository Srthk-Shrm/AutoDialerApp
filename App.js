import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DialerScreen from './screens/DialerScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dialer" component={DialerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
