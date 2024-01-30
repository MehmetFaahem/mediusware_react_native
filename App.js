import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Phase from "./components/Phase";
import phasesData from "./data/phases.json";
import Button from "./components/Button";
import Popup from "./components/Popup";

const Stack = createStackNavigator();
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const App = () => {
  const [phases, setPhases] = useState(phasesData);
  const [visible, setVisible] = useState(false);

  const [Datas, setDatas] = useState({
    id: Date.now(),
    title: "",
    cards: [],
  });

  const openPopup = () => {
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
  };

  const Add = () => {
    phases.push(Datas);
    closePopup();
  };
  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <Text style={styles.title}>MW - TODO</Text>
      <ScrollView horizontal style={styles.container}>
        {phases.map((phase) => (
          <Phase key={phase.id} phase={phase} />
        ))}
        <Button OnPress={openPopup} title={"+ Add phase"} />
      </ScrollView>
      <Popup
        visible={visible}
        transparent={true}
        dismiss={closePopup}
        margin={"25%"}
      >
        <View style={styles.popupContent}>
          <TextInput
            placeholder="input title"
            style={styles.textInput}
            onChangeText={(text) => setDatas({ ...Datas, title: text })}
          />

          <Button OnPress={Add} title={"Add"} />
        </View>
      </Popup>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 48,
    marginBottom: 6,
  },
  container: {
    margin: 5,
    gap: 10,
    marginRight: 16,
  },
  backgroundImage: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  popupButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    width: 100,
    height: 50,
  },
  popupContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    height: 300,
    width: 300,
  },
  textInput: {
    width: 200,
    height: 60,
    borderColor: "black",
    borderWidth: 2,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default App;
