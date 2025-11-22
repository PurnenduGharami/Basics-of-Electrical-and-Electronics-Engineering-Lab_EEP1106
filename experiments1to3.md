I can definitely help you with that. Here are detailed notes for **Practical 1, 2, and 3** (DC Circuits, Superposition, and Transformer Tests), focusing purely on the concepts, steps, and viva questions as requested.

### **Experiment 1: Verification of Kirchhoff’s Laws (KCL & KVL)**

**1. Objective:**
To verify Kirchhoff’s Current Law (KCL) and Kirchhoff’s Voltage Law (KVL) using a resistive circuit.

**2. Theory:**
* **KCL (Kirchhoff's Current Law):** Based on the **Law of Conservation of Charge**. It states that the algebraic sum of currents entering a node (junction) is equal to the sum of currents leaving it.
    * *Formula:* $\sum I_{in} = \sum I_{out}$ or $\sum I = 0$ at a node.
    
* **KVL (Kirchhoff's Voltage Law):** Based on the **Law of Conservation of Energy**. It states that in any closed loop (mesh), the algebraic sum of all voltages (potential drops and EMFs) is zero.
    * *Formula:* $\sum V = 0$ in a loop.
    * *Sign Convention:* Voltage Rise (- to +) is Positive; Voltage Drop (+ to -) is Negative.
    

[Image of KVL loop diagram]


**3. Procedure (Steps to Understand):**
1.  **Circuit Setup:** Build a circuit with a DC voltage source and three resistors (e.g., $R_1, R_2, R_3$) arranged in a mix of series and parallel (Mesh).
2.  **For KCL:** Measure the current entering a specific node (e.g., $I_{total}$) and the currents leaving it into two branches ($I_1, I_2$). Verify that $I_{total} = I_1 + I_2$.
3.  **For KVL:** Measure the voltage drop across each resistor in a closed loop ($V_1, V_2, V_3$). Verify that the sum of these drops equals the supply voltage ($V_s = V_1 + V_2 + V_3$).

**4. 10 Simple Viva Questions:**
1.  **Q:** What is a "Node" in a circuit?
    * **A:** A junction point where two or more circuit elements meet.
2.  **Q:** What is a "Mesh"?
    * **A:** A closed loop that does not contain any other loop within it.
3.  **Q:** On what principle is KCL based?
    * **A:** Conservation of Charge.
4.  **Q:** On what principle is KVL based?
    * **A:** Conservation of Energy.
5.  **Q:** Why must we follow sign conventions in KVL?
    * **A:** To distinguish between energy sources (voltage rise) and energy consumers (voltage drops).
6.  **Q:** Can KCL be applied to an open circuit?
    * **A:** Yes, but the current will be zero.
7.  **Q:** Does KVL apply to AC circuits?
    * **A:** Yes, it applies to both DC and AC circuits at any instant.
8.  **Q:** If measured current is negative, what does it mean?
    * **A:** The actual current flows in the opposite direction to the assumed direction.
9.  **Q:** What is the internal resistance of an ideal ammeter?
    * **A:** Zero (0) ohms.
10. **Q:** What is the internal resistance of an ideal voltmeter?
    * **A:** Infinite ($\infty$) ohms.

---

### **Experiment 2: Verification of Superposition Theorem**

**1. Objective:**
To verify that in a linear circuit with multiple sources, the total response is the sum of individual responses.

**2. Theory:**
* **Statement:** In any linear bilateral network containing two or more independent sources, the current through (or voltage across) any element is the algebraic sum of the currents (or voltages) produced by each source acting alone.
* **"Kill" Rule (Deactivating Sources):**
    * **Voltage Source ($V$):** Short Circuit it (Replace with a wire). Voltage becomes 0.
    * **Current Source ($I$):** Open Circuit it (Remove the wire). Current becomes 0.
    

**3. Procedure (Steps to Understand):**
1.  **Step 1 (Both ON):** Connect two voltage sources (e.g., $V_1=12V, V_2=5V$) to the circuit. Measure the total current $I$ in a specific branch.
2.  **Step 2 ($V_1$ Only):** Remove $V_2$ and replace it with a short wire. Measure current $I'$.
3.  **Step 3 ($V_2$ Only):** Reconnect $V_2$, then remove $V_1$ and replace it with a short wire. Measure current $I''$.
4.  **Verify:** Check if $I = I' + I''$.

**4. 10 Simple Viva Questions:**
1.  **Q:** What type of circuits does Superposition apply to?
    * **A:** Linear and Bilateral circuits only.
2.  **Q:** Why doesn't it apply to Power?
    * **A:** Because Power ($P = I^2R$) has a squared term, making it non-linear.
3.  **Q:** How do you deactivate a Voltage source?
    * **A:** Short Circuit it (join terminals with a wire).
4.  **Q:** How do you deactivate a Current source?
    * **A:** Open Circuit it (disconnect the terminals).
5.  **Q:** What is a "Linear" element?
    * **A:** An element like a resistor where $V$ is directly proportional to $I$ (Ohm's Law holds).
6.  **Q:** Does Superposition work for a diode?
    * **A:** No, a diode is a non-linear device.
7.  **Q:** If currents $I'$ and $I''$ are in opposite directions, what do you do?
    * **A:** You subtract them ($I = I' - I''$).
8.  **Q:** What is a "Bilateral" network?
    * **A:** A circuit where current flows equally well in both directions (e.g., a resistor network).
9.  **Q:** Can you use Superposition to find the total resistance?
    * **A:** No, it is used to find Current or Voltage responses.
10. **Q:** Why is this theorem useful?
    * **A:** It simplifies complex circuits with multiple sources into simpler single-source circuits.

---

### **Experiment 3: Open Circuit (OC) and Short Circuit (SC) Test on Transformer**

**1. Objective:**
To determine the efficiency and regulation of a transformer without fully loading it.

**2. Theory:**
* **Transformer:** A device that transfers electrical energy between circuits through electromagnetic induction.
* **OC Test (Open Circuit):** Finds **Iron (Core) Losses** ($P_i$). These losses (Hysteresis + Eddy current) are constant because voltage is constant.
* **SC Test (Short Circuit):** Finds **Copper Losses** ($P_{cu}$). These losses ($I^2R$) depend on the load current.
* **Efficiency ($\eta$):** $\frac{\text{Output Power}}{\text{Output Power} + \text{Losses}}$.

**3. Procedure (Steps to Understand):**
* **OC Test (Low Voltage Side):**
    1.  Keep the **High Voltage (HV)** side OPEN (no load).
    2.  Connect instruments (Wattmeter, Ammeter, Voltmeter) to the **Low Voltage (LV)** side.
    3.  Apply **Rated Voltage** (e.g., 230V).
    4.  Wattmeter reading = Iron Loss ($W_0 = P_i$).
* **SC Test (High Voltage Side):**
    1.  **Short Circuit** the Low Voltage (LV) side with a thick wire.
    2.  Connect instruments to the **High Voltage (HV)** side.
    3.  Apply a **Low Voltage** (5-10% of rated) using a Variac until rated current flows.
    4.  Wattmeter reading = Full Load Copper Loss ($W_{sc} = P_{cu}$).

**4. 10 Simple Viva Questions:**
1.  **Q:** Why is OC test done on the LV side?
    * **A:** For safety (lower voltage) and because the rated voltage is easily available from the mains.
2.  **Q:** Why is SC test done on the HV side?
    * **A:** Because the rated current on the HV side is lower, making it safer and easier to measure with standard lab ammeters.
3.  **Q:** What loss does the OC test calculate?
    * **A:** Core (Iron) Losses.
4.  **Q:** What loss does the SC test calculate?
    * **A:** Copper Losses.
5.  **Q:** Why are Iron losses called "Constant losses"?
    * **A:** They depend on voltage, which remains constant in normal operation. They don't change with load.
6.  **Q:** Why do we need a Variac (Auto-transformer) for the SC test?
    * **A:** To slowly increase voltage from 0V. If we applied full voltage to a short circuit, the transformer would burn!
7.  **Q:** What is the condition of the secondary winding in the OC test?
    * **A:** It is Open (Infinite resistance, zero current).
8.  **Q:** What is the condition of the secondary winding in the SC test?
    * **A:** It is Shorted (Zero resistance, max current).
9.  **Q:** Does the transformer change frequency?
    * **A:** No, input frequency = output frequency.
10. **Q:** What is the main advantage of these tests?
    * **A:** We can find the efficiency of a large transformer without wasting power by actually connecting a full load.