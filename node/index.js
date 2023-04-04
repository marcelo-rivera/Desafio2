const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

let sql = 'CREATE TABLE if not exists people (id int not null auto_increment, name varchar(255), primary key(id))'
connection.query(sql)

sql = `INSERT INTO people(name) values('Marcelo Rivera')`
//connection.query(sql)

let tabela = '<table>';

connection.query("SELECT * FROM people", function (err, result, fields) {
    if(result.length){
        for(var i = 0; i < result.length; i++) {
            tabela = tabela + '<tr><td>'+result[i].name+'</td></tr>';
            
        }
    }
    tabela=tabela+'</table>'
});




app.get('/', (req,res) => {
    res.send('<h1>Full Cycle</h1>'+tabela)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})