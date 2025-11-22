/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ExperimentCard = ({ experiment, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-panel p-6 hover:border-primary-500/30 transition-all duration-300 group relative overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                {React.cloneElement(experiment.icon, { className: "w-24 h-24 text-primary-500" })}
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium border border-primary-500/20">
                            Exp {experiment.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-gray-400 text-xs font-medium border border-white/10">
                            {experiment.category}
                        </span>
                    </div>
                    <div className="text-primary-500/50 group-hover:text-primary-400 transition-colors">
                        {experiment.icon}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {experiment.title}
                </h3>

                <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                    {experiment.summary || experiment.objective}
                </p>

                <Link
                    to={`/experiment/${experiment.id}`}
                    className="inline-flex items-center space-x-2 text-primary-400 font-medium hover:text-primary-300 transition-colors group/link"
                >
                    <span>Start Experiment</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
};

export default ExperimentCard;
