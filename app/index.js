'use strict';
var util = require('util');
var path = require('path');
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');


var BxrextraGenerator = module.exports = function BxrextraGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

//    this.on('end', function () {
//        this.installDependencies({ skipInstall: options['skip-install'] });
//    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BxrextraGenerator, yeoman.generators.Base);

BxrextraGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        type: 'input',
        name: 'name',
        message: 'What is the awesome name of your new extra?'
//            validate: function(input) {
//
//                // Declare function as asynchronous, and save the done callback
//                var done = this.async();
//
//                // Do async stuff
//                setTimeout(function() {
//                    if (typeof input !== "number") {
//                        // Pass the return value in the done callback
//                        done("You need to provide a number");
//                        return;
//                    }
//                    // Pass the return value in the done callback
//                    done(true);
//                }, 3000);
//            }
    },{
        type: 'input',
        name: 'lowCaseName',
        message: 'What is the lower case version?',
        default: function(props) {
            return _s.slugify(props.name.replace(/ /g, ''));
        }
    },{
        type: 'input',
        name: 'description',
        message: 'What is this component about?',
    },{
        type: 'input',
        name: 'authorName',
        message: 'What is your name?',
        default: ''
    },{
        type: 'input',
        name: 'authorEmail',
        message: 'What is your email?',
        default: ''
    },{
        type: 'confirm',
        name: 'useAssets',
        message: 'Will you need an assets folder?',
        default: true
    },{
        type: 'confirm',
        name: 'useMgrJS',
        message: 'Will you need a JS folder for mgr context?',
        default: true,
        when: function(props) {
            return props.useAssets;
        }
    },{
        type: 'input',
        name: 'serviceClassName',
        message: 'What is the service class name?',
        default: function(props) {
            return props.name;
        }
    },{
        type: 'confirm',
        name: 'useDB',
        message: 'Will you need a custom DB table?',
        default: true
    },{
        type: 'checkbox',
        name: 'coreComponents',
        message: 'What core folders will you need?',
        choices: [{
            name: "Controllers",
            checked: true
        },{
            name: "Elements",
            checked: true
        },{
            name: "Processors",
            checked: true
        },{
            name: "Templates",
            checked: true
        }]
    },{
        type: 'checkbox',
        name: 'elements',
        message: 'What elements will you need?',
        choices: [{
            name: "Plugins"
        },{
            name: "Snippets",
            checked: true
        },{
            name: "Chunks",
            checked: true
        },{
            name: "Templates"
        },{
            name: "TVs"
        }],
        when: function(props) {
            return (props.coreComponents.indexOf('Elements') != -1);
        }
    },{
        type: 'confirm',
        name: 'includeSampleGrid',
        message: 'Would you like to include sample grid component with working CRUD? If you choose yes, it may overwrite some of your previous settings.',
        default: true
    },{
        type: 'confirm',
        name: 'useDDInGrid',
        message: 'Do you want a Drag and Drop sorting in sample grid?',
        default: false,
        when: function(props) {
            return props.includeSampleGrid
        }
    }];


    this.prompt(prompts, function (props) {
        this.name = props.name;
        this.lowCaseName = props.lowCaseName;
        this.useAssets = props.useAssets;
        this.useMgrJS = props.useMgrJS;
        this.authorName = props.authorName;
        this.authorEmail = props.authorEmail;
        this.serviceClassName = props.serviceClassName;
        this.coreComponents = props.coreComponents;
        this.elements = props.elements;
        this.useDB = props.useDB;
        this.description = props.description;
        this.includeSampleGrid = props.includeSampleGrid;
        this.useDDInGrid = props.useDDInGrid;

        this.corePath = this.lowCaseName + '/core/components/' + this.lowCaseName;
        this.assetsPath = this.lowCaseName + '/assets/components/' + this.lowCaseName;

        cb();
    }.bind(this));
};

