; A wobble 'boing' sound

<CsoundSynthesizer>
<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d 
</CsOptions>
<CsInstruments>
; Initialize the global variables. 
sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1

instr 1
kAmp     expseg   0.001, 0.005, 1, p3, 0.0001  ; a decaying amplitude
aSig     vco2     kAmp * 50, 105, 4, 0.49      ; basic sound
kWobDep  expon    12, p3, 8
aWobl    poscil   kWobDep, 8, -1, 270
aCF      =        1000 * semitone(aWobl)
aSig     butbp    aSig, aCF, 300
aSig     butbp    aSig, 1200, 300
         outs     aSig, aSig
endin

</CsInstruments>

<CsScore>
i 1 0 1.6
</CsScore>

</CsoundSynthesizer>
