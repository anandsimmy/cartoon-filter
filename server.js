const express= require('express')
const spawn= require('await-spawn')
const { saveImage }= require('./utils/fileUpload.js')

const app= express()
const PORT= 5000

app.use(express.json({limit: '50mb'}))

app.get('/', (req, res) => {
    res.send('API is running')
})

app.get('/filter', (req, res) => {
    const spawn = child_process.spawn;
    const process = spawn('python3', ['./image-filter.py'])
    process.stdout.on('data', (data) => {
        console.log(data.toString())
    })
    return res.sendFile(__dirname+'/filter.jpg')
})

app.post('/filter', async (req, res) => {
    let imageFileName= saveImage(req.body.img)
    await spawn('python3', ['./image-filter.py', imageFileName])
    return res.sendFile(__dirname+'/filter.jpg')
})


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})