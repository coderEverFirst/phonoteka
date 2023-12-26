import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyAfpvmxhcwgft_pFshqIcvPtutJrwdo4D8',
  authDomain: 'phonoteka-47c4f.firebaseapp.com',
  projectId: 'phonoteka-47c4f',
  storageBucket: 'phonoteka-47c4f.appspot.com',
  messagingSenderId: '815106803965',
  appId: '1:815106803965:web:aa60935d7db5699ac39694',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
