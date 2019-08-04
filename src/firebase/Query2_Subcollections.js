import firebase from "./firebase";
import {ReadData} from "./firebase";

export default function() {
    let query = firebase.db.collectionGroup('ratings')
        .where('userId','==','Петр');


    query.get().then(ReadData);
}


// получить элемент из коллекции ресторанов и все его отзывы

function getAllTodos  () {
    getTodos().
    then((todos) => {
        console.log("All Todos " + todos) // All Todos with its todo_items sub collection.
        console.log(todos);
    })
        .catch((err) => {
            console.log('Error getting documents', err);
            // return res.status(500).json({ message: "Error getting the all Todos" + err });
        });
}

export  {getAllTodos};

function getTodos(){
    let todosRef = firebase.db.collection('restaurants').where('category','==','Italian');

    return todosRef.get()
        .then((snapshot) => {
            let todos = [];
            return Promise.all(
                snapshot.docs.map(doc => {
                    let todo = {};
                    todo.id = doc.id;
                    todo.todo = doc.data(); // will have 'todo.title'
                    var todoItemsPromise = getTodoItemsById(todo.id);
                    return todoItemsPromise.then((todoItems) => {
                        todo.todo_items = todoItems;
                        todos.push(todo);
                        return todos;
                    })
                })
            )
                .then(todos => {
                    return todos.length > 0 ? todos[todos.length - 1] : [];
                })

        })
}


function getTodoItemsById(id){
    let todoItemsRef = firebase.db.collection('restaurants').doc(id).collection('ratings');
    let todo_items = [];
    return todoItemsRef.get()
        .then(snapshot => {
            snapshot.forEach(item => {
                let todo_item = {};
                todo_item.id = item.id;
                todo_item.todo_item = item.data(); // will have 'todo_item.title' and 'todo_item.completed'
                todo_items.push(todo_item);
            })
            return todo_items;
        })
}