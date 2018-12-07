
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

instr 1
 kdB		rspline	-3, 0, 5, 15
 kenv		expseg	0.01,4,1,1,1
 aNoise		dust2		0.02*ampdbfs(kdB)*kenv, 12000
 kCF		rspline	8,12.5,0.1,0.2
 kBW		rspline	0.04,0.2,0.2,2
 aNoise		reson		aNoise, cpsoct(kCF), cpsoct(kCF)*kBW, 2
 kpan		rspline	  0.1,0.9,0.4,0.8
 aL,aR		pan2	   aNoise,kpan
 		    out		   aL, aR
endin

</CsInstruments>

<CsScore>
i 1 0 3600
i 1 0 3600
i 1 0 3600
</CsScore>

</CsoundSynthesizer>
