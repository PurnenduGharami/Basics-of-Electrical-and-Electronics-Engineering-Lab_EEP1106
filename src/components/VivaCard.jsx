import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const VivaCard = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="perspective-1000 h-64 cursor-pointer group"
            onClick={() => setFlipped(!flipped)}
        >
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                {/* Front - Question */}
                <div className="absolute w-full h-full glass-panel border border-white/10 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center text-center backface-hidden group-hover:border-primary-500/30 transition-colors overflow-auto">
                    <HelpCircle className="w-8 h-8 text-primary-400 mb-3 opacity-80 flex-shrink-0" />
                    <div className="markdown-viva text-white text-base flex-1 overflow-auto max-w-full">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                p: ({ node, ...props }) => <p className="font-medium text-white leading-relaxed" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-primary-300 font-bold" {...props} />,
                                code: ({ node, inline, ...props }) =>
                                    inline
                                        ? <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-primary-400" {...props} />
                                        : <code className="text-sm" {...props} />,
                            }}
                        >
                            {question}
                        </ReactMarkdown>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 flex-shrink-0">Tap to flip</p>
                </div>

                {/* Back - Answer */}
                <div className="absolute w-full h-full bg-gradient-to-br from-primary-900 to-dark-bg border border-primary-500/30 text-white rounded-xl p-6 flex flex-col items-center justify-center backface-hidden rotate-y-180 overflow-auto">
                    <div className="markdown-viva text-gray-200 text-sm leading-relaxed overflow-auto max-w-full">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                p: ({ node, ...props }) => <p className="mb-2 text-gray-200 leading-relaxed" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1 text-gray-200" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 space-y-1 text-gray-200" {...props} />,
                                li: ({ node, ...props }) => <li className="text-gray-200" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                code: ({ node, inline, ...props }) =>
                                    inline
                                        ? <code className="bg-white/10 px-1 py-0.5 rounded text-xs text-primary-300" {...props} />
                                        : <code className="text-sm bg-gray-900 p-2 rounded block" {...props} />,
                                em: ({ node, ...props }) => <em className="italic text-gray-300" {...props} />,
                            }}
                        >
                            {answer}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VivaCard;
