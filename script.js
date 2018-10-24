// Copyright Will Egesdal (c) 2018
//
//
// Acknowledgements: CodeMirror, Rishabh (CodeTheory), Javascript-Sandbox-Console (openexchangerates.com, 
//
//
//

//i have to make jsSource global so i can inject into the console sandbox to evaluate errors
var jsSource;

//
// Rishabh, CodeTheory (author of CSSDeck.com):
//

// Base template
var base_tpl =
    "<!doctype html>\n" +
    "<html>\n\t" +
    "<head>\n\t\t" +
    "<meta charset=\"utf-8\">\n\t\t" +
    "<title>Test</title>\n\n\t\t\n\t" +
    "</head>\n\t" +
    "<body>\n\t\n\t" +
    "</body>\n" +
    "</html>";

var prepareSource = function() {
    var html = htmlEditor.getValue(),
        css = cssEditor.getValue(),
        readme = readmeEditor.getValue(),
        js = jsEditor.getValue();
    src = '';

    jsSource = js;
    if (jsSource.length > 0) {
      var s = document.getElementById('sandbox');
      s.style.display = "block";
    }

    // HTML
    src = base_tpl.replace('</body>', html + '</body>');
    // CSS
    css = '<style>' + css + '</style>';
    src = src.replace('</head>', css + '</head>');

    return src;
};

var render = function() {
    var t = document.getElementById('output');
    if (t.style.display === "none") {
        t.style.display = "block";
    }
    var p = document.getElementById('sandbox');
    if (p.style.display === "none") {
        p.style.display = "block";
    }
    var source = prepareSource();

    //we need to kill old frame to release phaser resources >.<
    var oldFrame = document.querySelector('#output iframe');
    oldFrame.parentNode.removeChild(oldFrame);
    newFrame = document.createElement('iframe');
    var output = document.querySelector('#output');
    output.appendChild(newFrame), iframe_doc = newFrame.contentDocument;

    //i edited sandbox-console.js line 95 to glue this to the iframe
    //from:  this.sandboxFrame = $('<iframe width="0" height="0"/>').css({visibility : 'hidden'}).appendTo('body')[0];
    //to:    this.sandboxFrame = document.querySelector('#output iframe');

    iframe_doc.open();
    iframe_doc.write(source);
    iframe_doc.close();

    //
    // javascript-sandbox-console docs:
    //
    //

    jQuery(document).ready(function($) {
        // Create the sandbox:
        window.sandbox = new Sandbox.View({
            // these two are required:
            model: new Sandbox.Model({
                iframe: true
            }), // see below for more
            el: $('#sandbox'), // or etc.

            // these are optional (defaults are given here):
            resultPrefix: "  => ",
            helpText: "type javascript commands into the console, hit enter to evaluate. \n[up/down] to scroll through history, ':clear' to reset it. \n[alt + return/up/down] for returns and multi-line editing.",
            tabCharacter: "\t",
            placeholder: "// type some javascript and hit enter (:help for info)"
        });

        //i need to wait until the sandbox has loaded to inject the iframe
        //last step is to evaluate the javascript source
        //i stage the scripts to the console with setValue instead of evaluating it because i need them to be evaluated after the rest of the iframe loads
        //this also simulates the order that pages load and simulates the experience of using a console to run programs

    });
    window.sandbox.setValue(jsSource)
};


var themes = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile',
    'ambiance', 'base16-dark', 'base16-light', 'bespin', 'blackboard',
    'cobalt', 'colorforth', 'darcula', 'dracula',
    'duotone-dark', 'duotone-light', 'eclipse', 'elegant',
    'erlang-dark', 'gruvbox-dark', 'hopscotch', 'icecoder',
    'idea', 'isotope', 'lesser-dark', 'liquibyte', 'lucario',
    'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat',
    'neo', 'night', 'oceanic-next', 'panda-syntax', 'paraiso-dark',
    'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti',
    'shadowfox', 'solarized', 'ssms', 'the-matrix',
    'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn',
    'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn'
]


