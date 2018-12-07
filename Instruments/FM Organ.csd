; FM Organ

; p4 = note (cps)
; p5 = velocity

<Cabbage>
form caption("") size(500, 80), pluginid("")
keyboard pos(0, 0), size(500, 80)
</Cabbage>

<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d --midi-key-cps=4 --midi-velocity-amp=5
</CsOptions>

<CsoundSynthesizer>

<CsInstruments>

0dbfs = 1

giSine  ftgen  0, 0, 4096, 10, 1

instr 1
iCPS   =        p4                                   ; MIDI note (cycles per second)

aAmp      expsegr  1, 0.1, 0.00001
kNdx      expsegr  1, 0.1, 0.001                         ; amplitude envelope for operator 2. It is an 'r' type envelope so will wait for the key to be released before enacting the final segment.
a1        foscil   aAmp, iCPS, 1, 2, kNdx, giSine
a2        foscil   aAmp, iCPS, 2.01, 4.01, kNdx, giSine
a3        foscil   aAmp, iCPS, 4.01, 8.01, kNdx, giSine
aMix      =        (a1 + a2 + a3) * 0.4
          outs     aMix, aMix
endin

</CsInstruments>
<CsScore>
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
