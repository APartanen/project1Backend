const express = require('express');
const mysql = require('mysql');

const app = express();

//yhteys
var db = mysql.createConnection({
    host     : 'localhost',
    user     : '',
    password : '',
    database : ''
  });

//yhdistys
db.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log("Connected")
});

//Alku testaus
app.get('/',(req,res) => {
  res.send("Working")
  })
  
//käyttäjien tiedon haku
app.get('/get',(req,res) => {
    let sql = 'SELECT * FROM käyttäjä'
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result)

    })
})


//postausten tiedon haku
app.get('/getposts',(req,res) => {
    let sql = 'SELECT * FROM postaus'
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result)

    })
})

//Valitse postaukset tietylle käyttäjälle - aika järjestys tässä vai myöhemmin esim serverin puolella vai esim selaimessa oleva javascript funktio? 
app.get('/getPostsForUser',(req,res) => {
  id = 1;
  let sql = `SELECT postaus.* FROM postaus WHERE käyttäjäID = '${id}'`;
  db.query(sql, (err,result) => {
      if(err) throw err;
      console.log(result);
      res.send(result)

  })
})

//Valitse kommentit tietylle postaukselle 
app.get('/getCommentsForPost',(req,res) => {
  id = 2;
  let sql = `SELECT postauskommentit.* FROM postauskommentit WHERE postausID = '${id}'`;
  db.query(sql, (err,result) => {
      if(err) throw err;
      console.log(result);
      res.send(result)

  })
})

//Valitse postaukset tietyllä tagilla - tarvitsee täydennystä
app.get('/getPostsByTagID',(req,res) => {
  id = 1;
  let sql = `SELECT p.* FROM postaustagit p WHERE tagID = '${id}'`;
  db.query(sql, (err,result) => {
      if(err) throw err;
      console.log(result);
      res.send(result)

  })
})

//Hae tagin teksti
app.get('/getTagsByTagID',(req,res) => {
  id = 1;
  let sql = `SELECT tag.* FROM tag WHERE tagID = '${id}'`;
  db.query(sql, (err,result) => {
      if(err) throw err;
      console.log(result);
      res.send(result)

  })
})

//Hae tagit postaukselle - tarvitsee tyädennystä
app.get('/getTagsForPost',(req,res) => {
  id = 1;
  let sql = `SELECT p.* FROM postaustagit p WHERE postausID = '${id}'`;
  db.query(sql, (err,result) => {
      if(err) throw err;
      console.log(result);
      res.send(result)

  })
})

/* POST esimerkki
app.post('/postpost',(req,res) => {
    let sql = `INSERT INTO postaus (käyttäjäID, otsikko, teksti, kuva, julkaisuAika, muokkausAika,poistoAika) 
    VALUES ('${newId}', '${newFirst}', '${newLast}', '${newAge}')`;
    
console.log(sql);
let query = db.query(sql, (err, results) => {
  if(err) throw err; 
  console.log(results);
  res.json(results);
}); 

})



//tietueen päivitys
app.put('/updateTietue', (req,res) => {
  let id1 = req.body.id;
  let name1 = req.body.first; 
  let last1 = req.body.last;
  let age1 = req.body.age;
  let sql = 
  `UPDATE registration
  SET first = '${name1}', last = '${last1}', age = '${age1}'
  WHERE id = ${id1};`

  console.log(sql);
  let query = db.query(sql, (err, results) => {
    if(err) throw err; 
    console.log(results);
    res.json(results);
  }); 
});

app.delete('/poistaTietue', (req,res) => {
  let DelID = req.body.id;
  let sql = `DELETE FROM registration WHERE id='${DelID}'; `
  //jää ikuiseen looppiin
  console.log(sql);
  let query = db.query(sql, (err, results) => {
    if(err) throw err; 
    console.log(results);
    res.json(results);
  }); 
});

*/


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