var emojiArray = [

    '🐣', '🦖', '🦆', '🐩', '🐺', '🦑', '🐢', '🐻', '🐛', '🦕',
    '🃏', '🧛', '🐬', '🐨', '🐱', '🌚', '🦉', '🦄', '🐗', '🦃',
    '🐲', '🧠', '👩‍🎤', '🗿', '🐅', '🦈', '🤖', '🐡', '🔬',
    '👹', '🐴', '🐮', '💎', '😈', '🐋', '🐷', '🐙', '🐹', '🐊',
    '🦅', '🧞‍♀️', '🤷', '🦋', '🍭', '🍔', '👾', '🦊', '🥀',
    '🧝‍♀️', '🧟', '🐝', '👽', '🐓', '🐰', '🍪'
]


var emojiCodePointArray = [

    "&#x1F423;", "&#x1F996;", "&#x1F986;", "&#x1F429;", "&#x1F43A;", "&#x1F991;", "&#x1F422;", "&#x1F43B;", "&#x1F41B;", "&#x1F995;",
    "&#x1F0CF;", "&#x1F9DB;", "&#x1F42C;", "&#x1F428;", "&#x1F431;", "&#x1F31A;", "&#x1F989;", "&#x1F984;", "&#x1F417;", "&#x1F983;",
    "&#x1F432;", "&#x1F9E0;", "&#x1F469;&#x200d;&#x1F3A4;", "&#x1F5FF;", "&#x1F405;", "&#x1F988;", "&#x1F916;", "&#x1F421;", "&#x1F52C;",
    "&#x1F479;", "&#x1F434;", "&#x1F42E;", "&#x1F48E;", "&#x1F608;", "&#x1F40B;", "&#x1F437;", "&#x1F419;", "&#x1F439;", "&#x1F40A;",
    "&#x1F985;", "&#x1F9DE;&#x200d;&#x2640;", "&#x1F937;", "&#x1F98B;", "&#x1F36D;", "&#x1F354;", "&#x1F47E;", "&#x1F98A;", "&#x1F940;",
    "&#x1F9DD;&#x200d;&#x2640;", "&#x1F9DF;", "&#x1F41D;", "&#x1F47D;", "&#x1F413;", "&#x1F430;", "&#x1F36A;"
]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var currentThemeIndex = getRandomInt(0, 54);

// CM OPTIONS
var cm_opt = {
    mode: 'text/html',
    theme: themes[currentThemeIndex],
    gutter: false,
    lineNumbers: true,
    //TODO: this is where i turn on the linter
    //
    //
    //
    //
    //
    //
    //
    //
};

var changeTheme = function() {
    console.log(emojiArray[currentThemeIndex]);
    $("#theme").html(emojiCodePointArray[currentThemeIndex]);
    htmlEditor.setOption("theme", themes[currentThemeIndex]);
    cssEditor.setOption("theme", themes[currentThemeIndex]);
    jsEditor.setOption("theme", themes[currentThemeIndex]);
    readmeEditor.setOption("theme", themes[currentThemeIndex]);
    var obj = JSON.parse(readmeEditor.getValue());
    obj.avatar = emojiArray[currentThemeIndex]
    readmeEditor.setValue('{\n"title": "' + obj.title + '",\n"creator": "' + obj.creator + '",\n"avatar": "' + obj.avatar + '",\n"password": "' + obj.password + '"\n}');
    if (currentThemeIndex < themes.length - 1) {
        currentThemeIndex++;
    } else {
        currentThemeIndex = 0;
    }
}

cm = CodeMirror;

//
// Rishabh, CodeTheory (author of CSSDeck.com)
//

// HTML EDITOR
var html_box = document.querySelector('#html textarea');
var htmlEditor = cm.fromTextArea(html_box, cm_opt);

// CSS EDITOR
cm_opt.mode = 'css';
var css_box = document.querySelector('#css textarea');
var cssEditor = cm.fromTextArea(css_box, cm_opt);

// JAVASCRIPT EDITOR
cm_opt.mode = 'javascript';
var js_box = document.querySelector('#js textarea');
var jsEditor = cm.fromTextArea(js_box, cm_opt);

// README EDITOR
cm_opt.mode = 'javascript';
var readme_box = document.querySelector('#readme textarea');
var readmeEditor = cm.fromTextArea(readme_box, cm_opt);

var currentEditor = 'readmeTab';


//this is the change tab function o.O
function openTab(evt, tabName) {
    if (tabName === 'filesTab') {
        load()
    }
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += "active";
    currentEditor = tabName;

    htmlEditor.refresh();
    jsEditor.refresh();
    cssEditor.refresh();
    readmeEditor.refresh();
}

