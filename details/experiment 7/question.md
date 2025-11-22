Here are the viva questions for Experiment 7 (Rectifiers) converted into your requested format.

### **Part 2: 25 Viva Questions (Experiment 7)**

**Q:** What is a Rectifier?
**A:** An electronic device that converts AC voltage into DC voltage.

**Q:** Which property of a diode makes rectification possible?
**A:** Its unidirectional conductivity (conducts in one direction, blocks in the other).

**Q:** What is Ripple Factor?
**A:** It is the measure of the AC component present in the DC output. Lower is better. Formula: $\gamma = V_{ac} / V_{dc}$.

**Q:** What is the Ripple Factor of a Half-Wave Rectifier?
**A:** 1.21 (This means the AC noise is larger than the DC signal!).



[Image of half wave rectifier circuit waveform]


**Q:** What is the Ripple Factor of a Full-Wave Rectifier?
**A:** 0.48.

**Q:** What is Efficiency of a rectifier?
**A:** The ratio of DC output power to AC input power.

**Q:** What is the max efficiency of a Half-Wave Rectifier?
**A:** 40.6%.

**Q:** What is the max efficiency of a Full-Wave Rectifier?
**A:** 81.2%.

**Q:** What is PIV?
**A:** Peak Inverse Voltage – the maximum reverse voltage the diode has to withstand when it is non-conducting.

**Q:** What is the PIV for a Bridge Rectifier?
**A:** $V_m$ (Peak voltage).

**Q:** What is the PIV for a Center-Tapped Full Wave Rectifier?
**A:** $2V_m$.

**Q:** Why is a Bridge Rectifier preferred over a Center-Tapped one?
**A:**
1. Smaller PIV requirement for diodes ($V_m$ vs $2V_m$).
2. Does not require a bulky/expensive center-tapped transformer.



[Image of full wave bridge rectifier circuit diagram]


**Q:** What is the frequency of the output ripple in a Half-Wave Rectifier?
**A:** Same as input frequency ($f_{in} = 50Hz$).

**Q:** What is the frequency of the output ripple in a Full-Wave Rectifier?
**A:** Double the input frequency ($2f_{in} = 100Hz$).

**Q:** Why do we use filters?
**A:** To remove the AC ripple and produce a steady (smooth) DC voltage.

**Q:** How does a Capacitor Filter work?
**A:** It stores energy during the peak voltage and releases it during the drop, filling in the gaps between pulses.

**Q:** What happens if the filter capacitor is too small?
**A:** The ripple will be high (poor smoothing).

**Q:** What happens if the load resistance is disconnected (Open Circuit)?
**A:** The capacitor will charge to $V_m$ and stay there (pure DC), as there is no path to discharge.

**Q:** What is the output DC voltage ($V_{dc}$) formula for HWR?
**A:** $V_m / \pi$ (approx $0.318 V_m$).

**Q:** What is the output DC voltage ($V_{dc}$) formula for FWR?
**A:** $2V_m / \pi$ (approx $0.636 V_m$).

**Q:** Why is a transformer used in rectifier circuits?
**A:** To step down the high mains voltage (230V) to a safe low level (e.g., 9V) suitable for electronics.

**Q:** Can you rectify AC without a transformer?
**A:** Yes, but it is dangerous (shock hazard) and usually results in very high DC voltage.

**Q:** If one diode in a Bridge Rectifier is open, what happens?
**A:** It behaves like a Half-Wave Rectifier (conducts only for one half-cycle).

**Q:** If one diode in a Bridge Rectifier is shorted, what happens?
**A:** It will short-circuit the transformer secondary during one half-cycle, likely blowing a fuse or burning the transformer.

**Q:** What is "Regulation" in a power supply?
**A:** The ability to maintain a constant output voltage despite changes in load current.