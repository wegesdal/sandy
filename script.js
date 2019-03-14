// Copyright Will Egesdal (c) 2018
// mit license
//
// Acknowledgements: CodeMirror, Rishabh (CodeTheory), Javascript-Sandbox-Console (openexchangerates.com, 
//

const THEMES = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile',
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

const EMOJI_ARRAY = [

    '🐣', '🦖', '🦆', '🐩', '🐺', '🦑', '🐢', '🐻', '🍱', '🦕',
    '🚂', '🧛', '🐬', '🐨', '🐱', '🃏', '🦉', '🦄', '🐗', '🦃',
    '🐛', '🧠', '👩‍🎤', '🗿', '🐅', '🦈', '🤖', '🐡', '🔬',
    '🐸', '🐴', '🐮', '💎', '😈', '🐋', '🐷', '🐙', '🐹', '🐊',
    '🦅', '🧞‍♀️', '🤷', '🦋', '🍭', '🍔', '👾', '🦊', '🥀',
    '🧝‍♀️', '🧟', '🐝', '👽', '🐓', '🐰', '🍪'
];

const EMOJI_CODEPOINT_ARRAY = [

    "&#x1F423;", "&#x1F996;", "&#x1F986;", "&#x1F429;", "&#x1F43A;", "&#x1F991;", "&#x1F422;", "&#x1F43B;", "&#x1F371;", "&#x1F995;",
    "&#x1F682;", "&#x1F9DB;", "&#x1F42C;", "&#x1F428;", "&#x1F431;", "&#x1F0CF;", "&#x1F989;", "&#x1F984;", "&#x1F417;", "&#x1F983;",
    "&#x1F41B;", "&#x1F9E0;", "&#x1F469;&#x200d;&#x1F3A4;", "&#x1F5FF;", "&#x1F405;", "&#x1F988;", "&#x1F916;", "&#x1F421;", "&#x1F52C;",
    "&#x1F438;", "&#x1F434;", "&#x1F42E;", "&#x1F48E;", "&#x1F608;", "&#x1F40B;", "&#x1F437;", "&#x1F419;", "&#x1F439;", "&#x1F40A;",
    "&#x1F985;", "&#x1F9DE;&#x200d;&#x2640;", "&#x1F937;", "&#x1F98B;", "&#x1F36D;", "&#x1F354;", "&#x1F47E;", "&#x1F98A;", "&#x1F940;",
    "&#x1F9DD;&#x200d;&#x2640;", "&#x1F9DF;", "&#x1F41D;", "&#x1F47D;", "&#x1F413;", "&#x1F430;", "&#x1F36A;"
];

// Rishabh, CodeTheory (author of CSSDeck.com):
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

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currentThemeIndex = getRandomInt(0, 54);

const changeTheme = () => {
    $("#theme").html(EMOJI_CODEPOINT_ARRAY[currentThemeIndex]);
    htmlEditor.setOption("theme", THEMES[currentThemeIndex]);
    cssEditor.setOption("theme", THEMES[currentThemeIndex]);
    jsEditor.setOption("theme", THEMES[currentThemeIndex]);
    readmeEditor.setOption("theme", THEMES[currentThemeIndex]);
    var obj = JSON.parse(readmeEditor.getValue());
    obj.avatar = EMOJI_ARRAY[currentThemeIndex];
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
    if (currentThemeIndex < THEMES.length - 1) {
        currentThemeIndex++;
    } else {
        currentThemeIndex = 0;
    }
};

cm = CodeMirror;

// CM OPTIONS
const cm_opt = {
    mode: 'text/html',
    theme: THEMES[currentThemeIndex],
    gutters: ["CodeMirror-lint-markers"],
    lineNumbers: true,
    lint: {
        esversion: 6
    },
};

// Rishabh, CodeTheory (author of CSSDeck.com)

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

//const editors = [htmlEditor, cssEditor, jsEditor, readmeEditor];

const editors = document.querySelectorAll('.CodeMirror');
for (let e of editors) {
    e.style.height = '100%';
}

let currentEditor = 'readmeTab';

// ALTERNATE BETWEEN TABS
const openTab = (evt, tabName) => {
    if (tabName === 'filesTab') {
        load();
    }

    if (tabName === 'picsTab') {
        list();
    }

    // Get all elements with class = "tabcontent" and hide them
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let content of tabcontent) {
        content.style.display = "none";
    }

    // Get all elements with class = "tablinks" and remove the class "active"
    const tablinks = document.getElementsByClassName("tablinks");
    for (let tablink of tablinks) {
        tablink.className = tablink.className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += "active";
    currentEditor = tabName;

    for (let e of editors) {
        e.refresh();
    }
}

initializeWith = (startingTab) => {
    if (startingTab === 'filesTab') {
        load();
    }
    if (startingTab === 'picsTab') {
        list();
    }
    // Get all elements with class = "tabcontent" and hide them
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let content of tabcontent) {
        content.style.display = "none";
    }

    // Get all elements with class = "tablinks" and remove the class "active"
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
    t.style.display = (t.style.display === "none") ?
        t.style.display = "block" :
        t.style.display = "none";
    if (tabName == 'sandbox') {
        o.style.filter = (t.style.display === "none") ?
            o.style.filter = "none" :
            o.style.filter = "blur(2px)";
    }
};

