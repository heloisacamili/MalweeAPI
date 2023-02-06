const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const md5 = require('md5');
const jwt =require('jsonwebtoken');
const SECRET = 'handebol';
const port = 3019;
const cors = require('cors')

const corsOptions = {
    origin : '*',
    optionsSuccessStatus : 200
}
app.use(cors(corsOptions))
app.use(bodyparser.json())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.post('/cadastro',(req, res)=>{
    console.log(req.body.name)
    res.send(req.body);
    const mysql = require('mysql');
    const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'heloisa'
   })
   con.connect(function(err) {
       if (err) throw err;
       console.log("Connected!");
       const sql = "INSERT INTO heloisa.clientes (name, telefone) VALUES ('"+req.body.name+"', '"+req.body.telefone+"')";
       con.query(sql, function (err, result) {
           if (err) throw err;
           res.status(200);
           res.end();
        });
    });
 });
app.get('/cadastro', (req, res) => {
    const mysql = require('mysql');
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'heloisa'
    })
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query ("SELECT * FROM heloisa.clientes", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        })
    })
})
app.post('/login', async (req, res) => {
    const name  = req.body.name;
    const tel = req.body.telefone;
    const sql2 = `select * from heloisa.clientes where clientes.name = '${name}' and clientes.telefone = '${tel}'`;
    const result = await execSQL(sql2);
    if (result == undefined || result.length == 0){
        res.status(401);
        res.end();
        return;
    }
    const token = jwt.sign({idclientes: result[0].idclientes}, SECRET, {expiresIn: 300})
    res.json({ auth: true, token});
});

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
    if(err) return res.status(401).end();
    
    req.name = decoded.name
    next()
})}
app.post('/delete', async (req, res) => {
    const mysql = require('mysql');
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'heloisa'
    })
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query ("DELETE FROM heloisa.clientes WHERE heloisa.clientes.name = '"+req.body.name+"' and heloisa.clientes.telefone = '"+req.body.telefone+"'", function (err, result, fields) {
            if (err) throw err;
            console.log("deletado!");
            res.status(200);
            res.end();
        })
    })
})


const execSQL = (sql2) => {
    return new Promise((resolve, reject) => {
      const mysql = require('mysql');
      const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'heloisa'
  
    })
    con.connect((error) => {
        if (error){
            reject(error);
            return;
        }
        con.query(sql2, (error, result) => {
            if (error){
                 reject(error);
                return;
            }
            console.log("Connected!");
            con.destroy();
            console.log(result)
            resolve(result);
            })
        })
    })
}
