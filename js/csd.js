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
k1 randi 1, .04, 2
k2 randi 1, .06, 2
k3 randi 1, .03, 2
k4 randi 1, .01, 2
k5 randi 1, .06, 2
k6 randi 1, .08, 2
k7 randi 1, .04, 2
k8 randi 1, .01, 2

chnset abs(k1), "platform1"
chnset abs(k2), "platform2"
chnset abs(k3), "platform3"
chnset abs(k4), "platform4"
chnset abs(k5), "platform5"
chnset abs(k6), "platform6"
chnset abs(k7), "platform7"
chnset abs(k8), "platform8"


aOut1 oscili k1*.1, 100, 1
aOut2 oscili k2*.1, 200, 1
aOut3 oscili k3*.1, 300, 1
aOut4 oscili k4*.1, 400, 1
aOut5 oscili k5*.1, 500, 1
aOut6 oscili k6*.1, 600, 1
aOut7 oscili k7*.1, 700, 1
aOut8 oscili k8*.1, 800, 1

aMix = aOut1+aOut2+aOut3+aOut4+aOut5+aOut6+aOut7+aOut8

outs aMix/10, aMix/10
endin

</CsInstruments>
<CsScore>
f1 0 1024 10 1 .5 .25
f0 z
</CsScore>
</CsoundSynthesizer>
`
csound.playCSD(csd);
        