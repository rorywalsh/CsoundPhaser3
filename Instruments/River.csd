; synthetic model of a river using granular and subtractive synthesis

; This comprises two layers

<CsoundSynthesizer>

<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d --midi-key-cps=4 --midi-velocity-amp=5
</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giSfn    ftgen 0, 0, 8192, 10, 1               ; source waveform for the fof2 burbles (a sine wave)
giAttDec ftgen 0, 0, 4096, 16, 0, 4096, 4, 1   ; envelope shape for fof2 grains

instr  1

; BURBLES
kFund   exprand  100       ; random pitch range of burbles
kFund   +=       150       ; minimum burble pitch
kris    =        0.01      ; 0.01
kdur    exprand  0.01      ; random duration range of burbles
kdur    +=       0.01      ; minimum burble duration
kDens   randomi  20, 50, 5 ; randomly wandering burble density
kAmp    exprand  0.05      ; random amplitude range
kGliss  exprand  0.1       ; burble glissando
kGliss  +=       0.1       ; minimum burble glissando
;ares   fof2     xamp, xfund, xform, koct, kband, kris,  kdur,      kdec,      iolaps, \ ifna, ifnb,    itotdur, kphs, kgliss [, iskip]
aBurble fof2     kAmp, kDens, kFund, 0,    20,    kris,  0.2+kdur,  kdur-kris,  200,      giSfn, giAttDec, 3600,   kGliss,    2
        outs     aBurble, aBurble ; send burbles to the output

; ROAR
aRoar   dust2    0.3, 10000       ; create some noise
aRoar   butbp    aRoar, 100, 500  ; bandpass filter the noise
kCF     randomi  1000, 1500, 2    ; create a moving cutoff frequency for a lowpass filter
aRoar   tone     aRoar, kCF       ; lowpass filter the noise
        outs     aRoar, aRoar
        
endin


</CsInstruments>

<CsScore>
i 1 0 3600 ; play a long note...
</CsScore>

</CsoundSynthesizer>
