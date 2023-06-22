const fs = require("fs-extra");
var $ = require("jquery");
window.$ = $;
require('bootstrap');
$(document).ready(function() {
  const homeDir = require("os").homedir();
  const webDeskConfigDir = `${homeDir}/Data`;
  //const webAppConfigDir = `${webDeskConfigDir}/ScrapSheet`;
  const txt = webDeskConfigDir + '/scrapsheet.txt';
  if (fs.existsSync(txt)) {
    const data = fs.readFileSync(txt,{encoding:'utf8', flag:'r'});
    $("#container").html(data);
  }
  $("#container").keyup(function(){
    var read = $("#container").html();
    fs.writeFileSync(txt, read);
  });
});
