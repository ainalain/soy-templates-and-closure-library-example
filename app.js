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

    var html = soy.render('tr.bLayout.Template.base', {
        linkObjs: [{text: 'Контакты', url: '#contacts', active: true},
                    {text: 'Trusted', url: '#trusted', active: false},
                    {text: 'Профиль', url: '#profile', active: false}],
        tabObjs: [{text: 'Здесь Вы можете добавить ваши контакты', url: 'contacts', active: true}, 
                  {text: 'Здесь Вы можете добавить ваши проверенные контакты', url: 'trusted', active: false},
                  {text: ' ', url: 'profile', active: false, image: 'img/toy_creatror.png', name: 'Пётр Иванов', profLinks: [{text: 'Адвокат'}, {text: ' Автослесарь'}, {text: 'Веб-дизайнер'},
                  {text: 'Дизайнер интерьеров'}, {text: 'Копирайтер'}, {text:'Программист PhP'}, {text:'Няня'}, {text: 'Риэлтор'}, {text: 'Стоматолог'}, {text: 'Таксист'}]}]
              });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
});


app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
