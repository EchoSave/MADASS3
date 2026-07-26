import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { getEmployees } from "../services/employeeService";

export default function EmployeeListScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      if (!user?.uid) return;
      const data = await getEmployees(user.uid);
      setEmployees(data);
    }
    load();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee List</Text>

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/employeeDetails",
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.position}>{item.position}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  position: {
    fontSize: 14,
    color: "#475569",
  },
  email: {
    fontSize: 14,
    color: "#64748b",
  },
});
