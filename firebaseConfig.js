{/* <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBDOfdlVQ1237NxctyeE52cA-vCLrhTBvQ",
    authDomain: "sizzle-2885f.firebaseapp.com",
    projectId: "sizzle-2885f",
    storageBucket: "sizzle-2885f.firebasestorage.app",
    messagingSenderId: "548271743587",
    appId: "1:548271743587:web:418ca4584619e5c80bce56",
    measurementId: "G-QK96C0SQPS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script> */}


// // Replace with your Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyBDOfdlVQ1237NxctyeE52cA-vCLrhTBvQ",
//     authDomain: "sizzle-2885f.firebaseapp.com",
//     projectId: "sizzle-2885f",
//     storageBucket: "sizzle-2885f.firebasestorage.app",
//     messagingSenderId: "548271743587",
//     appId: "1:548271743587:web:418ca4584619e5c80bce56",
//     measurementId: "G-QK96C0SQPS"
//   };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// // Firebase Configuration (Replace with your actual values)
// const firebaseConfig = {
//   apiKey: "AIzaSyBDOfdlVQ1237NxctyeE52cA-vCLrhTBvQ",
//   authDomain:"sizzle-2885f.firebaseapp.com",
//   projectId: "sizzle-2885f",
//   storageBucket: "sizzle-2885f.firebasestorage.app",
//   messagingSenderId: "548271743587",
//   appId: "1:548271743587:web:418ca4584619e5c80bce56",
 
// };

// // Initialize Firebase (This is important!)
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();


// // ✅ Make sure Firebase SDK is loaded before running this file
// if (typeof firebase === "undefined") {
//   console.error("❌ Firebase SDK not loaded! Check script order.");
// }

// // ✅ Firebase Configuration (Replace with your actual credentials)
// const firebaseConfig = {
//   apiKey: "AIzaSyBDOfdlVQ1237NxctyeE52cA-vCLrhTBvQ",
//   authDomain: "sizzle-2885f.firebaseapp.com",
//   projectId: "sizzle-2885f",
//   storageBucket: "sizzle-2885f.firebasestorage.app",
//   messagingSenderId: "548271743587",
//   appId: "1:548271743587:web:418ca4584619e5c80bce56",
//   measurementId: "G-QK96C0SQPS"
// };

// // ✅ Initialize Firebase only if it hasn't been initialized already
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// const db = firebase.firestore();

// console.log("✅ Firebase Initialized Successfully!");

// // ✅ Prevent multiple Firebase initializations
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: "AIzaSyBDOfdlVQ1237NxctyeE52cA-vCLrhTBvQ",
//       authDomain: "sizzle-2885f.firebaseapp.com",
//       projectId: "sizzle-2885f",
//       storageBucket: "sizzle-2885f.firebasestorage.app",
//       messagingSenderId: "548271743587",
//       appId: "1:548271743587:web:418ca4584619e5c80bce56",
//       measurementId: "G-QK96C0SQPS"
//   });
// }

// // ✅ Prevent `db` from being redeclared
// window.db = window.db || firebase.firestore();

// console.log(db ? "✅ Firestore is Ready!" : "❌ Firestore NOT Connected!");


// // ✅ Check if Firebase SDK is loaded
// if (typeof firebase === "undefined") {
//   console.error("❌ Firebase SDK not loaded! Check script order.");
// }

// // ✅ Firebase Configuration (Replace with your actual credentials)
// const firebaseConfig = {
//   apiKey: "AIzaSyBDOfdlVQ1237NxctyeE52cA-vCLrhTBvQ",
//   authDomain: "sizzle-2885f.firebaseapp.com",
//   projectId: "sizzle-2885f",
//   storageBucket: "sizzle-2885f.firebasestorage.app",
//   messagingSenderId: "548271743587",
//   appId: "1:548271743587:web:418ca4584619e5c80bce56",
//   measurementId: "G-QK96C0SQPS"
// };

// // ✅ Initialize Firebase only if it hasn't been initialized already
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// const db = firebase.firestore();

// ✅ Ensure Firebase SDK is loaded before using it
if (typeof firebase === "undefined") {
  console.error("❌ Firebase SDK not loaded! Check script order.");
} else {
  // ✅ Firebase Configuration
  const firebaseConfig = {
      apiKey: "AIzaSyBDOfdlVQ1237NxctyeE52cA-vCLrhTBvQ",
      authDomain: "sizzle-2885f.firebaseapp.com",
      projectId: "sizzle-2885f",
      // storageBucket: "sizzle-2885f.firebasestorage.app",
      storageBucket: "sizzle-2885f.appspot.com",

      messagingSenderId: "548271743587",
      appId: "1:548271743587:web:418ca4584619e5c80bce56",
      measurementId: "G-QK96C0SQPS"
  };

  // ✅ Initialize Firebase only if it hasn’t been initialized already
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }

  // ✅ Ensure Firestore is globally accessible
  window.db = firebase.firestore();
  console.log(db ? "✅ Firestore is Ready!" : "❌ Firestore NOT Connected!");
}
