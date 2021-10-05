import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import MyStack from "./navigations/LoginStack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigations/tabs";
import SessionContext from "./sessions/SessionContext";

export default function Screens() {
  const {
    session: {
      user: { access_token },
    },
  } = useContext(SessionContext);

  return (
    <NavigationContainer>
      {access_token ? <Tabs /> : <MyStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
