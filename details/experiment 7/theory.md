# Experiment 7: Characteristics of Half-Wave and Full-Wave Rectifiers

## 1. Introduction

A rectifier is an electronic circuit that converts Alternating Current (AC) into Direct Current (DC). This process, called Rectification, is the first step in most DC power supplies used in electronics. We use P-N junction diodes because they conduct current in only one direction.

## 2. Objective

To study the operation and characteristics of:

**Half-Wave Rectifier (HWR)**

**Full-Wave Rectifier (FWR)** - specifically the Bridge Rectifier configuration.

To calculate the Ripple Factor and Efficiency.

## 3. Theory

### A. Half-Wave Rectifier

**Circuit:** Uses a single diode in series with the load resistor ($R_L$).

**Operation:**

**Positive Half Cycle:** The diode is forward biased and conducts. Current flows through $R_L$, and output voltage follows input.

**Negative Half Cycle:** The diode is reverse biased and blocks current. Output voltage is zero.

**Result:** Only half of the input waveform reaches the output. It is pulsating DC.

**Key Parameters:**

**Ripple Factor ($\gamma$):** 1.21 (High AC content).

**Efficiency ($\eta$):** Max 40.6%.

**PIV:** $V_m$ (Peak Inverse Voltage).

### B. Full-Wave Rectifier (Bridge Configuration)

**Circuit:** Uses four diodes arranged in a bridge topology. Does not require a center-tapped transformer.

**Operation:**

**Positive Half Cycle:** Two diodes (say $D_1, D_3$) conduct, allowing current through $R_L$.

**Negative Half Cycle:** The other two diodes ($D_2, D_4$) conduct, routing current through $R_L$ in the same direction as before.

**Result:** Both halves of the AC cycle are converted to DC pulses.

**Key Parameters:**

**Ripple Factor ($\gamma$):** 0.48 (Low AC content).

**Efficiency ($\eta$):** Max 81.2%.

**PIV:** $V_m$.

### C. Capacitor Filter

The raw output of a rectifier is pulsating DC (bumpy). A capacitor placed in parallel with the load acts as a reservoir.

**Charging:** Charges up to peak voltage $V_m$ when the diode conducts.

**Discharging:** Discharges slowly into the load when the diode is off/voltage drops.

**Effect:** Smooths out the ripple, making the DC voltage steady.

## 4. Circuit Diagrams

**Half-Wave Rectifier**

**AC Source:** Step-down transformer (e.g., 230V/6V).

**Diode:** 1N4007 Anode to transformer, Cathode to Load.

**Load:** Resistor ($1k\Omega$).

**CRO:** Connected across Load to view waveform.

**Full-Wave Bridge Rectifier**

**AC Source:** Step-down transformer.

**Bridge:** 4 Diodes.

**Load:** Resistor across the DC terminals of the bridge.

## 5. Procedure

Connect the circuit on the breadboard or trainer kit.

Apply AC input from the transformer secondary.

**Observe Input:** Connect CRO Channel 1 to the transformer secondary to see the AC sine wave.

**Observe Output:** Connect CRO Channel 2 across the Load Resistor.

**HWR:** Observe output only during positive peaks.

**FWR:** Observe continuous positive peaks.

**Measure:** Note the peak voltage ($V_m$) and calculate DC voltage ($V_{dc}$).

$V_{dc} = V_m / \pi$ (Half Wave)

$V_{dc} = 2V_m / \pi$ (Full Wave)

## 6. Result

The input and output waveforms of Half-Wave and Full-Wave rectifiers were observed. The Full-Wave rectifier provides a smoother DC output with higher efficiency.