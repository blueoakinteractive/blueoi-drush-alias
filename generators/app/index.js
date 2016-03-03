'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('BlueOI Drush Alias') + ' generator!'
    ));

    // Set variables
    var prompts = [
      {
        type: 'input',
        name: 'aliasName',
        message: 'Enter your project\'s name.',
        default: process.cwd().split("/").pop()
      },
      {
        type: 'input',
        name: 'portNumber',
        message: 'Enter your project\'s ssh port number.',
        default: '22'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      // Rename drush alias template and populate variables.
      this.fs.move(
          this.destinationPath('~/.drush/placeholder.alias.drushrc.php'),
          this.destinationPath('~/.drush/' + this.props.aliasName + '.alias.drushrc.php'),
          {
            aliasName: this.props.aliasName,
            portNumber: this.props.portNumber
          }
      );

    }
  },

  // Display completion message
  complete: function () {
    this.log('The BlueOI Drush Alias Generator has finished generating your alias.');
  }
});
