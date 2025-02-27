const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");


//import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypesRoutes = require('./routes/jobsTypesRotes');
const jobRoute = require('./routes/jobsRoutes');
const cookieParser = require("cookie-parser");
const errorHandler = require('./middleware/error');
    
    //database connection
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => console.log("DB connected"))
        .catch((err) => console.log(err));
    

    //middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLEWARE
//app.get('/', (req, res) => {
  //  res.send("Hello from nodejs");
//})
app.use('/api',authRoutes );
app.use('/api',userRoutes );
app.use('/api', jobTypesRoutes);
app.use('/api',jobRoute);
 

//error middleware
app.use(errorHandler);

//PORT
const port = process.env.PORT || 9000
app.listen(port, ()=> {

    console.log(`server running on port ${port}`);
});
