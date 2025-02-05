import React, { useState, useEffect, useRef } from 'react';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import '../css/ChatBot.css';

function ChatBot({ schedule }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const model = new ChatOllama({
        baseUrl: 'http://localhost:11434',
        model: 'elyza/Llama-3-ELYZA-JP-8B-GGUF'
    });

    const prompt = ChatPromptTemplate.fromMessages([
        ['system', '以下のスケジュール情報を元にユーザーの質問に答えてください：{schedule}'],
        ['human', '{input}']
    ]);

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setIsLoading(true);

        try {
            const scheduleString = JSON.stringify(schedule, null, 2);
            const response = await chain.invoke({
                schedule: scheduleString,
                input: userMessage
            });

            setMessages(prev => [...prev, { text: response, isUser: false }]);
        } catch (error) {
            console.error('チャットボットエラー:', error);
            setMessages(prev => [...prev, {
                text: 'すみません、エラーが発生しました。',
                isUser: false
            }]);
        }

        setIsLoading(false);
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h3>スケジュールアシスタント</h3>
            </div>
            <div className="chatbot-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.isUser ? 'user' : 'bot'}`}
                    >
                        {message.text}
                    </div>
                ))}
                {isLoading && (
                    <div className="message bot loading">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="chatbot-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="スケジュールについて質問してください..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    送信
                </button>
            </form>
        </div>
    );
}

export default ChatBot; 