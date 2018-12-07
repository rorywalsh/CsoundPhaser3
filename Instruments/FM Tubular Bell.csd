; FM Tubular Bell

; p4 = note (cps)
; p5 = velocity

<Cabbage>
form caption("") size(500, 80), pluginid("")
keyboard pos(0, 0), size(500, 80)
</Cabbage>

<CsoundSynthesizer>

<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d --midi-key-cps=4 --midi-velocity-amp=5
</CsOptions>

<CsInstruments>

0dbfs = 1

giSine  ftgen  0, 0, 4096, 10, 1

instr 1
iCPS   =        p4                                   ; MIDI note (cycles per second)

iVel   =        ((p5 *0.7) + 0.03) ^ 2               ; MIDI key velocity (a corresponding value in the range 0.1 to 1)

kAmp   expsegr  1, 10, 0.00001, 10, 0.00001
kNdx   expsegr  5, 10, 0.001, 10, 0.001              ; amplitude envelope for operator 2. It is an 'r' type envelope so will wait for the key to be released before enacting the final segment.
a1     foscil   kAmp *iVel, iCPS, 1, 3.5, kNdx *iVel, giSine

kAmp   expsegr  1, 15, 0.00001, 15, 0.00001
kNdx   expsegr  7, 15, 0.0001, 15, 0.0001
a2     foscil   kAmp *iVel, iCPS, 1.003, 3.505, kNdx *iVel, giSine

kAmp   expsegr  1, 0.1, 0.00001, 0.1, 0.00001
kNdx   expsegr  6, 0.1, 0.01, 0.1, 0.01
a3     foscil   kAmp *iVel, 1, 323.5, iCPS*2.003, kNdx *iVel, giSine

aMix   =        (a1 + a2 + a3) * 0.2
       outs     aMix, aMix
endin

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>