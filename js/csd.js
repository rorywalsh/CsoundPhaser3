const csd = `
<CsoundSynthesizer>
<CsInstruments>
ksmps = 512

;jumping sound
instr 1
    a1 expon 1, p3, 0.001
    a2 oscili a1, (1-a1)*p4+p5
    outs a2, a2 
endin

;white noise machine
instr 2
    a1 rand .1
    a2 lpf18 a1, chnget:k("cutoff"), .5, 0
    outs a2, a2 
endin

;lightning kick triggers
instr 3
    kRand randh 1000, 4000, 2
    if metro(1) == 1 then
        event "i", 4, 0, 10
        chnset kRand, "triggerLights"
    endif
endin

;kick
instr 4
    a1 expon .5, p3, 0.001
    a2 expon 150, p3, 50
    a3 oscili a1, a2
    outs a3, a3
endin

;explosion
instr 5
    a1 expon 1, p3, 0.001
    a2 randi 1000, 500
    a3 oscili a1, a2
    outs a3, a3
endin

;random platforms
instr 6

    k1 oscili 1, .05, -1, .1 
    k2 oscili 1, .05, -1, .2
    k3 oscili 1, .05, -1, .3
    k4 oscili 1, .05, -1, .4 
    k5 oscili 1, .05, -1, .5 
    k6 oscili 1, .05, -1, .6 
    k7 oscili 1, .05, -1, .7 
    k8 oscili 1, .05, -1, .8 

    chnset abs(k1), "platform0"
    chnset abs(k2), "platform1"
    chnset abs(k3), "platform2"
    chnset abs(k4), "platform3"
    chnset abs(k5), "platform4"
    chnset abs(k6), "platform5"
    chnset abs(k7), "platform6"
    chnset abs(k8), "platform7"


    aOut1 oscili k1, 100, 1
    aOut2 oscili k2, 101, 2
    aOut3 oscili k3, 102, 3
    aOut4 oscili k4, 103, 4
    aOut5 oscili k5, 104, 5
    aOut6 oscili k6, 105, 6
    aOut7 oscili k7, 106, 7
    aOut8 oscili k8, 107, 8

    aMix = aOut1+aOut2+aOut3+aOut4+aOut5+aOut6+aOut7+aOut8

    outs aMix*.01, aMix*.01
endin

instr 7
    printk2 chnget:k("plat1");
    aOut1 oscili chnget:k("plat1"), 100
    aOut2 oscili chnget:k("plat2"), 200
    aOut3 oscili chnget:k("plat3"), 300
    aOut4 oscili chnget:k("plat4"), 500
    aOut5 oscili chnget:k("plat5"), 600
    aOut6 oscili chnget:k("plat6"), 700
    aOut7 oscili chnget:k("plat7"), 800
    aOut8 oscili chnget:k("plat8"), 900
    aMix = aOut1+aOut2+aOut3+aOut4+aOut5+aOut6+aOut7+aOut8
    outs aMix*.1, aMix*.1
endin

seed 0

instr		10	; rain
 kenv   linsegr     0, 2, 1, 5, 0                       ; main amplitude envelope for both elements of the rain sound

  ; Pitter Patter
 kTrig	dust        1, 150                              ; adjust density of individual drops
 		schedkwhen  kTrig, 0, 0, 20, 0, 0.003, kenv*0.7

  ; Rain Roar
 aNse	dust2    0.1 * kenv, 1000                       ; left channel 'roar'
 aNse2	dust2    0.1 * kenv, 980                        ; right channel 'roar'
 aNse	butlp    aNse, 1000                             ; lowpass filter
 aNse2	butlp    aNse2, 1000
 		outs     aNse, aNse2
endin

instr		20	; individual drops
 iCPS1  random  8, 10                                   ; random initial pitch (oct format)
 iCPS2  random  12, 13                                  ; random ending pitch (oct format) i.e. each droplet is like a little glissando
 aCPS   expon   cpsoct(iCPS1),p3,cpsoct(iCPS2)          ; pitch envelope for each droplet
 idB    random  -10, -32                                ; random amplitude (in decibels) 
 aEnv   expon   1, p3, 0.001                            ; amplitude envelope for each droplet
 aSig   poscil  aEnv * ampdbfs(idB) * p4, aCPS          ; droplet audio oscillator
 aSig   atone   aSig, 4000                              ; soft highpass filter of the sound  
 ipan   random  0, 1                                    ; random panning position
 aL,aR	pan2		aSig, ipan                          
 		outs		aL*.5, aR*.5
endin


instr		30	; thunder
 aenv		expseg	  0.01, 0.05, 1, 0.1, 0.5, p3-0.01, 0.01
 aNse		pinkish	  0.6
 kCF		expon     p4, p3, 0.01
 kCFoct		randomh   2 * kCF, 6 * kCF, 20
 kCFEnv     expon     1, p3, 0.01
 aNse		reson     aNse*3, a(cpsoct(kCFoct)), a(cpsoct(kCFoct)*5), 1
 aNse		butlp     aNse, 1000
 ipan		random    0, 1
 aNse       *=        aenv
 aL,aR      pan2      aNse,ipan
            outs      aL, aR
            chnmix    aL/2, "SendL"
            chnmix    aR/2, "SendR"
endin


instr   40
aInL  chnget "SendL"
aInR  chnget "SendR"
      chnclear "SendL"
      chnclear "SendR"
aDelL    flanger   aInL, a(0.4), 0.3
aDelR    flanger   aInR, a(0.437), 0.3

aL,aR reverbsc  aInL+aDelL, aInR+aDelR, 0.6, 3000
;aL,aR freeverb  aInL+aDelL, aInR+aDelR, 0.1, 0.1
      outs      aL, aR
endin

giBuzz  ftgen  0, 0, 4096, 11, 60, 1, 0.96

instr 100
    aEnv  expseg   0.001, 0.001, 1, 0.003, 0.7, p3 - 0.001 - 0.003 - 0.003, 0.7, 0.003, 0.001 ; a gate-like amplitude envelope
    aWobl gaussi   5, 1, 100                                   ; random pitch wobbling function 
    aSig  poscil   3 * aEnv, p4 * semitone(aWobl), giBuzz   ; a buzz sound with a wobbly pitch (adjust the main frequency value 200 Hz)
    aCF   expon    100, p3, 8000                               ; bandpass filter cutoff envelope
    aSig  butbp    aSig, aCF, aCF                              ; bandpass filter the sound. Bandwidth just follows the centre frequency.
        outs     aSig*p5, aSig*p5
endin

</CsInstruments>
<CsScore>
f1 0 1024 10 1
f2 0 1024 10 1 .5
f3 0 1024 10 1 .5 .2
f4 0 1024 10 1 .5 .2 .17
f5 0 1024 10 1 .5 .2 .17 .12
f6 0 1024 10 1 .5 .2 .17 .12 .10
f7 0 1024 10 1 .5 .2 .17 .12 .10 .8
f8 0 1024 10 1 .5 .2 .17 .12 .10 .8 .7


f0 z
</CsScore>
</CsoundSynthesizer>
`
csound.playCSD(csd);
        