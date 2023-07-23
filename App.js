import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RouteListScreen from './screens/RouteListScreen.js';
import MapScreen from './screens/MapScreen.js';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RouteList"
          component={RouteListScreen}
          options={{ title: 'Lista de Rutas' }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'Mapa de Ruta' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
