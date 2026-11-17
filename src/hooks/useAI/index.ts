import { useState } from 'react';
import { useApiClient } from '@/lib/api-client';

export function useAI() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const api = useApiClient();

    const sendMessage = async (message: string, context?: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/ai/chat', { message, context });
            return data.response;
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
            const { data } = await api.post('/ai/generate', { topic, type });
            return data.content;
        } catch (err) {
            setError('Failed to generate content');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, generateContent, loading, error };
}