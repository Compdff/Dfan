const { StartupDocument } = require("pg");
const db = require("../models");
const startupDocumentModel = require("../models/startupdocument.model");
const startupDocument = db.startupdocument;


exports.create = (req, res) => {

  var document = req.body.document;
  var flag = 0

  for(let i = 0; i < document.length; i++)
   {
    if( document[i].Id==0)
    {
      startupDocument.create(document[i])
    }
    
  }
  startupDocument.findAll({
    where: {
        StartupProfileId: req.params.StartupProfileId
      }
})
.then(data => {
         for(let i = 0; i < data.length; i++)
         {
           if(document.length==0||document==null){
            startupDocument.destroy({
              where: { Id: data[i].Id }
            })
           }
           for(let j = 0; j < document.length; j++)
           {
             if(data[i].Id==document[j].Id){
              startupDocument.update(document[j], {
                where: { Id: document[j].Id }
              })
              flag=0;
              break;
             }
             else{
               flag=1;
             }
           }
           if(flag==1){
            startupDocument.destroy({
              where: { Id: data[i].Id }
            })
           }
         }
         startupDocument.findAll({
          where: {
              StartupProfileId: req.params.StartupProfileId
            }
      })
      .then(data => {
         res.status(200).send({
          status:true,
          message:'Startup document request created successfully!'
          
      })
    })
         
      }) 

 

  .catch(err => {
    res.status(200).send({
        status:false,
        message:
        err.message || "Some error occurred.",
        data:{}
    });
  }); 
};



// Upload startup document by the id in the request 
exports.upload = (req, res) => {
  const id = req.params.id;
  const request = {
    Status: 1,
    URL:req.body.URL
  }

  startupDocument.update(request, {
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "startup document was uploaded successfully.",
          data:{       
          }
        });
      } else {
        res.status(200).send({
          status:false,
          message: `Cannot upload document with id=${id}. May be document request was not found or req.body is empty!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error uploading document with id=" + id,
        data:{}
      });
    });
};

// Verify startup document by the id in the request 
exports.verify = (req, res) => {
  const id = req.params.id;
  const request = {
    Status: req.body.status
  }

  startupDocument.update(request, {
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "startup document was verifed successfully.",
          data:{       
          }
        });
      } else {
        res.status(200).send({
          status:false,
          message: `Cannot verify document with id=${id}. May be document request was not found or req.body is empty!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error verifing document with id=" + id,
        data:{}
      });
    });
};



exports.findAll = (req, res) => {
  
  startupDocument.findAll({
        where: {
            StartupProfileId: req.profileId
          }
    })
      .then(data => {
        if(data.length !=0){
          res.status(200).send({
            status:true,
            data:{data}
          });
        }
        else{
          res.status(200).send({
            status:false,
            message: "No Reqest was found with StartupProfileId=" + req.profileId,
            data:{}
          });
        }
            })
      .catch(err => {
        res.status(200).send({
          status:false,
          message:
            err.message || "Some error occurred while retrieving eqests.",
            data:{}
        });
      });
  };

  // Retrive all query by startup id for admin
exports.findAllDocs = (req, res) => {
  
  startupDocument.findAll({
      where: {
          StartupProfileId: req.params.startupid
        }
  })
    .then(data => {
      if(data.length !=0){
        res.status(200).send({
          status:true,
          data:{data}
        });
      }
      else{
        res.status(200).send({
          status:false,
          message: "No Reqest was found with StartupProfileId=" + req.params.startupid,
          data:{}
        });
      }
          })
    .catch(err => {
      res.status(200).send({
        status:false,
        message:
          err.message || "Some error occurred while retrieving eqests.",
          data:{}
      });
    });
};

