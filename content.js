// chrome.browserAction.setBadgeText({text: "10+"});

var names = [];
var seenCount = 0;
var activeReps = [];

chrome.storage.sync.get({
    congressmen: []
    }, function(items) {
        // console.log(items);
        // console.log(items.congressmen.length);
        for (var i = 0; i < items.congressmen.length; i++) {
            // console.log(items[i].name);
            names.push({
                cid: items.congressmen[i].id,
                name: items.congressmen[i].name,
                seen: false
            });
        }
        // console.log(names[0].name);
        $('*', 'body').each(function(){
            traverseChildNodes(this);
        });
        chrome.runtime.sendMessage({method: "count", count: seenCount.toString(), actives: activeReps}, function(response) {
          console.log(response.farewell);
        });
    }
);
 


function traverseChildNodes(node) {
    var next;

    if (node.nodeType === 1) {
        // (Element node)
        if (node = node.firstChild) {
            do {
                // Recursively call traverseChildNodes
                // on each child node
                next = node.nextSibling;
                traverseChildNodes(node);
            } while(node = next);
        }
    } else if (node.nodeType === 3) {
        // (Text node)
        for(var i = 0; i < names.length; i++) {
            var temp = new RegExp(names[i].name, "i");
            if(temp.test(node.data) && !names[i].seen) {
                // console.log(names[i].name);
                names[i].seen = true;
                activeReps.push(names[i].cid);
                seenCount++;
                // chrome.browserAction.setBadgeText({text: seenCount.toString()});
            }
        }
        // if (/donald trump/gi.test(node.data)) {
        //     // Do something interesting here
        //     // alert('FOUND A MATCH!');
        //     wrapMatchesInNode(node);
        // }
    }
}


function wrapMatchesInNode(textNode) {
 
    var temp = document.createElement('div');
 
    temp.innerHTML = textNode.data.replace(/donald trump/gi, '<span style="color:red">Donald Trump</span>');
 
    // temp.innerHTML is now:
    // "n    This order's reference number is <a href="/order/RF83297">RF83297</a>.n"
    // |_______________________________________|__________________________________|___|
    //                     |                                      |                 |
    //                 TEXT NODE                             ELEMENT NODE       TEXT NODE
 
    // Extract produced nodes and insert them
    // before original textNode:
    while (temp.firstChild) {
        // console.log(temp.firstChild.nodeType);
        textNode.parentNode.insertBefore(temp.firstChild, textNode);
    }
    // Remove original text-node:
    textNode.parentNode.removeChild(textNode);
}


