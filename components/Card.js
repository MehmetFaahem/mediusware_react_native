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

let date = new Date();
function formatDate() {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const Card = ({ card, getterFunc, PhaseTitle }) => {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState({
    id: card.id,
    title: card.title,
    description: card.description,
    date: "",
    tag: "",
  });

  const MoveToComp = async () => {
    await setDetails({
      id: card.id,
      title: card.title,
      description: card.description,
      date: formatDate(),
      tag: "Completed",
    });
    getterFunc(details);
  };

  const TransButtons = () => {
    if (PhaseTitle == "Todo") {
      return (
        <>
          <Button OnPress={MoveToComp} title={"Move To Completed"} />
          <Button title={"Move To Progress"} />
        </>
      );
    } else if (PhaseTitle == "In Progress") {
      return (
        <>
          <Button title={"Move To Todo"} />
          <Button title={"Move To Completed"} />
        </>
      );
    } else {
      return (
        <>
          <Button title={"Move To Todo"} />
          <Button title={"Move To Progress"} />
        </>
      );
    }
  };

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

  const Delete = () => {
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
          <TransButtons />
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
          <Button OnPress={Delete} title={"Delete"} />
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
    height: 400,
    width: 300,
  },
});

export default Card;
