var politicsApp = angular.module('politicsApp', []);
var tempKey = "";
// var cids = [];

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});

politicsApp.controller('politicsController', function ($scope) {

  $scope.cids = ["test"];
  $scope.candinfo = [];

  chrome.runtime.sendMessage({method:"getCids"},function(response){
    //here response will be the word you want
    $scope.cids = response.cids;
    // $scope.$apply();
    // console.log($scope.cids);
    var tempArray = [];
    for(var i = 0; i < $scope.cids.length; i++) {
      // console.log($scope.cids[i]);


      $.getJSON("https://www.opensecrets.org/api/?method=candContrib&cid="+$scope.cids[i]+"&cycle=2016&apikey="+tempKey+"&output=json",
        function(data) {

          var name = data.response.contributors["@attributes"]["cand_name"];

          var temp = {
            name: name.substring(0, name.length-3),
            donor: data.response.contributors.contributor[0]["@attributes"]["org_name"],
            party: name.substring(name.length-4).trim(),
            source: data.response.contributors["@attributes"].source
          };

          console.log(temp.source);

          $scope.candinfo.push(temp);
          $scope.$apply();
        });
      }


  });

});