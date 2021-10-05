import React from "react";
import { Text, View, Image, TextInput, Button } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import Test from "./myrides";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import SessionContext from "../sessions/SessionContext";
import { useState,useContext } from "react";


export default function Login({ navigation }) {

  const {
    actions:{login},
  } = useContext(SessionContext)

  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');

  let handlesubmit = () =>{
    login({email,password})
  }

  return (
    <View style={{ backgroundColor: "#FFF", height: "100%" }}>
      <Image
        source={require("../images/3atari2ak.png")}
        style={{
          marginTop: 50,
          width: 500,
          height: 250,
          borderRadius: 150 / 2,
          borderWidth: 3,
          borderColor: "white",
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: "",
          alignSelf: "center",
        }}
      >
        Share Your Car
      </Text>

      <Text
        style={{
          fontFamily: "",
          marginHorizontal: 55,
          textAlign: "center",
          marginTop: 5,
          opacity: 0.4,
        }}
      >
        3ata2irak application for helping others and make a difference in your
        country
      </Text>

      <View>
        <Entypo
          name="email"
          size={24}
          color="#38A3A5"
          style={{ position: "absolute", bottom: 4, left: 65 }}
        />
        <TextInput style={styles.input}
        onChangeText= {(t)=>setemail(t)} />
      </View>

      <View>
        <AntDesign
          name="lock"
          size={24}
          color="#38A3A5"
          style={{ position: "absolute", bottom: 7, left: 65 }}
        />
        <TextInput style={styles.input}
        secureTextEntry
        onChangeText={(t)=>setpassword(t)} />
      </View>

      <View style={styles.button}>
        <Text
          style={{
            color: "white",
            fontFamily: "",
          }}
          onPress={handlesubmit}
        >
        Already A User
        </Text>
          
        
      </View>
      <View style={styles.button}>
        <Text
          style={{
            color: "white",
            fontFamily: "",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          New User
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: "#38A3A5",
    borderRadius: 23,
    paddingVertical: 2,
    paddingLeft: 37,
    marginTop: 10,
  },
  button: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#38A3A5",
    paddingVertical: 10,
    borderRadius: 23,
  },
});
