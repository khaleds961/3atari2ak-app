import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SessionContext from "../sessions/SessionContext";
import { useContext } from "react";

import Profile from "../screens/profile";
import MyRides from "../screens/myrides";
import Logout from "../screens/logout";
import Home from "../screens/home";
import HomeStack from "./HomeStack";
import AddRide from "../screens/addRide";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  const {
    actions: { logout },
  } = useContext(SessionContext);
  return (
    <Tab.Navigator
      activeColor="white"
      inactiveColor="#22577A"
      barStyle={{ backgroundColor: "#00ADB5", paddingBottom: 20 }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="My Rides"
        component={MyRides}
        options={{
          tabBarLabel: "My Rides",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      {/* let's try */}

      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarLabel: "Logout",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="lock" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
