import { useField } from 'formik';

const FormField = ({ label, ...props})=>{
    const [field, meta] = useField(props);


}

export default FormField