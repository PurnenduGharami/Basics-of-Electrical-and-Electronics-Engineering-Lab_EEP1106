import React, { useState, useEffect } from 'react';

const VivaQuestionsLoader = ({ filePath }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/${filePath}`);

                if (!response.ok) {
                    throw new Error(`Failed to load ${filePath}`);
                }

                const text = await response.text();

                // Parse markdown questions - format is "**Q:** question\n**A:** answer"
                const parsedQuestions = parseMarkdownQuestions(text);
                setQuestions(parsedQuestions);
            } catch (err) {
                console.error('Error loading viva questions:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (filePath) {
            loadQuestions();
        }
    }, [filePath]);

    const parseMarkdownQuestions = (markdown) => {
        const questions = [];

        // Split by **Q:** to get question blocks
        const blocks = markdown.split(/\*\*Q:\*\*/);

        // Skip the first empty block
        for (let i = 1; i < blocks.length; i++) {
            const block = blocks[i];

            // Split by **A:** to separate question and answer
            const parts = block.split(/\*\*A:\*\*/);

            if (parts.length >= 2) {
                const question = parts[0].trim();
                const answer = parts[1].trim().replace(/\n\n.*$/s, ''); // Remove next question

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
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
                <p className="font-semibold">Error loading viva questions:</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    return { questions };
};

export default VivaQuestionsLoader;
