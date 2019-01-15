
var csoundLoaded = false;
var csound;
// Setup Csound and load sound script
CsoundObj.importScripts("./csound/").then(() => {
    fetch("Movement.csd").then((response) => {
    response.text().then((csd) => {
        csound = new CsoundObj();
        csound.compileCSD(csd);
        csound.start();
        csoundLoaded = true;
    })
    })
});

