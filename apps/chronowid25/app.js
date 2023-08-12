g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();

const storage = require('Storage');
let settingsChronowid;

function updateSettings() {
  var now = new Date();
  const goal = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
    now.getHours() + settingsChronowid.hours, now.getMinutes() + settingsChronowid.minutes, now.getSeconds() + settingsChronowid.seconds);
  settingsChronowid.goal = goal.getTime();
  storage.writeJSON('chronowid25.json', settingsChronowid);
  if (WIDGETS["chronowid25"]) WIDGETS["chronowid25"].reload();
}

settingsChronowid = storage.readJSON('chronowid25.json',1);
if (!settingsChronowid) resetSettings();

E.on('kill', () => {
  updateSettings();
});

// Toggle the widget on or off
settingsChronowid.started = !settingsChronowid.started;
updateSettings();
setTimeout(() => load());
