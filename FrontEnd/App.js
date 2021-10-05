import React from "react";
import Screens from "./src/Screens";
import SessionProvider from "./src/sessions/SessionProvider";

export default function App(props) {
  return (
    <SessionProvider>
      <Screens {...props} />
    </SessionProvider>
  );
}
