import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tabs from "./TabNavigator"

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
  
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Tabs} />
      </Stack.Navigator>
  );
};

export default StackNavigator;
