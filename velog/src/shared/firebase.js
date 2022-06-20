import { initializeApp } from 'firebase/app';

//스토리지 가져오기
import { getStorage, ref } from "firebase/storage";

//프로젝트 설정 -> SDK 사용에서 키 가져오기
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBc88UoEeJN1i1F1TpGx4zr9s5LRYYgj2U",
    authDomain: "authex-d686f.firebaseapp.com",
    projectId: "authex-d686f",
    storageBucket: "authex-d686f.appspot.com",
    messagingSenderId: "500410280268",
    appId: "1:500410280268:web:f2a711cdb70f27689e87e9",
    measurementId: "G-H6SEVL4PFW"
};


const app = initializeApp(firebaseConfig);

export default app;

//스토리지 내보내기
export const storage = getStorage(app);

