; footsteps on a metal surface
; 'clank' is created using wguide2


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
kRate      randomi     1.5, 1.7, 2                         ; rate of footsteps
kTrig      metro       kRate                               ; create triggers for the footsteps
           schedkwhen  kTrig, 0, 0, 2, 0,   0.6, 173, 1    ; 'heel' event p4=freq p5=amplitude
kGap       random      0.05,0.15                           ; random gap between the heel and the toe
           schedkwhen  kTrig, 0, 0, 2, kGap, 0.6, 180, 0.5 ; 'toe' event
endin

instr  2
iAmp       exprand     2                                   ; random amplitude
iAmp       =           iAmp + 2                            ; offset random amplitude (set minimum)
iAtt       =           0.1                                 ; attack time
kEnv       expseg      0.001, iAtt, 1, p3-0.1, 0.001       ; amplitude envelope for the 'crunch' sound 
kDens      expseg      1,    iAtt, 100, p3-0.1, 1          ; density envelope
aCrunch    dust2       kEnv * iAmp * p5, kDens             ; create the crunch sound
iFrq       random      0.7, 1                              ; random scaling of the cutoff frequency of the lowpass filter
aCF        expseg      10, iAtt, 1000, p3-0.1, 1           ; cutoff frequecy envelope for the lowpass filter
aCrunch    moogladder  aCrunch, aCF*iFrq, 0.4              ; lowpass filter the crunch sound
iCPS       =           p4                                  ; frequency 1 for wguide2 comes from p4
aCrunch    wguide2     aCrunch, iCPS, 239, sr/2, sr/2, 0.2, 0.2  ; clank filter
           outs        aCrunch, aCrunch

           chnmix      aCrunch * 0.2, "Send"               ; send some audio to the reverb
endin

alwayson 99
instr 99
aIn        chnget      "Send"
           chnclear    "Send"
aL,aR      reverbsc    aIn, aIn, 0.85, 3000
           outs        aL, aR
endin


</CsInstruments>

<CsScore>
i 1 0 500
</CsScore>

</CsoundSynthesizer>
