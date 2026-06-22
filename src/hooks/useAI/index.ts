import { useState } from 'react';
import axios from 'axios';

export function useAI() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (message: string, context?: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/ai/chat', { message, context });
            return response.data.response;
        } catch (err) {
            setError('Failed to send message');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const generateContent = async (topic: string, type: 'blog' | 'description' | 'social') => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/ai/generate', { topic, type });
            return response.data.content;
        } catch (err) {
            setError('Failed to generate content');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, generateContent, loading, error };
}