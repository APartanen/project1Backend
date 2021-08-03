const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({limit:'1mb'}));

//yhteys
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0442902835',
    database : 'project1'
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
  console.log(req);
  res.send("Working");
})
  


//Valitse postaukset tietylle käyttäjälle - aika järjestys tässä vai myöhemmin esim serverin puolella vai esim selaimessa oleva javascript funktio? 
app.get('/getPostsForUser',(req,res) => {
  //let id=req.body.id;
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


//Valitse postaukset tietyllä tagilla - toimii
app.get('/getPostsByTagID',(req,res) => {
  id = 1;
  let sql = `SELECT p.* FROM postaustagit p WHERE tagID = '${id}'`;
  db.query(sql, (err,result) => {
    if(err) throw err;

    let list = []
    result.forEach(element => {
      if(!list.includes(element.postausID)) { 
        list.push(element.postausID)
      } else {
        //console.log("else:",list.includes(element))
        //console.log(list)
      }
    })

    //etsi näiden postausID avulla postaukset 
    let sql = `SELECT postaus.* FROM postaus WHERE postausID IN (${list})`;
    db.query(sql, (err,result) => {
      if(err) throw err;
        res.send(result);
    });  
  })
})

//Hae tagin teksti
app.get('/getTagsByTagID',(req,res) => {
  id = 1;
  let sql = `SELECT tag.* FROM tag WHERE tagID = '${id}'`;
  db.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
  })
})



//Hae tagit postaukselle - toimii
app.get('/getTagsForPost',(req,res) => {
  id = 1;
  let sql = `SELECT p.* FROM postaustagit p WHERE postausID = '${id}'`;
  db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    

    let list = []
    result.forEach(element => {
      if(!list.includes(element.tagID)) { 
        list.push(element.tagID)
      } else {
        //console.log("else:",list.includes(element))
        //console.log(list)
      }
    })

    
    let sql = `SELECT tag.* FROM tag WHERE tagID IN (${list})`;
    db.query(sql, (err,result) => {
      if(err) throw err;
        res.send(result);
    });  
  })
})

//Poista postaus - testausta
app.delete('/poistaPostaus', (req,res) => {
  //let delID = req.body.id;
  let sql = `DELETE FROM postaus WHERE id='${delID}'; `

  console.log(sql);

  db.query(sql, (err, res) => {
    if(err) throw err; 
    console.log(res);
    res.send(res);
  }); 

  let sql2 = `DELETE FROM postaustagit WHERE postausID='${delID}'; `
  db.query(sql, (err, res) => {
    if(err) throw err; 
    console.log(res);
    res.send(res);
  }); 


});

//luo postaus
app.post('/postpost',(req,res) => {
  //console.log("req.body:",req.body);
  let käyttäjäID = req.body.käyttäjäID;
  let otsikko = req.body.otsikko;
  let teksti = req.body.teksti;
  let kuva = req.body.kuva;

  let sql = `INSERT INTO postaus (käyttäjäID, otsikko, teksti, kuva, julkaisuAika)
  VALUES ('${käyttäjäID}', '${otsikko}', '${teksti}', '${kuva}', CURRENT_TIMESTAMP);`
  //Save a post into database
  db.query(sql, (err, res) => {
    if(err) throw err; 

    //Save tag info into database with post id and tagid - need to add permanent tagIds
    let sql2 =  `INSERT INTO postaustagit (tagID,postausID)
    VALUES ('1','${res.insertId}');`
    db.query(sql2, (err, res) => {
      if(err) throw err; 
    }); 
  
  }); 



  res.send("received");
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
