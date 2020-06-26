function Order(idOrder, waktu) {
    console.log(`ID Order ${idOrder}`);
    ProsesOrder(idOrder, waktu);
}

function ProsesOrder(idOrder, waktu) {
    // setTimeout(function() {
    //     console.log("Id Order ", idOrder, " Processed");
    // }, 3000);
    setTimeout(() => {
        console.log("Id Order ", idOrder, " Processed");
        console.log("Id Order "+ idOrder, " Processed");
    }, waktu);
}

Order(101, 1000);
Order(102, 5000);
Order(103, 500);

