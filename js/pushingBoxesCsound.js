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

;boxSound
instr 2    
    SChannelName sprintf "pitch%d", p5
    kPitch chnget SChannelName
    a1 oscili p4, kPitch
    outs a1, a1 
    printk2 kPitch
    print active(2)
endin

</CsInstruments>
<CsScore>
f0 z
</CsScore>
</CsoundSynthesizer>
`
csound.playCSD(csd);
        