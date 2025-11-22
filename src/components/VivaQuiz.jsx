import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const VivaQuiz = ({ questions }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center space-x-2 mb-6">
                <HelpCircle className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-bold text-white">Viva Voce</h2>
            </div>

            {questions.map((q, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-panel overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-primary-500/50 bg-dark-card' : 'hover:bg-white/5'
                        }`}
                >
                    <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full px-6 py-4 flex items-start justify-between text-left"
                    >
                        <div className="flex items-start space-x-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/10 text-primary-400 flex items-center justify-center text-sm font-medium border border-primary-500/20 mt-0.5">
                                {index + 1}
                            </span>
                            <span className="text-lg font-medium text-gray-200 pr-8">
                                {q.q}
                            </span>
                        </div>
                        {openIndex === index ? (
                            <ChevronUp className="w-5 h-5 text-primary-400 flex-shrink-0" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="px-6 pb-6 pl-16">
                                    <div className="p-4 rounded-xl bg-primary-500/5 border border-primary-500/10 text-gray-300 leading-relaxed flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span>{q.a}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
};

export default VivaQuiz;
