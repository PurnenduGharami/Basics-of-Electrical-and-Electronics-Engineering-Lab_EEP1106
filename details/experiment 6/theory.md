# Experiment 6: Volt-Ampere Characteristics of P-N Junction Diode

## 1. Introduction

A P-N junction diode is a two-terminal semiconductor device formed by joining a P-type semiconductor (rich in holes) with an N-type semiconductor (rich in electrons). It acts as a one-way valve for electric current, allowing it to flow easily in one direction but blocking it in the other.

## 2. Objective

To plot the V-I (Voltage-Current) characteristics of a P-N junction diode under:

**Forward Bias condition.**

**Reverse Bias condition.**

To determine the Cut-in Voltage (Knee Voltage) and Static/Dynamic resistance.

## 3. Theory

### A. Forward Bias

**Connection:** The positive terminal of the battery is connected to the P-side (Anode) and the negative terminal to the N-side (Cathode).

**Operation:** The applied voltage opposes the internal potential barrier.

**Initially:** Current is negligible until the applied voltage exceeds the barrier potential ($V_k$).

**Knee Voltage ($V_k$):** The voltage at which current starts increasing rapidly. (~0.7V for Silicon, ~0.3V for Germanium).

**Result:** The diode conducts current freely. The resistance is very low.

### B. Reverse Bias

**Connection:** The positive terminal is connected to the N-side (Cathode) and the negative terminal to the P-side (Anode).

**Operation:** The applied voltage aids the potential barrier, widening the depletion region.

**Current:** Ideally zero. Practically, a very small leakage current flows due to minority carriers (thermally generated).

**Breakdown:** If reverse voltage is increased beyond a limit (Breakdown Voltage), the current increases sharply, potentially damaging the diode.

## 4. Circuit Diagrams

**Forward Bias Setup**

**Supply:** Variable DC Supply (0-30V).

**Resistor:** Series resistor ($R_s$) to limit current.

**Voltmeter:** Connected in parallel across the diode.

**Ammeter:** Connected in series (Range: mA).

**Reverse Bias Setup**

**Supply:** Variable DC Supply.

**Resistor:** Series resistor ($R_s$).

**Voltmeter:** Connected in parallel across the diode.

**Ammeter:** Connected in series (Range: $\mu$A - Microamps). Note the change in range!

## 5. Procedure

### Forward Characteristics

Connect the circuit as per the Forward Bias diagram.

Initially keep the voltage source at 0V.

Gradually increase the voltage in steps (e.g., 0.1V).

Note the corresponding current readings in mA.

Notice the sharp rise in current after ~0.6V - 0.7V (for Si).

### Reverse Characteristics

Connect the circuit as per the Reverse Bias diagram.

Gradually increase the reverse voltage in larger steps (e.g., 1V, 2V).

Note the corresponding current readings in $\mu$A.

The current will remain very small and almost constant until breakdown.

## 6. Observation Table

**Forward Bias:**
| Voltage across Diode $V_f$ (Volts) | Forward Current $I_f$ (mA) |
| :---: | :---: |
| 0.1 | 0 |
| 0.3 | 0 |
| 0.5 | 0.1 |
| 0.7 | 5.0 |
| 0.8 | 20.0 |

**Reverse Bias:**
| Reverse Voltage $V_r$ (Volts) | Reverse Current $I_r$ ($\mu$A) |
| :---: | :---: |
| 1.0 | 0.1 |
| 5.0 | 0.1 |
| 10.0 | 0.2 |

## 7. Result

The V-I characteristics graph was plotted.

**Cut-in Voltage ($V_k$):** _______ Volts.

**Forward Resistance:** Low.

**Reverse Resistance:** Very High.