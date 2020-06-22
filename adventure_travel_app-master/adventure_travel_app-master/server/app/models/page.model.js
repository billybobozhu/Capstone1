module.exports = (sequelize, Sequelize) => {
    const Page = sequelize.define("page", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      content: {
        type: Sequelize.JSON
      },
      authorid: {
        type: Sequelize.INTEGER
      },
      tags: {
        type: Sequelize.JSON
      },
    });
  
    return Page;
  };