import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import API from "../../API";
import SessionContext from "../sessions/SessionContext";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Register({ navigation }) {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [image, setImage] = useState({
    uri: null,
  });

  const {
    actions: { login },
  } = useContext(SessionContext);

  let pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let reqBody = {
  //     firstname: firstname,
  //     lastname: lastname,
  //     email: email,
  //     password: password,
  //   };
  //   try {
  //     await API.post("auth/register", reqBody);
  //   } catch (error) {
  //     console.log("Big Error:", error);
  //   }
  //   login({ email, password });
  // };

  const handleSubmit = async () => {
    const url = `http://192.168.43.57:8000/api/auth/register`;
    let localUri = image.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let body = null;
    body = new FormData();
    body.append("firstname", firstname);
    body.append("lastname", lastname);
    body.append("email", email);
    body.append("password", password);
    body.append("phone",phone);
    body.append("picture", { uri: localUri, name: filename, type });
    let res = await fetch(url, { body, method: "post" });
     if (res) {
       login({ email, password });
    }
  };

  return (
    <View style={{ backgroundColor: "#FFF", height: "100%" }}>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "",
          alignSelf: "center",
          marginTop: 55,
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
        Make a new account, register now !
      </Text>

      <TouchableOpacity onPress={pickFromGallery}>
        <Image
          source={{
            uri: image.uri
              ? image.uri
              : ("https://static.thenounproject.com/png/2267636-200.png"),
          }}
          style={{
            width: 100,
            height: 100,
            alignSelf:'center'
          }}
        />
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#38A3A5"
          style={styles.view}
          value={firstname}
          onChangeText={(val) => setfirstname(val)}
        />
        <Ionicons
          name="person-outline"
          size={24}
          color="#38A3A5"
          style={{ position: "absolute", bottom: 7, left: 65 }}
        />
      </View>

      <View>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#38A3A5"
          style={styles.view}
          value={lastname}
          onChangeText={(val) => setlastname(val)}
        />
        <AntDesign
          name="idcard"
          size={24}
          color="#38A3A5"
          style={{ position: "absolute", bottom: 5, left: 65 }}
        />
      </View>
      <View>
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#38A3A5"
          style={styles.view}
          keyboardType="numeric"
          value={phone}
          onChangeText={(val) => setphone(val)}
        />
        <MaterialIcons
          name="phone"
          size={24}
          color="#38A3A5"
          style={{ position: "absolute", bottom: 7, left: 65 }}
        />
      </View>
      <View>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#38A3A5"
          style={styles.view}
          value={email}
          onChangeText={(val) => setemail(val)}
        />
        <Fontisto
          name="email"
          size={24}
          color="#38A3A5"
          style={{ position: "absolute", bottom: 5, left: 65 }}
        />
      </View>
      <View>
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#38A3A5"
          style={styles.view}
          value={password}
          onChangeText={(val) => setpassword(val)}
        />
        <MaterialIcons
          name="lock-outline"
          size={24}
          color="#38A3A5"
          style={{ position: "absolute", bottom: 7, left: 65 }}
        />
      </View>

      <View
        style={{
          marginHorizontal: 55,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
          backgroundColor: "#38A3A5",
          paddingVertical: 10,
          borderRadius: 23,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "",
          }}
          onPress={handleSubmit}
        >
          Register
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "#38A3A5",
    borderRadius: 23,
    paddingVertical: 2,
    paddingHorizontal: 10,
    paddingLeft: 37,
    paddingTop: 5,
  },
});
