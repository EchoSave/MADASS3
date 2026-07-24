import { router } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import { Button, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { employeeSchema } from '../validation/employeeSchema';


export default function EmployeeScreen() {

  const [modalVisible, setModalVisible] = useState(false);

  //  employee information /Formik now manages all form fields 
  const initialValues = {
    fullName: '',
    phone: '',
    email: '',
    employeeId: '',
    position: '',
  };

  // When clicking the submit button, show a page with a success message.

  const handleDismissModal = () => {
    setModalVisible(false);
    router.replace("/(tabs)/employee-page");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Employee Information</Text>
          <Text style={styles.subtitle}>Enter details to update employee records</Text>
        </View>

        {/* Formik Wrapper */}
        <Formik
          initialValues={initialValues}
          validationSchema={employeeSchema}
          enableReinitialize
          validateOnMount
          onSubmit={(values, { resetForm }) => {
            setModalVisible(true);
            resetForm();
          }}
        >
          {(formik) => (
            <View style={styles.form}>

              <CustomInput
                label="Full Name"
                placeholder="Antony Taylor"
                value={formik.values.fullName}
                onChangeText={formik.handleChange('fullName')}
                onBlur={formik.handleBlur('fullName')}
                error={formik.touched.fullName ? formik.errors.fullName : undefined}
              />

              <CustomInput
                label="Phone Number"
                placeholder="403-XXX-XXXX"
                value={formik.values.phone}
                onChangeText={formik.handleChange('phone')}
                onBlur={formik.handleBlur('phone')}
                keyboardType="phone-pad"
                error={formik.touched.phone ? formik.errors.phone : undefined}
              />

              <CustomInput
                label="Email Address"
                placeholder="antony@sait.ca"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                error={formik.touched.email ? formik.errors.email : undefined}
              />

              <CustomInput
                label="Employee ID"
                placeholder="EMP-12345"
                value={formik.values.employeeId}
                onChangeText={formik.handleChange('employeeId')}
                onBlur={formik.handleBlur('employeeId')}
                autoCapitalize="characters"
                error={formik.touched.employeeId ? formik.errors.employeeId : undefined}
              />

              <CustomInput
                label="Position"
                placeholder="Software Developer"
                value={formik.values.position}
                onChangeText={formik.handleChange('position')}
                onBlur={formik.handleBlur('position')}
                error={formik.touched.position ? formik.errors.position : undefined}
              />

              {/* Submit Button */}
              <View style={styles.footer}>
                <CustomButton 
                  title="Submit Information" 
                  variant="primary" 
                  onPress={formik.handleSubmit}
                />
              </View>

            </View>
          )}
        </Formik>

        {/* Success Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalBg}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Employee Added Successfully! </Text>
              <Button title="Dismiss" onPress={handleDismissModal} />
            </View>
          </View>
        </Modal>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  form: {
    width: '100%',
  },
  footer: {
    width: '100%',
    marginTop: 8,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
});
