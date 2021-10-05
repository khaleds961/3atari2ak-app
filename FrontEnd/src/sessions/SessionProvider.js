import React, { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { AccessibilityInfo, AsyncStorage } from "react-native";

export default function SessionProvider({ children }) {
  const [session, setValue] = useState({
    user: {
      id: null,
      access_token: null,
    },
  });

  function updateSession(nextSession) {
    setValue((prevSession) => ({
      ...prevSession,
      ...nextSession,
    }));
  }

  async function login(user) {
    let res = await fetch("http://192.168.43.57:8000/api/auth/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        'Accept':'application/json'
      },
      body: JSON.stringify(user),
    });
    let result = await res.json();

    let id = result[1][0].id.toString();
    let token = result[0].original.access_token;
    await AsyncStorage.setItem("id", id);
    await AsyncStorage.setItem("token", token);

    updateSession({ user: { id, access_token: token } });
    // console.log(result);
  }

  async function logout() {
    let access_token = await AsyncStorage.getItem("token");
    let result = await fetch(`http://192.168.43.57:8000/api/auth/logout`, {
      headers: {
        access_token: access_token,
      },
    });
    setValue({ user: { access_token: null } });
    await AsyncStorage.removeItem("token");
  }

  let getUserData = async () => {
    let token = await AsyncStorage.getItem("token");
    let id = await AsyncStorage.getItem("id");
    if (token) {
      let res = await fetch("http://192.168.43.57:8000/api/getuserbyid/" + id);
      let resullt = await res.json();
      updateSession({
        user: {
          ...session.user,
          ...resullt,
        },
      });
    }
  };

  let gettoken = async () => {
    let id = await AsyncStorage.getItem("id");
    let access_token = await AsyncStorage.getItem("token");
    updateSession({ user: { id, access_token } });
    // getUserData();
  };

  useEffect(() => {
    gettoken();
  }, []);

  const context = {
    session,
    actions: {
      login,
      logout,
    },
  };

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
