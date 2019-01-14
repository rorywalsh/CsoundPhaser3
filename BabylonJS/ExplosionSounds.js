const csd = `
<CsoundSynthesizer>
<CsInstruments>

instr 1
    aNoise randi 1, 300
    aEnv expseg 0.001, .01, .7, p3, .001
    outs aNoise*aEnv, aNoise*aEnv 
endin

</CsInstruments>
<CsScore>
f0 z
</CsScore>
</CsoundSynthesizer>
`
csound.playCSD(csd);
