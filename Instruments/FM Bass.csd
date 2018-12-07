; DX Bass 1
; Iain McCurdy 2018

; algorithm 16

          +--+
     [4] [6] |
      |   +--+
 [2] [3] [5]
  |   |   |
  +---+---+
      |
     [1]

<CsoundSynthesizer>

<CsInstruments>

nchnls = 2
0dbfs = 1

giSine  ftgen  0, 0, 4096, 10, 1

instr 1
iCPS   cpsmidi                                   ; MIDI note (cycles per second)
iVel   veloc    0.1, 1                           ; MIDI key velocity (a corresponding value in the range 0.1 to 1)

aEnv4  expsegr  15, 4, 0.0001, 0.3, 0.0001
a4     poscil   aEnv4 * iCPS * iVel, iCPS * 5
aEnv3  expsegr  6, 15, 0.00001, 1, 0.00001
a3     poscil   aEnv3* iCPS, iCPS * 0.5 + a4
a3     dcblock2 a3

aEnv6  expsegr  12, 6, 0.01, 1, 0.01
a6     poscil   aEnv6 * iCPS * iVel, iCPS * 9
aEnv5  expsegr  4, 6, 0.00001, 1, 0.00001
a5     poscil   aEnv5* iCPS, iCPS * 0.5 + a6
a5     dcblock2 a5

aEnv2  expsegr  30, 10, 0.001, 0.3, 0.01           ; amplitude envelope for operator 2. It is an 'r' type envelope so will wait for the key to be released before enacting the final segment.
a2     poscil   aEnv2 * iCPS * iVel, iCPS * 0.5  ; operator 2 (a modulator). Note that velocity is used to scale amplitude thereby scaling the brightness of the timbre
aEnv1  expsegr  1, 10, 0.00001, 0.3, 0.00001 
a1     poscil   aEnv1, (iCPS * 0.5) + a1 + a3 + a5             ; operator 1 (a carrier). Note that operator 2 is added to its frequency.


;       out     a1 * 0.1 * iVel ; the three carriers are mixed together at the output


kNdx   expsegr  15, 4, 0.0001, 0.3, 0.0001
kAmp   expsegr  6, 15, 0.00001, 1, 0.00001
a1     foscil   kAmp *iVel, iCPS, 0.5, 5, kNdx *iVel, giSine


kNdx   expsegr  12, 6, 0.01, 1, 0.01
kAmp   expsegr  4, 6, 0.00001, 1, 0.00001
a2     foscil   kAmp *iVel, iCPS, 0.5, 9, kNdx *iVel, giSine

kNdx   expsegr  30, 10, 0.001, 0.3, 0.01           ; amplitude envelope for operator 2. It is an 'r' type envelope so will wait for the key to be released before enacting the final segment.
kAmp   expsegr  1, 10, 0.00001, 0.3, 0.00001 
a3     foscil   kAmp *iVel, iCPS, 0.5 + dcblock2:a(a1 + a2), 0.5, kNdx * iVel, giSine

      outs       a3, a3

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
 <bsbObject type="BSBSpinBox" version="2">
  <objectName>Octave</objectName>
  <x>8</x>
  <y>29</y>
  <width>80</width>
  <height>25</height>
  <uuid>{72f2dca5-c140-494b-aca0-689998fa7635}</uuid>
  <visible>true</visible>
  <midichan>0</midichan>
  <midicc>0</midicc>
  <alignment>left</alignment>
  <font>Arial</font>
  <fontsize>10</fontsize>
  <color>
   <r>0</r>
   <g>0</g>
   <b>0</b>
  </color>
  <bgcolor mode="nobackground">
   <r>255</r>
   <g>255</g>
   <b>255</b>
  </bgcolor>
  <resolution>1.00000000</resolution>
  <minimum>0</minimum>
  <maximum>3</maximum>
  <randomizable group="0">false</randomizable>
  <value>1</value>
 </bsbObject>
 <bsbObject type="BSBLabel" version="2">
  <objectName/>
  <x>8</x>
  <y>8</y>
  <width>79</width>
  <height>22</height>
  <uuid>{acc4ccb2-4935-4649-95c0-ca6d800d539a}</uuid>
  <visible>true</visible>
  <midichan>0</midichan>
  <midicc>-3</midicc>
  <label>OCTAVE</label>
  <alignment>center</alignment>
  <font>Arial</font>
  <fontsize>12</fontsize>
  <precision>3</precision>
  <color>
   <r>0</r>
   <g>0</g>
   <b>0</b>
  </color>
  <bgcolor mode="nobackground">
   <r>255</r>
   <g>255</g>
   <b>255</b>
  </bgcolor>
  <bordermode>noborder</bordermode>
  <borderradius>1</borderradius>
  <borderwidth>1</borderwidth>
 </bsbObject>
 <bsbObject type="BSBSpinBox" version="2">
  <objectName>Fraction</objectName>
  <x>97</x>
  <y>29</y>
  <width>80</width>
  <height>25</height>
  <uuid>{162b1585-a921-4aae-ad6d-f3fdea5f764a}</uuid>
  <visible>true</visible>
  <midichan>0</midichan>
  <midicc>0</midicc>
  <alignment>left</alignment>
  <font>Arial</font>
  <fontsize>10</fontsize>
  <color>
   <r>0</r>
   <g>0</g>
   <b>0</b>
  </color>
  <bgcolor mode="nobackground">
   <r>255</r>
   <g>255</g>
   <b>255</b>
  </bgcolor>
  <resolution>0.01000000</resolution>
  <minimum>0</minimum>
  <maximum>0.99</maximum>
  <randomizable group="0">false</randomizable>
  <value>0.75</value>
 </bsbObject>
 <bsbObject type="BSBLabel" version="2">
  <objectName/>
  <x>97</x>
  <y>8</y>
  <width>79</width>
  <height>22</height>
  <uuid>{cadf897b-5580-497c-b204-18d7b6a47a02}</uuid>
  <visible>true</visible>
  <midichan>0</midichan>
  <midicc>-3</midicc>
  <label>FRACTION</label>
  <alignment>center</alignment>
  <font>Arial</font>
  <fontsize>12</fontsize>
  <precision>3</precision>
  <color>
   <r>0</r>
   <g>0</g>
   <b>0</b>
  </color>
  <bgcolor mode="nobackground">
   <r>255</r>
   <g>255</g>
   <b>255</b>
  </bgcolor>
  <bordermode>noborder</bordermode>
  <borderradius>1</borderradius>
  <borderwidth>1</borderwidth>
 </bsbObject>
</bsbPanel>
<bsbPresets>
</bsbPresets>
