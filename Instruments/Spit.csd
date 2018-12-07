
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

giBuzz  ftgen  0, 0, 4096, 11, 60, 1, 0.96

instr 1
aEnv  expseg   0.001, 0.001, 1, 0.003, 0.7, p3 - 0.001 - 0.003 - 0.003, 0.7, 0.003, 0.001 ; a gate-like amplitude envelope
aWobl gaussi   5, 1, 100                                   ; random pitch wobbling function 
aSig  poscil   3 * aEnv, 200 * semitone(aWobl), giBuzz   ; a buzz sound with a wobbly pitch (adjust the main frequency value 200 Hz)
aCF   expon    100, p3, 8000                               ; bandpass filter cutoff envelope
aSig  butbp    aSig, aCF, aCF                              ; bandpass filter the sound. Bandwidth just follows the centre frequency.
      outs     aSig, aSig
endin

</CsInstruments>

<CsScore>
i 1 0 0.06
</CsScore>

</CsoundSynthesizer>
