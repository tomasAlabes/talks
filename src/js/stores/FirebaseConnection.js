import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyB3797_HfW6PWjXLicJf0_ZDXZUDeJn1uY',
  authDomain: 'techtalks.firebaseapp.com',
  databaseURL: 'https://techtalks.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '644612690481'
};

firebase.initializeApp(config);

export default firebase.database().ref();