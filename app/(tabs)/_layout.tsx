import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: "blue",
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home title",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="about" options={{ title: "About title" }} />
    </Tabs>
  );
}
