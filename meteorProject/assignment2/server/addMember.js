PlayersList=new Mongo.Collection('Players');
console.log(PlayersList);

if(Meteor.isClient){
Template.assignment2.helpers({
  'player': function(){
      return PlayersList.find( )
  },

  'selectedClass':function(){
        var playerId=this._id;
        var selectedPlayer=Session.get('selectedPlayer');
        if (playerId==selectedPlayer){
          return "selected"
        }
      }
});

Template.assignment2.events({
  'click .player':function(){
      var playerId= this._id;
      Session.set('selectedPlayer',playerId);
      var selectedPlayer=Session.get('selectedPlayer');
      console.log(selectedPlayer);
  	},

    'click .increment':function(){
     var selectedPlayer=Session.get('selectedPlayer');
     PlayersList.update(selectedPlayer,{$inc:{score:5}});

   }






 });


}

if (Meteor.isServer){
  console.log("Hello Server");
}
