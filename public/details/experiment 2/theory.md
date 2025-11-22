# Experiment 2: Verification of Superposition Theorem

## 1. Introduction

The Superposition Theorem is a fundamental principle used to analyze complex electrical circuits that contain multiple energy sources. It simplifies the analysis by allowing us to consider the effect of each source independently.

## 2. Objective

To verify the Superposition Theorem for a linear DC circuit with multiple independent voltage sources.

## 3. Apparatus Required

| S.No | Apparatus | Quantity |
| :---: | :--- | :---: |
| 1. | Breadboard | 1 |
| 2. | DC Power Supplies (e.g., 12V and 5V) | 2 |
| 3. | Resistors (e.g., $R_1, R_2, R_3$ of known values) | 3 |
| 4. | Digital Multimeter (DMM) for measuring current | 1 |
| 5. | Connecting Wires | As required |

## 4. Theory

**Statement:**
The Superposition Theorem states that in any linear, bilateral network containing two or more independent sources (voltage or current), the response (current through or voltage across) in any element is the algebraic sum of the responses produced by each source acting alone, while all other sources are replaced by their internal resistances.

**Key Conditions:**

**Linear Circuit:** The theorem only applies to circuits composed of linear elements (resistors, capacitors, inductors) where the relationship between voltage and current is linear (Ohm's Law).

**Deactivating Sources:**

**Voltage Source:** Replaced by a Short Circuit (0V). Ideally, a plain wire.

**Current Source:** Replaced by an Open Circuit (0A). Ideally, a break in the wire.

**Mathematical Representation:**
If $I$ is the total current in a branch due to sources $V_1$ and $V_2$:

$$I = I' + I''$$

Where:

**$I'$** is the current due to source $V_1$ alone (with $V_2$ shorted).

**$I''$** is the current due to source $V_2$ alone (with $V_1$ shorted).

**Limitations:**

It does not apply to non-linear circuits (containing diodes, transistors).

It cannot be used to calculate Power directly because power is a non-linear quantity ($P = I^2R$).

## 5. Circuit Diagram

**Standard T-Network Configuration:**

**Resistor $R_1$:** Connected to Source $V_1$ (e.g., 12V).

**Resistor $R_3$:** Connected to Source $V_2$ (e.g., 5V).

**Resistor $R_2$:** The central branch connected to Ground.

**Node A:** The junction point connecting $R_1, R_2, R_3$.

The goal is to find the current flowing through the central resistor $R_2$ (let's call it $I_{R2}$).

## 6. Procedure

### Step 1: Both Sources Active

Connect the circuit with both voltage sources $V_1$ (e.g., 12V) and $V_2$ (e.g., 5V) present.

Connect an Ammeter in series with the central resistor $R_2$.

Measure the total current flowing through $R_2$.

Record this value as $I_{total}$.

### Step 2: Source $V_1$ Active Only

Turn off or disconnect source $V_2$.

Short Circuit the terminals where $V_2$ was connected. (Replace the battery with a connecting wire).

Keep source $V_1$ active.

Measure the current flowing through $R_2$ with the ammeter.

Record this value as $I'$ (Current due to $V_1$ alone).

### Step 3: Source $V_2$ Active Only

Reconnect source $V_2$.

Turn off or disconnect source $V_1$.

Short Circuit the terminals where $V_1$ was connected.

Keep source $V_2$ active.

Measure the current flowing through $R_2$ with the ammeter.

Record this value as $I''$ (Current due to $V_2$ alone).

### Step 4: Verification

Algebraically add the individual currents: $I_{calc} = I' + I''$.

**Note:** Pay attention to current direction! If $I'$ flows downward and $I''$ flows upward, you subtract them.

Compare $I_{calc}$ with the measured $I_{total}$ from Step 1.

If $I_{total} \approx I' + I''$, the theorem is verified.

## 7. Observation Table

| Case | Active Source(s) | Voltage $V_1$ (V) | Voltage $V_2$ (V) | Current through $R_2$ (mA) |
| :---: | :--- | :---: | :---: | :--- |
| 1 | Both $V_1$ & $V_2$ | 12V | 5V | $I_{total} = $ ... |
| 2 | Only $V_1$ | 12V | 0V (Short) | $I' = $ ... |
| 3 | Only $V_2$ | 0V (Short) | 5V | $I'' = $ ... |

**Verification Result:**

$$I_{total} \text{ (Measured)} = \_\_\_\_\_ \text{ mA}$$

$$I' + I'' \text{ (Calculated)} = \_\_\_\_\_ \text{ mA}$$

Error = ...

## 8. Precautions

**Shorting Sources:** When deactivating a voltage source, ensure you short the terminals on the circuit board, not the power supply itself (which would blow the supply fuse). Disconnect the supply first, then bridge the gap on the breadboard.

**Polarity:** Be very careful with the direction of current. If the multimeter shows a negative sign, record it as negative. Superposition is an algebraic sum.

**Linearity:** Ensure the resistors are not overheating, as temperature changes can cause non-linear behavior.

## 9. Conclusion

The current measured when both sources were active ($I_{total}$) was found to be equal to the algebraic sum of the currents measured when each source acted independently ($I' + I''$). Thus, the Superposition Theorem is verified.