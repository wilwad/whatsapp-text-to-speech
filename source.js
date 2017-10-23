/* whatsapp web chat list tex to speech */
/* whatsapp seems to hide the top nodes when u scroll to bottom & vice versa */
var whatsapp_timerId = null;
var whatsapp_iter = function(){
    // clear the timer
    window.clearInterval(whatsapp_timerId);

    var root = document.getElementsByClassName('infinite-list-item');
    var max = root.length;
    var search = [];
    var idy = 1;
    var str = "";

    search.push("wc joe-ann");
    search.push("sirenga");
    search.push("may");
    search.push("belly");
    search.push("kenneth"); 
    search.push("queen");
    search.push("chingu..."), 
    search.push("siteketa");
    search.push("bd selma");
    
    console.log('Chat nodes:',max);

    for (var idx = 0; idx < max; idx++){
        var name = root[idx].querySelector('.chat-main .chat-title > span').getAttribute('title');
        var date = root[idx].querySelector('.chat-main .chat-meta > span').innerText;
        var said = root[idx].querySelector('.chat-secondary .chat-status > span').innerText.trim();

        str = idy + '. ' + name + ' (@ ' + date +')';

        //if (root[idx].querySelector('.chat-secondary .chat-status > span') != null){
            str += " :: " + said;
        //}

        for (var idz =0; idz < search.length; idz++){
            var person = search[idz];
            if (person.toLowerCase() == name.toLowerCase()) {
                // found the search item
                console.log(person, ' said ', said);

                var current = window.localStorage.getItem(person);
                if (current == "" || current != said){
                    // save it
                    window.localStorage.setItem(person,said);

                    var msg = new SpeechSynthesisUtterance('New whatsapp message from ' + person + '. ' + said);
                    window.speechSynthesis.speak(msg);
                }
            }        
        }
        
        //console.log(str + '\n');
        str = "";
        idy++;
    }
    
    whatsapp_timerId = window.setInterval(whatsapp_iter, 1000 * 30);
    console.log('Web.Whatsapp text to speech. Inited 2. Time ID is ', whatsapp_timerId);
};

whatsapp_timerId = window.setInterval(whatsapp_iter, 1000 * 30);
var initNotice = 'Web.Whatsapp text to speech. Inited 1. Time ID is ' + whatsapp_timerId;
var msg = new SpeechSynthesisUtterance(initNotice);
window.speechSynthesis.speak(msg);
console.log(initNotice);

// get online status of a user (the currently focused chat window)
var whatsapp_onlinestatus_timerId = null;
var whatsapp_online = function(){
    var sel = document.querySelectorAll('.pane-header .chat-body .emojitext')
    
    if (whatsapp_onlinestatus_timerId)
        window.clearInterval(whatsapp_onlinestatus_timerId);
        
    whatsapp_onlinestatus_timerId = window.setInterval(whatsapp_online, 1000 * 30);
    
    if (!sel.length) return false;
    
    var status = 'offline';
    var named = sel[0].innerText;

    if (sel.length == 2){
        status = sel[1].innerText;
    }
    
    var timestamp = new Date().toLocaleString();
    var key = named + "_status";
    console.log(timestamp, '-', named, ' is ', status);

    var lastMsg = document.querySelectorAll('._9tCEa') ? document.querySelectorAll('._9tCEa')[0].lastChild.querySelector('.emojitext').innerText : "";
    
    if (status == 'online'){
        var msg = new SpeechSynthesisUtterance(named + ' is ' + status + '.');
        window.speechSynthesis.speak(msg);  
    }

    var current = window.localStorage.getItem(key);
    
    if (current == "" || current != lastMsg){
        // save it
        window.localStorage.setItem(key,lastMsg);
        
        if (status == 'online'){
            var msg = new SpeechSynthesisUtterance(lastMsg);
            window.speechSynthesis.speak(msg);          
        }
    }
    
};
whatsapp_onlinestatus_timerId = window.setInterval(whatsapp_online, 1000 * 30);
