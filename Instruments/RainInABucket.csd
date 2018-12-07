<CsoundSynthesizer>
<CsOptions>
-odac -d
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1


giSfn    ftgen 0, 0, 8192, 10, 1
giAttDec ftgen 0, 0, 4096, 16, 0, 4096, 4, 1

instr  1

kFund    exprand  100
kFund    +=       100
kris     =        0.003
kdur     exprand  0.2
kdur     +=       0.5
kDens    randomi  2, 3, 5
kAmp     exprand  0.2
kGliss   exprand  0.4  
;ares    fof2     xamp,     xfund, xform, koct, kband, kris,  kdur,  kdec,   iolaps, ifna,  ifnb,    itotdur, kphs, kgliss [, iskip]
aDrip    fof2     kAmp,   kDens,   kFund,   0,    10,  0.004, 0.01, 0.001,  2000,    giSfn, giAttDec, 3600,   0,     1
aDrip    wguide2  aDrip, 173, 249, sr/2, sr/2, 0.20, 0.24 
aDrip    buthp     aDrip, 1000
         outs     aDrip, aDrip


endin


</CsInstruments>

<CsScore>
i 1 0 400
</CsScore>

</CsoundSynthesizer>
<bsbPanel>
 <label>Widgets</label>
 <objectName/>
 <x>100</x>
 <y>100</y>
 <width>320</width>
 <height>240</height>
 <visible>true</visible>
 <uuid/>
 <bgcolor mode="nobackground">
  <r>255</r>
  <g>255</g>
  <b>255</b>
 </bgcolor>
</bsbPanel>
<bsbPresets>
</bsbPresets>
