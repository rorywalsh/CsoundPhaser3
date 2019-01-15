const csd = `
<CsoundSynthesizer>
<CsInstruments>
ksmps = 64


instr 2
    ; creates a unique channel with same 
    ; name as game object
    SChannel strcpy p5
    kDistance chnget SChannel
    kDistance tonek kDistance, 10

    ; create or modify sounds
    ; remembering to adjust for distance
    a1 oscili 1, 300

    if p4 == 0 then         ;logarithmic
        aScale = ampdb(-kDistance)
        outs a1*aScale, a1*aScale
    else                    ;linear
        outs a1*(1/kDistance), a1*(1/kDistance)
    endif
endin


</CsInstruments>
<CsScore>
f0 z
i2 0 z
</CsScore>
</CsoundSynthesizer>
`
csound.playCSD(csd);
