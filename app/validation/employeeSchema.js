import * as Yup from 'yup';

export const employeeSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    employeeId: Yup.string().required('Employee ID is required'),
    position: Yup.string().required('Position is required'),
  });