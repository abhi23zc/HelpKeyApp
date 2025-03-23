import Modal from "react-native-modal";
import React from "react";
import { View, MotiView } from "moti";
import { Dimensions, Platform } from "react-native";
import HotelSearchScreen from "../components/Search/HotelSearch";


const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : Dimensions.get("window").height;

export default function LocationModal({
  isModalVisible,
  setModalVisible,
}: {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) {
  return (
    <Modal
      isVisible={isModalVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      style={{ margin: 0 }}
    >
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", duration: 500 }}
        style={{
          flex: 1,
          backgroundColor: "white",

        }}
      >
        <HotelSearchScreen isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
      </MotiView>
    </Modal>
  );
}
