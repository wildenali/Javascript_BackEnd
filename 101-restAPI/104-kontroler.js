'use strict';

var response = require('./103-respon');
var connection = require('./102-koneksi');

exports.index = function(req, res) {
    response.ok("Aplikasi REST API ku berjalan")
};