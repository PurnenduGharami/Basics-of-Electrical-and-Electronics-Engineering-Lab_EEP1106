# Experiment 4: Open Circuit and Short Circuit Test on Single Phase Transformer

## 1. Introduction

Transformers are static devices that transfer electrical energy between two circuits via electromagnetic induction. To predict their performance (efficiency and voltage regulation) at various loads without actually loading them (which wastes power), we perform two fundamental tests:

**Open Circuit (OC) Test**

**Short Circuit (SC) Test**

## 2. Objective

To perform open circuit and short circuit tests on a single-phase transformer to determine:

**Core (Iron) Losses ($P_i$)**

**Full-load Copper Losses ($P_{cu}$)**

**Equivalent circuit parameters ($R_0, X_0, R_{eq}, X_{eq}$)**

**Efficiency ($\eta$) and Regulation.**

## 3. Theory

### A. Open Circuit (OC) Test (No-Load Test)

**Purpose:** To find Iron (Core) Losses and shunt branch parameters ($R_0, X_0$).

**Procedure:**

The High Voltage (HV) winding is left Open.

Rated voltage is applied to the Low Voltage (LV) winding.

Instruments (Wattmeter, Ammeter, Voltmeter) are connected on the LV side.

**Why LV side?** It is safer and easier to apply the rated voltage (e.g., 230V vs 2000V).

**Key Concept:** Since the secondary is open, $I_2 = 0$. The primary draws a small no-load current ($I_0$). Since $I_0$ is small, copper losses ($I_0^2 R_1$) are negligible. The Wattmeter reading ($W_0$) essentially represents the Iron Loss, which is constant.

### B. Short Circuit (SC) Test (Impedance Test)

**Purpose:** To find Full-Load Copper Losses and series branch parameters ($R_{eq}, X_{eq}$).

**Procedure:**

The Low Voltage (LV) winding is Short Circuited with a thick wire/strip.

A low voltage (5-10% of rated) is applied to the High Voltage (HV) winding using a Variac.

Voltage is increased until Rated Current flows in the HV winding.

**Why HV side?** The rated current on the HV side is lower than on the LV side, making it safer and easier to measure with standard lab instruments.

**Key Concept:** Since the applied voltage is very low, the flux is low, so Iron losses are negligible. The Wattmeter reading ($W_{sc}$) essentially represents the Copper Loss at full load.

## 4. Circuit Diagrams

**OC Test (on LV Side)**

Variac connected to Mains.

Ammeter, Voltmeter, Wattmeter (LPF) connected to Primary (LV).

Secondary (HV) terminals left open.

**SC Test (on HV Side)**

Variac connected to Mains.

Ammeter, Voltmeter, Wattmeter (UPF) connected to Primary (HV).

Secondary (LV) terminals shorted with a thick link.

## 5. Observation Table

**OC Test:**
| $V_0$ (Rated Volts) | $I_0$ (No-load Amps) | $W_0$ (Iron Loss Watts) |
| :---: | :---: | :---: |
| 230V | ... | ... |

**SC Test:**
| $V_{sc}$ (Short Circuit Volts) | $I_{sc}$ (Rated Amps) | $W_{sc}$ (Copper Loss Watts) |
| :---: | :---: | :---: |
| ... | ... | ... |

## 6. Calculations

**Iron Loss ($P_i$):** $W_0$

**Copper Loss ($P_{cu}$):** $W_{sc}$ (at full load)

**Efficiency ($\eta$):**

$$\eta = \frac{x \times kVA \times \cos\phi}{(x \times kVA \times \cos\phi) + P_i + x^2 P_{cu}} \times 100$$

Where $x$ is the fraction of load (1 for full load, 0.5 for half load).

## 7. Result

The core loss and copper loss were determined, allowing for the pre-determination of transformer efficiency and regulation.