import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyAOGPS4EEUVEkmVQ_GoOCdYU2AJ9m6FOlo",
  authDomain: "nativepractice-9e4e5.firebaseapp.com",
  projectId: "nativepractice-9e4e5",
  storageBucket: "nativepractice-9e4e5.appspot.com",
  messagingSenderId: "483903997092",
  appId: "1:483903997092:web:e05c49526fbc466519d231",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
