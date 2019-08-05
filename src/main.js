
import regeneratorRuntime from "regenerator-runtime";
// import auth from "~f/Auth";
import firebase from "~f/firebase"

// import  query1 from '~f/Query1'
import  query2,{getAllTodos} from '~f/Query2_Subcollections'

console.log('main1');
let loginRes = firebase.login('gena68@inbox.ru','123456');

loginRes.then(
    (authID) =>{
        console.log('Авторизация разрешена : ',authID);

        /*
        // ОБновление профиля пользователя
        let user = firebase.auth.currentUser;
        user.updateProfile({
            displayName: "Jane Q. User",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
            // Update successful.
            console.log('Профиль пользователя обновлен');
        }).catch(function(error) {
            // An error happened.
        });

         */

        console.log('');
        console.log('****************************');


// заполение данными
//  import '~f/AddData';

// import  query1 from '~f/Query1'
// query1();


// import firebase from "./firebase/firebase";
// // query2();
        getAllTodos();

    },
    (err)=>{console.log('Авторизация неудачна ', err.message())});




