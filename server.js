const express= require('express')
const child_process= require('child_process')

const app= express()
const PORT= 5000

app.get('/', (req, res) => {
    res.send('API is running')
})

app.get('/filter', (req, res) => {
    var spawn = child_process.spawn;
    var process = spawn('python3', ['./image-filter.py'])
    process.stdout.on('data', (data) => {
        console.log('data', data)
        res.send(data);
      });
})


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})