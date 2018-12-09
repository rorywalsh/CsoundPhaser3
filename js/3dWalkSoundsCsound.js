const csd = `
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
0dbfs = 1


instr 1
if chnget:k("walking") == 1 then
    kRate    randomi     1.5, 1.7, 2                    ; rate of footsteps
    kTrig    metro       kRate                          ; create footstep triggers
            schedkwhen  kTrig, 0, 0, 2, 0, 0.6, 1      ; 'heel' event
    kGap     random      0.05, 0.15                     ; time gap between 'heel' and 'toe'
            schedkwhen  kTrig, 0, 0, 2, kGap, 0.6, 0.2 ; create 'toe' event
endif
endin

instr  2
iAmp     exprand     4                              ; random amplitude
iAmp     =           iAmp + 2                       ; add offset (minimum)
iAtt     =           0.1                            ; envelope attack time
kEnv     expseg      0.001, iAtt, 1, p3-0.1, 0.001  ; amplitude envelope for the basic 'crunch' sound
kDens    expseg      1,    iAtt, 100, p3-0.1, 1     ; envelope for the density of the basic 'crunch' sound
aCrunch  dust2       kEnv*iAmp*p4, kDens            ; create the basic 'crunch' sound
iFrq     random      0.7, 1                         ; create a random scaling factor for the moogladder (resonant lowpass) filter
aCF      expseg      10, iAtt, 1000, p3-0.1, 1      ; create a cutoff frequency envelope for the moogladder (resonant lowpass) filter
aCrunch  moogladder  aCrunch, aCF * iFrq, 0.4       ; lowpass filter the cruch sound to create more of a 'clop' sound
aCrunch  buthp       aCrunch, 300                   ; highpass filter the 'clop' sound to remove some low frequencies
         outs        aCrunch, aCrunch
         chnmix      aCrunch * 0.1, "Send"          ; send some sound to the reverb
endin

instr 99
aIn      chnget      "Send"
         chnclear    "Send"
aL,aR    reverbsc    aIn, aIn, 0.75, 3000
         outs        aL, aR
endin



</CsInstruments>

<CsScore>
i99 0 z
i1 0 z
</CsScore>

</CsoundSynthesizer>
`
csound.removeListener( "log" )

csound.playCSD(csd);