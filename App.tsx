// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreenWithProvider from './src/domain/Chat/ChatScreenWithProvider';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TUFO Finacial Advisor"
          component={ChatScreenWithProvider}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
