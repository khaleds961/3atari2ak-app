import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet, Text, FlatList, Image, Linking } from "react-native";
import { globalStyles } from "../style/globalstyle";
import API from "../../API";
import { Card, Button, Icon } from "react-native-elements";
import { Avatar } from "react-native-elements";
import moment from "moment";
import SessionContext from "../sessions/SessionContext";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function MyRides({ navigation }, props) {
  const [modal, setmodal] = useState(false);
  const [ride, setride] = useState([]);
  const [isload, setisload] = useState(false);

  const {
    session: {
      user: { id },
    },
  } = useContext(SessionContext);

  const deleteRide = async (id) => {
    try {
      await API.delete(`deleteride/${id}`);
      let filter = [...ride].filter((ride) => ride.ride_id !== id);
      setride(filter);
    } catch (e) {
      console.log(e);
    }
  };

  const getDatas = async () => {
    await API.get(`getridebyuser/${id}`).then((res) => {
      const result = res.data;
      setride(result);
      setisload(true);

    });
  };

  useFocusEffect(
    useCallback(() => {
      getDatas();
    }, [])
  );

  useEffect(() => {
    getDatas();
  }, []);

  return (

    <View style={styles.container}>
      {ride.length ? (
        <FlatList
          data={ride}
          keyExtractor={(item) => item.ride_id.toString()}
          renderItem={({ item }) => (
            <Card>
              <Card.Divider />

              <Text
                style={{
                  marginBottom: 1,
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                  borderBottomColor: "#BEBEBE",
                }}
              >
                You're driving from : {"\n"}
                <MaterialIcons name="place" size={14} color="#E3913F" />
                {item.departure} to {item.destination}
                {"\n"}
                <Entypo name="time-slot" size={14} color="#E3913F" />
                At {}
                {moment(item.leavingtime, "HH:mm").format("h:mm A")} {"\n"}
                <Ionicons name="today" size={14} color="#E3913F" />
                On 
                {moment(item.day).format(" DD MMMM YYYY")}
              </Text>
              <Text style={styles.text}>{item.note}</Text>

              <Button
                icon={<Icon name="delete" color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  backgroundColor: "#F6BE8D",
                }}
                title="Delete Ride"
                onPress={() => deleteRide(item.ride_id)}
              />
            </Card>
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../images/charmande.png")}
            style={{ width: 200, height: 200 }}
          />
          <Text>You don't have any ride yet.</Text>
        </View>
      )}
    </View>

  );
}
const styles = StyleSheet.create({
  text: {
    fontStyle: "italic",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderBottomColor: "#BEBEBE",
  },
  container: {
    flex: 1,
    marginTop: 40,
  },
});
