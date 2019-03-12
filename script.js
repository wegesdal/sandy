// Copyright Will Egesdal (c) 2018
// mit license
//
// Acknowledgements: CodeMirror, Rishabh (CodeTheory), Javascript-Sandbox-Console (openexchangerates.com, 
//

//
// Rishabh, CodeTheory (author of CSSDeck.com):
//

// Base template
const base_tpl =
    "<!doctype html>\n" +
    "<html>\n\t" +
    "<head>\n\t\t" +
    "<meta charset=\"utf-8\">\n\t\t" +
    "<title>Test</title>\n\n\t\t\n\t" +
    "</head>\n\t" +
    "<body>\n\t\n\t" +
    "</body>\n" +
    "</html>";

prepareSource = () => {
    const html = htmlEditor.getValue(),
        readme = readmeEditor.getValue(),
        js = jsEditor.getValue();
    let css = cssEditor.getValue(),
    src = '';

    jsSource = js;
    const s = document.getElementById('sandbox');
    s.style.display = "none";
    const o = document.getElementById('output');
    o.style.filter = "none";

    // HTML
    src = base_tpl.replace('</body>', html + '</body>');
    // CSS
    css = '<style>' + css + '</style>';
    src = src.replace('</head>', css + '</head>');

    return src;
};

render = (callback) => {

    const source = prepareSource();

    //we need to kill old frame to release phaser resources >.<
    const oldFrame = document.querySelector('#output iframe');
    oldFrame.parentNode.removeChild(oldFrame);

    newFrame = document.createElement('iframe');
    const output = document.querySelector('#output');
    output.appendChild(newFrame), iframe_doc = newFrame.contentDocument;

    //i edited sandbox-console.js line 95 to glue this to the iframe
    //from:  this.sandboxFrame = $('<iframe width="0" height="0"/>').css({visibility : 'hidden'}).appendTo('body')[0];
    //to:    this.sandboxFrame = document.querySelector('#output iframe');

    newFrame.onload = function () { callback(); };
    iframe_doc.open();
    iframe_doc.write(source);
    iframe_doc.close();
    newFrame.contentWindow.focus();
};

// this prints logs to the console
const realConsoleLog = console.log;
console.log = function () {
    const message = [].join.call(arguments, " ");
    const last = $(".output").text()
    $(".output").text(last + '\n' + 'log: ' + message);
    realConsoleLog.apply(console, arguments);
};

