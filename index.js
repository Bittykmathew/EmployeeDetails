const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'pug') // sets the view engine 
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views')) // sets the view directory

app.get('/', (req, res) => {
    res.render("index") // render view file on this endpoint
});

app.get('/about', function(req, res){
    res.render('about');
  });

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});