import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getEmployeeById } from "../services/employeeService";

export default function EmployeeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getEmployeeById(id as string);
      setEmployee(data);
    }
    load();
  }, [id]);

  if (!employee) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{employee.fullName}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Employee ID:</Text>
        <Text style={styles.value}>{employee.employeeId}</Text>

        <Text style={styles.label}>Position:</Text>
        <Text style={styles.value}>{employee.position}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{employee.email}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{employee.phone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f1f5f9",
    padding: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#334155",
  },
});
