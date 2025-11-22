/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { experiments } from '../data/experiments';
import VivaCard from '../components/VivaCard';
import KCLKVLSimulator from '../components/simulators/KCLKVLSimulator';
import SuperpositionSimulator from '../components/simulators/SuperpositionSimulator';
import DigitalLogicSimulator from '../components/simulators/DigitalLogicSimulator';
import TransformerLabSimulator from '../components/simulators/TransformerLabSimulator';
import MachinePartsExplorer from '../components/simulators/MachinePartsExplorer';
import DiodeLabSimulator from '../components/simulators/DiodeLabSimulator';
import RectifierWorkbench from '../components/simulators/RectifierWorkbench';
import BasicGatesSimulator from '../components/simulators/BasicGatesSimulator';
import HalfAdderLab from '../components/simulators/HalfAdderLab';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Book, List, HelpCircle, Play, Zap, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownRenderer from '../components/MarkdownRenderer';
import VivaSection from '../components/VivaSection';

const ExperimentDetail = () => {
    const { id } = useParams();
    const experiment = experiments.find(e => e.id === parseInt(id));
    const [activeTab, setActiveTab] = useState('theory');

    if (!experiment) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-white mb-4">Experiment Not Found</h2>
                <Link to="/" className="text-primary-400 hover:text-primary-300">Back to Home</Link>
            </div>
        );
    }

    const tabs = [
        { id: 'theory', label: 'Theory', icon: Book },
        { id: 'procedure', label: 'Procedure', icon: List },
        { id: 'simulation', label: 'Simulation', icon: Play },
        { id: 'applications', label: 'Applications', icon: Zap },
        { id: 'viva', label: 'Viva Voce', icon: HelpCircle },
    ];

    // Filter tabs if no simulation exists for this experiment
    const availableTabs = tabs.filter(tab => {
        if (tab.id === 'simulation') {
            // Enable simulation for all experiments 1-9
            return [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(experiment.id);
        }
        return true;
    });

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <Link
                to="/"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Experiments</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium border border-primary-500/20">
                        Experiment {experiment.id}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-sm font-medium border border-white/10">
                        {experiment.category}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {experiment.title}
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                    {experiment.objective}
                </p>
            </motion.div>

            {/* Tabs */}
            <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {availableTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${isActive
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-[400px]"
                >
                    {activeTab === 'theory' && (
                        <div className="glass-panel p-8">
                            <MarkdownRenderer filePath={experiment.theoryFile} />
                        </div>
                    )}

                    {activeTab === 'procedure' && (
                        <div className="glass-panel p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                                <List className="w-6 h-6 text-primary-400" />
                                <span>Step-by-Step Procedure</span>
                            </h2>
                            <div className="space-y-6">
                                {experiment.procedure.map((step, index) => (
                                    <div key={index} className="flex items-start space-x-4 group">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 text-gray-400 flex items-center justify-center font-bold group-hover:bg-primary-500 group-hover:text-white transition-colors border border-white/10">
                                            {index + 1}
                                        </div>
                                        <div className="pt-1 text-gray-300 text-lg leading-relaxed">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {step}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'simulation' && (
                        <div className="glass-panel p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                                <Play className="w-6 h-6 text-green-500" />
                                <span>Interactive Simulator</span>
                            </h2>

                            {experiment.id === 1 && <KCLKVLSimulator />}
                            {experiment.id === 2 && <SuperpositionSimulator />}
                            {experiment.id === 3 && <DigitalLogicSimulator />}
                            {experiment.id === 4 && <TransformerLabSimulator />}
                            {experiment.id === 5 && <MachinePartsExplorer />}
                            {experiment.id === 6 && <DiodeLabSimulator />}
                            {experiment.id === 7 && <RectifierWorkbench />}
                            {experiment.id === 8 && <BasicGatesSimulator />}
                            {experiment.id === 9 && <HalfAdderLab />}
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="glass-panel p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                                <Zap className="w-6 h-6 text-yellow-500" />
                                <span>Real World Applications</span>
                            </h2>
                            <div className="grid gap-4">
                                {experiment.applications?.map((app, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                        <CheckCircle className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                                        <span className="text-gray-300 text-lg">{app}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'viva' && (
                        <VivaSection vivaFile={experiment.vivaFile} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ExperimentDetail;
