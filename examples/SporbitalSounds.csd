<CsoundSynthesizer>
<CsOptions>
-0md
</CsOptions>
<CsInstruments>
0dbfs = 1
nchnls = 2
ksmps =1

giSine ftgen 1, 0, 1024, 2, 0 
giNotes[] fillarray 60, 67, 65, 64, 63, 62, 60, 70, 60, 67, 65, 64, 63, 62, 60, 70
giIndex init 0

instr 1
    iIndex init 0
    while iIndex < 1024 do
        tablew (random(-10, 10)> (iIndex/1024)*10 ? 0 : 1), iIndex, 1
        ;print table:i(iIndex, 1);
        iIndex+=1;
    od
endin

instr 2 
    kTrigReinit init 0
    kFreq = .1
    chnset kFreq, "freq"
    a1 oscil 1, .15
    a2 oscil 1, .15, -1, .1
    chnset k(a1), "x1"
    chnset k(a2), "y1"

    ; a3 buzz 1, kFreq*p4,    p4,     -1,     .17
    ; a4 buzz 1, kFreq*p4,    p4,     -1     
    ; chnset k(a3), "x2"
    ; chnset k(a4), "y2"

endin

instr 3
    prints "hit.."
    a1 expon .4, p3, 0.0001
    a2 oscili a1, cpsmidinn(giNotes[giIndex])
    giIndex = giIndex < 16 ? giIndex+1 : 0
    outs a2, a2
endin

instr 4
;     kIndex init 0
;     kHit init 0
;     kLevel chnget "level"
;     kRand randi 1000, 4410, 1
;     kStopClock init 0
;     if metro(4) == 1 then
;     ;printk2 kIndex
;         kHit tab kIndex, 1

;         if kHit == 1 then
;             event "i", 3, 0, 2, cpsmidinn(60+kIndex)
;             chnset kRand, "createStar"
;         endif
;         kIndex = kIndex < 16 ? kIndex+1: 0
;         chnset kStopClock, "stopCreatingStars"
;         kStopClock+=1
;     endif

    ; kTrigReinit chnget "reset"
    ; if kTrigReinit == 1 then
    ;     chnset k(0), "reset"
    ;     turnoff
    ; endif

endin


</CsInstruments>
<CsScore>
f100 0 1024 10 1 .1 
f0 z
i1 0 2
i2 0 z 1
i4 0 z
</CsScore>
</CsoundSynthesizer>

