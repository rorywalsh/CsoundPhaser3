<CsoundSynthesizer>
<CsInstruments>
0dbfs = 1
nchnls = 2

giSine ftgen 1, 0, 1024, 2, 0 

instr 1

    iIndex init 0
    while iIndex < 1024 do
        tablew (random(-10, 10)> (iIndex/1024)*10 ? 0 : 1), iIndex, 1
        //print table:i(iIndex, 1);
        iIndex+=1;
    od
endin

instr 2 
print p4
    kTrigReinit init 0
    kFreq = .1
    chnset kFreq, "freq"
    a1 buzz 1, kFreq*p4,    p4,     -1
    a2 buzz 1, kFreq*p4,    p4,     -1,     .1
    chnset k(a1), "x1"
    chnset k(a2), "y1"

    a3 buzz 1, kFreq*p4,    p4,     -1,     .17
    a4 buzz 1, kFreq*p4,    p4,     -1     
    chnset k(a3), "x2"
    chnset k(a4), "y2"

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

; instr 4
;     kIndex init 0
;     kHit init 0
;     kLevel chnget "level"
;     if metro(chnget:k("freq")*10) == 1 then
;         kHit tab kLevel*16+kIndex, 1
;         if kHit == 1 then
;             event "i", 3, 0, 2
;         endif
;         kIndex = kIndex < 16 ? kIndex+1: 0
;     endif
; endin


</CsInstruments>
<CsScore>
f100 0 1024 10 1 .1 
f0 z
i1 0 2
i2 0 z 0
i4 0 z
</CsScore>
</CsoundSynthesizer>

