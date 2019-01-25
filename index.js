const mysql= require('mysql')

function PingService() {}

exports = module.exports = PingService;

PingService.prototype.ping = function(service, callback) {
    var startTime = +new Date();
    var host = service.pingServiceOptions['mysql'].host.value;
    var user = service.pingServiceOptions['mysql'].user.value;
    var password = service.pingServiceOptions['mysql'].password.value;
    var database = service.pingServiceOptions['mysql'].database.value;
    var port = service.pingServiceOptions['mysql'].port.value;

    const client = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        port: port
    });
    client.connect(err => {
        if (err) {
            callback(err.toString(), '', '', +new Date() - startTime);
            return;
        }
        client.query('SELECT NOW()', (err, res) => {
            if (err) {
                callback(err.toString(), '', res, +new Date() - startTime);
            } else {
                callback(null, '', res, +new Date() - startTime);
            }
            client.end();
        });
    });
};

PingService.prototype.getDefaultOptions = function() {
    return {
        host: {
          descr: 'Host',
          required: true
        },
    
        user: {
          descr: 'User',
          required: false
        },

        password: {
          descr: 'Password',
          required: false
        },

        database: {
          descr: 'Database',
          required: false
        },
        port: {
          descr: 'Port',
          required: false
        }
    };
};

