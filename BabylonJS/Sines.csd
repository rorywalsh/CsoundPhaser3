<CsoundSynthesizer>
<CsInstruments>
nchnls = 2
0dbfs = 1

instr 1
    k1 oscili  1,  .5, -1  
    k2 oscili  1,  .5, -1, .05
    k3 oscili  1,  .5, -1, .1
    k4 oscili  1,  .5, -1, .15 
    k5 oscili  1,  .5, -1, .2 
    k6 oscili  1,  .5, -1, .25 
    k7 oscili  1,  .5, -1, .3 
    k8 oscili  1,  .5, -1, .35 
    k9 oscili  1,  .5, -1, .4 
    k10 oscili 1,  .5, -1, .45 
    k11 oscili 1,  .5, -1, .5
    k12 oscili 1,  .5, -1, .55
    k13 oscili 1,  .5, -1, .6 
    k14 oscili 1,  .5, -1, .65 
    k15 oscili 1,  .5, -1, .7 
    k16 oscili 1,  .5, -1, .75 
    
    chnset abs(5*k1), "box0"
    chnset abs(5*k2), "box1"
    chnset abs(5*k3), "box2"
    chnset abs(5*k4), "box3"
    chnset abs(5*k5), "box4"
    chnset abs(5*k6), "box5"
    chnset abs(5*k7), "box6"
    chnset abs(5*k8), "box7"
    chnset abs(5*k9), "box8"
    chnset abs(5*k10), "box9"
    chnset abs(5*k11), "box10"
    chnset abs(5*k12), "box11"
    chnset abs(5*k13), "box12"
    chnset abs(5*k14), "box13"
    chnset abs(5*k15), "box14"
    chnset abs(5*k16), "box15"


    aOut1 oscili k1, 50
    aOut2 oscili k2, 100
    aOut3 oscili k3, 150
    aOut4 oscili k4, 200
    aOut5 oscili k5, 250
    aOut6 oscili k6, 300
    aOut7 oscili k7, 350
    aOut8 oscili k8, 400
    aOut9 oscili k9, 450
    aOut10 oscili k10, 500
    aOut11 oscili k11, 550
    aOut12 oscili k12, 600
    aOut13 oscili k13, 650
    aOut14 oscili k14, 700
    aOut15 oscili k15, 750
    aOut16 oscili k16, 800

    aMix = aOut1+aOut2+aOut3+aOut4+aOut5+aOut6+aOut7+aOut8+aOut9+aOut10+aOut11+aOut12+aOut13+aOut14+aOut15+aOut16

    outs aMix*.01, aMix*.01
endin

</CsInstruments>
<CsScore>
f1 0 16 10 1
f0 z
</CsScore>
</CsoundSynthesizer>
     
        