; FM Bass Guitar

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

instr  1
iCPS   =        p4                                          ; MIDI note (cycles per second)
iVel   =        ((p5 *0.9) + 0.1) ^ 2                       ; MIDI key velocity (a corresponding value in the range 0.1 to 1)
kAmp   expsegr  1, 17, 0.00001, 0.1, 0.00001
kNdx   expsegr  5, 17, 0.001,   0.1, 0.001                  ; amplitude envelope for operator 2. It is an 'r' type envelope so will wait for the key to be released before enacting the final segment.
a1     foscil   kAmp * iVel, iCPS, 1, 1, kNdx *iVel, giSine
       outs     a1, a1
endin

</CsInstruments>

<CsScore>
</CsScore>

</CsoundSynthesizer>
