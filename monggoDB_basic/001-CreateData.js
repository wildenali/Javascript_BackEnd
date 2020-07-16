const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db-mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const fruit = mongoose.model("Fruit", fruitSchema);

// const apple = new fruit({
//     name: "Aple",
//     rating: 8,
//     review: "Enak Manis"
// });

// apple.save(function(error) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Berhasil simpan buah Apel ke dalam Database");
//     }
// })

const kiwi = new fruit({
    name: "Kiwi",
    rating: 10,
    review: "Kiwi Enak Terbaik"
});

const jeruk = new fruit({
    name: "Jeruk",
    rating: 6,
    review: "Aseeem"
});

const pisang = new fruit({
    name: "Pisang",
    rating: 3,
    review: "Belum Mater"
});

fruit.insertMany([kiwi, jeruk, pisang], function(error) {
    if (error) {
        console.log(error);
    } else {
        mongoose.connection.close();

        console.log("Berhasil simpan database buah-buahan")
    }
})