; Rain

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
seed 0

instr		1	; rain
 kenv   linsegr     0, 2, 1, 5, 0                       ; main amplitude envelope for both elements of the rain sound

  ; Pitter Patter
 kTrig	dust        1, 150                              ; adjust density of individual drops
 		schedkwhen  kTrig, 0, 0, 2, 0, 0.003, kenv*0.7

  ; Rain Roar
 aNse	dust2    0.1 * kenv, 1000                       ; left channel 'roar'
 aNse2	dust2    0.1 * kenv, 980                        ; right channel 'roar'
 aNse	butlp    aNse, 1000                             ; lowpass filter
 aNse2	butlp    aNse2, 1000
 		outs     aNse, aNse2
endin

instr		2	; individual drops
 iCPS1  random  8, 10                                   ; random initial pitch (oct format)
 iCPS2  random  12, 13                                  ; random ending pitch (oct format) i.e. each droplet is like a little glissando
 aCPS   expon   cpsoct(iCPS1),p3,cpsoct(iCPS2)          ; pitch envelope for each droplet
 idB    random  -10, -32                                ; random amplitude (in decibels) 
 aEnv   expon   1, p3, 0.001                            ; amplitude envelope for each droplet
 aSig   poscil  aEnv * ampdbfs(idB) * p4, aCPS          ; droplet audio oscillator
 aSig   atone   aSig, 4000                              ; soft highpass filter of the sound  
 ipan   random  0, 1                                    ; random panning position
 aL,aR	pan2		aSig, ipan                          
 		outs		aL, aR
endin

</CsInstruments>

<CsScore>
i 1 0 [60*60*24*7] 
</CsScore>

</CsoundSynthesizer>
