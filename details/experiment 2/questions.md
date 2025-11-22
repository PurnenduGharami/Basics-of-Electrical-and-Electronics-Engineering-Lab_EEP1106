Here are the viva questions for Experiment 2 converted into your requested format.

### **Experiment 2: Verification of Superposition Theorem - Viva Questions**

#### **Core Concepts & Definitions**

**Q:** State the Superposition Theorem.
**A:** In a linear, bilateral network with multiple independent sources, the response (current/voltage) in any element is the algebraic sum of the responses caused by each source acting alone, while other sources are replaced by their internal resistances.



**Q:** What are the two main conditions for Superposition Theorem to apply?
**A:** The circuit must be **Linear** and **Bilateral**.

**Q:** What is a "Linear Circuit"?
**A:** A circuit where the parameters (R, L, C) do not change with voltage or current. The V-I graph is a straight line passing through the origin (obeys Ohm’s Law).



**Q:** Does Superposition apply to Power calculations? Why?
**A:** No. Power is a non-linear quantity ($P = I^2R$ or $P = V^2/R$). The total power is NOT the sum of powers from individual sources. You must calculate total voltage/current first, then find power.

**Q:** How do you deactivate an ideal Voltage Source?
**A:** By **Short Circuiting** it (replacing it with a zero-resistance wire, so $V=0$).

**Q:** How do you deactivate an ideal Current Source?
**A:** By **Open Circuiting** it (removing the connection, so $I=0$).



[Image of voltage source short circuit vs current source open circuit]


**Q:** What if the voltage source has internal resistance ($r$)?
**A:** You replace the source with its internal resistance ($r$), not a plain short circuit.

**Q:** Can you apply Superposition to a circuit with a Diode?
**A:** No, because a diode is a **Non-Linear** component (its resistance changes with voltage).

**Q:** What is a "Bilateral" network?
**A:** A network where current flows equally well in both directions (e.g., a resistor is bilateral; a diode is unilateral).

**Q:** Why is Superposition useful?
**A:** It simplifies complex circuits with multiple sources by breaking them down into simpler single-source circuits that can be solved using Ohm’s Law and series-parallel reduction.

#### **Practical & Calculation Scenarios**

**Q:** In your experiment, if $I'$ flows left-to-right and $I''$ flows right-to-left, how do you find total $I$?
**A:** You subtract the smaller magnitude from the larger one. The direction will be that of the larger current. (Algebraic sum).

**Q:** If you have 3 sources in a circuit, how many steps/sub-circuits will you solve?
**A:** Three. One for each source acting alone.

**Q:** Does Superposition apply to Dependent Sources?
**A:** No, dependent sources (diamond shape) cannot be turned off. They remain active in every sub-circuit. Only **Independent** sources are turned off.



[Image of dependent vs independent source symbols]


**Q:** What is the algebraic sum of currents if $I_1 = 5mA$ and $I_2 = -2mA$?
**A:** $I_{total} = 5 + (-2) = 3mA$.

**Q:** While performing the experiment, why must the power supply ground be common?
**A:** To ensure a common reference point (0V) for all measurements, otherwise voltages will float and readings will be wrong.

**Q:** If your calculated $I'$ and measured $I'$ are very different, what could be the reason?
**A:**
1. Loose connections on the breadboard.
2. Tolerance error of resistors.
3. Internal resistance of the ammeter was not accounted for.

**Q:** Can you verify Superposition using Voltage instead of Current?
**A:** Yes. The voltage across a resistor is also the algebraic sum of voltages caused by individual sources ($V_{total} = V' + V''$).

**Q:** What happens if you accidentally Open Circuit a voltage source instead of Shorting it?
**A:** The circuit becomes broken (open), and no current will flow from that part of the network, leading to incorrect readings.

**Q:** Why don't we short circuit a real battery in the lab to "kill" it?
**A:** Shorting a real battery causes massive current flow, sparking, and damage (explosion risk). We disconnect it and place a wire in the *circuit* where the battery was.

**Q:** Is Superposition valid for AC circuits?
**A:** Yes, it is valid for AC circuits with linear elements (R, L, C), but you must use **phasor sum** (vector addition) instead of simple algebraic addition.

**Q:** What is the unit of linearity?
**A:** Linearity is a property, not a quantity with a unit. It implies proportionality ($y = kx$).

**Q:** Does a capacitor obey Superposition?
**A:** Yes, it is a linear element ($V = \frac{1}{C} \int i dt$ is a linear operation).

**Q:** If measuring current with a multimeter, what safety precaution should you take?
**A:** Never connect the ammeter in parallel with a voltage source; it will blow the fuse. Always connect in series.

**Q:** Can Superposition be applied to a bridge circuit?
**A:** Yes, as long as the elements are linear (resistors). It is often used to solve unbalanced bridges.



[Image of wheatstone bridge circuit diagram]


**Q:** What is the internal resistance of an ideal Voltage source?
**A:** Zero ohms ($0\Omega$).

**Q:** What is the internal resistance of an ideal Current source?
**A:** Infinite ohms ($\infty\Omega$).

**Q:** If you have a circuit with 2 Voltage sources and 1 Current source, how do you proceed?
**A:**
* **Case 1:** V1 on (V2 shorted, I1 open).
* **Case 2:** V2 on (V1 shorted, I1 open).
* **Case 3:** I1 on (V1 shorted, V2 shorted).
* Add all three results.

**Q:** Why do wires have resistance?
**A:** All real conductors have resistivity ($\rho$). Formula: $R = \rho L / A$. In labs, long thin wires add small errors.

**Q:** Does Superposition work for non-electrical systems?
**A:** Yes, it applies to any linear system (e.g., sound waves, mechanical stress, optics).

**Q:** In your specific lab setup (T-Network), if the middle resistor is removed, can you still apply Superposition?
**A:** Yes, but the circuit topology changes (it becomes a single loop with two opposing sources). The theorem still holds.