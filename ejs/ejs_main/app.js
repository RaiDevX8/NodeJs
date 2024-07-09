import express from 'express'
import web from './routes/web.js'

const app= express();

app.get(express.urlencoded({extended:false}))
const PORT=3000;

app.set('view engine','ejs')

app.use('/',web)


app.listen(PORT,()=>{
    console.log(`you are in ${PORT}`);
})
