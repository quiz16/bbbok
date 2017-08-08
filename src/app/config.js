import * as firebase from 'firebase';

let config = {
	'apiKey'            : 'AIzaSyDTqgNi67TNqyjAxi_paWu_0GOKGfkFnUk',
	'authDomain'        : 'bbbok-b0726.firebaseapp.com',
	'databaseURL'       : 'https: //bbbok-b0726.firebaseio.com',
	'projectId'         : 'bbbok-b0726',
	'storageBucket'     : 'bbbok-b0726.appspot.com',
	'messagingSenderId' : '197486902378'
};

// Initialize Firebase
firebase.initializeApp( config );
