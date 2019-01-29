<CsoundSynthesizer>
<CsInstruments>
0dbfs = 1
nchnls = 2

giSine ftgen 1, 0, 16, 2, 0 


instr 1

    iIndex init 0
    while iIndex < 16 do
        tablew (random(0, 10)> 5 ? 0 : 1), iIndex, 1
        print table:i(iIndex, 1);
        iIndex+=1;
    od
    ;copya2ftab iHits, 1
endin

instr 2
    kFreq = .1
    chnset kFreq, "freq"
    k1 oscili 1, kFreq, 99
    k2 oscili 1, kFreq, -1, 3.14
    chnset k1, "x"
    chnset k2, "y"
endin

instr 3
    a1 expon .4, p3, 0.0001
    a2 oscili a1, 300
    outs a2, a2
endin


</CsInstruments>
<CsScore>
f99 0 1024 10 1 1
f0 z
i1 0 1
i2 0 z
</CsScore>
</CsoundSynthesizer>

