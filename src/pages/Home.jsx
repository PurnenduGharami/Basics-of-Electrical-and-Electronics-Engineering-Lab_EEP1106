/* eslint-disable no-unused-vars */
import React from 'react';
import { experiments } from '../data/experiments';
import ExperimentCard from '../components/ExperimentCard';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Home = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative py-12 md:py-20 text-center overflow-hidden rounded-3xl bg-gradient-to-b from-primary-900/20 to-transparent border border-white/5">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20 mb-4"
                    >
                        <Zap className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">Interactive Electronics Lab</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-100 to-primary-400 leading-tight"
                    >
                        Master Your <br /> Practical Experiments
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        A comprehensive digital companion for your electronics lab.
                        Explore theory, simulate circuits, and practice viva questions.
                    </motion.p>
                </div>
            </div>

            {/* Experiments Grid */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">All Experiments</h2>
                    <span className="text-sm text-gray-500">{experiments.length} Available</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiments.map((exp, index) => (
                        <ExperimentCard key={exp.id} experiment={exp} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
