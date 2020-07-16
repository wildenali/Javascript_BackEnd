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

const apple = new Fruit({
    name: "Aple",
    rating: 7,     // coba ubah lebih dari 10
    review: "Enak Manis"
});

apple.save(function(error) {
    if (error) {
        console.log(error);
    } else {
        mongoose.connection.close();
        console.log("Berhasil simpan buah Apel ke dalam Database");
    }
})