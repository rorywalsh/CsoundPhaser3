; FM Flute

; p4 = note (cps)
; p5 = velocity

<Cabbage>
form caption("") size(500, 80), pluginid("")
keyboard pos(0, 0), size(500, 80)
</Cabbage>

<CsoundSynthesizer>

<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d --midi-key-cps=4 --midi-velocity-amp=5
</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1


instr 1

kRate      randomi 0.8, 1, 2
kStep      metro   kRate
schedkwhen kStep, 0,0,3,0,0.8  

endin

instr 2
aCrack  mpulse  1, 0
iCF     random  6000, 15000
aCrack mode    aCrack, iCF, 1
       outs    aCrack, aCrack
endin

instr 3
p3     random  0.4, 0.9
iAmp   exprand  0.2
aEnv  linseg  0.01, 0.2, 1, p3-0.2, 0.01
;aNoise pinker
aNoise dust2  iAmp+0.5, 8000 * k(aEnv)
iCF   random 1500, 8000
aNoise tone aNoise, iCF*aEnv
aNoise atone aNoise, 10000 * (1.5-k(aEnv))
aNoise *=    aEnv
      outs aNoise, aNoise
       
aCrack  gausstrig   1, 5, 10
kCF     randomh  2500, 15000, 10
aCrack mode    aCrack, a(kCF), 0.5
       outs    aCrack*aEnv, aCrack*aEnv
       

endin

</CsInstruments>

<CsScore>
i 1 0 500
</CsScore>

</CsoundSynthesizer>
<bsbPanel>
 <label>Widgets</label>
 <objectName/>
 <x>100</x>
 <y>100</y>
 <width>320</width>
 <height>240</height>
 <visible>true</visible>
 <uuid/>
 <bgcolor mode="nobackground">
  <r>255</r>
  <g>255</g>
  <b>255</b>
 </bgcolor>
</bsbPanel>
<bsbPresets>
</bsbPresets>
