/* Sample Csound-based audio engine for use with BabylonJS
 *
 * Copyright (C) 2019 Rory Walsh
 * 
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */


/**
 * @classdesc 
 * Creates an instance of Csound and compiles a file called lettuce.csd by default. Custom .csd files can also be loaded. 
 * 
 * @example
 * var lettuce = new Lettuce("Babylonjs");
 * 
 * @param {string} gameEngine Set the game engine being used, i.e., 'Babylonjs' or 'Phaser3'
 * @param {string} filename the .csd file to compile.
 * @constructor 
 */
function Lettuce (gameEngine, filename = 'lettuce.csd') {

this.audioDirectory = "";
this.gameEngine = gameEngine;

/**
* Sets the default directory for audio assets.
* @param {string} dir the audio assets directory, relative to this file.
*/
this.setAudioDirectory = function(dir){
    this.audioDirectory = dir;
}

/**
* Starts the audio engine.
*/
this.start = function(){
    csound.PlayCsd(filename);
}

this.playOnceWithDelay = function(filename, distance, temperature){
    //code goes here...
}

/**
* Adds list of file from server to local file system. All files used by the audio engine
* during a game must be loaded in advance of their use. 
* @example
* lettuce.addFiles(new Array('1.wav', '2.wav', '3.wav')); 
* @param {array} files Array contained all files to be loaded.
*/        
this.addFiles = function(files){
    for( var i = 0; i < files.length; i++ ){
        csound.CopyUrlToLocal(this.audioDirectory+'/'+files[i], files[i], function(){            console.log("Adding file: "+files[i]);});
    }
}  

/**
* Plays a one-shot sound file 
* 
* @param {string} filename Name of audio file to be played.
*/
this.playOneShot = function(filename){
    csound.ReadScore('i"PLAY_ONCE" 0 1 "'+filename+'"');   
}

/**
* Creates an audio source whose amplitude is determined by its distance
* to the listener. The name of the source is used to create unique channels
* that the audio engine can later send data to.    
* 
* @param {string} source Source object.
* @param {string} listener Listener object.
* @param {string} filename Name of audio file to be used by the source.
*/
this.createAudioSource = function(source, listener, filename){
    csound.ReadScore('i"START_AUDIOSOURCE" 0 -1 "'+filename+'" '+'"'+source.name+'"'); 
    this.setSourceCufOff(source, 22050);
    this.setSourceAmplitude(source, listener);   
}


/**
* Trigger an audio event via the Csound score line 
* 
* @example
* lettuce.sendEvent('i"SHOOT" 0 1 60'); 
* @param {string} scoreEvent Score event consisting of instrument name of number followed by start time, and then a duration. Other parameters can be passed, but it depends on the instrument being triggered. 
*/
this.sendEvent = function(scoreEvent)
{
    csound.ReadScore(scoreEvent);
}


/**
* Compiles a Csound instrument in the form of a string. 
* 
* @example
* const paddleSound =`
* instr PADDLE
*     aEnv expon .5, p3, .001
*     a1 oscili aEnv, cpsmidinn(p4)
*     outs a1, a1
* endin`;
* lettuce.compileInstr(paddleSound);
* @param {string} instr String containing instrument definition
*/  
this.compileInstr = function(instr)
{
    csound.CompileOrc(instr);
}


/**
* Set the amplitude of an audio source based on its proximity to a listener.  
* 
* @param {string} source Source object.
* @param {string} listener Listener object.
* @param {float} scale Sets a scaling factor. Values greater than 1 will cause greater amplitude attenuation. Values less than 1 will cause decreased attenuation. 
*/    
this.setSourceAmplitude = function(source, listener, scale = 1){
    if(this.isLoaded == true){
        if (this.gameEngine === 'Babylonjs'){
            const distance = BABYLON.Vector3.Distance(listener.position, source.position)
            csound.SetChannel(source.name+'distance', distance*scale);
        }
        else{
            const distance = Phaser.Math.Distance.Between(listener.x, listener.y, source.x, source.y);
            csound.SetChannel(source.name+'distance', distance*scale);    
        }
    }
}


/**
* Set the low pass cut-off frequency of an audio source.   
* 
* @param {string} source Source object.
* @param {float} cutoff Cut-off frequency. 
*/ 
this.setSourceCufOff = function(source, cutoff)
{
    if(this.isLoaded == true){
        csound.SetChannel(source.name+'cutoff', cutoff);
    }
}

this.isLoaded = true;
}

 