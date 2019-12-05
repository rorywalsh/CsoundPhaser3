const csd = `
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
0dbfs = 1



instr 1
    
endin


</CsInstruments>

<CsScore>
f0 z
</CsScore>

</CsoundSynthesizer>
`
csound.removeListener( "log" )

csound.playCSD(csd);