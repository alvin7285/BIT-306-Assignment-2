PlayersList = new Mongo.Collection('Player');
ImageList = new Mongo.Collection('Images');

console.log(PlayersList);

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function() {
      var currentUserId = Meteor.userId();
      return PlayersList.find({
        createdBy: currentUserId
      }, {
        sort: {
          score: -1,
          name: 1
        }
      })
    },

    'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return "selected"
      }
    },

    'showSelectedPlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer)
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
    'click .player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
    },

    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {
        $inc: {
          score: 5
        }
      });

      console.log(selectedPlayer);
    },

    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {
        $inc: {
          score: -5
        }
      });

      console.log(selectedPlayer);
    },

    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    }

  });


  Template.addPlayerForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var playerNameVar = event.target.PlayerName.value;
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
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
