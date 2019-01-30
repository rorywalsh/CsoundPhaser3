<CsoundSynthesizer>
<CsInstruments>
0dbfs = 1
nchnls = 2

giSine ftgen 1, 0, 1024, 2, 0 

instr 1

    iIndex init 0
    while iIndex < 1024 do
        tablew (random(0, 10)> 5 ? 0 : 1), iIndex, 1
        //print table:i(iIndex, 1);
        iIndex+=1;
    od
    ;copya2ftab iHits, 1
endin

instr 2 
    kTrigReinit init 0
    kFreq = .1
    chnset kFreq, "freq"
    k1 oscili 1, kFreq
    k2 oscili 1, kFreq, -1, .1
    chnset k1, "x1"
    chnset k2, "y1"

    k3 oscili 1, -kFreq, 100, .17
    k4 oscili 1, kFreq, -1
    chnset k3, "x2"
    chnset k4, "y2"

    kTrigReinit chnget "reset"
    if kTrigReinit == 1 then
        chnset k(0), "reset"
        turnoff
    endif

endin

instr 3
    a1 expon .4, p3, 0.0001
    a2 oscili a1, 300
    outs a2, a2
endin


</CsInstruments>
<CsScore>
f100 0 1024 10 0 1 
f101 0 1024 10 -1 -1
f102 0 1024 10 1 .2
f103 0 1024 10 -1 .3 
f104 0 1024 10 1  .5 .26 .1 .3
f105 0 1024 10 -1  .1 0 .17 .1 .3
f0 z
i1 0 2
i2 0 z 0
</CsScore>
</CsoundSynthesizer>

