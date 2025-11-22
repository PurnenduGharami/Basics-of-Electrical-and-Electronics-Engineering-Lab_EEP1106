import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const MarkdownRenderer = ({ filePath }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/${filePath}`);

                if (!response.ok) {
                    throw new Error(`Failed to load ${filePath}`);
                }

                const text = await response.text();
                setContent(text);
            } catch (err) {
                console.error('Error loading markdown:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (filePath) {
            loadMarkdown();
        }
    }, [filePath]);

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
                <p className="font-semibold">Error loading content:</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="markdown-content prose prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    // Custom styling for dark theme with light text
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4 text-white" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-5 mb-3 text-gray-100" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-200" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-gray-300" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300" {...props} />,
                    li: ({ node, ...props }) => <li className="ml-4 text-gray-300" {...props} />,
                    code: ({ node, inline, ...props }) =>
                        inline
                            ? <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-primary-400" {...props} />
                            : <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm" {...props} />,
                    pre: ({ node, ...props }) => <pre className="mb-4" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-400 my-4" {...props} />,
                    table: ({ node, ...props }) => <table className="min-w-full divide-y divide-gray-700 my-4 border border-gray-700" {...props} />,
                    thead: ({ node, ...props }) => <thead className="bg-white/5" {...props} />,
                    tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-700" {...props} />,
                    th: ({ node, ...props }) => <th className="px-4 py-2 text-left font-semibold text-gray-200 border border-gray-700" {...props} />,
                    td: ({ node, ...props }) => <td className="px-4 py-2 border border-gray-700 text-gray-300" {...props} />,
                    a: ({ node, ...props }) => <a className="text-primary-400 hover:text-primary-300 underline" {...props} />,
                    img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-lg my-4" {...props} />,
                    strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                    em: ({ node, ...props }) => <em className="text-gray-300 italic" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
