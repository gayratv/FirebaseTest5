import firebase from "./firebase";
import {ReadData} from "./firebase";

export default function() {

    let query

    // query = firebase.db.collection('restaurants');
    //
    // query = query.where('category', '==', 'Mexican');
    // query = query.orderBy('avgRating', 'desc');
    // query.get().then(ReadData);

    query = firebase.db.collection('restaurants')
        .doc('CyRUMR528bQkmXV0s4If')
        .get()
        .then((doc) => {
            console.log(doc.id);
            console.log(doc.data());
        });


}

// The array_contains index allows you to query the regions array field:
// citiesRef.where("regions", "array-contains", "west_coast")

// Queries supported by composite indexes
// citiesRef.where("country", "==", "USA").orderBy("population", "asc")
// citiesRef.where("country", "==", "USA").where("population", "<", 3800000)
// citiesRef.where("country", "==", "USA").where("population", ">", 690000)

// Queries supported by collection group indexes
// citiesRef.doc("SF").collection("landmarks").where("category", "==", "park")