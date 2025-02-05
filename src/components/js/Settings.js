import React, { useState } from 'react';
import '../css/Settings.css';

function Settings({ onThemeChange, currentTheme }) {
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            browser: true,
            schedule: true,
            assignment: true
        },
        display: {
            theme: currentTheme,
            language: 'ja',
            startOfWeek: 'monday'
        },
        profile: {
            name: '田中 太郎',
            email: 'tanaka.t@school.edu',
            subject: '数学',
            phone: '090-1234-5678'
        }
    });

    const handleNotificationChange = (key) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    const handleDisplayChange = (key, value) => {
        if (key === 'theme') {
            onThemeChange(value);
        }
        setSettings(prev => ({
            ...prev,
            display: {
                ...prev.display,
                [key]: value
            }
        }));
    };

    const handleProfileChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            profile: {
                ...prev.profile,
                [key]: value
            }
        }));
    };

    return (
        <div className="settings-container">
            <h2>設定</h2>
            
            <section className="settings-section">
                <h3>プロフィール設定</h3>
                <div className="settings-form">
                    <div className="form-group">
                        <label>名前</label>
                        <input
                            type="text"
                            value={settings.profile.name}
                            onChange={(e) => handleProfileChange('name', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>メールアドレス</label>
                        <input
                            type="email"
                            value={settings.profile.email}
                            onChange={(e) => handleProfileChange('email', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>担当科目</label>
                        <input
                            type="text"
                            value={settings.profile.subject}
                            onChange={(e) => handleProfileChange('subject', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>電話番号</label>
                        <input
                            type="tel"
                            value={settings.profile.phone}
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <h3>通知設定</h3>
                <div className="settings-list">
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <div className="settings-item-title">メール通知</div>
                            <div className="settings-item-description">重要な更新をメールで受け取る</div>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={settings.notifications.email}
                                onChange={() => handleNotificationChange('email')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <div className="settings-item-title">ブラウザ通知</div>
                            <div className="settings-item-description">ブラウザでプッシュ通知を受け取る</div>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={settings.notifications.browser}
                                onChange={() => handleNotificationChange('browser')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <h3>表示設定</h3>
                <div className="settings-form">
                    <div className="form-group">
                        <label>テーマ</label>
                        <select
                            value={settings.display.theme}
                            onChange={(e) => handleDisplayChange('theme', e.target.value)}
                        >
                            <option value="light">ライト</option>
                            <option value="dark">ダーク</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>言語</label>
                        <select
                            value={settings.display.language}
                            onChange={(e) => handleDisplayChange('language', e.target.value)}
                        >
                            <option value="ja">日本語</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>週の開始日</label>
                        <select
                            value={settings.display.startOfWeek}
                            onChange={(e) => handleDisplayChange('startOfWeek', e.target.value)}
                        >
                            <option value="monday">月曜日</option>
                            <option value="sunday">日曜日</option>
                        </select>
                    </div>
                </div>
            </section>

            <div className="settings-actions">
                <button className="save-button">変更を保存</button>
            </div>
        </div>
    );
}

export default Settings; 