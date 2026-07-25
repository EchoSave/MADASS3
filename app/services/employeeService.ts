import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "../config/firebase";

// CREATE — Add a new employee
export async function saveEmployee(employee: any) {
  return await addDoc(collection(db, "employees"), employee);
}

// READ — Get all employees for a specific user
export async function getEmployees(userId: string) {
  const q = query(
    collection(db, "employees"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// READ — Get a single employee by ID (needed for employee-details)
export async function getEmployeeById(id: string) {
  const ref = doc(db, "employees", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() };
}

// UPDATE — Update employee record
export async function updateEmployee(id: string, data: any) {
  return await updateDoc(doc(db, "employees", id), data);
}

// DELETE — Remove employee record
export async function deleteEmployee(id: string) {
  return await deleteDoc(doc(db, "employees", id));
}
