<CsoundSynthesizer>
<CsOptions>
-odac -d
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
kRate      randomi 1.5,1.7,2
kTrig      metro   kRate
schedkwhen  kTrig, 0, 0, 2, 0, 0.6
endin

instr  2
iAmp    exprand 0.2
iAmp    =       iAmp + 1
iAtt    =       0.1
kEnv    expseg  0.001, iAtt, 1, 0.5, 0.001
kDens   expseg  1,    iAtt, 100, 0.5, 1
aCrunch dust2   kEnv*iAmp, kDens
;aCrunch butbp   aCrunch, 1000, 1000
iFrq    random  0.7, 1
aCF     expseg  10, iAtt, 1000, 0.5, 1
;aCrunch reson   aCrunch, aCF, aCF*2, 1
aCrunch moogladder   aCrunch, aCF*iFrq, 0.4
        outs    aCrunch, aCrunch

iAtt = 0.1
iDec = 0.1
kEnv    linseg  0.001, iAtt, 1, iDec, 0.001
kDens   expseg  10,    iAtt, 1000, iDec, 1000
aCrunch dust2   kEnv*iAmp*0.1, kDens
aCrunch buthp   aCrunch, 5000
aCrunch butbp   aCrunch, 6000, 5000
aCrunch tone   aCrunch, 8000
        outs    aCrunch, aCrunch 

        outs    aCrunch, aCrunch

chnmix  aCrunch*0.1, "Send"
endin

alwayson 99
instr 99
aIn  chnget "Send"
chnclear "Send"

aL,aR  reverbsc  aIn, aIn, 0.85, 3000
       outs      aL, aR

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
 <bsbObject type="BSBKnob" version="2">
  <objectName>Ratio</objectName>
  <x>9</x>
  <y>9</y>
  <width>80</width>
  <height>80</height>
  <uuid>{e90906f0-4df6-47e8-885c-f1dac8cfec1e}</uuid>
  <visible>true</visible>
  <midichan>0</midichan>
  <midicc>0</midicc>
  <minimum>0.10000000</minimum>
  <maximum>10.00000000</maximum>
  <value>1.38700000</value>
  <mode>lin</mode>
  <mouseControl act="jump">continuous</mouseControl>
  <resolution>0.01000000</resolution>
  <randomizable group="0">false</randomizable>
 </bsbObject>
 <bsbObject type="BSBDisplay" version="2">
  <objectName>Freq2</objectName>
  <x>9</x>
  <y>88</y>
  <width>80</width>
  <height>29</height>
  <uuid>{baf9e3bb-cf59-47bf-9df7-349ac00663a4}</uuid>
  <visible>true</visible>
  <midichan>0</midichan>
  <midicc>-3</midicc>
  <label>239.951</label>
  <alignment>center</alignment>
  <font>Arial</font>
  <fontsize>14</fontsize>
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
  <bordermode>border</bordermode>
  <borderradius>1</borderradius>
  <borderwidth>1</borderwidth>
 </bsbObject>
 <bsbObject type="BSBKnob" version="2">
  <objectName>FB</objectName>
  <x>94</x>
  <y>9</y>
  <width>80</width>
  <height>80</height>
  <uuid>{354fb1dc-20c6-4e16-8eec-066693daa27a}</uuid>
  <visible>true</visible>
  <midichan>0</midichan>
  <midicc>0</midicc>
  <minimum>0.00000000</minimum>
  <maximum>0.24900000</maximum>
  <value>0.23904000</value>
  <mode>lin</mode>
  <mouseControl act="jump">continuous</mouseControl>
  <resolution>0.01000000</resolution>
  <randomizable group="0">false</randomizable>
 </bsbObject>
 <bsbObject type="BSBDisplay" version="2">
  <objectName>FB</objectName>
  <x>94</x>
  <y>88</y>
  <width>80</width>
  <height>29</height>
  <uuid>{ee0ffc44-42bd-4430-a9d4-2732c2a8c560}</uuid>
  <visible>true</visible>
  <midichan>0</midichan>
  <midicc>-3</midicc>
  <label>0.239</label>
  <alignment>center</alignment>
  <font>Arial</font>
  <fontsize>14</fontsize>
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
  <bordermode>border</bordermode>
  <borderradius>1</borderradius>
  <borderwidth>1</borderwidth>
 </bsbObject>
</bsbPanel>
<bsbPresets>
</bsbPresets>
