import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/contants/Colors";
import { MotiView, MotiText } from "moti";
import { router } from "expo-router";
import Location_modal from "@/src/modals/Location_modal";
import SlidableButton from "../components/Button/SlideButton";
import SlideToStart from "../components/Button/SlideButton";
import { authUser } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";

export default function Onboarding() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  const {isAuthenticated, user, token} = useSelector((state: any) => state.auth);
  
  const checkAuth = async () => {
    await authUser(dispatch);
  }

  useEffect(() => {

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const handleNavigation = async () => {
      try {
        await checkAuth();
        
        if (isAuthenticated) {
          router.replace("/(tabs)/home");
        } 
        console.log(isAuthenticated);
      } catch (e) {
        console.log("Error occurred", e);
      }
    };

    handleNavigation();
  }, [user, isAuthenticated, token, isReady]);

  return (
    <View style={styles.container}>
      
      <ImageBackground
        source={require("../../assets/images/main/home.png")}
        style={styles.backgroundImage}
      >

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 1000 }}
          style={styles.content}
        >
          <View style={{ marginTop: 100 }}>
            <MotiText
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 1000 }}
              style={styles.title}
            >
              Enjoy your vacation with
            </MotiText>
            <MotiText
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 500, duration: 1000 }}
              style={styles.subtitle}
            >
              the best hotel services!
            </MotiText>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              position: "relative",
              zIndex: 10,
              height: "100%",
              justifyContent: "center",
            }}
          >
            <MotiView
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 700, duration: 1200 }}
            >
              <SlideToStart onSlideComplete={() => {
                // router.push("/home")
                router.push("/auth/Login")


              }} />
            </MotiView>
          </TouchableOpacity>
        </MotiView>
      </ImageBackground>

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["transparent", " rgb(44,44,40)"]}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  content: {
    flex: 1,

    // justifyContent: "space-between",

    alignItems: "center",
  },
  title: {
    color: Colors.WHITE,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1.5,
  },
  subtitle: {
    color: Colors.WHITE,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  image: {
    width: 280,
    height: 200,
    opacity: 0.9,
    resizeMode: "contain",
    marginBottom: 100,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 230,
  },
});
