import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Colors from "@/shared/constants/Colors";
import { useColorScheme } from "@/shared/hooks/useColorScheme";

export const CustomModal = ({
  modalVisible,
  setModalVisible,
  modalTitle,
  children,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  modalTitle: string;
  children: React.ReactNode;
}) => {
  const colorScheme = useColorScheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Pressable
              style={styles.modalClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons
                name="close"
                size={28}
                color={Colors[colorScheme!].secondary}
              />
            </Pressable>
          </View>
          <View style={styles.modalContent}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
    // marginBottom: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 25,
    marginBottom: 60,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalClose: {
    padding: 5,
  },
  modalContent: {
    width: "100%",
    // padding: 20,
  },
});
