<CsoundSynthesizer>
<CsOptions>
-0md
</CsOptions>
<CsInstruments>
0dbfs = 1
nchnls = 2
ksmps =1


instr 1
    prints "hit.."
    a1 expon .4, p3, 0.0001
    a2 oscili a1, cpsmidinn(p4)
    outs a2, a2
endin



</CsInstruments>
<CsScore>
f100 0 1024 10 1 .1 
f0 z
</CsScore>
</CsoundSynthesizer>

