var tempKey = "";

// Saves options to chrome.storage
function save_options() {
  var chosenState = document.getElementById('state').value;
  document.getElementById('save').disabled = true;
  chrome.storage.sync.set({
    state: chosenState
  }, function() {
    var status = document.getElementById('status');

    $.getJSON("http://www.opensecrets.org/api/?method=getLegislators&id="+chosenState+"&output=json&apikey="+tempKey,
    function(data) {
      var items = [];
      $.each(data.response.legislator, function(key, value) {
          // console.log(data['response']['legislator'][key]);
          var rep = {};
          rep.party = value["@attributes"].party;
          rep.twitter = value["@attributes"]["twitter_id"];
          rep.name = value["@attributes"].firstlast;
          rep.id = value["@attributes"].cid;
          items.push(rep);
      });
      console.log(items);
      chrome.storage.sync.set({
        congressmen: items
      }, function() {
        document.getElementById('save').disabled = false;
        status.textContent = 'Options saved';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
      });
    }); 
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    state: 'GA'
  }, function(items) {
    document.getElementById('state').value = items.state;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);