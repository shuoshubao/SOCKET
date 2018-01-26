var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const time = (date, format = 'yyyy-MM-dd HH:mm:ss') => {
    const pad = s => `0${s}`.slice(-2);
    const dt = new Date(+date);
    const parse = {
        MM: dt.getMonth() + 1,
        dd: dt.getDate(),
        HH: dt.getHours(),
        mm: dt.getMinutes(),
        ss: dt.getSeconds()
    };
    Object.keys(parse).forEach(v => (parse[v] = pad(parse[v])));
    parse.yyyy = dt.getFullYear();
    return Object.entries(parse).reduce((prev, [k, v]) => {
        prev = prev.replace(k, v);
        return prev;
    }, format);
};

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/lib/**', function(req, res) {
    res.sendFile(__dirname + req.path);
});

io.on('connection', function(socket) {
    console.log('连接成功 ✨');
    socket.on('chat', function(data) {
        console.log(`时间: ${time(data.time)}, 消息: ${data.text}`);
    });

    setInterval(() => {
        // socket.broadcast.emit('update', 'hhhh')
        // socket.emit('update', 'hhhh')
        socket.emit('update', {name: '硕鼠宝', age: 1})
    }, 2000);

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
