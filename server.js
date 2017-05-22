var express = require('express');
var port = process.env.port || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { url: req.protocol + '://' + req.get('host') });
});

app.get('/:input', (req, res) => {
    var result = {
        unix: null,
        natural: null
    }
    var param = req.params.input;
    if (param.split(' ').length == 1) {
        var date = new Date(parseInt(param));
    } else {
        var date = new Date(param);
    }
    if (Object.prototype.toString.call(date) === "[object Date]") {
        if (!isNaN(date)) {
            result.unix = date.getTime();
            result.natural = naturalDate(date.getMonth(), date.getDate(), date.getFullYear());
        }
    }
    res.end(JSON.stringify(result));
});

function naturalDate(month, day, year) {
    var natural = "";
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",  "October", "November", "December"];
    if (month <= months.length) {
        natural += months[month] + " ";
        natural += day + ", ";
        natural += year;
        return natural;
    } else {
        return null;
    }
}

app.listen(port, () => {
    console.log('Server started on port '+ port);
});