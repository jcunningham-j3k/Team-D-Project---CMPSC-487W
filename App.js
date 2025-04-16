// expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

// npm install react-native-linear-gradient
// npx expo install react-native-gifted-charts expo-linear-gradient react-native-svg

// npm install react-gauge-chart
// npm install firebase

// npm install @react-native-picker/picker --legacy-peer-deps
// npm install react-native-svg-charts --legacy-peer-deps


import { StyleSheet, Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./Screens/Home";
import Stats from "./Screens/Stats";
import Survey from "./Screens/Survey";
import { NavigationContainer } from '@react-navigation/native';


const MyTabs = createBottomTabNavigator();

function MyTabsNavigation() {
  return (
    <MyTabs.Navigator screenOptions={{
      tabBarActiveTintColor: '#1ed81e',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: 'black' },
    }}>
      <MyTabs.Screen name = 'Home' component={Home} options = {{headerShown: false}}/>
      <MyTabs.Screen name = 'Stats' component = {Stats} options = {{headerShown: false}} />
      <MyTabs.Screen name = 'Survey' component = {Survey} options = {{headerShown: false}}/>
    </MyTabs.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <MyTabsNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});