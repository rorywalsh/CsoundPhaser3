; an owl 'hoot'

<CsoundSynthesizer>

<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d --midi-key-cps=4 --midi-velocity-amp=5
</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr  1
iCPS      =         cpsmidinn(p4)                                        ; base pitch of owl (note number). 60 for a standard owl
iRto      =         iCPS / cpsmidinn(60)
aSig      noise     10*p5, 0

kModDepth =         p6                                                   ; modulation depth (range 0 to 1)
kModEnv   expseg    0.001, 0.35, 1, 1, 1
kMod      lfo       kModDepth*kModEnv, 12, 1
kVib      =         kMod * 0.05 + 0.95
kTrm      =         kMod * 0.1 + 0.9 

aEnv      expsegr   0.001, 0.08, 1, 0.32, 1, 0.8, 0.001, 0.1, 0.001
aCF       expsegr   450, 0.1, 818, 0.35, 810, 0.5, 650, 0.1, 300
aSig      butbp     aSig, aCF * iRto * kVib, aCF * iRto * 0.01 * kVib
aSig      butbp     aSig, aCF * iRto * kVib, aCF * iRto * 0.01 * kVib
aSig      *=        aEnv * kTrm
aSig      wguide1   aSig/4, aCF * iRto * kVib, 15000, 0.85
          outs      aSig, aSig       


iSend  =         0.1
       chnmix    aSig*iSend, "SendL"
       chnmix    aSig*iSend, "SendR"

endin


alwayson 99
instr  99
aInL   chnget    "SendL"
aInR   chnget    "SendR"
       chnclear  "SendL"
       chnclear  "SendR"
       
aDelL   flanger   aInL, a(0.15), 0
aDelR   flanger   aInR, a(0.45), 0

aL,aR  reverbsc  aDelL + aInL, aDelR + aInR, 0.6, 3000

       outs      aL, aR
endin


</CsInstruments>

<CsScore>
; p4 = note number (60 for standard owl)
; p5 = owl velocity (0 to 1)
; p6 = tremolo depth (0 to 1)
;       p4 p5 p6
i 1 0 4 60 1  0

i 1 2 0.1 60 1  0
i 1 2.9 4 59.7 1  0
</CsScore>

</CsoundSynthesizer>