BxrextraGenerator.prototype.app = function app() {
    if (this.includeSampleGrid == true) {
        if (this.coreComponents.indexOf('Elements') == -1) {
            this.coreComponents.push('Elements');
        }

        if (this.coreComponents.indexOf('Controllers') == -1) {
            this.coreComponents.push('Controllers');
        }

        if (this.coreComponents.indexOf('Processors') == -1) {
            this.coreComponents.push('Processors');
        }

        if (this.coreComponents.indexOf('Templates') == -1) {
            this.coreComponents.push('Templates');
        }

        this.useDB = true;
        this.useAssets = true;
        this.useMgrJS = true;
    }


    this.mkdir(this.lowCaseName);
    this.mkdir(this.lowCaseName + '/_build');
    this.mkdir(this.lowCaseName + '/_packages');

    this.copy('gitignore.txt', this.lowCaseName + '/.gitignore');

    this.template('_build/config.json', this.lowCaseName + '/_build/config.json');

    this.mkdir(this.corePath);

    if (this.useAssets == true) {
        this.mkdir(this.assetsPath);
        this.mkdir(this.assetsPath + '/css');
        this.mkdir(this.assetsPath + '/js');

        if (this.useMgrJS == true) {
            this.mkdir(this.assetsPath + '/js/mgr');
            this.mkdir(this.assetsPath + '/js/mgr/extras');
            this.mkdir(this.assetsPath + '/js/mgr/sections');
            this.mkdir(this.assetsPath + '/js/mgr/widgets');

            this.template('assets/base.js', this.assetsPath + '/js/mgr/' + this.lowCaseName + '.js');
        }

        this.write(this.assetsPath + '/index.html', '');
        this.write(this.assetsPath + '/css/index.html', '');
        this.write(this.assetsPath + '/js/index.html', '');

        this.copy('assets/mgr.css', this.assetsPath + '/css/mgr.css')

        this.template('assets/connector.php', this.assetsPath + '/connector.php');
    }

    this.mkdir(this.corePath + '/docs');
    this.copy('core/docs/license.txt', this.corePath + '/docs/license.txt');
    this.template('core/docs/changelog.txt', this.corePath + '/docs/changelog.txt');
    this.template('core/docs/readme.txt', this.corePath + '/docs/readme.txt');

    this.mkdir(this.corePath + '/model/' + this.lowCaseName);
    this.template('core/model/serviceclass.class.php', this.corePath + '/model/' + this.lowCaseName + '/' + this.serviceClassName.toLowerCase() + '.class.php');

    if (this.coreComponents.length > 0) {
        if (this.coreComponents.indexOf('Controllers') != -1) {
            this.mkdir(this.corePath + '/controllers');
            this.template('core/controllers/index.class.php', this.corePath + '/index.class.php');
            this.template('core/controllers/home.class.php', this.corePath + '/controllers/home.class.php');
        }

        if (this.coreComponents.indexOf('Templates') != -1) {
            this.mkdir(this.corePath + '/templates');
        }

        if (this.coreComponents.indexOf('Processors') != -1) {
            this.mkdir(this.corePath + '/processors');
        }

        if (this.coreComponents.indexOf('Elements') != -1) {
            this.mkdir(this.corePath + '/elements');

            if (this.elements.indexOf('Snippets') != -1 || this.includeSampleGrid == true) {
                this.mkdir(this.corePath + '/elements/snippets');
            }

            if (this.elements.indexOf('Chunks') != -1 || this.includeSampleGrid == true) {
                this.mkdir(this.corePath + '/elements/chunks');
            }

            if (this.elements.indexOf('Plugins') != -1) {
                this.mkdir(this.corePath + '/elements/plugins');
            }

            if (this.elements.indexOf('Templates') != -1) {
                this.mkdir(this.corePath + '/elements/templates');
            }
        }
    }

    if (this.useDB == true) {
        this.mkdir(this.corePath + '/model/schema');
        this.template('_build/build.schema.php', this.lowCaseName + '/_build/build.schema.php');
        this.template('core/model/schema.xml', this.corePath + '/model/schema/' + this.lowCaseName + '.mysql.schema.xml');
    }

    this.mkdir(this.corePath + '/lexicon/en');
    this.template('core/lexicon/default.inc.php', this.corePath + '/lexicon/en/default.inc.php');

    if (this.includeSampleGrid == true) {
        this.template('sample/elements/chunk.tpl', this.corePath + '/elements/chunks/item.chunk.tpl');
        this.template('sample/elements/snippet.php', this.corePath + '/elements/snippets/' + this.lowCaseName + '.snippet.php');

        this.mkdir(this.corePath + '/model/' + this.lowCaseName + '/mysql');

        this.template('sample/model/item.class.php', this.corePath + '/model/' + this.lowCaseName + '/' + this.lowCaseName + 'item.class.php');
        this.template('sample/model/metadata.mysql.php', this.corePath + '/model/' + this.lowCaseName + '/metadata.mysql.php');
        this.template('sample/model/mysql/item.class.php', this.corePath + '/model/' + this.lowCaseName + '/mysql/' + this.lowCaseName + 'item.class.php');
        this.template('sample/model/mysql/item.map.inc.php', this.corePath + '/model/' + this.lowCaseName + '/mysql/' + this.lowCaseName + 'item.map.inc.php');

        this.mkdir(this.corePath + '/processors/mgr/item');

        this.template('sample/processors/create.class.php', this.corePath + '/processors/mgr/item/create.class.php');
        this.template('sample/processors/getlist.class.php', this.corePath + '/processors/mgr/item/getlist.class.php');
        this.template('sample/processors/remove.class.php', this.corePath + '/processors/mgr/item/remove.class.php');

        if (this.useDDInGrid == true) {
            this.template('sample/processors/reorder.class.php', this.corePath + '/processors/mgr/item/reorder.class.php');
        }

        this.template('sample/processors/update.class.php', this.corePath + '/processors/mgr/item/update.class.php');
        this.template('sample/processors/updatefromgrid.class.php', this.corePath + '/processors/mgr/item/updatefromgrid.class.php');

        this.template('sample/templates/home.tpl', this.corePath + '/templates/home.tpl');

        if (this.useDDInGrid == true) {
            this.template('sample/assets/griddraganddrop.js', this.assetsPath + '/js/mgr/extras/griddraganddrop.js');
        }

        this.template('sample/assets/home.js', this.assetsPath + '/js/mgr/sections/home.js');
        this.template('sample/assets/home.panel.js', this.assetsPath + '/js/mgr/widgets/home.panel.js');
        this.template('sample/assets/items.grid.js', this.assetsPath + '/js/mgr/widgets/items.grid.js');
    }
};

BxrextraGenerator.prototype.projectfiles = function projectfiles() {

};
