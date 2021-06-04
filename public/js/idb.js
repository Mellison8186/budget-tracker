const { json } = require("express");

//create variable to hold db connection
let db;
//establish a connection to IndexedDB database called 'budget_tracker' and set it to 1
const request = indexedDB.open('budget_tracker', 1);

// this event will emit if the database version changes
request.onupgradeneeded = function(event) {
    //save a reference to the db
    const db = event.target.result;
    //create an object store (table) called `new_amount`, set it to have an autoincrementing primary key of sorts
    db.createObjectStore(`new_amount`, { autoIncrement: true});
};

//upon success
request.onsuccess = function(event) {
    //when db is successfully created with its object store then save ref to db in local global variable
    db = event.target.result;

    //check if app is online, if yes run uploadAmount() function to send all local db data to api
    if (navigator.onLine) {
        uploadAmount();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// this funciton will attempt to execute if we attempt to submit a new amount and there's no network connection
function saveRecord(record) {
    //open a new transaction with the db with read/write perms
    const transaction = db.transaction(['new_amount'], 'readwrite');

    //access the object store for `new_transaction`
    const amountObjectStore = transaction.objectStore('new_amount');

    //add record to the store with add method
    amountObjectStore.add(record);
}