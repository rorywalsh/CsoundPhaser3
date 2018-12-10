const csd = `
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
0dbfs = 1


;bounce sound
instr 1
    iActive active 1
    a1 expon .2, p3, 0.001
    a2 oscili a1, 200+p4
    outs a2/iActive, a2/iActive 
endin


</CsInstruments>

<CsScore>
f0 z
</CsScore>

</CsoundSynthesizer>
`
csound.removeListener( "log" )

csound.playCSD(csd);