import { Formik } from "formik";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { deleteEmployee, getEmployeeById, updateEmployee } from "../services/employeeService";
import { employeeSchema } from "../validation/employeeSchema";

type Employee = {
  id: string;
  fullName: string;
  position: string;
  email: string;
  employeeId: string;
  phone: string;
};

export default function EmployeeDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const employeeId = typeof id === "string" ? id : id?.[0] ?? "";

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const loadEmployee = useCallback(async () => {
    if (!employeeId) {
      setError("No employee selected.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getEmployeeById(employeeId);
      if (!data) {
        setError("Employee not found.");
        setEmployee(null);
      } else {
        setEmployee(data as Employee);
        setError(null);
      }
    } catch {
      setError("Unable to load employee details.");
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    loadEmployee();
  }, [loadEmployee]);

  const handleUpdate = async (values: Omit<Employee, "id">) => {
    if (!employeeId) return;

    setIsSaving(true);
    try {
      await updateEmployee(employeeId, {
        ...values,
        updatedAt: new Date(),
      });

      setEmployee((current) => (current ? { ...current, ...values } : null));
      setNotice("Employee updated successfully.");
      setIsEditing(false);
    } catch {
      setError("Unable to update the employee.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!employeeId) return;

    setIsDeleting(true);
    try {
      await deleteEmployee(employeeId);
      router.back();
    } catch {
      setError("Unable to delete the employee.");
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={styles.stateTitle}>Loading employee details...</Text>
      </View>
    );
  }

  if (error || !employee) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>Unable to load employee</Text>
        <Text style={styles.stateText}>{error ?? "The selected employee could not be found."}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadEmployee()}>
          <Text style={styles.retryText}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{employee.fullName}</Text>
          <Text style={styles.subtitle}>{employee.position}</Text>
          {notice ? <Text style={styles.notice}>{notice}</Text> : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Employee ID</Text>
          <Text style={styles.value}>{employee.employeeId}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{employee.email}</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{employee.phone}</Text>
        </View>

        <View style={styles.actions}>
          <CustomButton title="Edit Employee" variant="primary" onPress={() => setIsEditing(true)} />
          <CustomButton title="Delete Employee" variant="secondary" onPress={() => setShowDeleteModal(true)} />
        </View>
      </ScrollView>

      <Modal visible={isEditing} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit employee</Text>
            <Formik
              initialValues={{
                fullName: employee.fullName,
                phone: employee.phone,
                email: employee.email,
                employeeId: employee.employeeId,
                position: employee.position,
              }}
              validationSchema={employeeSchema}
              onSubmit={handleUpdate}
            >
              {(formik) => (
                <ScrollView contentContainerStyle={styles.modalForm}>
                  <CustomInput
                    label="Full Name"
                    value={formik.values.fullName}
                    onChangeText={formik.handleChange("fullName")}
                    onBlur={formik.handleBlur("fullName")}
                    error={formik.touched.fullName ? formik.errors.fullName : undefined}
                    touched={formik.touched.fullName}
                  />

                  <CustomInput
                    label="Phone Number"
                    value={formik.values.phone}
                    onChangeText={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                    keyboardType="phone-pad"
                    error={formik.touched.phone ? formik.errors.phone : undefined}
                    touched={formik.touched.phone}
                  />

                  <CustomInput
                    label="Email Address"
                    value={formik.values.email}
                    onChangeText={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={formik.touched.email ? formik.errors.email : undefined}
                    touched={formik.touched.email}
                  />

                  <CustomInput
                    label="Employee ID"
                    value={formik.values.employeeId}
                    onChangeText={formik.handleChange("employeeId")}
                    onBlur={formik.handleBlur("employeeId")}
                    autoCapitalize="characters"
                    error={formik.touched.employeeId ? formik.errors.employeeId : undefined}
                    touched={formik.touched.employeeId}
                  />

                  <CustomInput
                    label="Position"
                    value={formik.values.position}
                    onChangeText={formik.handleChange("position")}
                    onBlur={formik.handleBlur("position")}
                    error={formik.touched.position ? formik.errors.position : undefined}
                    touched={formik.touched.position}
                  />

                  <View style={styles.modalActions}>
                    <CustomButton title="Cancel" variant="secondary" onPress={() => setIsEditing(false)} />
                    <CustomButton title="Save Changes" variant="primary" onPress={formik.handleSubmit} isLoading={isSaving} />
                  </View>
                </ScrollView>
              )}
            </Formik>
          </View>
        </View>
      </Modal>

      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Delete employee?</Text>
            <Text style={styles.stateText}>This action cannot be undone.</Text>
            <View style={styles.modalActions}>
              <CustomButton title="Cancel" variant="secondary" onPress={() => setShowDeleteModal(false)} />
              <CustomButton title="Delete" variant="primary" onPress={handleDelete} isLoading={isDeleting} />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
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
    fontSize: 15,
    color: "#64748b",
    marginTop: 4,
  },
  notice: {
    marginTop: 10,
    color: "#15803d",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#0f172a",
    marginTop: 2,
  },
  actions: {
    marginTop: 24,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  modalForm: {
    paddingBottom: 8,
  },
  modalActions: {
    marginTop: 8,
  },
});
