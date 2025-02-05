const API_ENDPOINT = 'YOUR_API_GATEWAY_ENDPOINT';

export const sendTeamsNotification = async (scheduleData) => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleData)
        });
        
        if (!response.ok) {
            throw new Error('通知の送信に失敗しました');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Teams通知エラー:', error);
        throw error;
    }
}; 