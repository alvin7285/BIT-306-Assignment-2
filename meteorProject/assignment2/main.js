MembersList = new Mongo.Collection('Member');
ImageList = new Mongo.Collection('Images');

console.log(MembersList);

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'member': function() {
      var currentUserId = Meteor.userId();
      return MembersList.find({
        createdBy: currentUserId
      }, {
        sort: {
          score: -1,
          name: 1
        }
      })
    },

    'selectedClass': function() {
      var memberId = this._id;
      var selectedMember = Session.get('selectedMember');
      if (memberId == selectedMember) {
        return "selected"
      }
    },

    'showSelectedMember': function() {
      var selectedMember = Session.get('selectedMember');
      return MembersList.findOne(selectedMember)
    }

  });

//for image
  Template.image_add_form.helpers({
    images: ImageList.find({}, {
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

      ImageList.insert({
        img_src: img_src,
        img_alt: img_alt,
        createdOn: new Date()
      });
    }
  });


  Template.leaderboard.events({
    'click .member': function() {
      var memberId = this._id;
      Session.set('selectedMember', memberId);
      var selectedMember = Session.get('selectedMember');
      console.log(selectedMember);
    },

    'click .increment': function() {
      var selectedMember = Session.get('selectedMember');
      MembersList.update(selectedMember, {
        $inc: {
          score: 5
        }
      });

      console.log(selectedMember);
    },

    'click .decrement': function() {
      var selectedMember = Session.get('selectedMember');
      MembersList.update(selectedMember, {
        $inc: {
          score: -5
        }
      });

      console.log(selectedMember);
    },

    'click .remove': function() {
      var selectedMember = Session.get('selectedMember');
      MembersList.remove(selectedMember);
    }

  });


  Template.addMemberForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var memberNameVar = event.target.MemberName.value;
      var currentUserId = Meteor.userId();
      MembersList.insert({
        name: memberNameVar,
        score: 0,
        createdBy: currentUserId
      });
    }
  });

  Template.name.events({
    "click #foo": function(event, template) {

    }
  });



}

if (Meteor.isServer) {
  console.log("Hello Server");
}