var toggle = function(evt, tabName) {
    var t = document.getElementById(tabName);
    console.log(tabName)
    if (t.style.display === "none") {
        t.style.display = "block";
    } else {
        t.style.display = "none";
    }
}

var undo = function(currentTab) {
    var editor;
    if (currentTab == 'htmlTab') {
        editor = htmlEditor;
    } else if (currentTab == 'cssTab') {

        editor = cssEditor;
    } else if (currentTab == 'jsTab') {
        editor = jsEditor;
    } else if (currentTab == 'readmeTab') {
        editor = readmeEditor;
    } else {
        return;
    }
    editor.execCommand('undo');
}

var files = [];
var load = function() {
    $.get('load.php', {}, function(data) {
        var fileString = data;
        files = eval(fileString);
        var folder = document.getElementById('files');
        while (folder.firstChild) {
            folder.removeChild(folder.firstChild);
        };
        for (var i = 0; i < files.length; i++) {
            fileData = files[i];
            var btn = document.createElement('BUTTON');
            btn.className = 'file';
            btn.setAttribute('title', fileData.title);
            btn.setAttribute('creator', fileData.creator);
            btn.setAttribute('avatar', fileData.avatar);
            btn.setAttribute('html', fileData.html);
            btn.setAttribute('css', fileData.css);
            btn.setAttribute('js', fileData.js);
            btn.setAttribute('readme', fileData.readme);
            btn.setAttribute('id', fileData.title);
            btn.addEventListener('click', function() {
                // if console is closed , open it to prevent ui bug and confusion over loading script
                var t = document.getElementById('sandbox');
                htmlEditor.setValue(Base64.decode(this.getAttribute('html')));
                cssEditor.setValue(Base64.decode(this.getAttribute('css')));
                jsEditor.setValue(Base64.decode(this.getAttribute('js')));
                readmeEditor.setValue('{\n"title": "' + this.getAttribute('title') + '",\n"creator": "' + this.getAttribute('creator') + '",\n"avatar": "' + this.getAttribute('avatar') + '",\n"password": ""\n}');
                render();
            })
            var h = document.createElement("H1") // Create a <h1> element for avatar
            var avatar = document.createTextNode(fileData.avatar); // Create a text node
            h.appendChild(avatar);
            var t = document.createTextNode('\n' + fileData.title);
            btn.appendChild(h);
            btn.appendChild(t);
            btn.style = 'display:initial'
            folder.appendChild(btn);

        }
    });
}

htmlEditor.setValue('<p>Hello World</p>');
cssEditor.setValue('body { color: red; background: white }');
readmeEditor.setValue('{\n"title": "untitled",\n"creator": "anonymous",\n"avatar": "' + String.fromCodePoint(0x1F464) + '",\n"password": ""\n}');
//js editor begins as an empty vessel

var save = function() {
    console.log('saving');
    var html = Base64.encode(htmlEditor.getValue());
    var css = Base64.encode(cssEditor.getValue());
    var js = Base64.encode(jsEditor.getValue());
    var obj = JSON.parse(readmeEditor.getValue());
    var stringToHash = obj.title + obj.creator + obj.password + "molly";
    var hash = MD5(stringToHash);
    $.post("save.php", { title: obj.title, creator: obj.creator, avatar: obj.avatar, html: html, css: css, js: js, password: obj.password, hash: hash }, function(data) { alert(data); });
}

var cms = document.querySelectorAll('.CodeMirror');
for (var i = 0; i < cms.length; i++) {
    cms[i].style.height = '100%';
}


//This code is necessary to prevent a UI bug when opening the console directly after opening the page but before clicking a text editor
// A $( document ).ready() block.
$(document).ready(function() {
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById('readmeTab').style.display = "block";
    // evt.currentTarget.className += "active";
});


function search() {
    shown = [];
    hidden = [];
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();

    for (i = 0; i < files.length; i++) {
        var b = files[i];
        if (files[i].title.toUpperCase().indexOf(filter) > -1) {
            shown.push(files[i])
        } else {
            hidden.push(files[i])
            files[i]
        }
    }
    for (i = 0; i < shown.length; i++) {
        document.getElementById(shown[i].title).style = 'display:initial'
    }
    for (i = 0; i < hidden.length; i++) {
        document.getElementById(hidden[i].title).style = 'display:none'
    }
}