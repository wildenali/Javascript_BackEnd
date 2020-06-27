'use strict';

const { json } = require('body-parser');

// ini semacam navigasi

module.exports = function(app) {
    var jsonku = require('./104-kontroler');
    
    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilSemuaMahasiswa);
    
    app.route('/tampil/:id')
        .get(jsonku.tampilBerdasarkanId);
    
    app.route('/tambah')
        .post(jsonku.tambahMahasiswa);
}