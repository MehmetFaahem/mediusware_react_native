import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import Card from "./Card";
import Button from "./Button";
import { Button as RnButton } from "react-native";
import Popup from "./Popup";

const Phase = ({ phase }) => {
  const [visible, setVisible] = useState(false);
  const getterFunc = (details) => {
    const find_card = phase.cards.find((data) => data.id == details.id);

    find_card.title = details.title;
    find_card.description = details.description;
    console.log(find_card);
  };

  const [Datas, setDatas] = useState({
    id: Date.now(),
    title: "",
    description: "",
  });

  const openPopup = () => {
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
  };

  const Add = () => {
    phase.cards.push(Datas);
    closePopup();
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{phase.title}</Text>
          <RnButton title="..." color={"#fff"} />
        </View>

        <ScrollView>
          {phase.cards?.map((card) => (
            <Card getterFunc={getterFunc} key={card.id} card={card} />
          ))}
          <Button OnPress={openPopup} title={"+ Add card"} />
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
            <TextInput
              placeholder="input description"
              style={styles.textInput}
              onChangeText={(text) => setDatas({ ...Datas, description: text })}
            />

            <Button OnPress={Add} title={"Add"} />
          </View>
        </Popup>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  option: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
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

export default Phase;
