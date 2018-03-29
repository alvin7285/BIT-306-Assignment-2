PicturesList = new Mongo.Collection('Picture');


console.log(PicturesList);

if (Meteor.isClient) {
  Template.image_add_form.helpers({
    'picture': function() {
      var currentUserId = Meteor.userId();
      return PicturesList.find({
        createdBy: currentUserId
      }, {
        sort: {
          title: 1
        }
      })
    },

    'selectedClass': function() {
      var pictureId = this._id;
      var selectedPicture = Session.get('selectedPicture');
      if (pictureId == selectedPicture) {
        return "selected"
      }
    },

    'showSelectedPicture': function() {
      var selectedPicture = Session.get('selectedPicture');
      return PicturesList.findOne(selectedPicture)
    }

  });

//for image
  Template.image_add_form.helpers({
    images: PicturesList.find({}, {
      sort: {
        createdOn: -1
      }
    })
  });

//for image
  Template.image_add_form.events({
    "submit .js-add-image": function(event) {
      var img_src = event.target.img_src.value;
      var img_alt = event.target.img_alt.value;
      var title = event.target.title.value;
      var createdBy = Meteor.userEmail();
      var description = event.target.description.value;
      PicturesList.insert({
        img_src: img_src,
        img_alt: img_alt,
        title: title,
        createdBy: createdBy,
        description: description,
        createdOn: new Date()
      });
    }
  });


  Template.image_add_form.events({
    'click .picture': function() {
      var pictureId = this._id;
      Session.set('selectedPicture', pictureId);
      var selectedPicture = Session.get('selectedPicture');
      console.log(selectedPicture);
    },

    // 'click .increment': function() {
    //   var selectedPicture = Session.get('selectedPicture');
    //   PicturesList.update(selectedPicture, {
    //     $inc: {
    //       score: 5
    //     }
    //   });

    //   console.log(selectedPicture);
    // },

    // 'click .decrement': function() {
    //   var selectedPicture = Session.get('selectedPicture');
    //   PicturesList.update(selectedPicture, {
    //     $inc: {
    //       score: -5
    //     }
    //   });
    //
    //   console.log(selectedPicture);
    // },

    'click .remove': function() {
      var selectedPicture = Session.get('selectedPicture');
      PicturesList.remove(selectedPicture);
    }

  });


  // Template.image_add_form.events({
  //   'submit form': function(event) {
  //     event.preventDefault();
  //     var pictureNameVar = event.target.PictureName.value;
  //     var currentUserId = Meteor.userId();
  //     PicturesList.insert({
  //       name: pictureNameVar,
  //       createdBy: currentUserId
  //     });
  //   }
  // });


}

if (Meteor.isServer) {
  console.log("Hello Server");
}
