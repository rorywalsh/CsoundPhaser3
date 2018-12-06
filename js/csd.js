const csd = `
<CsoundSynthesizer>
<CsInstruments>
ksmps = 512


;jumping sound
instr 1
    a1 expon 1, p3, 0.001
    a2 oscili a1, (1-a1)*p4+p5
    outs a2, a2 
endin

;white noise machine
instr 2
    a1 rand .1
    a2 lpf18 a1, chnget:k("cutoff"), .5, 0
    outs a2, a2 
endin

;lightning kick triggers
instr 3
    kRand randh 1000, 4000, 2
    if metro(1) == 1 then
        event "i", 4, 0, 10
        chnset kRand, "triggerLights"
    endif
endin

;kick
instr 4
    prints "Istrument 4"
    a1 expon .5, p3, 0.001
    a2 expon 150, p3, 50
    a3 oscili a1, a2
    outs a3, a3
endin

;explosion
instr 5
    a1 expon 1, p3, 0.001
    a2 randi 1000, 500
    a3 oscili a1, a2
    outs a3, a3
endin

;random platforms
instr 6
k1 oscili 1, .05, -1, .1 
k2 oscili 1, .05, -1, .2
k3 oscili 1, .05, -1, .3
k4 oscili 1, .05, -1, .4 
k5 oscili 1, .05, -1, .5 
k6 oscili 1, .05, -1, .6 
k7 oscili 1, .05, -1, .7 
k8 oscili 1, .05, -1, .8 

chnset abs(k1), "platform0"
chnset abs(k2), "platform1"
chnset abs(k3), "platform2"
chnset abs(k4), "platform3"
chnset abs(k5), "platform4"
chnset abs(k6), "platform5"
chnset abs(k7), "platform6"
chnset abs(k8), "platform7"


aOut1 oscili k1, 100, 1
aOut2 oscili k2, 101, 2
aOut3 oscili k3, 102, 3
aOut4 oscili k4, 103, 4
aOut5 oscili k5, 104, 5
aOut6 oscili k6, 105, 6
aOut7 oscili k7, 106, 7
aOut8 oscili k8, 107, 8

aMix = aOut1+aOut2+aOut3+aOut4+aOut5+aOut6+aOut7+aOut8

outs aMix*.01, aMix*.01
endin

</CsInstruments>
<CsScore>
f1 0 1024 10 1
f2 0 1024 10 1 .5
f3 0 1024 10 1 .5 .2
f4 0 1024 10 1 .5 .2 .17
f5 0 1024 10 1 .5 .2 .17 .12
f6 0 1024 10 1 .5 .2 .17 .12 .10
f7 0 1024 10 1 .5 .2 .17 .12 .10 .8
f8 0 1024 10 1 .5 .2 .17 .12 .10 .8 .7


f0 z
</CsScore>
</CsoundSynthesizer>
`
csound.playCSD(csd);
        