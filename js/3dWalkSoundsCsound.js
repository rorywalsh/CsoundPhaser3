const csd = `
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
0dbfs = 1

instr 1
    aOut0 oscili ampdb(-chnget:k("ball0")), 100
    aOut1 oscili ampdb(-chnget:k("ball1")), 100
    aOut2 oscili ampdb(-chnget:k("ball2")), 200
    aOut3 oscili ampdb(-chnget:k("ball3")), 300
    aOut4 oscili ampdb(-chnget:k("ball4")), 500
    aOut5 oscili ampdb(-chnget:k("ball5")), 600
    aOut6 oscili ampdb(-chnget:k("ball6")), 700
    aOut7 oscili ampdb(-chnget:k("ball7")), 800
    aOut8 oscili ampdb(-chnget:k("ball8")), 900
    aOut9 oscili ampdb(-chnget:k("ball9")), 1000
    aMix = aOut0+aOut1+aOut2+aOut3+aOut4+aOut5+aOut6+aOut7+aOut8+aOut9
    outs aMix*.1, aMix*.1
endin

</CsInstruments>

<CsScore>
i1 0 z
</CsScore>

</CsoundSynthesizer>
`
csound.removeListener( "log" )

csound.playCSD(csd);