makeConsole = () => {
    jQuery(document).ready(function ($) {
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

    // this is necessary for printing the logs to the console window
    window.sandbox.model.sandbox.console = {
        log: function (msg) {
            console.log(msg);
            return msg;
        }
    };

    window.sandbox.model.iframeEval(jsSource);

};

const themes = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile',
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
];

const emojiArray = [

    '🐣', '🦖', '🦆', '🐩', '🐺', '🦑', '🐢', '🐻', '🍱', '🦕',
    '🚂', '🧛', '🐬', '🐨', '🐱', '🃏', '🦉', '🦄', '🐗', '🦃',
    '🐛', '🧠', '👩‍🎤', '🗿', '🐅', '🦈', '🤖', '🐡', '🔬',
    '🐸', '🐴', '🐮', '💎', '😈', '🐋', '🐷', '🐙', '🐹', '🐊',
    '🦅', '🧞‍♀️', '🤷', '🦋', '🍭', '🍔', '👾', '🦊', '🥀',
    '🧝‍♀️', '🧟', '🐝', '👽', '🐓', '🐰', '🍪'
];

const emojiCodePointArray = [

    "&#x1F423;", "&#x1F996;", "&#x1F986;", "&#x1F429;", "&#x1F43A;", "&#x1F991;", "&#x1F422;", "&#x1F43B;", "&#x1F371;", "&#x1F995;",
    "&#x1F682;", "&#x1F9DB;", "&#x1F42C;", "&#x1F428;", "&#x1F431;", "&#x1F0CF;", "&#x1F989;", "&#x1F984;", "&#x1F417;", "&#x1F983;",
    "&#x1F41B;", "&#x1F9E0;", "&#x1F469;&#x200d;&#x1F3A4;", "&#x1F5FF;", "&#x1F405;", "&#x1F988;", "&#x1F916;", "&#x1F421;", "&#x1F52C;",
    "&#x1F438;", "&#x1F434;", "&#x1F42E;", "&#x1F48E;", "&#x1F608;", "&#x1F40B;", "&#x1F437;", "&#x1F419;", "&#x1F439;", "&#x1F40A;",
    "&#x1F985;", "&#x1F9DE;&#x200d;&#x2640;", "&#x1F937;", "&#x1F98B;", "&#x1F36D;", "&#x1F354;", "&#x1F47E;", "&#x1F98A;", "&#x1F940;",
    "&#x1F9DD;&#x200d;&#x2640;", "&#x1F9DF;", "&#x1F41D;", "&#x1F47D;", "&#x1F413;", "&#x1F430;", "&#x1F36A;"
];

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currentThemeIndex = getRandomInt(0, 54);

// CM OPTIONS
const cm_opt = {
    mode: 'text/html',
    theme: themes[currentThemeIndex],
    gutters: ["CodeMirror-lint-markers"],
    lineNumbers: true,
    lint: {
        esversion: 6
    },
};

const changeTheme = () => {
    $("#theme").html(emojiCodePointArray[currentThemeIndex]);
    htmlEditor.setOption("theme", themes[currentThemeIndex]);
    cssEditor.setOption("theme", themes[currentThemeIndex]);
    jsEditor.setOption("theme", themes[currentThemeIndex]);
    readmeEditor.setOption("theme", themes[currentThemeIndex]);
    var obj = JSON.parse(readmeEditor.getValue());
    obj.avatar = emojiArray[currentThemeIndex];
    readmeEditor.setValue(
        '{\n"title": "' +
        obj.title +
        '",\n"creator": "' +
        obj.creator +
        '",\n"avatar": "' +
        obj.avatar +
        '",\n"password": "' +
        obj.password +
        '",\n"tags": "' +
        obj.tags +
        '",\n"parent": "' +
        obj.parent +
        '"\n}');
    if (currentThemeIndex < themes.length - 1) {
        currentThemeIndex++;
    } else {
        currentThemeIndex = 0;
    }
};

cm = CodeMirror;

//
// Rishabh, CodeTheory (author of CSSDeck.com)
//

// HTML EDITOR
const html_box = document.querySelector('#html textarea');
const htmlEditor = cm.fromTextArea(html_box, cm_opt);

// CSS EDITOR
cm_opt.mode = 'css';
const css_box = document.querySelector('#css textarea');
const cssEditor = cm.fromTextArea(css_box, cm_opt);

// JAVASCRIPT EDITOR
cm_opt.mode = 'javascript';
const js_box = document.querySelector('#js textarea');
const jsEditor = cm.fromTextArea(js_box, cm_opt);

// README EDITOR
cm_opt.mode = 'javascript';
const readme_box = document.querySelector('#readme textarea');
const readmeEditor = cm.fromTextArea(readme_box, cm_opt);

let currentEditor = 'readmeTab';

//this is the change tab function o.O
const openTab = (evt, tabName) => {
    if (tabName === 'filesTab') {
        load();
    }

    if (tabName === 'picsTab') {
        list();
    }
    // Get all elements with class="tabcontent" and hide them
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let content of tabcontent) {
        content.style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    const tablinks = document.getElementsByClassName("tablinks");
    for (let tablink of tablinks) {
        tablink.className = tablink.className.replace(" active", "");
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

initializeWith = (startingTab) => {
    if (startingTab === 'filesTab') {
        load();
    }

    if (startingTab === 'picsTab') {
        list();
    }

    // Get all elements with class="tabcontent" and hide them
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let content of tabcontent) {
        content.style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    const tablinks = document.getElementsByClassName("tablinks");
    for (let tablink of tablinks) {
        tablink.className = tablink.className.replace(" active", "");
    }
    document.getElementById(startingTab).style.display = "block";
    currentEditor = startingTab;
}

toggle = (evt, tabName) => {
    const t = document.getElementById(tabName);
    const o = document.getElementById('output');
    if (t.style.display === "none") {
        t.style.display = "block";
    } else {
        t.style.display = "none";
    }
    if (tabName == 'sandbox') {
        if (t.style.display === "none") {
            o.style.filter = "none";
        }
        if (t.style.display === "block") {
            o.style.filter = "blur(2px)";
        }
    }
};

undo = (currentTab) => {
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
};

// var initTitle;
// var files = [];

list = () => {
    $.get('list.php', {}, function (data) {
        var folder = document.getElementById('assets');
        while (folder.firstChild) {
            folder.removeChild(folder.firstChild);
        }
        var pathHeader = document.createElement("h3");
        var pathHeaderText = document.createTextNode('assets/')
        pathHeader.appendChild(pathHeaderText);
        folder.appendChild(pathHeader);
        var ul = document.createElement("ul");
        folder.appendChild(ul)
        var assets = eval(data);
        for (var i = 0; i < assets.length; i++) {

            var li = document.createElement("li");
            var t = document.createTextNode(assets[i]);
            li.appendChild(t);
            ul.appendChild(li);
        }
    });
};

load = () => {
    $.get('load.php', {}, function (data) {
        //data comes in as a string holding an array of JSON objects
        const fileString = data;
        //eval returns the array 
        files = eval(fileString);
        const folder = document.getElementById('files');
        while (folder.firstChild) {
            folder.removeChild(folder.firstChild);
        }
        for (let file of files) {
            const btn = document.createElement('BUTTON');
            btn.className = 'file';
            btn.setAttribute('title', file.title);
            btn.setAttribute('creator', file.creator);
            btn.setAttribute('avatar', file.avatar);
            btn.setAttribute('html', file.html);
            btn.setAttribute('css', file.css);
            btn.setAttribute('js', file.js);
            btn.setAttribute('readme', file.readme);
            btn.setAttribute('tags', file.tags);
            btn.setAttribute('parent', file.parent);
            btn.setAttribute('id', file.title);
            btn.addEventListener('click', function () {
                htmlEditor.setValue(Base64.decode(this.getAttribute('html')));
                cssEditor.setValue(Base64.decode(this.getAttribute('css')));
                jsEditor.setValue(Base64.decode(this.getAttribute('js')));
                readmeEditor.setValue(
                    '{\n"title": "' +
                    this.getAttribute('title') +
                    '",\n"creator": "' +
                    this.getAttribute('creator') +
                    '",\n"avatar": "' +
                    this.getAttribute('avatar') +
                    '",\n"password": "' +
                    '",\n"tags": "' +
                    this.getAttribute('tags') +
                    '",\n"parent": "' +
                    this.getAttribute('parent') +
                    '"\n}');
                initTitle = this.title;
                initParent = this.parent;
                render(makeConsole);
            });
            const h = document.createElement("H1"); // Create a <h1> element for avatar
            const avatar = document.createTextNode(file.avatar); // Create a text node
            h.appendChild(avatar);
            const t = document.createTextNode('\n' + file.title);
            btn.appendChild(h);
            btn.appendChild(t);
            btn.style = 'display:initial';
            folder.appendChild(btn);
        }
    });
};

//clean document settings
// initParent = 'origin';
// initTitle = 'untitled';
htmlEditor.setValue('<p>Hello World</p>');
cssEditor.setValue('body { color: red; background: white }');
readmeEditor.setValue('{\n"title": "untitled",\n"creator": "anonymous",\n"avatar": "' + String.fromCodePoint(0x1F464) + '",\n"password": "",\n' + '"tags": "",\n"parent": ""\n}');
//js editor begins as an empty vessel

save = () => {
    const html = Base64.encode(htmlEditor.getValue());
    const css = Base64.encode(cssEditor.getValue());
    const js = Base64.encode(jsEditor.getValue());
    const obj = JSON.parse(readmeEditor.getValue());
    const stringToHash = obj.title + obj.creator + obj.password + "molly";
    const hash = MD5(stringToHash);
//    const t;
    if (obj.title != initTitle) {
        $.post("save.php", { title: obj.title, creator: obj.creator, avatar: obj.avatar, html: html, css: css, js: js, password: obj.password, tags: obj.tags, parent: initTitle, hash: hash }, function (data) { alert(data); });

    }
    else {
        $.post("save.php", { title: obj.title, creator: obj.creator, avatar: obj.avatar, html: html, css: css, js: js, password: obj.password, tags: obj.tags, parent: initParent, hash: hash }, function (data) { alert(data); });
    }
};

const editors = document.querySelectorAll('.CodeMirror');
for (let editor of editors) {
    editor.style.height = '100%';
}

search = () => {
    shown = [];
    hidden = [];
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();

    for (let file of files) {
        if (file.title.toUpperCase().indexOf(filter) > -1) {
            shown.push(file);
        } else {
            hidden.push(file);
        }
    }
    for (let show of shown) {
        document.getElementById(show.title).style = 'display:initial';
    }
    for (let hide of hidden) {
        document.getElementById(hide.title).style = 'display:none';
    }
}

//This code is necessary to prevent a UI bug when opening the console directly after opening the page but before clicking a text editor
// A $( document ).ready() block.
$(document).ready(function () {
    tabcontent = document.getElementsByClassName("tabcontent");
    for (let content of tabcontent) {
        content.style.display = "none";
    }
    document.getElementById('readmeTab').style.display = "block";
    // evt.currentTarget.className += "active";
});

function newFunction() {
    var editor;
    return editor;
}
