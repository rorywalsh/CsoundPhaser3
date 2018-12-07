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

kFund   exprand  1500
kFund   +=       500
kris    =        0.003
kdur    exprand  0.01
kdur    +=       0.5
kDens   randomi  1000, 2000, 100
kAmp    exprand  0.01
kGliss  exprand  0.4  
;ares   fof2     xamp,  xfund, xform, koct, kband, kris,  kdur,  kdec,   iolaps, ifna,  ifnb,    itotdur, kphs, kgliss [, iskip]
aBurbleL fof2     kAmp, kDens, kFund,   0,    1000, 0.001, 0.01, 0.003,  2000,    giSfn, giAttDec, 3600,   0,     4
aBurbleR fof2     kAmp, kDens, kFund,   0,    1000, 0.001, 0.01, 0.003,  2000,    giSfn, giAttDec, 3600,   0,     4
aBurbleL buthp    aBurbleL, 8000
aBurbleR buthp    aBurbleR, 8000
        outs     aBurbleL, aBurbleR


aRoar dust2   0.3, 1000
aRoar butbp   aRoar, 1000, 2000
kCF   randomi 1000, 1500, 2
aRoar tone    aRoar, kCF

      outs   aRoar, aRoar
endin


</CsInstruments>

<CsScore>
i 1 0 400
</CsScore>

</CsoundSynthesizer>
