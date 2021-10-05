import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Modal,
  Linking,
} from "react-native";
import { globalStyles } from "../style/globalstyle";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AddRide from "./addRide";
import API from "../../API";
import { Card, Button, Icon } from "react-native-elements";
import { Avatar } from "react-native-elements";
import moment from "moment";
import SessionContext from "../sessions/SessionContext";

export default function Home({ navigation }, props) {
  const [modal, setmodal] = useState(false);
  const [ride, setride] = useState([]);
  const [isload, setisload] = useState(false);
  const text = "Hello From 3atari2ak :)";

  const {
    session: {
      user: { id },
    },
  } = useContext(SessionContext);

  const getDatas = async () => {
    await API.get(`getrideswithoutmine/${id}`).then((res) => {
      const result = res.data;
      setride(result);
      setisload(true);
    });
  };
  console.log(ride);
  useEffect(() => {
    getDatas();
  }, [id]);

  return (
    <View style={globalStyles.container}>
      <Modal visible={modal} animationType={"slide"}>
        <View style={styles.modalToggle}>
          <MaterialIcons
            style={styles.modalClose}
            name="close"
            size={24}
            onPress={async () => {
              await getDatas();
              setmodal(false);
            }}
          />
          <AddRide
            {...props}
            onFinish={() => {
              getDatas();
              setmodal(false);
            }}
          />
        </View>
      </Modal>
      <MaterialIcons
        style={styles.modalOpen}
        name="add"
        size={24}
        onPress={() => setmodal(true)}
        color="white"
      />
      {isload ? (
        <FlatList
          data={ride}
          keyExtractor={(item) => item.ride_id.toString()}
          renderItem={({ item }) => (
            <Card>
              <View style={{ flexDirection: "row" }}>
                <Avatar
                  rounded
                  source={{
                    uri: `http://192.168.43.57:8000/storage/user_images/${item.picture}`,
                  }}
                />
                <Card.Title style={{ marginLeft: 10 }}>
                  {item.firstname}{" "}
                </Card.Title>
                <Text style={{ marginLeft: 100 }}>Reviews</Text>
              </View>
              <Card.Divider />
              <Card.Image
                source={{
                  uri: `http://192.168.43.57:8000/storage/user_images/${item.picture}`,
                }}
                style={{ marginBottom: 15 }}
              />
              <Text
                style={{
                  marginBottom: 1,
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                  borderBottomColor: "#BEBEBE",
                }}
              >
                {item.firstname} {item.lastname} is driving from : {"\n"}
                <Text>
                  <MaterialIcons name="place" size={14} color="#E3913F" />
                  {item.departure} to {item.destination}
                </Text>
                {"\n"}
                <Text>
                  <Entypo name="time-slot" size={14} color="#E3913F" />
                  At {}
                  {moment(item.leavingtime, "HH:mm").format("h:mm A")}
                </Text>
                {"\n"}
                <Text>
                  {""}
                  <Ionicons name="today" size={14} color="#E3913F" />
                  On
                  {moment(item.day).format(" DD MMMM YYYY")}
                </Text>
              </Text>
              <Text style={styles.text}>{item.note}</Text>
              <Text style={styles.text}>Available Seats: {item.avseats}</Text>
              <Button
                icon={
                  <FontAwesome5
                    name="whatsapp"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  backgroundColor: "#F6BE8D",
                }}
                title="SEND WHATSAPP"
                onPress={() =>
                  Linking.openURL(
                    "whatsapp://send?text=" + text + "&phone=961" + item.phone
                  )
                }
              />
            </Card>
          )}
        />
      ) : (
        <ActivityIndicator
          animating={true}
          size={75}
          color="#00ADB5"
          style={{ marginTop: 20 }}
        />
      )}
      {/* <Button title="reviews" onPress={()=> navigation.navigate('Reviews')} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  modalToggle: {
    padding: 5,
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "#f2f2f2",
    borderRadius: 10,
    alignSelf: "center",
  },
  modalOpen: {
    marginTop: 30,
    borderWidth: 1,
    padding: 10,
    borderColor: "#f2f2f2",
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#00ADB5",
  },
  text: {
    fontStyle: "italic",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderBottomColor: "#BEBEBE",
  },
});
