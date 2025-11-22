Here are the viva questions for Experiment 3 converted into your requested format.

### **Experiment 3: OC and SC Tests on Single Phase Transformer**

#### **Basic Theory**

**Q:** What is the main objective of OC and SC tests?
**A:** To determine the efficiency and voltage regulation of the transformer without directly loading it, and to find the equivalent circuit parameters.

**Q:** What losses occur in a transformer?
**A:**
1. **Core (Iron) Losses:** Hysteresis and Eddy current losses (Found via OC test).
2. **Copper (Ohmic) Losses:** $I^2R$ losses in the windings (Found via SC test).

**Q:** Why are Iron losses called "Constant Losses"?
**A:** Because they depend on the core flux, which depends on the applied voltage. Since a transformer normally operates at a constant rated voltage, these losses remain constant regardless of the load.

**Q:** Why are Copper losses called "Variable Losses"?
**A:** Because they depend on the square of the current ($I^2R$). Since load current varies with load demand, copper losses vary.

**Q:** Why is the OC test performed on the LV (Low Voltage) side?
**A:**
1. **Safety:** Applying rated voltage to the LV side is safer.
2. **Convenience:** Rated LV voltage (e.g., 230V) is readily available.
3. **Instrument Safety:** The no-load current is small, so standard ammeters work well.

**Q:** Why is the SC test performed on the HV (High Voltage) side?
**A:**
1. **Current Magnitude:** The rated current on the HV side is lower, allowing the use of standard ammeters.
2. **Voltage Control:** The voltage required to circulate full-load current is small (5-10%) and easily controlled with a Variac.

#### **Circuit & Procedure**

**Q:** What is the condition of the secondary winding during the OC test?
**A:** It is **Open Circuited** (infinite resistance, zero current).



[Image of transformer open circuit test diagram]


**Q:** What is the condition of the secondary winding during the SC test?
**A:** It is **Short Circuited** using a thick copper wire or strip (zero resistance).



[Image of transformer short circuit test diagram]


**Q:** What does the Wattmeter read in the OC test?
**A:** It reads the **Core (Iron) Loss** ($P_i$ or $W_0$). Copper loss is negligible due to small current.

**Q:** What does the Wattmeter read in the SC test?
**A:** It reads the **Full Load Copper Loss** ($P_{cu}$ or $W_{sc}$). Iron loss is negligible due to low voltage.

**Q:** Why do we use a Low Power Factor (LPF) Wattmeter for the OC test?
**A:** Because at no-load, the transformer draws very small current at a very low power factor (0.1 - 0.2 lagging). An LPF wattmeter is more accurate for this.

**Q:** What is the purpose of the Variac (Auto-transformer) in the SC test?
**A:** To gradually increase voltage from 0V. Applying full rated voltage directly to a short circuit would destroy the transformer.

**Q:** How much voltage is roughly required to conduct the SC test?
**A:** Only about **5% to 10%** of the rated voltage of the HV side.

**Q:** Does the transformer hum during these tests?
**A:** Yes, it might hum due to **magnetostriction** (vibration of core laminations), especially during the OC test where full flux is present.

#### **Calculations & Parameters**

**Q:** What equivalent circuit parameters do you find from the OC test?
**A:** The shunt branch parameters:
* **$R_0$:** Core loss resistance.
* **$X_0$:** Magnetizing reactance.

**Q:** What equivalent circuit parameters do you find from the SC test?
**A:** The series branch parameters:
* **$R_{eq}$:** Equivalent resistance of windings.
* **$X_{eq}$:** Equivalent leakage reactance.

**Q:** Define Voltage Regulation.
**A:** The change in secondary terminal voltage from no-load to full-load, expressed as a percentage of the no-load voltage. Ideally, it should be zero.

**Q:** Define Efficiency of a transformer.
**A:** The ratio of Output Power to Input Power. Formula: $\eta = \frac{\text{Output Power}}{\text{Output Power} + P_{\text{Iron}} + P_{\text{Copper}}}$

**Q:** At what condition is transformer efficiency maximum?
**A:** When **Iron Loss = Copper Loss** ($P_i = P_{cu}$).

**Q:** If the supply frequency increases, what happens to Iron losses?
**A:** Both Hysteresis and Eddy current losses increase with frequency, so the total iron loss increases.

#### **Troubleshooting & Safety**

**Q:** What happens if you open the secondary while the primary is energized in a Current Transformer (CT)?
**A:** **Dangerous!** A very high voltage is induced in the secondary, which can break insulation and harm the operator.

**Q:** Why shouldn't you touch the open terminals during the OC test?
**A:** Because even though the circuit is "open," full rated voltage (and potentially stepped-up high voltage) is present at the terminals.

**Q:** Can you perform the SC test on the LV side?
**A:** Theoretically yes, but practically difficult. It would require extremely high currents (hundreds of Amps) and specialized high-current equipment.

**Q:** What precaution must be taken before switching on the supply for the SC test?
**A:** Ensure the Variac is at the **Zero** position.

**Q:** Why is the efficiency of a transformer generally high (95-99%)?
**A:** Because it is a static device with no moving parts, meaning there are no mechanical losses (friction or windage).