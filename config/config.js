var configValues = require('./config');
module.exports = {

getDbConnectionString:function(){
    
        //return 'mongodb://' + configValues.username +':' +configValues.password+'@ds159747.mlab.com:59747/task-manager';
        //return 'mongodb://localhost/InternetControlDatabase';
        //return 'output-server:k8084164@ds123050.mlab.com:23050/app-data';
        return 'mongodb://kam:k8084164@ds127300.mlab.com:27300/heroku_16jnb8q4';
        
        //return 'mongodb://output-server:k8084164@ds123050.mlab.com:23050/app-data';

    }
}