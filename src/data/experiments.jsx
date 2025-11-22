import React from 'react';
import {
    Zap,
    Activity,
    Settings,
    Cpu,
    Maximize2,
    Minimize2,
    PlusSquare,
    MinusSquare,
    Binary
} from 'lucide-react';

export const experiments = [
    {
        id: 1,
        title: "Verification of Kirchhoff's Laws (KCL & KVL)",
        category: "Analog",
        icon: <Zap className="w-5 h-5" />,
        summary: "Verify Conservation of Charge (KCL) and Energy (KVL) in resistive circuits.",
        theoryFile: 'details/experiment 1/theory.md',
        vivaFile: 'details/experiment 1/questions.md',
        applications: [
            "Circuit Analysis in complex networks.",
            "Designing electrical distribution systems.",
            "Fault finding in electronic circuits."
        ],
        objective: "To verify Kirchhoff's Current Law (KCL) and Kirchhoff's Voltage Law (KVL) using a resistive circuit.",
        procedure: [
            "Build a circuit with a DC voltage source and three resistors arranged in series and parallel.",
            "Measure the current entering a specific node and the currents leaving it. Verify KCL.",
            "Measure the voltage drop across each resistor in a closed loop. Verify KVL."
        ]
    },
    {
        id: 2,
        title: "Verification of Superposition Theorem",
        category: "Analog",
        icon: <Activity className="w-5 h-5" />,
        summary: "Analyze linear circuits with multiple independent sources by considering one at a time.",
        theoryFile: 'details/experiment 2/theory.md',
        vivaFile: 'details/experiment 2/questions.md',
        applications: [
            "Simplifying analysis of complex circuits with multiple power sources.",
            "Audio mixing consoles where multiple signals are combined.",
            "Signal processing in communication systems."
        ],
        objective: "To verify that in a linear circuit with multiple sources, the total response is the sum of individual responses.",
        procedure: [
            "Connect two voltage sources and measure total current I.",
            "Short V2 and measure current I' with only V1 active.",
            "Short V1 and measure current I'' with only V2 active.",
            "Verify that I = I' + I''."
        ]
    },
    {
        id: 3,
        title: "Digital Electronics (Logic Gates & Adders)",
        category: "Digital",
        icon: <Cpu className="w-5 h-5" />,
        summary: "Study of Logic Gates, Universal Gates, and Combinational Circuits.",
        theoryFile: 'details/experiment 3/theory.md',
        vivaFile: 'details/experiment 3/question.md',
        applications: [
            "Digital Logic Design",
            "Computer Architecture",
            "Signal Processing"
        ],
        objective: "To study and verify the truth tables of Logic Gates and Combinational Circuits.",
        procedure: [
            "Select the desired component from the simulator tabs.",
            "Toggle input switches to change logic states.",
            "Observe output LEDs and verify truth tables."
        ]
    },
    {
        id: 4,
        title: "Transformer Tests (OC & SC)",
        category: "Machines",
        icon: <Settings className="w-5 h-5" />,
        summary: "Determine efficiency and regulation via Open/Short Circuit tests.",
        theoryFile: 'details/experiment 4/theory.md',
        vivaFile: 'details/experiment 4/question.md',
        applications: [
            "Determining efficiency of large power transformers.",
            "Predicting voltage regulation.",
            "Testing transformers before installation."
        ],
        objective: "To determine the efficiency and regulation of a transformer without fully loading it.",
        procedure: [
            "Perform Open Circuit Test on the transformer.",
            "Perform Short Circuit Test on the transformer.",
            "Calculate efficiency and regulation from measured values."
        ]
    },
    {
        id: 5,
        title: "Study of DC & Induction Machines",
        category: "Machines",
        icon: <Binary className="w-5 h-5" />,
        summary: "Explore characteristics of DC and Induction machines.",
        theoryFile: 'details/experiment 5/theory.md',
        vivaFile: 'details/experiment 5/question.md',
        applications: [
            "Motor selection for industrial drives.",
            "Understanding torque-speed characteristics."
        ],
        objective: "To study the performance curves of DC and Induction machines.",
        procedure: [
            "Connect the machine to a variable voltage supply.",
            "Measure speed, torque, and current at various loads.",
            "Plot speed-torque and speed-current characteristics."
        ]
    },
    {
        id: 6,
        title: "V-I Characteristics of P-N Junction Diode",
        category: "Semiconductors",
        icon: <Binary className="w-5 h-5" />,
        summary: "Observe forward and reverse bias behavior of a diode.",
        theoryFile: 'details/experiment 6/theory.md',
        vivaFile: 'details/experiment 6/question.md',
        applications: [
            "Rectifier design.",
            "Clipping and clamping circuits."
        ],
        objective: "To obtain the forward and reverse bias V-I characteristics of a diode.",
        procedure: [
            "Set up the diode in series with a variable DC source.",
            "Measure voltage and current for increasing forward bias.",
            "Repeat for reverse bias until breakdown.",
            "Plot the V-I curve."
        ]
    },
    {
        id: 7,
        title: "Half-Wave and Full-Wave Rectifiers",
        category: "Semiconductors",
        icon: <Binary className="w-5 h-5" />,
        summary: "Study rectification of AC using diode configurations.",
        theoryFile: 'details/experiment 7/theory.md',
        vivaFile: 'details/experiment 7/question.md',
        applications: [
            "Power supplies.",
            "Signal demodulation."
        ],
        objective: "To observe the output waveforms of half-wave and full-wave rectifiers.",
        procedure: [
            "Connect the half-wave rectifier and apply AC source.",
            "Observe output on oscilloscope.",
            "Replace with bridge full-wave rectifier.",
            "Add filter capacitor and note ripple reduction."
        ]
    },
    {
        id: 8,
        title: "Logic Gates (AND, OR, NOT)",
        category: "Digital",
        icon: <Binary className="w-5 h-5" />,
        summary: "Explore basic logic gate symbols and truth tables.",
        theoryFile: 'details/experiment 8/theory.md',
        vivaFile: 'details/experiment 8/question.md',
        applications: [
            "Simple combinational circuits.",
            "Digital control systems."
        ],
        objective: "To understand the operation and symbols of basic logic gates.",
        procedure: [
            "Use the BasicGatesSimulator to toggle inputs.",
            "Observe the output LED for each gate.",
            "Verify the truth tables displayed."
        ]
    },
    {
        id: 9,
        title: "Half Adder Circuit Design",
        category: "Digital",
        icon: <Binary className="w-5 h-5" />,
        summary: "Design and verify a half adder using XOR and AND gates.",
        theoryFile: 'details/experiment 9/theory.md',
        vivaFile: 'details/experiment 9/question.md',
        applications: [
            "Binary addition in arithmetic logic units."
        ],
        objective: "To design a half adder and verify its sum and carry outputs.",
        procedure: [
            "Build the half adder using XOR and AND gates in the simulator.",
            "Toggle inputs A and B and record Sum and Carry.",
            "Compare with the expected truth table."
        ]
    }
];
