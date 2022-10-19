const db = require("../models");
const eventModel = require("../models/event.model");
const event = db.event;
const jwt = require("jsonwebtoken");
const eventrsvp = db.eventrsvp;
const startupprofile = db.startupprofile;
const investors = db.investorprofile;
const user = db.user;

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
   
    event.findAll()
      .then(data => {
        res.status(200).send({
          status:true,
          data:{data}
        });
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message:
            err.message || "Some error occurred while retrieving users.",
            data:{}
        });
      });
  };

  // Retrieve all Events by startupId from the database.
exports.findAllByStartupId = (req, res) => {
  const StartupProfileId = req.params.startupId;

  event.findAll({
    where: { StartupProfileId: StartupProfileId }
  })
    .then(data => {
      res.status(200).send({
        status:true,
        data:{data}
      });
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message:
          err.message || "Some error occurred while retrieving users.",
          data:{}
      });
    });
};

// Create and Save a new Event
exports.create = (req, res) => {
    
    const eventModel = {
        StartupProfileId:req.body.StartupProfileId,
        EventTitle:req.body.EventTitle,
        EventDate:req.body.EventDate,
        StartTime:req.body.StartTime,
        EndTime: req.body.EndTime,
        CallLink:req.body.CallLink,
        Description:req.body.Description,
        ImageURL:req.body.ImageURL,
        RecordingURL:req.body.RecordingURL,
        State:0,
        CreatedBy:req.body.CreatedBy,
        PortalEventId:req.body.PortalEventId,
        PortalEventModifiedDate:0,
        TimeZone:req.body.TimeZone

    };
    // event.findOne({where:{PortalEventId:req.body.PortalEventId}})
    // .then(eventData=>{
    //   if(eventData!=null){
    //     event.update(eventModel,{where:{Id:eventData.Id}})
    //   .then(num =>{
    //     res.status(200).send({
    //         status:true,
    //         message: "Event was updated successfully.",
    //         data:{       
    //         }
    //       });
    //   })
    //   .catch(err => {
    //     res.status(200).send({
    //         status:false,
    //         message:
    //         err.message || "Some error occurred.",
    //         data:{}
    //     });
    //   });
    //   }
    //   else{
        event.create(eventModel)
        .then(data  => {
          res.status(200).send({
            status:true,
            message:'Event created successfully!',
            data:{
              event:data
          }
        });
        })  
        .catch(err => {
          res.status(200).send({
              status:false,
              message:
              err.message || "Some error occurred.",
              data:{}
          });
        });
      }

  //   })
   
  // };

  // Update a Event by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
   
    
    event.update(req.body, {
      where: { Id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            status:true,
            message: "Event was updated successfully.",
            data:{       
            }
          });
        } else {
          res.status(200).send({
            status:false,
            message: `Cannot update Event with id=${id}. May be Event was not found or req.body is empty!`,
            data:{}
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error updating Query with id=" + id,
          data:{}
        });
      });
  };

  // Find a single event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  event.findByPk(id)
    .then(data => {
      if(data){
        res.status(200).send({
          status:true,
          data:{data}
        });
      }
      else{
        res.status(200).send({
          status:false,
          message: "Event was not found with id=" + id,
          data:{}
        });
      }
      
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error retrieving Profile with id=" + id,
        data:{}
      });
    });
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  event.destroy({
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "Event was deleted successfully!",
          data:{}
        });
      } else {
        res.send({
          status:false,
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Could not delete Event with id=" + id,
        data:{}
      });
    });
};

 // Update a Event by the id in the request
 exports.updateState = (req, res) => {
  const id = req.params.id;

  event.update(req.body ,{
    where: { Id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:true,
          message: "Event was updated successfully.",
          data:{       
          }
        });
      } else {
        res.status(200).send({
          status:false,
          message: `Cannot update Event with id=${id}. May be Event was not found or req.body is empty!`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(200).send({
        status:false,
        message: "Error updating Query with id=" + id,
        data:{}
      });
    });
};


// Create and Save a new Event RSVP
exports.createRsvp = (req, res) => {
    
  const eventModel = {
      InvestorId:req.profileId,
      Status:req.body.Status,
      CreatedDate:new Date(),
      EventId:0

  };
  event.findOne(
    {where:{StartupProfileId:req.body.StartupProfileId,IsActive:1}}
  )
 .then(eventData => {
   eventModel.EventId = eventData.Id;
   eventrsvp.create(eventModel)
  .then(data => {
    res.status(200).send({
      status:true,
      message:'EventRSVP created successfully!',
      data:{
        eventrsvp:data
    }
  });
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

// Create and Save a new Event RSVP
exports.findAllRsvp = (req, res) => {
    var result = []
 eventrsvp.findAll({where:{EventId:req.params.eventId}})
 .then(data =>{
investors.findAll({include: [user]})
.then(inves =>{
  data.forEach(element => {
    var response= {
    Id:element.Id,
    EventId:element.EventId,
    InvestorName:inves.find(x=>x.Id ==element.InvestorId ).User.Name,
    Status:element.Status
    };
    result.push(response);
  })
  res.status(200).send({
    status:true,
    data:{result}
});
})
  
 })
  .catch(err => {
    res.status(200).send({
        status:false,
        message:
        err.message || "Record not found for event id",
        data:{}
    });
  });
};

