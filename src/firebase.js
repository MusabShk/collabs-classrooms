import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0GxVcIyBQgishTt6xx4o6Il3Dq_HMmqg",
  authDomain: "crm-management-6790c.firebaseapp.com",
  databaseURL: "https://crm-management-6790c-default-rtdb.firebaseio.com",
  projectId: "crm-management-6790c",
  storageBucket: "crm-management-6790c.appspot.com",
  messagingSenderId: "836030685007",
  appId: "1:836030685007:web:74007b79de04e520206f3a",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