undo = (currentTab) => {
    switch (currentTab) {
        case "htmlTab":
            htmlEditor.execCommand('undo');;
            break;
        case "cssTab":
            editor = cssEditor.execCommand('undo');;
            break;
        case "jsTab":
            editor = jsEditor.execCommand('undo');;
            break;
        case "readmeTab":
            editor = readmeEditor.execCommand('undo');;
            break;
    }
};

list = () => {
    $.get('list.php', {}, function (data) {
        const folder = document.getElementById('assets');
        while (folder.firstChild) {
            folder.removeChild(folder.firstChild);
        }
        const pathHeader = document.createElement("h3");
        const pathHeaderText = document.createTextNode('assets/')
        pathHeader.appendChild(pathHeaderText);
        folder.appendChild(pathHeader);
        const ul = document.createElement("ul");
        folder.appendChild(ul)
        const assets = eval(data);
        for (let asset of assets) {
            const li = document.createElement("li");
            const t = document.createTextNode(asset);
            li.appendChild(t);
            ul.appendChild(li);
        }
    });
};

htmlEditor.setValue('<p>Hello World</p>');
cssEditor.setValue('body { color: red; background: white }');
readmeEditor.setValue('{\n"title": "untitled",\n"creator": "anonymous",\n"avatar": "' + String.fromCodePoint(0x1F464) + '",\n"password": "",\n' + '"tags": "",\n"parent": ""\n}');


load = () => {
    $.get('load.php', {}, function (data) {
        // data comes in as a string holding an array of JSON objects
        const fileString = data;
        // eval returns the array
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
                render();
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

save = () => {
    const obj = JSON.parse(readmeEditor.getValue());
    const stringToHash = obj.title + obj.creator + obj.password + "molly";
    $.post("save.php", {
        title: obj.title,
        creator: obj.creator,
        avatar: obj.avatar,
        html: Base64.encode(htmlEditor.getValue()),
        css: Base64.encode(cssEditor.getValue()),
        js: Base64.encode(jsEditor.getValue()),
        password: obj.password,
        tags: obj.tags,
        parent: (obj.title != initTitle) ? initTitle : initParent,
        hash: MD5(stringToHash)
    },
        function (data) {
            alert(data);
        })
};

search = () => {
    shown = [];
    hidden = [];
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();

    for (let file of files) {
        (file.title.toUpperCase().indexOf(filter) > -1) ? shown.push(file) : hidden.push(file);
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

render = () => {

    const source = prepareSource();

    //we need to kill old frame to release phaser resources >.<
    const oldFrame = document.querySelector('#output iframe');
    oldFrame.parentNode.removeChild(oldFrame);

    newFrame = document.createElement('iframe');
    const output = document.querySelector('#output');
    output.appendChild(newFrame), iframe_doc = newFrame.contentDocument;

    // i edited sandbox-console.js line 95 to glue this to the iframe
    // from:  this.sandboxFrame = $('<iframe width="0" height="0"/>').css({visibility : 'hidden'}).appendTo('body')[0];
    // to:    this.sandboxFrame = document.querySelector('#output iframe');

    newFrame.onload = function () {
        // callback to makeConsole() after iFrame loads 
        // (this prevents a timing issue where the script tries to execute 
        // before the iFrame has loaded external resources)
        makeConsole();
        //cb();
    };
    
    iframe_doc.open()
    iframe_doc.write(source);
    iframe_doc.close();
    newFrame.contentWindow.focus();
};

// displays logs to 'real' browser console
// const realConsoleLog = console.log;

console.log = function () {
    // arguments[0] is whatever is passed into console.log
    const item = { command: 'log', result: arguments[0] };

    // class determines the color of the console output
    if (typeof (item.result) == 'number') {
        item._class = "number";
    } else if (typeof (item.result) == 'string') {
        item._class = "string";
    } else {
        item._class = "undefined";
    }

    // prints log object to sandbox console 
    window.sandbox.model.addHistory(item);

    // displays logs to 'real' browser console
    // realConsoleLog.apply(console, arguments);
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

    try {
        window.sandbox.model.iframeEval(jsSource);
    }
    catch (error) {
        const explodingHead = '\u{1F92F}';
        const wisdom = [
            "You broke the internet!",
            "Does not compute.",
            "A wild bug appeared!",
            "Never give up, never surrender. \n-Buzz Lightyear",
            "Whether you think you can \nor you think you can't, \nyou're right. \n-Henry Ford",
            "Fall seven times, \nget up eight. \n-Japanese Proverb",
            "If you're going through hell, \nkeep going. \n-Winston Churchill",
            "Champions keep playing \nuntil they get it right. \n-Billie Jean King",
            "Energy and persistance \nconquer all things. \n-Benjamin Franklin",
            "It’s not that I’m so smart, \nit’s just that I stay \nwith problems longer. \n-Albert Einstein",
            "It does not matter how slowly you go \nas long as you do not stop. \n-Confucius"
        ];
        const item = {
            command: wisdom[getRandomInt(0, wisdom.length - 1)]
        };
        item.result = explodingHead + ' ' + error.toString();
        item._class = "error"
        window.sandbox.model.addHistory(item);
        //$(".output").text(last + '\n' + error).css('color', 'pink');
    }
};