<CsoundSynthesizer>

<CsInstruments>

0dbfs = 1

giSine  ftgen  0, 0, 4096, 10, 1

instr 1
iCPS   cpsmidi                                   ; MIDI note (cycles per second)

iVel   =        veloc:i(0.1, 1) ^ 2              ; MIDI key velocity (a corresponding value in the range 0.1 to 1)

kAmp   expsegr  1, 10, 0.00001, 10, 0.00001
kNdx   expsegr  5, 10, 0.001, 10, 0.001           ; amplitude envelope for operator 2. It is an 'r' type envelope so will wait for the key to be released before enacting the final segment.
a1     foscil   kAmp *iVel, iCPS, 1, 3.5, kNdx *iVel, giSine

       outs     a1, a1
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
