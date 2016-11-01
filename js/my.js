/**
 * Created by Nicki on 31-10-2016.
 */

var accInfo = "http://52.57.228.6//man2API/php/BankPhp.php?what=account_info&apikey=7e615a98c167b5592497d27b4f1d80af";

var xhr = new XMLHttpRequest();

xhr.open("GET", "accInfo", false);
xhr.send()
console.log(xhr.status);
console.log(xhr.statusText);