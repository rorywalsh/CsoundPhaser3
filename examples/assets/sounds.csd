<CsoundSynthesizer>
<CsInstruments>

instr 1
    a1 expon 1, p3, 0.001
    a2 oscili a1, (1-a1)*p4+p5
    outs a2, a2 
endin


</CsInstruments>
<CsScore>
f0 z
</CsScore>
</CsoundSynthesizer>