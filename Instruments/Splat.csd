; A splat sound

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

instr 1
 idur     exprand    0.05                         ; duration random range
 idur     +=         0.15                         ; duration offset (minimum)
 p3	      =          idur			              ; assign to p3
 imin	  random     8.5,8.8			          ; minimum frequency for splat filter (in oct)
 kDens    expon      500, p3, 10
 anoise	  dust2      10,kDens	                  ; some crackly noise, the density of which is dependent upon the fly population
 kcf	  random     cpsoct(imin),cpsoct(imin+4)  ; cutoff frequency is a random function moving to a new value every k-cycle
 anoise	  moogladder anoise,kcf,0.8	              ; filter the crackly noise using moogladder to give it a bit of squelch
 anoise	  buthp	     anoise, 500		          ; highpass filter to remove some of the lower frequencies
 aenv	  expon	     1,p3,0.01		              ; amplitude envelope which will give the splat sound a percussive shape
 anoise	  *=	     aenv			              ; apply envelope
          outs       anoise, anoise
endin

</CsInstruments>

<CsScore>
i 1 0 1.6
</CsScore>

</CsoundSynthesizer>
