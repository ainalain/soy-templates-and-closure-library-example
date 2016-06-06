var express = require("express");
var fs = require('fs');
var path = require('path');


const soy = require('./node_modules/clobl/soy').setOptions({
    closureLibrary: path.join(
        __dirname,
        'node_modules/google-closure-library'
    ),
    closureTemplates: path.join(
        __dirname,
        'node_modules/closure-templates'
    )
});

soy.loadFiles([path.join(__dirname, 'build/compiledServerSoy/server.soy.concat.js')]);

var app = express();
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname, "/external")));
app.use(express.static(path.join(__dirname, "/blocks")));
app.use(express.static(path.join(__dirname, "/node_modules")));


app.get('/', function(req, res) {

    var html = soy.render('bPage.Page.Template.base', {linkObjs: [{text: 'Contacts', url: '#contacts', active: true},
                                                            {text: 'Trusted', url: '#trusted', active: false},
                                                            {text: 'Profile', url: '#profile', active: false}],                                                    
                                                        tabObjs: [{text: 'HERE YOU CAN ADD YOUR CONTACTS', url: 'contacts', active: true}, 
                                                            {text: 'HERE YOU CAN ADD YOUR TRUSTED CONTACTS', url: 'trusted', active: false},
                                                            {text: 'HERE YOU CAN EDIT YOUR PROFILE', url: 'profile', active: false, image: 'img/toy_creatror.png', 
                                                        profLinks: [{text: 'Accountant'}, {text: 'Car mechanic'}, {text: 'Cosmetologist'},
                                                            {text: 'Dentist'}, {text: 'Film-maker'}, {text:'Lawyer'}, {text:'Nurse'},
                                                        {text: 'Python developer'}, {text: 'Scene-designer'}, {text: 'Taxi driver'}]}]});

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
});


app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
