import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Formik, useFormik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import API from "../../API";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import SessionContext from "../sessions/SessionContext";

export default function AddRide(props) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [departure, setdeparture] = useState("");
  const [destination, setdestination] = useState("");

  const [note, setnote] = useState("");
  const [avseats, setavseat] = useState("");

  const onChangeDate = (event, nextDate) => {
    const prevDate = date;
    const Date = nextDate || prevDate;
    setDate(Date);
    setShowDate(false);
  };

  const onChangeTime = (event, nextTime) => {
    const prevTime = time;
    const Time = nextTime || prevTime;
    setTime(Time);
    setShowTime(false);
  };
  const {
    session: {
      user: { id },
    },
  } = useContext(SessionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let reqBody = {
      departure: departure,
      destination: destination,
      day: moment(date).format("YYYY-MM-DD"),
      leavingtime: moment(time).format("HH:mm"),
      note: note,
      avseats: avseats,
      userid: id,
      
    };

    try {
      const res = await API.post("addride", reqBody);
      if (Object.values(res.data)) {
        props.onFinish();
      }
    } catch (e) {
      console.log("Bigss Error:", e);
    }
  };
  return (
    <View>
      <Formik>
        <View>
          <View style={styles.test}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDate(true)}
            >
              <FontAwesome
                name="calendar"
                size={24}
                color="black"
                style={{ position: "absolute", left: 10, top: 13, zIndex: 1 }}
              />
              <Text> {moment(date).format("DD   MMMM   YYYY")} </Text>

              {showDate && (
                <View>
                  <DateTimePicker
                    value={new Date(date)}
                    mode="date"
                    is24Hour={false}
                    display="spinner"
                    onChange={onChangeDate}
                  />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowTime(true)}
            >
              <AntDesign
                name="clockcircleo"
                size={24}
                color="black"
                style={{ position: "absolute", left: 10, top: 11, zIndex: 2 }}
              />
              <Text> {moment(time).format("h:mm A")} </Text>

              {showTime && (
                <View>
                  <DateTimePicker
                    value={new Date(time)}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={onChangeTime}
                  />
                </View>
              )}
            </TouchableOpacity>

            <Entypo
              name="location"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 130, zIndex: 2 }}
            />

            <TextInput
              required
              style={styles.input}
              placeholder="From"
              value={departure}
              onChangeText={(val) => setdeparture(val)}
            />
            <MaterialCommunityIcons
              name="highway"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 195, zIndex: 3 }}
            />
            <TextInput
              style={styles.input}
              placeholder="To"
              value={destination}
              onChangeText={(val) => setdestination(val)}
            />
            <MaterialIcons
              name="airline-seat-recline-extra"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 257, zIndex: 3 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Available Seat"
              value={avseats}
              onChangeText={(val) => setavseat(val)}
              keyboardType="numeric"
            />
            <FontAwesome
              name="sticky-note-o"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 320, zIndex: 3 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Note"
              value={note}
              onChangeText={(val) => setnote(val)}
            />
          </View>

          <Button title="Confirm" color="#00ADB5" onPress={handleSubmit} />
        </View>
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    // flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 18,
    borderRadius: 6,
    padding: 10,
    paddingLeft: 40,
    width: "100%",
    marginBottom: 10,
  },
});
