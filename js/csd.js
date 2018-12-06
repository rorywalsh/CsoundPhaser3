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

instr 2
    a1 rand .1
    a2 lpf18 a1, chnget:k("cutoff"), .5, 0
    outs a2, a2 
endin

instr 3
    kRand randh 1000, 4000, 2
    if metro(1) == 1 then
        //printk2 kRand
        //event "i", 4, 0, 10
        chnset kRand, "triggerLights"
    endif
endin

instr 4
prints "Istrument 4"
a1 expon .1, p3, 0.001
a2 expon 150, p3, 50
a3 oscili a1, a2
outs a3, a3
endin

</CsInstruments>
<CsScore>
f0 z
</CsScore>
</CsoundSynthesizer>
`
csound.playCSD(csd);
        