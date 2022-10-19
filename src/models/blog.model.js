module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("Blog", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      BlogTitle: {
        type: Sequelize.STRING
      },
      EventShortDescription: {
        type: Sequelize.STRING(200)
      },
      BlogDetails: {
        type: Sequelize.STRING(500)
      },
      BlogImage: {
        type: Sequelize.STRING(200)
      },
      PublishedDate: {
        type: Sequelize.DATE
      },
      CreatedBy: {
        type: Sequelize.STRING
      },
      PortalBlogId: {
        type: Sequelize.INTEGER
      },
      PortalBlogModifiedDate: {
        type: Sequelize.DATE
      }
      
    });
  
    return Blog;
  };