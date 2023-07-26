// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RouteListScreen from './src/screens/RouteListScreen';
import MapScreen from './src/screens/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RouteList">
        <Stack.Screen 
          name="RouteList" 
          component={RouteListScreen} 
          options={{ headerShown: false }}  // añadido para ocultar la cabecera en RouteListScreen
        />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
