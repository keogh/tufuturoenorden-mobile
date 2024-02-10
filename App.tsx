// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreenWithProvider from './src/domain/Chat/ChatScreenWithProvider';
import { AuthProvider } from './src/domain/Auth/AuthContext';
import { DatabaseProvider } from './src/domain/Database/DatabaseContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <DatabaseProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="TUFO Finacial Advisor"
              component={ChatScreenWithProvider}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </DatabaseProvider>
  );
}

export default App;
