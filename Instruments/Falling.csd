
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
iStrt  =          p4
kCPS   expon      p4, 1, p4/2
kEnv   expsegr    1, 0.1, 0.001
kRate  expon      16, 4, 8
kTrig  metro      kRate
       schedkwhen kTrig, 0, 0, 2, 0, 0.1, kCPS, kEnv
endin

instr 2
aSig   vco2    0.1 * p5, p4, 4, 0.5
p3     *=      200 / p4
iAtt   =       0.02 * 200/p4
aEnv   expsegr 0.001, iAtt, 1, p3-iAtt, 0.001, 0.01, 0.001
aSig   *=      aEnv
       outs    aSig, aSig

endin

</CsInstruments>

<CsScore>
i 1 0 5 1500
</CsScore>

</CsoundSynthesizer>
