import React, { useState, useEffect } from 'react';
import VivaCard from './VivaCard';
import { HelpCircle } from 'lucide-react';

const VivaSection = ({ vivaFile }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log('Loading viva file:', vivaFile);
                const response = await fetch(`/${vivaFile}`);

                if (!response.ok) {
                    throw new Error(`Failed to load ${vivaFile}`);
                }

                const text = await response.text();
                console.log('Loaded text length:', text.length);

                // Parse markdown questions - format is "**Q:** question\n**A:** answer"
                const parsedQuestions = parseMarkdownQuestions(text);
                console.log('Parsed questions:', parsedQuestions.length, parsedQuestions);
                setQuestions(parsedQuestions);
            } catch (err) {
                console.error('Error loading viva questions:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (vivaFile) {
            loadQuestions();
        }
    }, [vivaFile]);

    const parseMarkdownQuestions = (markdown) => {
        const questions = [];

        // Split by **Q:** or **Q.** to get question blocks
        const blocks = markdown.split(/\*\*Q[:.]\*\*/i);

        // Skip the first empty block
        for (let i = 1; i < blocks.length; i++) {
            const block = blocks[i];

            // Split by **A:** or **A.** to separate question and answer
            const parts = block.split(/\*\*A[:.]\*\*/i);

            if (parts.length >= 2) {
                let question = parts[0].trim();
                let answer = parts[1].trim();

                // Remove everything after the next question or end of string
                const nextQIndex = answer.search(/\n\n\*\*Q/i);
                if (nextQIndex !== -1) {
                    answer = answer.substring(0, nextQIndex).trim();
                }

                questions.push({
                    q: question,
                    a: answer
                });
            }
        }

        return questions;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-400">
                <p className="font-semibold text-lg">Error loading viva questions:</p>
                <p className="text-sm mt-2">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <HelpCircle className="w-6 h-6 text-purple-500" />
                <span>Viva Flashcards</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questions.length > 0 ? (
                    questions.map((item, index) => (
                        <VivaCard key={index} question={item.q} answer={item.a} />
                    ))
                ) : (
                    <p className="text-gray-400 col-span-2 text-center py-8">
                        No viva questions available for this experiment.
                    </p>
                )}
            </div>
        </div>
    );
};

export default VivaSection;
