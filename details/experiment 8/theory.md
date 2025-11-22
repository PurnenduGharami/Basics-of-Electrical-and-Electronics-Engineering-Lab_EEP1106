# Experiment 8: Study and Verification of Truth Tables of AND, OR, NOT Gates

## 1. Introduction

Logic gates are the fundamental building blocks of any digital circuit. They make decisions based on a combination of digital inputs. A logic gate has one or more inputs but only one output. The output is High (Logic 1) or Low (Logic 0) depending on the logic function.

## 2. Objective

To study and verify the truth tables of the three basic logic gates:

**AND Gate**

**OR Gate**

**NOT Gate**

## 3. Theory

### A. AND Gate

**Logic:** The output is HIGH (1) only when ALL inputs are HIGH (1). If any input is LOW (0), the output is LOW. This is equivalent to a series circuit of switches.

**Expression:** $Y = A \cdot B$

**IC Number:** 7408 (Quad 2-input AND gate).

### B. OR Gate

**Logic:** The output is HIGH (1) if ANY one or more inputs are HIGH (1). The output is LOW only when all inputs are LOW. This is equivalent to a parallel circuit of switches.

**Expression:** $Y = A + B$

**IC Number:** 7432 (Quad 2-input OR gate).

### C. NOT Gate (Inverter)

**Logic:** The output is the inverse (complement) of the input. If input is 1, output is 0, and vice-versa. It has only one input.

**Expression:** $Y = \bar{A}$

**IC Number:** 7404 (Hex Inverter).

## 4. Pin Configurations (74xx Series)

**Pin 14:** $V_{CC}$ (+5V Supply).

**Pin 7:** GND (Ground/0V).

**AND (7408) & OR (7432):**

**Gate 1:** Inputs 1, 2; Output 3.

**Gate 2:** Inputs 4, 5; Output 6.

**Gate 3:** Inputs 9, 10; Output 8.

**Gate 4:** Inputs 12, 13; Output 11.

**NOT (7404):**

**Gate 1:** Input 1, Output 2.

**Gate 2:** Input 3, Output 4.

... (6 gates total).

## 5. Procedure

Place the IC (e.g., 7408) on the breadboard/kit.

Connect Pin 14 to +5V and Pin 7 to GND.

Connect Inputs (Pins 1, 2) to toggle switches.

Connect Output (Pin 3) to an LED indicator.

Apply various input combinations (00, 01, 10, 11) and observe the output LED.

Record observations in the truth table.

Repeat for 7432 (OR) and 7404 (NOT).

## 6. Result

The truth tables for AND, OR, and NOT gates were experimentally verified and matched theoretical expectations.