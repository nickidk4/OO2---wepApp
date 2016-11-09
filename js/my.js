/**
 * Created by Nicki on 31-10-2016.
 */

// Account Info
var user;
var balance;
var currency;
$(document).ready(function(){

    $.get("http://52.57.228.6//man2API/php/BankPhp.php?what=account_info&apikey=7e615a98c167b5592497d27b4f1d80af", function(data){
        var accInfo = $.parseJSON(data);
        console.log(accInfo);

        user = accInfo.user.name;
        balance = accInfo.data[0].amount;
        currency = accInfo.data[0].currency;

        $("#name").append(user);
        $("#balance").append(balance);
        $("#currency").append(currency);
        updateOffers();
    });
});

// Make Offer - Label + button to make sale
function makeOffer(){
    var amount = $("#myOffer").val();
    $.get("http://52.57.228.6//man2API/php/BankPhp.php?what=sell&amount=" + amount + "&apikey=7e615a98c167b5592497d27b4f1d80af", function(data){
        update();
    });
};

function buy(id) {

    $.get("http://52.57.228.6//man2API/php/BankPhp.php?what=buy&offer=" + id + "&apikey=7e615a98c167b5592497d27b4f1d80af", function(data) {
        console.log("Success");
        update();
    });
};

function exchange() {
    var otherCurrency = $("#myExchange").val();
    $.get("http://52.57.228.6//man2API/php/BankPhp.php?what=exchange_rate&from="+ otherCurrency +
        "&to=" + currency + "&apikey=7e615a98c167b5592497d27b4f1d80af", function(data){
        var exchangeInfo = $.parseJSON(data);;
        var exchangeRate = exchangeInfo.data.amount;

        $("#exRate").empty();
        $("#exRate").append("Exchange Rate: " + exchangeRate);
    })
};

// Updates all offers
function updateOffers() {
    $.get("http://52.57.228.6//man2API/php/BankPhp.php?what=offers&apikey=7e615a98c167b5592497d27b4f1d80af", function (data) {
        var offers = $.parseJSON(data).data;
        $("#offerBody").empty();

        var i = 0;
        for (i; i < offers.length; i++) {
            var offer = offers[i];
            var currency = offer.currency;
            var amount = offer.amount;
            var id = offer.id;
            var date = offer.since;


            $("#offerBody").append(
                "<tr>" +
                    "<td>" + currency + "</td>" +
                    "<td>" + amount + "</td>" +
                    "<td>" + id + "</td>" +
                    "<td>" + date + "</td>" +
                    "<td> <button class='btn btn-default' onclick='buy(" + id + ");'>Buy</button> </td>" +
                "</tr>"
            );
        }
    });
}

//Updates data
function update(){
    setInterval(function(){
        $.get("http://52.57.228.6//man2API/php/BankPhp.php?what=account_info&apikey=7e615a98c167b5592497d27b4f1d80af", function(data){
            var accInfo = $.parseJSON(data);
            console.log(accInfo);

            $("#balance").empty();
            $("#balance").append("Balance: " + accInfo.data[0].amount);

            updateOffers();
        });
    }, 1000);
}
