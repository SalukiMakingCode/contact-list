const express = require('express');
const fs = require('fs');
let file = fs.readFileSync('./assets/data/contact.json');
let contactList = JSON.parse(file);

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/api/contact', (req, res, next) => {
    res.status(200).json(contactList);
});

app.post ('/api/contact', (req, res, next) => {
    const id = new Date().getTime().toString(10);
    let toInsert = {
        "id" : id,
        "firstname" : req.body.firstname.firstname,
        "lastname" : req.body.lastname.lastname,
        "address" : req.body.address.address,
        "cp" : req.body.cp.cp,
        "city" : req.body.city.city,
        "email" : req.body.email.email,
        "phone" : req.body.phone.phone
    }
    let addContactList = JSON.stringify(contactList).replace("]", ",") + JSON.stringify(toInsert) + "]";
    fs.writeFile('./assets/data/contact.json', addContactList, function(err) {
       console.log('done');
    });
    res.status(200).json({message:"ceci est un test post", jsonSend : req.body});
})

app.put ('/api/contact', (req, res, next) => {
    let toInsert = {
        "id" : req.body.id,
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname,
        "address" : req.body.address,
        "cp" : req.body.cp,
        "city" : req.body.city,
        "email" : req.body.email,
        "phone" : req.body.phone
    }
    let id=req.body.id;
    let updateContactList = contactList.filter((item) => item.id !== id);
    updateContactList = JSON.stringify(updateContactList).replace("]", ",") + JSON.stringify(toInsert) + "]";
    fs.writeFile('./assets/data/contact.json', updateContactList, function(err) {
        console.log('update done');
    });
    res.status(200).json({message:"ceci est un test put", jsonSend : req.body});
});

app.delete ('/api/contact', (req, res, next) => {
    let id=req.body.id;
    let newContactList = contactList.filter((item) => item.id !== id);
    newContactList = JSON.stringify(newContactList);
    fs.writeFile('./assets/data/contact.json', newContactList, function(err) {
        console.log('done');
    });
    res.status(200).json({message:"ceci est un retour de delete", jsonSend : req.body});
})

module.exports=app;