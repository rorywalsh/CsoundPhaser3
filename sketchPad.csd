<Cabbage>
form caption("SketchPad") size(425, 300), colour(58, 110, 182), pluginid("def1")

button bounds(4, 4, 102, 35), channel("instr1"), text("instr1")
button bounds(108, 4, 102, 35), channel("instr2"), text("instr2")
button bounds(212, 4, 102, 35), channel("instr3"), text("instr3")
button bounds(318, 4, 102, 35), channel("instr4"), text("instr4")

rslider bounds(8, 48, 60, 60) range(0, 1, 0, 1, 0.001), channel("slider1")
rslider bounds(78, 48, 60, 60) range(0, 1, 0, 1, 0.001), channel("slider2")
rslider bounds(148, 48, 60, 60) range(0, 1, 0, 1, 0.001), channel("slider3")
rslider bounds(220, 48, 60, 60) range(0, 1, 0, 1, 0.001), channel("slider4")
rslider bounds(290, 48, 60, 60) range(0, 1, 0, 1, 0.001), channel("slider5")
rslider bounds(358, 48, 60, 60) range(0, 1, 0, 1, 0.001), channel("slider6")
</Cabbage>
<CsoundSynthesizer>
<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d 
</CsOptions>
<CsInstruments>
; Initialize the global variables. 
ksmps = 32
nchnls = 2
0dbfs = 1


instr 1

kButton1 chnget "instr1"
if changed(kButton1) == 1 then
    event "i", 2, 0, .5, 1000, 500
endif

kButton2 chnget "instr2"
if changed(kButton2) == 1 then
    event "i", 3, 0, 5
endif

kButton3 chnget "instr3"
if changed(kButton3) == 1 then
    event "i", 4, 0, 5
endif

kButton4 chnget "instr4"
if changed(kButton4) == 1 then
    ;event "i", 5, 0, 5
endif

endin

;jump
instr 2
    a1 expon 1, p3, 0.001
    a2 oscili a1, (1-a1)*p4+p5
    outs a2, a2 
endin

;kick
instr 4
    prints "Istrument 4"
    a1 expon .5, p3, 0.001
    a2 expon 150, p3, 50
    a3 oscili a1, a2
    outs a3, a3
endin

;lightning kick triggers
instr 3
    kRand randh 1000, 4000, 2
    if metro(1) == 1 then
        event "i", 4, 0, 10
        chnset kRand, "triggerLights"
    endif
endin


;always on instrument
instr 1001
;white noise machine
    a1 rand .1
    a2 lpf18 a1, chnget:k("slider1")*1000, .5, 0
    outs a2, a2 
endin


</CsInstruments>
<CsScore>
;causes Csound to run for about 7000 years...
f0 z
;starts instrument 1 and runs it for a week
i1 0 [60*60*24*7] 
i1001 0 z
</CsScore>
</CsoundSynthesizer>
