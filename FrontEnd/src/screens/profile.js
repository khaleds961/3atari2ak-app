import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, TextInput,ActivityIndicator } from "react-native-paper";
import API from "../../API";
import SessionContext from "../sessions/SessionContext";

export default function Profile({ navigation }) {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [phone,setphone] = useState('');
  const [isload,setisload] = useState(false)
  const {
    session: {
      user: { id },
    },
  } = useContext(SessionContext);

  const getData = async () => {
    await API.get(`getuserbyid/${id}`).then((res) => {
      const result = res.data;
      setfirstname(result[0].firstname);
      setlastname(result[0].lastname);
      setphone(result[0].phone);
      setisload(true)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let reqBody = {
      firstname: firstname,
      lastname: lastname,
      password: password,
    };
    const result = await API.put(`edituser/${id}`, reqBody);
    navigation.navigate("home");
  };

  useEffect(() => {
    getData();
  }, []);
  return ( isload ? (
    <View style={styles.container}>
      <TextInput
        label="First Name"
        mode="outlined"
        theme={{
          colors: { primary: "#00ADB5", underlineColor: "transparent" },
        }}
        style={styles.TextInput}
        value={firstname}
        onChangeText={(val) => setfirstname(val)}
      />
      <TextInput
        label="Last Name"
        mode="outlined"
        theme={{
          colors: { primary: "#00ADB5", underlineColor: "transparent" },
        }}
        style={styles.TextInput}
        value={lastname}
        onChangeText={(val) => setlastname(val)}
      />

      <TextInput
        label="Password"
        mode="outlined"
        theme={{
          colors: { primary: "#00ADB5", underlineColor: "transparent" },
        }}
        style={styles.TextInput}
        value={password}
        onChangeText={(val) => setpassword(val)}
      />
       <TextInput
        label="Phone Number"
        mode="outlined"
        theme={{
          colors: { primary: "#00ADB5", underlineColor: "transparent" },
        }}
        style={styles.TextInput}
        value={phone}
        onChangeText={(val) => setphone(val)}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{ margin: 10, backgroundColor: "#F6BE8D" }}
      >
        Save
      </Button>
    </View>
    ):(
      <ActivityIndicator
          animating={true}
          size={75}
          color="#00ADB5"
          style={{ marginTop: 40 }}
        />
    )
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
  },
  TextInput: {
    margin: 15,
  },
});
