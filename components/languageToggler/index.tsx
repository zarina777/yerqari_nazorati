// components/languageToggler.tsx
import React, { useState } from "react";
import { Button, Menu } from "react-native-paper";

export default function LanguageSwitcher() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState("EN");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectLang = (code: string) => {
    setLang(code);
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button
          onPress={openMenu}
          compact
          mode="text"
          style={{ marginRight: 8 }}
          labelStyle={{ fontSize: 14 }}
        >
          {lang}
        </Button>
      }
      anchorPosition="bottom"
    >
      <Menu.Item onPress={() => selectLang("EN")} title="English" />
      <Menu.Item onPress={() => selectLang("UZ")} title="Oʻzbekcha" />
      <Menu.Item onPress={() => selectLang("RU")} title="Русский" />
    </Menu>
  );
}
