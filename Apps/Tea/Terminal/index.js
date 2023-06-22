var fs = require('fs-extra');
const homedir = require('os').homedir();
const remote = require('electron').remote;
var d = '/';
var home = homedir;
$('body').terminal({
    help: function() {
        this.echo('ls: list\ncd "dir": change dir\ncat "file": read file\nopen "file": opens file\nrun "app": reun an app\ngit clone: add app or theme\ngit pull: update app or theme');
    },
    ls: function() {
      //console.log(home + d);
      fs.readdir(home + d, (err, list) => {
        list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        var e = '';
        list.forEach(myApps);
      function myApps(item) {
        //console.log(item);
        e += item + '\n';
      }
      this.echo(e);
      });
    },
    cd: function(di) {
      if(di == '../'){

      }
      else{
        d += di + '/';
      }
    },
    pwd: function() {
      this.echo(d);
    },
    cat: function(file) {
      var ca = fs.readFileSync(home + d + file);
      this.echo(ca);
    },
    exit: function() {
      var window = remote.getCurrentWindow();
       window.close();
    }
    /*tea: function(prog, var1, var2) {
      var window = remote.getCurrentWindow();
       window.close();
    }*/
  },
    {
        greetings: greetings.innerHTML + '\n\nType help if you need it.\n\n', prompt: 'TEAhouse> ',
});
