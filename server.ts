import express from 'express';
import path from 'path'; 
import cors from 'cors';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './router/userRouter';
import eventRouter from './router/eventRouter';
const app:express.Application=express();
//cors
app.use(cors());
//cofiguration of express to recieve form data
app.use(express.json());
//configure dotEnv
dotEnv.config({path:'./.env'});
const hostName:string|undefined =process.env.HOST_NAME;
const port:string|undefined =process.env.PORT;
//connect to mongodb
let dbURL:string|undefined=process.env.MONGO_DB_LOCAL;
console.log(dbURL)
if(dbURL){
mongoose.connect(dbURL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
    
}).then((res)=>{
    console.log('connected to db')
}).catch((error)=>{
    console.error(error);
    process.exit(1);

});
}
app.use('/public',express.static('public'));
app.use('/public',express.static('public/css'));
app.use('/public',express.static('public/js '));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));




app.get('/',(req:express.Request,res:express.Response)=>{
    res.render('index');

});
interface eventlis
{
    id:string,
 name:string,
 date:string,
 price:number,
 type:string,
 image:string,info:string
 
};
const eventlist:eventlis[]=[
    {
    id:'1',
 name:'event4',
 date:'23/4/22',
 price:555,
 type:'free',
 info:'uuggg tyyugikhjghy uyt67yiuhjygu yt6t7yughtyuy',
 image:'jj.png'
},
{
    id:'2',
 name:'event5',
 date:'23/5/22',
 price:553,
 type:'pro',
 info:'uuggg tyyugikhjghy uyt67yiuhjygu yt6t7yughtyuy',
 image:'jjy.png'
}

] ;

app.get('/eventView/:id',(req:express.Request,res:express.Response)=>{
   
    
    res.render('eventView');

    });
app.post('/create',(req:express.Request,res:express.Response)=>{
    
    
    res.send('created')
});

app.get('/events',(req:express.Request,res:express.Response)=>{
    res.render('events',{
        eventlist
        });
        
        
     
     });



//router config
app.use('/users',userRouter);
app.use('/events',eventRouter);
app.get('**',(req:express.Request,res:express.Response)=>{
    res.render('404.html')
});
if(port && hostName){
    app.listen(Number(port),hostName,()=>{
         console.log(`server at http://${hostName}:${port}`);
    });
}