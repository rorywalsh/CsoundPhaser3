
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
kAmp     expseg   0.001, 0.005, 1, p3-0.005, 0.0001
kCPS     expseg   150, 0.1, 105, p3-0.1, 1000
aSig     vco2     kAmp * 50, kCPS, 4, 0.2
kWobDep  expon    12, p3, 8
aCF      expseg   200, 0.1, 100, p3-0.1, 10000
aSig     buthp    aSig, aCF, 500
aSig     butbp    aSig, 1200, 200
         outs     aSig, aSig
endin

</CsInstruments>

<CsScore>
i 1 0 1
</CsScore>

</CsoundSynthesizer>
