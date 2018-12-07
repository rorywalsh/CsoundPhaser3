; FM Trumpet

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

iVel   =        ((p5 *0.9) + 0.1) ^ 2               ; MIDI key velocity (a corresponding value in the range 0.1 to 1)

kVibDepth expseg   0.01, 0.5, 0.01, 0.5, 1, 1, 1
kVib      lfo      kVibDepth * 0.2, 5, 0

aAmp      expsegr  0.01, 0.02, 1, 10, 1, 0.1, 0.00001
kNdx      expsegr  2, 0.02, 5, 0.2, 3, 0.1, 0.001          ; amplitude envelope for operator 2. It is an 'r' type envelope so will wait for the key to be released before enacting the final segment.
a1        foscil   aAmp * iVel, iCPS * semitone(kVib), 1, 1, kNdx * iVel, giSine


aMix   =        a1 
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
