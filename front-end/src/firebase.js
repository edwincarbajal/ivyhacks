import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDdtFKy4M_RoX4sM06Tlh22VmKstAharEk",
    authDomain: "ivy-hacks.firebaseapp.com",
    databaseURL: "https://ivy-hacks.firebaseio.com",
    projectId: "ivy-hacks",
    storageBucket: "ivy-hacks.appspot.com",
    messagingSenderId: "113656581720",
    appId: "1:113656581720:web:4da195614e72eb5b4b842d",
    measurementId: "G-3KL1PVE9HR"
  };

 const fire = firebase.initializeApp(firebaseConfig);

export default fire;
