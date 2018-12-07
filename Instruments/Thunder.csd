; Thunder


<CsoundSynthesizer>

<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d 
</CsOptions>

<CsInstruments>
; Initialize the global variables. 
sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1
seed 0





instr		1	; thunder
 aenv		expseg	  0.01, 0.05, 1, 0.1, 0.5, p3-0.01, 0.01
 aNse		pinkish	  0.6
 kCF		expon     p4, p3, 0.01
 kCFoct		randomh   2 * kCF, 6 * kCF, 20
 kCFEnv     expon     1, p3, 0.01
 aNse		reson     aNse*3, a(cpsoct(kCFoct)), a(cpsoct(kCFoct)*5), 1
 aNse		butlp     aNse, 1000
 ipan		random    0, 1
 aNse       *=        aenv
 aL,aR      pan2      aNse,ipan
            outs      aL, aR
            chnmix    aL/2, "SendL"
            chnmix    aR/2, "SendR"
endin

alwayson  2
instr   2
aInL  chnget "SendL"
aInR  chnget "SendR"
      chnclear "SendL"
      chnclear "SendR"
aDelL    flanger   aInL, a(0.4), 0.3
aDelR    flanger   aInR, a(0.437), 0.3

aL,aR reverbsc  aInL+aDelL, aInR+aDelR, 0.6, 3000
;aL,aR freeverb  aInL+aDelL, aInR+aDelR, 0.1, 0.1
      outs      aL, aR
endin


</CsInstruments>

<CsScore>
;p4=distance (try 1 to 1.7)
i 1 0 12 1.5
</CsScore>

</CsoundSynthesizer>
