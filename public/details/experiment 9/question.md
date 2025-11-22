Here are the viva questions for Experiment 9 (Half Adder) converted into your requested format.

### **Part 2: 25 Viva Questions (Experiment 9)**

**Q:** What is a Half Adder?
**A:** A combinational logic circuit that adds two single-bit binary numbers and produces a Sum and a Carry bit.

**Q:** Why is it called a "Half" Adder?
**A:** Because it can only add two bits and cannot handle a "Carry-in" from a previous lower significant bit position.

**Q:** How many inputs and outputs does a Half Adder have?
**A:** 2 Inputs ($A, B$) and 2 Outputs ($Sum, Carry$).

**Q:** What logic gate produces the "Sum" output?
**A:** XOR gate (Exclusive-OR).

**Q:** What logic gate produces the "Carry" output?
**A:** AND gate.



[Image of half adder logic circuit and truth table]


**Q:** Write the boolean expression for Sum.
**A:** $S = A \oplus B$ (or $S = \bar{A}B + A\bar{B}$).

**Q:** Write the boolean expression for Carry.
**A:** $C = A \cdot B$.

**Q:** If A=1 and B=1, what are the outputs?
**A:** Sum = 0, Carry = 1. (Because $1+1=10_2$).

**Q:** If A=1 and B=0, what are the outputs?
**A:** Sum = 1, Carry = 0.

**Q:** What is the IC number for the XOR gate?
**A:** 7486.

**Q:** What is the IC number for the AND gate?
**A:** 7408.

**Q:** Can you build a Half Adder using only NAND gates?
**A:** Yes, because NAND is a universal gate. It requires 5 NAND gates.

**Q:** Can you build a Half Adder using only NOR gates?
**A:** Yes, it requires 5 NOR gates.

**Q:** What is a Combinational Circuit?
**A:** A circuit where the output depends only on the present state of inputs, not on any past history (no memory).

**Q:** What is the difference between Half Adder and Full Adder?
**A:** A Full Adder has 3 inputs (A, B, Cin) and can add the carry from the previous stage; a Half Adder cannot.

**Q:** How many Half Adders are needed to make a Full Adder?
**A:** Two Half Adders and one OR gate.



[Image of full adder circuit using two half adders]


**Q:** What is the total number of gates required for a standard Half Adder?
**A:** Two (1 XOR, 1 AND).

**Q:** What is the practical limitation of a Half Adder?
**A:** It cannot be cascaded directly for multi-bit addition (e.g., adding two 4-bit numbers) because it ignores the carry chain.

**Q:** Is the Half Adder circuit sequential or combinational?
**A:** Combinational.

**Q:** What happens if you swap the inputs A and B?
**A:** Nothing changes. Binary addition is commutative ($A+B = B+A$).

**Q:** How do you implement Sum using basic gates (AND, OR, NOT)?
**A:** By implementing the equation $\bar{A}B + A\bar{B}$ using two ANDs, two NOTs, and one OR.

**Q:** What is the maximum sum value a Half Adder can produce?
**A:** Decimal 2 (Binary 10), which occurs when inputs are 1 and 1.

**Q:** Why do we connect Vcc and Ground?
**A:** To power the internal transistors of the logic gate ICs.

**Q:** What does LSB stand for?
**A:** Least Significant Bit (The "Sum" bit).

**Q:** What does MSB stand for?
**A:** Most Significant Bit (The "Carry" bit in this context).