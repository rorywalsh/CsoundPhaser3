const csd = `
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
0dbfs = 1



instr  1
iCPS      =         cpsmidinn(p4)                                        ; base pitch of owl (note number). 60 for a standard owl
iRto      =         iCPS / cpsmidinn(60)
iDB       =         ampdb(-(1-p5)*60)
aSig      noise     10*iDB, 0

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
i99 0 z
</CsScore>

</CsoundSynthesizer>
`
csound.playCSD(csd);