import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

function HeaderButton() {
  const themecontext = useContext(ThemeContext);
  return (
    <div>
      <button style={themecontext.blue}>Press me</button>
    </div>
  );
}

export default HeaderButton;
