const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db-mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

// schema untuk Fruit
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Data name tidak ada, Please isi ya']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);

// schema untuk People
const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Data name tidak ada, Please isi ya']
    },
    age: {
        type: Number,
    },
    favoriteFruit: fruitSchema
});
const People = mongoose.model("People", peopleSchema);

const fruitDuku = new Fruit({
    name: "Duku",
    rating: 8,
    review: "Enak Manis"
});

fruitDuku.save(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Berhasil simpan buah Duku ke dalam Database");
    }
})

const people = new People({
    name: "wilden",
    age: 13,
    favoriteFruit: fruitDuku
})

people.save(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Berhasil create wilden relationship nya dengan Duku dalam Database");
    }
})