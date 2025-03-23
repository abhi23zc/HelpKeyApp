import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "booking") {
            iconName = "calendar-outline";
          } else if (route.name === "fav") {
            iconName = "heart-outline";
          } else if (route.name === "profile") {
            iconName = "person";
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007ACC",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="fav" options={{ title: "Favourite" }} />
      <Tabs.Screen name="booking" options={{ title: "Booking" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      
      
      <Tabs.Screen
        name="List"
        options={{
          href: null, 
        }}
      />
    </Tabs>
  );
}
