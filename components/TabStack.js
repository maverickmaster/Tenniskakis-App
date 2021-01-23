import React from "react";
import AccountScreen from "../screens/AccountScreen";
import IndexScreen from "../screens/IndexScreen";
import ShowScreen from "../screens/ShowScreen";
import EditScreen from "../screens/EditScreen";
import CreateScreen from "../screens/CreateScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BlogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={IndexScreen}
        options={{ headerLeft: null }}
      />
      <Stack.Screen name="Show" component={ShowScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
    </Stack.Navigator>
  );
}

// AccountStack
function AccountStack() {
  return (
    <Stack.Navigator screenOptions={ScreenOptionStyle}>
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
}

export default function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "DATE Posts") {
            iconName = focused ? "ios-list-circle" : "ios-list";
          } else if (route.name === "Account") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="DATE Posts" component={BlogStack} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
