var bodyParser = require('body-parser');
var firebase = require('firebase');
var output = {id:"",status:""};
var outputs = [];

module.exports = function(app){

   
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    var lastId = undefined;

  

    

    app.get("/api/output/:id",(req,res)=>{
        
        var outputRef = firebase.database().ref('/internet-control/outputs/'+req.params.id);

        outputRef.once('value',function(data){
            res.send(data.val());
        });
       
    });
   


    app.get("/api/outputs",(req,res)=>{
        
        var database = firebase.database();

        firebase.database().ref('/internet-control/outputs').once('value').then(function(snapshot) {
            outputs = snapshot.val();});
            res.send(outputs); 
              
    });

    
     //http POST & UPDATE
     app.post('/api/outputs/',function(req,res)
     {
          //UPDATE
        
         if(req.body.Id || req.body.Id==0)
         {
            console.log(req.body.Id);
             var ref = firebase.database().ref('/internet-control/outputs/' + req.body.Id);
            //  console.log('req.body.name:' + req.body.name);
             ref.update({status:req.body.status}).then(result=>{
                 console.log(result);
                 res.status(201).json({result}); 
             });

            
         }//End of UPDATE
 
         //CREATE
         else
         {
            //  var newTask = Tasks({description:req.body.description,status:req.body.status});
            //  //newTask.save(function(err){if(err)throw err; res.send('success');});
 
            //  newTask.save(function(err,result){
            //      if(err){
            //          return res.status(500).json({
            //              title:'An Error occured',
            //              error:err
            //          });
            //      }
            //      res.status(201).json({
            //          message:'saved task',
            //          obj:result
            //      });
            //  });
         }//End of CREATE
         
     });//End of POST
    
    
    

}