; FM Rhodes

; p4 = note (cps)
; p5 = velocity

<Cabbage>
form caption("") size(500, 80), pluginid("")
keyboard pos(0, 0), size(500, 80)
</Cabbage>

<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d --midi-key-cps=4 --midi-velocity-amp=5
</CsOptions>    
    
<CsoundSynthesizer>

<CsInstruments>

0dbfs = 1

giSine  ftgen  0, 0, 4096, 10, 1

instr 1
iCPS   =        p4                                   ; MIDI note (cycles per second)

iVel   =        ((p5 *0.9) + 0.1) ^ 2                ; MIDI key velocity (a corresponding value in the range 0.1 to 1)


kNdx   expsegr  8, 1, 0.001, 0.6, 0.01          ; amplitude envelope for operator 2. It is an 'r' type envelope so will wait for the key to be released before enacting the final segment.
kAmp   expsegr  1, 10, 0.00001, 0.6, 0.00001 
a1     foscil   kAmp *iVel, iCPS, 1.001, 14, kNdx *iVel, giSine

kNdx   expsegr  7, 15, 0.0001, 0.6, 0.0001
kAmp   expsegr  1, 15, 0.00001, 0.6, 0.00001
a2     foscil   kAmp *iVel, iCPS, 1, 1, kNdx *iVel, giSine

kNdx   expsegr  6, 15, 0.01, 0.6, 0.01
kAmp   expsegr  1, 20, 0.00001, 0.6, 0.00001
a3     foscil   kAmp *iVel, iCPS, 1.003, 1.003, kNdx *iVel, giSine

aMix   =        a1*0.2 + a2*0.12 + a3*0.12
       outs     aMix, aMix

endin

</CsInstruments>

<CsScore>
</CsScore>

</CsoundSynthesizer>
