import { StyleSheet, Text, View } from "react-native";

export default function EmployeeListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EMPLOYEE LIST PAGE CODE HERE !!!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#64748b",
  },
});