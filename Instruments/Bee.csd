; a simple generated bee sound

; a steady buzz oscillator is created

; doppler using a delay changes the pitch

; Things to adjust:
; - the pitch of the oscillator
; - the rate and depth of movement (the two rsplines)
; - amplitude fall off. The -1000 in line 40

<CsoundSynthesizer>

<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d --midi-key-cps=4 --midi-velocity-amp=5
</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giBuzz   ftgen    0, 0, 4096, 11, 80, 1, 1.06  ; 'buzz' waveform

instr 1

aBee     poscil   1, 232, giBuzz            ; audio oscillator. Uses 'buzz' waveform
aBee     butlp    aBee, 1000

aDist    jspline  0.05, 0.3, 0.4            ; distance from the centre (slow wide modulation)
aDist2   jspline  0.0009, 6, 13             ; distance from the centre (fast narrow modulation)
aDist    +=       aDist2                    ; mix the two random modulations together

aDelTime limit    abs(aDist), 1/kr, 0.05           ; limit the modulations
aDelBee  vdelay   aBee, aDelTime*1000, 0.06*1000   ; delay the buzz sound (modulating delay time)

adB      =        abs(aDist) * -1000               ; set an amplitude level according to the distance of the bee from the centre
aDelBee  *=       ampdbfs(adB)                     ; scale

aPan     limit    (aDist * 50) + 0.5, 0, 1  ; bring aDist up to the range 0 to 1
aL,aR    pan2     aDelBee, aPan
         outs     aL, aR

endin


</CsInstruments>

<CsScore>
i 1 0 500
</CsScore>

</CsoundSynthesizer>
