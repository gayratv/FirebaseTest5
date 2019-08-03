import firebase from "./firebase";


function addRestaurant (data) {
    let collection = firebase.db.collection('restaurants');
    return collection.add(data);

};

function getRandomItem (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Adds a set of mock Restaurants to the Cloud Firestore.
 */
function addMockRestaurants () {
    let promises = [];

    for (let i = 0; i < 20; i++) {
        let name =
            getRandomItem(data.words) +
            ' ' +
            getRandomItem(data.words);
        let category = getRandomItem(data.categories);
        let city = getRandomItem(data.cities);
        let price = Math.floor(Math.random() * 4) + 1;
        let photoID = Math.floor(Math.random() * 22) + 1;
        let photo = 'https://storage.googleapis.com/firestorequickstarts.appspot.com/food_' + photoID + '.png';
        let numRatings = 0;
        let avgRating = 0;

        let promise = addRestaurant({
            name: name,
            category: category,
            price: price,
            city: city,
            numRatings: numRatings,
            avgRating: avgRating,
            photo: photo
        });

        if (!promise) {
            alert('addRestaurant() is not implemented yet!');
            return Promise.reject();
        } else {
            promises.push(promise);
        }
    }

    return Promise.all(promises);
};

function addRating (restaurantID, rating) {
    let collection = firebase.firestore().collection('restaurants');
    let document = collection.doc(restaurantID);
    let newRatingDocument = document.collection('ratings').doc();

    return firebase.firestore().runTransaction(function(transaction) {
        return transaction.get(document).then(function(doc) {
            let data = doc.data();

            let newAverage =
                (data.numRatings * data.avgRating + rating.rating) /
                (data.numRatings + 1);

            transaction.update(document, {
                numRatings: data.numRatings + 1,
                avgRating: newAverage
            });
            return transaction.set(newRatingDocument, rating);
        });
    });
};

/**
 * Adds a set of mock Ratings to the given Restaurant.
 */
function addMockRatings (restaurantID) {
    let ratingPromises = [];
    for (let r = 0; r < 5*Math.random(); r++) {
        let rating = data.ratings[
            parseInt(data.ratings.length*Math.random())
            ];
        rating.userName = 'Bot (Web)';
        rating.timestamp = new Date();
        rating.userId = firebase.auth().currentUser.uid;
        ratingPromises.push(addRating(restaurantID, rating));
    }
    return Promise.all(ratingPromises);
};


var data = {
    words: [
        'Bar',
        'Fire',
        'Grill',
        'Drive Thru',
        'Place',
        'Best',
        'Spot',
        'Prime',
        'Eatin'
    ],
    cities: [
        'Albuquerque',
        'Arlington',
        'Atlanta',
        'Austin',
        'Baltimore',
        'Boston',
        'Charlotte',
        'Chicago',
        'Cleveland',
        'Colorado Springs',
        'Columbus',
        'Dallas',
        'Denver',
        'Detroit',
        'El Paso',
        'Fort Worth',
        'Fresno',
        'Houston',
        'Indianapolis',
        'Jacksonville',
        'Kansas City',
        'Las Vegas',
        'Long Island',
        'Los Angeles',
        'Louisville',
        'Memphis',
        'Mesa',
        'Miami',
        'Milwaukee',
        'Nashville',
        'New York',
        'Oakland',
        'Oklahoma',
        'Omaha',
        'Philadelphia',
        'Phoenix',
        'Portland',
        'Raleigh',
        'Sacramento',
        'San Antonio',
        'San Diego',
        'San Francisco',
        'San Jose',
        'Tucson',
        'Tulsa',
        'Virginia Beach',
        'Washington'
    ],
    categories: [
        'Brunch',
        'Burgers',
        'Coffee',
        'Deli',
        'Dim Sum',
        'Indian',
        'Italian',
        'Mediterranean',
        'Mexican',
        'Pizza',
        'Ramen',
        'Sushi'
    ],
    ratings: [
        {
            rating: 1,
            text: 'Would never eat here again!'
        },
        {
            rating: 2,
            text: 'Not my cup of tea.'
        },
        {
            rating: 3,
            text: 'Exactly okay :/'
        },
        {
            rating: 4,
            text: 'Actually pretty good, would recommend!'
        },
        {
            rating: 5,
            text: 'This is my favorite place. Literally.'
        }
    ]
};




let DoRun = addMockRestaurants();
export default DoRun;