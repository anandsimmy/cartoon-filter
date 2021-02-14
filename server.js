const express= require('express')
const child_process= require('child_process')
const cors= require('cors')
var path = require('path');
const { saveImage }= require('./utils/fileUpload.js')

const app= express()
const PORT= process.env.PORT || 5000

app.use(express.json({limit: '50mb'}))

app.use(cors());

app.post('/filter', (req, res) => {
    let imageFileName= saveImage(req.body.img)
    try{
        child_process.execFileSync('python3', ['./image-filter.py', imageFileName])
        return res.sendFile(__dirname+'/filter.jpg')
    }
    catch(err){
        console.error('err', err)
    }
})

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    console.log('hi from prod')
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        console.log('hi from prod get')
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})