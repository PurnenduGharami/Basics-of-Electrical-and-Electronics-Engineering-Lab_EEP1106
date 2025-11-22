Here is the content converted into your requested format.

### **Experiment 1: Verification of Kirchhoff’s Laws (KCL & KVL)**

**Q:** What is the fundamental principle behind Kirchhoff's Current Law (KCL)?
**A:** It is based on the **Conservation of Charge**. Charge cannot be created or destroyed at a node. Formula: $\sum I_{in} = \sum I_{out}$

**Q:** What is the fundamental principle behind Kirchhoff's Voltage Law (KVL)?
**A:** It is based on the **Conservation of Energy**. The energy gained from the source equals the energy dropped across passive elements. Formula: $\sum V = 0$



[Image of Kirchhoff's Voltage Law loop diagram]


**Q:** What is the difference between a "Node" and a "Mesh"?
**A:** A **Node** is a junction where two or more circuit elements meet. A **Mesh** is a closed loop that contains no other loops inside it.

**Q:** Why are sign conventions necessary in KVL?
**A:** To distinguish between **voltage rises** (going from - to +) and **voltage drops** (going from + to -). Mixing these up results in a non-zero sum.

**Q:** Does KCL apply to open circuits?
**A:** Yes, KCL is universal. In an open circuit, the current is simply zero.

---

### **Experiment 2: Verification of Superposition Theorem**

**Q:** What is the statement of the Superposition Theorem?
**A:** In a linear circuit with multiple sources, the total current in any branch is the sum of the currents produced by each source acting *alone*.

**Q:** How do you "deactivate" or "kill" a Voltage Source?
**A:** You **Short Circuit** it (replace it with a plain wire). $V=0$.

**Q:** How do you "deactivate" or "kill" a Current Source?
**A:** You **Open Circuit** it (remove the wire/break the connection). $I=0$.

**Q:** What type of circuits does the Superposition Theorem apply to?
**A:** It applies only to **Linear Circuits** (resistors, capacitors, inductors). It does *not* apply to non-linear circuits like diodes or transistors.

**Q:** Can you use Superposition to calculate Power directly?
**A:** No. Power ($P = I^2R$) is a non-linear quantity containing a square term. You must calculate total voltage/current first, then calculate power.

**Q:** How many reading sets are required to verify Superposition with two sources (e.g., 12V and 5V)?
**A:** Three sets:
1. Only 12V active.
2. Only 5V active.
3. Both 12V and 5V active.

---

### **Experiment 3: Open Circuit (OC) & Short Circuit (SC) Test on Transformer**

**Q:** What is the main objective of the OC and SC tests?
**A:** To find the transformer's efficiency and regulation without fully loading the transformer.

**Q:** What specific loss does the Open Circuit (OC) test measure?
**A:** It measures **Core (Iron) Losses**.



[Image of transformer open circuit test diagram]


**Q:** What specific loss does the Short Circuit (SC) test measure?
**A:** It measures **Copper Losses**.



[Image of transformer short circuit test diagram]


**Q:** Why is the OC test performed on the Low Voltage (LV) side?
**A:**
1. **Safety:** Working with lower voltage is safer.
2. **Accuracy:** It is easier to find a supply for the rated Low Voltage (e.g., 230V) than the High Voltage side.

**Q:** Why is the SC test performed on the High Voltage (HV) side?
**A:**
1. **Current Management:** The HV side has a *lower* rated current.
2. **Instrument Safety:** It is easier to measure smaller currents with standard lab ammeters.

**Q:** Why are Iron losses considered "Constant" losses?
**A:** Iron losses depend on voltage. Since transformers operate at a constant rated voltage, these losses remain constant regardless of the load.

**Q:** Why is a Variac used in the SC test?
**A:** To slowly increase voltage from 0V. Since resistance is very low in a short circuit, applying full voltage immediately would damage the transformer; only 5-10% of rated voltage is needed.

**Q:** How is Transformer Efficiency calculated?
**A:** $\text{Efficiency} = \frac{\text{Output Power}}{\text{Output Power} + \text{Losses}}$ (Losses are found via the OC/SC tests).