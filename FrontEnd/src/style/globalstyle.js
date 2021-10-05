import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex:1
  },
  text: {
    fontFamily: "Cairo-Light",
    fontSize: 24,
  },
  input:{
    borderWidth:1,
    borderColor:'#ddd',
    padding:10,
    fontSize:18,
    borderRadius:6,
    marginTop:10
  }
});

export const images = {
  ratings: {
    '1': require("../images/js1.png"),
    '2': require("../images/js2.png"),
    '3': require("../images/js3.png"),
    '4': require("../images/js4.png"),
  },
};
