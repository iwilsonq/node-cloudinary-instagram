var cloudinary = require('cloudinary');

var Model = require('./model');

cloudinary.config({
  cloud_name:	'ruffr',
  api_key: '523783848114792',
  api_secret:	'NbwOB2G9tYRb4XtO7P-L27hHWPY'
});

module.exports = {
  new: function (req, res) {
      res.render('pages/new');
  },
  create: function (req, res) {
    cloudinary.v2.uploader.upload(req.files.image.path,
      { eager: [
            { width: 2000, height: 1000, crop: "pad" }, 
            { width: 750, height: 300, crop: "crop", gravity: "north"}
          ]
      },
      function(result) {
      var post = new Model({
        title: req.body.title,
        description: req.body.description,
        createdAt: new Date(),
        image: result.url,
        image_id: result.public_id
      });

      post.save(function(err) {
        if (err){
          res.send(err);
        }

        res.redirect('/');
      });
    });
  }
};
