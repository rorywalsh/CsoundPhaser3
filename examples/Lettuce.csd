<CsoundSynthesizer>
<CsInstruments>
ksmps = 64
0dbfs = 1

instr PLAY_ONCE
    SFilename strcpy p4
    iLength = filelen(SFilename)
    iChannels = filenchnls(SFilename)
    print iChannels
    print iLength
    p3 = iLength
    if iChannels == 2 then
            ;a1, a2 diskin2 SFilename, 1, 0, 0
            ;outs a1, a2
    else
            ;a1 diskin2 SFilename, 1, 0, 0
            ;outs a1, a1
    endif
endin


instr START_AUDIOSOURCE
    ; creates a unique channel with same 
    ; name as game object
    kDistance init 100;
    kCutoff init 22050;
    SDistanceChannel strcpy p5
    SDistanceChannel strcat SDistanceChannel, "distance"
    kDistance chnget SDistanceChannel
    kDistance tonek kDistance, 10
    
    SCufOff strcpy p5
    SCutOff strcat SCufOff, "cutoff"
    kCutoff chnget SCutOff
    kCutoff tonek kCutoff, 10
    
    
    SFilename strcpy p4
    iLength = filelen(SFilename)

    iChannels = filenchnls(SFilename)
    print iChannels

    ; only permit playback if there is a 
    ; chance the sound will be heard
    if abs(kDistance) < 60 then
        aScale = ampdb(-kDistance)
        if iChannels == 2 then
                a1, a2 diskin2 SFilename, 1, 0, 1
                a1 tone a1, kCutoff
                a2 tone a2, kCutoff
                outs a1*aScale, a2*aScale
        else
                a1 diskin2 SFilename, 1, 0, 1
                a1 tone a1, kCutoff
                outs a1*aScale, a1*aScale
        endif
    endif
endin



</CsInstruments>
<CsScore>
f0 z
</CsScore>
</CsoundSynthesizer>

