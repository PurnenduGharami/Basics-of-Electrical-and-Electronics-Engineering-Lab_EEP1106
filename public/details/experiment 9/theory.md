# Experiment 9: Design Half Adder Circuit and Verification of Truth Table

## 1. Introduction

In digital electronics, arithmetic operations like addition are fundamental. A Half Adder is the simplest combinational circuit used to perform the addition of two single-bit binary numbers. It is called a "Half" Adder because it can add two bits but cannot accept a carry from a previous stage.

## 2. Objective

To design, construct, and verify the truth table of a Half Adder circuit using basic logic gates (XOR and AND).

## 3. Theory

**Binary Addition Rules**

$0 + 0 = 0$

$0 + 1 = 1$

$1 + 0 = 1$

$1 + 1 = 10$ (Sum = 0, Carry = 1)

**Circuit Logic**

A Half Adder takes two inputs ($A$ and $B$) and produces two outputs:

**Sum ($S$):** Represents the LSB of the addition.

**Carry ($C$):** Represents the MSB (overflow).

**Logic Equations**

From the truth table (below), we can derive the boolean expressions:

**Sum ($S$):** The output is High when inputs are different ($0,1$ or $1,0$). This corresponds to the XOR operation.

$$S = A \oplus B$$

**Carry ($C$):** The output is High only when both inputs are High ($1,1$). This corresponds to the AND operation.

$$C = A \cdot B$$

**Logic Diagram**

The circuit consists of one XOR gate (IC 7486) and one AND gate (IC 7408) connected in parallel to the inputs.

## 4. Pin Configuration

**IC 7486 (XOR):** Pins 1, 2 (Inputs) -> Pin 3 (Output/Sum).

**IC 7408 (AND):** Pins 1, 2 (Inputs) -> Pin 3 (Output/Carry).

**Common:** Pin 14 ($V_{CC}$), Pin 7 (GND).

## 5. Procedure

Place IC 7486 (XOR) and IC 7408 (AND) on the breadboard.

Connect Pin 14 of both ICs to +5V and Pin 7 to Ground.

Connect Input A to Pin 1 of both ICs.

Connect Input B to Pin 2 of both ICs.

Connect the Output of XOR (Pin 3) to an LED (Label: Sum).

Connect the Output of AND (Pin 3) to another LED (Label: Carry).

Apply input combinations (00, 01, 10, 11) and verify the LED status against the truth table.

## 6. Truth Table

| Input A | Input B | Carry ($C$) | Sum ($S$) |
| :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

## 7. Result

The Half Adder circuit was designed, and its truth table was successfully verified.