# Unit 3: Digital Electronics - Theory Notes

## 1. Introduction to Digital Electronics

Digital electronics deals with systems that represent signals as discrete values, typically binary (0 and 1). These values correspond to voltage levels in a physical circuit:

**Logic 0 (Low):** $0V - 0.8V$ (Ground)

**Logic 1 (High):** $2V - 5V$ (Vcc)

The fundamental building blocks of digital circuits are Logic Gates.

## 2. Logic Gates

A logic gate is an electronic circuit that makes logical decisions. It has one or more inputs but only one output. [Image of Logic Gates Symbols]

### A. Basic Gates

**AND Gate (IC 7408)**

**Operation:** Output is High (1) only if ALL inputs are High. Like a series switch.

**Equation:** $Y = A \cdot B$

**Truth Table:**
| A | B | Y |
|:-:|:-:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**OR Gate (IC 7432)**

**Operation:** Output is High (1) if ANY input is High. Like a parallel switch.

**Equation:** $Y = A + B$

**Truth Table:**
| A | B | Y |
|:-:|:-:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**NOT Gate (Inverter) (IC 7404)**

**Operation:** Reverses the input state.

**Equation:** $Y = \bar{A}$

**Truth Table:**
| A | Y |
|:-:|:-:|
| 0 | 1 |
| 1 | 0 |

### B. Universal Gates

These gates can be used to construct any other logic gate (AND, OR, NOT).

**NAND Gate (IC 7400)**

**Operation:** AND followed by NOT. Output is Low only if all inputs are High.

**Equation:** $Y = \overline{A \cdot B}$

**Truth Table:**
| A | B | Y |
|:-:|:-:|:-:|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**NOR Gate (IC 7402)**

**Operation:** OR followed by NOT. Output is High only if all inputs are Low.

**Equation:** $Y = \overline{A + B}$

**Truth Table:**
| A | B | Y |
|:-:|:-:|:-:|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

### C. Special Purpose Gates

**XOR Gate (Exclusive-OR) (IC 7486)**

**Operation:** Output is High if inputs are different. Used in Adders.

**Equation:** $Y = A \oplus B = \bar{A}B + A\bar{B}$

**Truth Table:**
| A | B | Y |
|:-:|:-:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**XNOR Gate (Exclusive-NOR)**

**Operation:** Output is High if inputs are the same. (Equality Detector).

**Equation:** $Y = \overline{A \oplus B} = AB + \bar{A}\bar{B}$

## 3. Combinational Circuits

Circuits where the output depends only on the present state of inputs (no memory).

### A. Half Adder [Image of Half Adder Circuit]

A circuit that adds two single-bit binary numbers ($A, B$).

**Inputs:** A, B

**Outputs:** Sum (S), Carry (C)

**Equations:**

$Sum = A \oplus B$ (XOR Gate)

$Carry = A \cdot B$ (AND Gate)

**Truth Table:**
| A | B | Sum | Carry |
|:-:|:-:|:---:|:-----:|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

### B. Full Adder [Image of Full Adder Logic Diagram]

A circuit that adds three single-bit binary numbers: $A, B$, and a Carry-in ($C_{in}$).

**Inputs:** A, B, $C_{in}$

**Outputs:** Sum (S), Carry ($C_{out}$)

**Equations:**

$Sum = A \oplus B \oplus C_{in}$

$C_{out} = AB + BC_{in} + AC_{in}$

**Implementation:** Can be built using two Half Adders and one OR Gate.

### C. Half Subtractor [Image of Half Subtractor Logic Diagram]

A circuit that subtracts one bit from another ($A - B$).

**Inputs:** A (Minuend), B (Subtrahend)

**Outputs:** Difference (D), Borrow ($B_{out}$)

**Equations:**

$Difference = A \oplus B$ (Same as Adder!)

$Borrow = \bar{A} \cdot B$ (NOT A AND B)

**Truth Table:**
| A | B | Diff | Borrow |
|:-:|:-:|:----:|:------:|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |

### D. Full Subtractor [Image of Full Subtractor Logic Diagram]

A circuit that subtracts three bits: $A - B - B_{in}$ (Borrow from previous stage).

**Inputs:** A, B, $B_{in}$

**Outputs:** Difference (D), Borrow ($B_{out}$)

**Equations:**

$Difference = A \oplus B \oplus B_{in}$

$Borrow = \bar{A}B + (\overline{A \oplus B})B_{in}$

## 4. Boolean Algebra Laws (Quick Review)

These are used to simplify logic circuit expressions.

**Identity Law:** $A \cdot 1 = A$, $A + 0 = A$

**Null Law:** $A \cdot 0 = 0$, $A + 1 = 1$

**Idempotent Law:** $A \cdot A = A$, $A + A = A$

**Inverse Law:** $A \cdot \bar{A} = 0$, $A + \bar{A} = 1$

**Commutative Law:** $AB = BA$, $A+B = B+A$

**Associative Law:** $(AB)C = A(BC)$, $(A+B)+C = A+(B+C)$

**Distributive Law:** $A(B+C) = AB + AC$, $A + (BC) = (A+B)(A+C)$

**De Morgan’s Theorems:**

$\overline{A \cdot B} = \bar{A} + \bar{B}$ (NAND = Bubbled OR)

$\overline{A + B} = \bar{A} \cdot \bar{B}$ (NOR = Bubbled AND)

## 5. Viva Questions for Unit 3

**Q: Why are NAND and NOR called Universal Gates?**

**A:** Because any boolean function or logic gate (AND, OR, NOT) can be implemented using only NAND or only NOR gates.

**Q: How many NAND gates are required to make an AND gate?**

**A:** Two. (One NAND to get $\overline{AB}$, followed by another NAND (as NOT) to get $AB$).

**Q: What is the difference between Half Adder and Full Adder?**

**A:** Half Adder adds 2 bits and has no Carry-in. Full Adder adds 3 bits (including Carry-in) and is used for cascading.

**Q: What is the logic equation for the Sum in a Full Adder?**

**A:** $S = A \oplus B \oplus C_{in}$.

**Q: What logic family is the 74xx series?**

**A:** TTL (Transistor-Transistor Logic).

**Q: Which gate is used as a controlled inverter?**

**A:** XOR gate. (If one input is 1, the other input is inverted at the output).

**Q: What is the result of $1 \oplus 1$?**

**A:** 0. (Inputs are same).

**Q: Can we implement a Full Adder using Half Adders?**

**A:** Yes, using two Half Adders and one OR gate.

**Q: What is De Morgan's First Theorem?**

**A:** The complement of a product is equal to the sum of the complements ($\overline{AB} = \bar{A} + \bar{B}$).

**Q: What is a Combinational Circuit?**

**A:** A circuit where the output depends only on the present inputs (no memory, no clock). Examples: Adders, Encoders, Multiplexers.