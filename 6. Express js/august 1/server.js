const express = require('express');


const abc = express();

abc.use(express.json());
abc.use(express.urlencoded({ extended: true }));
abc.use(morgan('dev'));
abc.use(cors());
abc.use("compression");


abc.get('/', (req, res) => {
    res.send('MAKIT FOR A FUN ');
});

abc.listen(3000, () => {   
    console.log('Server is running on port 3000');
 });