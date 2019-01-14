const csd = `
<CsoundSynthesizer>
<CsInstruments>
ksmps = 64

instr 1
kDistance chnget "distance"
;a1 oscili 1, tonek(100+(kDistance*5), 10)
a1 oscili 1, tonek(400+(1/kDistance)*60, 10)
printk 1, 1/kDistance
outs a1, a1
endin

</CsInstruments>
<CsScore>
f0 z
</CsScore>
</CsoundSynthesizer>
`
csound.playCSD(csd);
