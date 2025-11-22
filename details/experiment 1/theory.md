# Experiment 1: Verification of Kirchhoff’s Laws (KCL & KVL)

## 1. Introduction

Kirchhoff's laws are the foundation of circuit analysis. They extend Ohm's Law to complex circuits with multiple loops and nodes.

<b>KCL (Kirchhoff's Current Law) deals with the conservation of charge at a junction.

KVL (Kirchhoff's Voltage Law) deals with the conservation of energy around a closed loop.</b>

## 2. Objective

To configure a DC circuit on a breadboard and verify:

<b>Kirchhoff’s Current Law (KCL): The algebraic sum of currents at a node is zero.

Kirchhoff’s Voltage Law (KVL): The algebraic sum of voltages in a closed loop is zero.</b>

## 3. Theory

### A. Kirchhoff’s Current Law (KCL)

<b>Statement:</b> At any node (junction) in an electrical circuit, the sum of currents flowing into the node is equal to the sum of currents flowing out of the node.

## Formula: $\sum I_{in} = \sum I_{out}$  or  $\sum I = 0$

<b>Principle</b>: Conservation of Charge. Charge cannot accumulate at a point (node).


### B. Kirchhoff’s Voltage Law (KVL)

<b>Statement:</b> In any closed loop (mesh), the algebraic sum of all voltage rises (EMF) and voltage drops (IR drops) is equal to zero.

## Formula: $\sum V = 0$

<b>Principle</b>: Conservation of Energy. The energy supplied by the source is completely consumed by the passive elements in the loop.

<b>Sign Convention:</b>

<b>Rise (+):</b> Going from Negative (-) to Positive (+) terminal.

<b>Drop (-):</b> Going from Positive (+) to Negative (-) terminal (direction of current).


## 4. Circuit Diagram

Components: DC Power Supply ($V_s$), Three Resistors ($R_1, R_2, R_3$).

Configuration (T-Network):

$R_1$ connected to Source.

$R_2$ and $R_3$ connected in parallel branches from the node after $R_1$.

Instruments:

Ammeter: Connected in Series to measure current.

Voltmeter: Connected in Parallel to measure voltage.

## 5. Procedure

Verification of KCL

Construct the circuit on the breadboard.

Measure Total Current ($I_{total}$): Connect the ammeter between the source and the first resistor ($R_1$).

Measure Branch Currents ($I_1, I_2$): Connect the ammeter in series with branch $R_2$ to find $I_1$, then in series with branch $R_3$ to find $I_2$.

Verify: Check if $I_{total} = I_1 + I_2$.

Verification of KVL

Measure Source Voltage ($V_s$): Connect voltmeter across the power supply.

Measure Voltage Drops ($V_1, V_2$): Connect voltmeter across $R_1$ ($V_1$) and across $R_2$ ($V_2$).

Verify: For the loop containing Source, $R_1$, and $R_2$, check if $V_s = V_1 + V_2$.

## 6. Observation Table (Example)

#### For KCL:
| $V_{source}$ (V) | Total Current $I$ (mA) | Current $I_1$ (mA) | Current $I_2$ (mA) | $I - (I_1 + I_2)$ |
| :---: | :---: | :---: | :---: | :---: |
| 10V | 10.0 | 6.8 | 3.2 | ~0 |

#### For KVL:
| Loop | $V_{source}$ (V) | Drop $V_1$ (V) | Drop $V_2$ (V) | $V_{source} - V_1 - V_2$ |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 10V | 4.5 | 5.5 | 0