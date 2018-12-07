; a simple bounce effect

; instr 1 create the chain of individual bounces with a decreasing time gap between bounces

; the bounce sound is simply a very short sine gliss downwards 

; Things to adjust:
; - the length of the score event in the score (p3). This is the length of the complete bounce gesture.
; - the length of the score event (p3) in the schedkwhen line in instr 1. Deeper bounces might sound better with a slightly longer duration.
; - the start and the end frequencies of the aCPS envelope in instr 2. This controls the tone of the bouncing object as well as the nature of the surface. 
;              E.g. heavy ball bouncing , tiny marble bouncing.

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
kGap  expon       0.8, p3, 0.01                  ; time gap between bounces decreases exponentially
kAmp  expon       1, p3, 0.0001                  ; amplitude of each bounce decreases exponentially 
      schedkwhen  1, kGap, 0, 2, 0, 0.008, kAmp  ; trigger individual bounce events
endin

instr 2
aCPS  expon       4000, p3, 100                  ; an exponential glissando downwards         
aAmp  expon       1, p3, 0.001                   ; an exponentially decaying amplitude envelope
aSig  poscil      aAmp * p4, aCPS                ; audio oscillator
      outs        aSig, aSig
endin

</CsInstruments>

<CsScore>
i 1 0 4
</CsScore>

</CsoundSynthesizer>
