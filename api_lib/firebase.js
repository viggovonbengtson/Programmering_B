const firebaseConfig = {
  apiKey: "AIzaSyDRuoBlO2WsqdOggbzU4ANAduoQsEF0Z5A",
  authDomain: "aarsproeve-programmering.firebaseapp.com",
  projectId: "aarsproeve-programmering",
  storageBucket: "aarsproeve-programmering.firebasestorage.app",
  messagingSenderId: "129125803403",
  appId: "1:129125803403:web:6fa50f8e6e23afdd44bb8e"
}

firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()