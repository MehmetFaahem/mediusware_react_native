import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Popup from "./Popup";
import Button from "./Button";

const Card = ({ card, getterFunc }) => {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState({
    id: card.id,
    title: "",
    description: "",
  });

  const openPopup = () => {
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
  };

  const Edit = () => {
    getterFunc(details);
    closePopup();
  };
  return (
    <TouchableOpacity onPress={openPopup}>
      <View style={styles.container}>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.description}>{card.description}</Text>
      </View>
      <Popup
        visible={visible}
        transparent={true}
        dismiss={closePopup}
        margin={"25%"}
      >
        <View style={styles.popupContent}>
          <TextInput
            placeholder={card.title}
            key={card.title}
            style={styles.textInput}
            onChangeText={(text) => setDetails({ ...details, title: text })}
          />
          <TextInput
            placeholder={card.description}
            key={card.description}
            style={styles.textInput}
            onChangeText={(text) =>
              setDetails({ ...details, description: text })
            }
          />

          <Button OnPress={Edit} title={"Edit"} />
        </View>
      </Popup>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    height: 60,
    borderColor: "black",
    borderWidth: 2,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 18,
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
});

export default Card;
