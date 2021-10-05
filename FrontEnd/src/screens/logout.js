import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from "react-native";
import SessionContext from "../sessions/SessionContext";

export default function Logout() {
  const {
    actions: { logout },
  } = useContext(SessionContext);

  useEffect(() => {
    setTimeout(() => {
      logout();
    }, 100);
  }, []);

  return(
    <View style={[styles.container,]}>
    <ActivityIndicator animating = { true }
    size = { 75 } color="#00ADB5" /> 
    <Text style={{color:'#00ADB5',marginTop:10}}>See You Soon </Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:200,
    flexDirection:'row',
    justifyContent: "center",
    padding: 10
  },
  
});