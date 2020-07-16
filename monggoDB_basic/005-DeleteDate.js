const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db-mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

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

// ini Delete
Fruit.deleteOne({_id: '5f0ff88c1ebcff02cc751d8c'}, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Berhasil Delete Data Apel di dalam database');
    }
})

// Ini Read
Fruit.find(function(error, fruits) {
    if (error) {
        console.log(error);
    } else {
        mongoose.connection.close();

        fruits.forEach(function(fruit) {
            console.log(fruit.name);
        });
    }
})