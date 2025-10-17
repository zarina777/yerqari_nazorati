import React, { useState } from "react";
import { Button } from "react-native-paper";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("EN");

  const toggleLang = () => {
    setLang((prev) => (prev === "EN" ? "UZ" : "EN"));
  };

  return (
    <Button
      onPress={toggleLang}
      compact
      mode="text"
      style={{ marginRight: 8 }}
      labelStyle={{ fontSize: 14 }}
    >
      {lang}
    </Button>
  );
}
