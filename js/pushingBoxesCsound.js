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
    SChannelPitch sprintf "pitch%d", p5
    SChannelGain sprintf "gain%d", p5
    kPitch chnget SChannelPitch
    kGain chnget SChannelGain
    kGain = tonek(ampdb(-kGain*.1), 10)
    a1 oscili kGain*.1, (kPitch*2)+oscili:k(10, 1)
    outs a1*1/(active(2)), a1*1/(active(2)) 
endin

</CsInstruments>
<CsScore>
f0 z
</CsScore>
</CsoundSynthesizer>
`
csound.playCSD(csd);
        