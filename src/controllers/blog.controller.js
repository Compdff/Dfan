const db = require("../models");
const blogModel = require("../models/blog.model");
const blog = db.blog;




// Create and Save a new Blog
exports.create = (req, res) => {
    
    const blogModel = {
        BlogTitle:req.body.BlogTitle,
        EventShortDescription:req.body.EventShortDescription,
        BlogDetails:req.body.BlogDetails,
        BlogImage:req.body.BlogImage,
        PublishedDate: req.body.PublishedDate,
        CreatedBy:req.body.CreatedBy,
        PortalBlogId:req.body.PortalBlogId,
        PortalBlogModifiedDate:req.body.PortalBlogModifiedDate

    };
  blog.findOne({where:{PortalBlogId:req.body.PortalBlogId}})
  .then(blogData=>{
      if(blogData!=null){
      blog.update(blogModel,{where:{Id:blogData.Id}})
      .then(num =>{
        res.status(200).send({
            status:true,
            message: "Blog was updated successfully.",
            data:{       
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
      else{
        blog.create(blogModel)
    .then(data  => {
      res.status(200).send({
        status:true,
        message:'Blog created successfully!',
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
  })
   
  };


   // Update a blog by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
   
    
    blog.update(req.body, {
      where: { Id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            status:true,
            message: "Blog was updated successfully.",
            data:{       
            }
          });
        } else {
          res.status(200).send({
            status:false,
            message: `Cannot update Blog with id=${id}. May be Event was not found or req.body is empty!`,
            data:{}
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Error updating Blog with id=" + id,
          data:{}
        });
      });
  };

// Retrieve all Blogs from the database.
exports.findAll = (req, res) => {
   
    blog.findAll()
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
  
  // Find a BlogB event with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    blog.findByPk(id)
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
            message: "Blog was not found with id=" + id,
            data:{}
          });
        }
        
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Blog retrieving Profile with id=" + id,
          data:{}
        });
      });
  };

  // Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    blog.destroy({
      where: { Id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            status:true,
            message: "Blog was deleted successfully!",
            data:{}
          });
        } else {
          res.send({
            status:false,
            message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`,
            data:{}
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          status:false,
          message: "Could not delete Blog with id=" + id,
          data:{}
        });
      });
  };