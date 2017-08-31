
//var Outputs = require('../models/outputModel');
var bodyParser = require('body-parser');
var firebase = require('firebase');
//var mongoose = require('mongoose');
var output = {id:"",status:""};
var outputs = [];
module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    
    //http GET
    
    //app.get('/api/outputs',function(req,res)
    //app.get('https://internet-control.herokuapp.com/api/outputs',function(req,res)dd
    app.get('/api/outputs/',function(req,res)
    {
         console.log("*rrrrfffffffffrrrrrr");
        //res.send('**************');
        var database = firebase.database();
       // https://dazzling-torch-8270.firebaseio.com/RemotePower/Outputs
firebase.database().ref('/internet-control/outputs').once('value').then(function(snapshot) {
  outputs = snapshot.val();});
  res.send(outputs);
        /*Outputs.find({},function(err,outputs)
                        {
                            if(!err)
                            {res.send(outputs);
                            }
                        }); */
    });
    


    //http POST & UPDATE
    app.post('/api/outputs/',function(req,res)
    {
         //UPDATE
        if(req.body.id || req.body.id==0)
        {
            
            var ref = firebase.database().ref('/internet-control/outputs/' + req.body.id);
            ref.update({status:req.body.status});
        }//End of UPDATE

        //CREATE
        else
        {
            var newTask = Tasks({description:req.body.description,status:req.body.status});
            //newTask.save(function(err){if(err)throw err; res.send('success');});

            newTask.save(function(err,result){
                if(err){
                    return res.status(500).json({
                        title:'An Error occured',
                        error:err
                    });
                }
                res.status(201).json({
                    message:'saved task',
                    obj:result
                });
            });
        }//End of CREATE
        
    });//End of POST
   

    app.delete('/api/tasks',function(req,res)
    {
        console.log("***********/////////////");
      Tasks.findById({_id:new mongoose.mongo.ObjectID(req.body.id)}, function (err, task) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!task) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        task.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });

    });//End if Delete


}// End of the Controller