import React, { useState } from 'react';
import '../css/Notification.css';

function Notification() {
    const [notifications] = useState([
        {
            id: 1,
            type: 'info',
            title: '休講のお知らせ',
            message: '明日の数学の授業は休講となります。',
            date: '2024-03-15 10:30',
            isRead: false
        },
        {
            id: 2,
            type: 'assignment',
            title: '課題提出期限',
            message: '英語の課題提出期限は今週金曜日までです。',
            date: '2024-03-14 15:00',
            isRead: true
        }
    ]);

    return (
        <div className="notification-container">
            <div className="notification-header">
                <h2>通知</h2>
                <div className="notification-filters">
                    <button className="filter-button active">すべて</button>
                    <button className="filter-button">未読</button>
                    <button className="filter-button">既読</button>
                </div>
            </div>
            <div className="notification-list">
                {notifications.map(notification => (
                    <div 
                        key={notification.id} 
                        className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                    >
                        <div className="notification-icon">
                            {notification.type === 'info' ? '📢' : '📝'}
                        </div>
                        <div className="notification-content">
                            <div className="notification-title">
                                {notification.title}
                                {!notification.isRead && <span className="unread-badge">新着</span>}
                            </div>
                            <div className="notification-message">{notification.message}</div>
                            <div className="notification-date">{notification.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification; 