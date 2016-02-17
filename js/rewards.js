Parse.$ = jQuery;


Parse.initialize('sc0hPlJJJZDZEhnRAD0vUn8EIT8ZqkXQGm407Yui',
'6faVIwMvo7zbcWnR0Bj014g0Pz7Iii5xQIU0tYyG'); // APPKEY, JAVASCRIPTKEY

function updatePoints(cost) {
  
  var query = new Parse.Query(Parse.User);
  query.equalTo("username","cfreder2");
  query.find({
    success: function(results){
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var points = object.get('points');
        newPoints = points-cost;
        object.set('points', newPoints);
        object.save();
        var html =  '<h3>'+ newPoints +'pts</h3>';
        $('#pts').html(html);
      }
    },
    error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
  });
}

function loadPoints() {
  var query = new Parse.Query(Parse.User);
  query.equalTo("username","cfreder2");
  
  query.find({
    success: function(results){
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var points = object.get('points');
        
        var html =  '<h3>'+ points +'pts</h3>';
        $('#pts').html(html);
      }
    },
    error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
  });

}



function loadRewards() {

  var reward = Parse.Object.extend('reward');
  var query = new Parse.Query(reward);
  
  query.find({
    success: function(results){
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var title = object.get('title');
        var description = object.get('description');
        var cost = object.get('cost');
        var imageURL = object.get("image").url();
        var section_class = 'a';
        var btnID=i
        if(i % 2) {
          section_class = 'b';
        }
        
        var html =  '<div class="content-section-'+section_class + '">' +
                    '<div class="container">' +
                    '<div class="row">' +
                    '<div class="col-lg-5 col-sm-6">' +
                    '<div class="clearfix"></div>' +
                    '<h2 class="section-heading">'+ object.get('title') +'</h2>' +
                    '<p class="lead">' + object.get('description') + '</p>' +
                    '<a id="'+btnID+'" onclick="updatePoints('+cost+');" href="#" class="btn btn-default btn-lg"> <span class="network-name">Redeem for ' + cost + 'pts</span></a>' +
                    '</div>' +
                    '<div class="col-lg-5 col-lg-offset-2 col-sm-6">' +
                    '<img class="img-responsive" src="' + imageURL + '" alt="">' +
                    '</div></div></div></div>';
        $('#rewards').append(html);

      

      }
    },
    error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
  });

}

(function(){

  $(document).ready(init);



  function init() {
    loadPoints();
    loadRewards();
  }

  


})();