import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import { getEmployees } from "../services/employeeService";

type Employee = {
  id: string;
  fullName: string;
  position: string;
  email: string;
  employeeId: string;
  phone: string;
};

export default function EmployeeListScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEmployees = useCallback(
    async (showRefresh = false) => {
      if (!user?.uid) {
        setEmployees([]);
        setLoading(false);
        setError("Please sign in to view your employees.");
        return;
      }

      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const data = await getEmployees(user.uid);
        setEmployees(data as Employee[]);
        setError(null);
      } catch {
        setError("Unable to load employees right now.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [user?.uid],
  );

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={styles.stateTitle}>Loading employees...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>Something went wrong</Text>
        <Text style={styles.stateText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => loadEmployees()}
        >
          <Text style={styles.retryText}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Employees</Text>
        <Text style={styles.subtitle}>
          View, update, and remove team records.
        </Text>
      </View>

      {employees.length === 0 ? (
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>No employees found</Text>
          <Text style={styles.stateText}>
            Create a new employee record to get started.
          </Text>
        </View>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadEmployees(true)}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/employeeDetails" as any,
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  position: {
    fontSize: 14,
    color: "#475569",
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  centerState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  stateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginTop: 12,
  },
  stateText: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 6,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#0284c7",
  },
  retryText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
