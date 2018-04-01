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
          createdOn: 1
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
    },

  });

  Template.image_add_form.helpers({
    images: function() {
      var regexp = new RegExp(Session.get('search/keyword'), 'i');
      if (!regexp) {
        return PicturesList.find({}, {
          sort: {
            createdOn: -1
          }
        })
      }
      return PicturesList.find({
        email: regexp
      }, {
        sort: {
          createdOn: -1
        }
      });
    }
  });

  Template.image_add_form.events({
    "submit .js-add-image": function(event) {
      var img_src = event.target.img_src.value;
      var img_alt = event.target.img_alt.value;
      var title = event.target.title.value;
      var email = Meteor.user().emails[0].address;
      var description = event.target.description.value;
      PicturesList.insert({
        img_src: img_src,
        img_alt: img_alt,
        title: title,
        email: email,
        description: description,
        createdOn: new Date()
      });
    },

    'keyup .search': function(event) {
      Session.set('search/keyword', event.target.value);
    },

  });


  Template.image_add_form.events({
    'click .picture': function() {
      var pictureId = this._id;
      Session.set('selectedPicture', pictureId);
      var selectedPicture = Session.get('selectedPicture');
      console.log(selectedPicture);
    },

    'click .edit': function(event) {
      var selectedPicture = Session.get('selectedPicture');
      var newTitle = prompt("Enter new Title");
      var newDescription = prompt("Enter new Description");

      PicturesList.update(selectedPicture, {
        $set: {
          title: newTitle,
          description: newDescription
        }
      });
      console.log(selectedPicture);
    },

    'click .remove': function() {
      var selectedPicture = Session.get('selectedPicture');

      if(confirm("Are you sure to delete this image?") == true)
        PicturesList.remove(selectedPicture);
    },

    'click .filter': function() {
      var currentUser = Meteor.user().emails[0].address;

      return PicturesList.find({email:currentUser}, {
        sort: {
          createdOn: -1
        }
      }).fetch();
    }


  });




}

if (Meteor.isServer) {
  console.log("Hello Server");
}
