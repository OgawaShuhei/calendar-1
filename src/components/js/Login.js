import React, { useState } from 'react';
import '../css/Login.css';

function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({
        id: '',
        password: '',
        userType: 'teacher'  // デフォルトは教員
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // 実際のアプリケーションではここでAPI認証を行う
        const mockUserData = credentials.userType === 'teacher' 
            ? {
                name: '田中 太郎',
                subject: '数学',
                id: 'T12345',
                type: 'teacher'
            }
            : {
                name: '山田 花子',
                grade: 2,
                class: 3,
                number: 15,
                id: 'S67890',
                type: 'student'
            };
        onLogin(mockUserData);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>授業管理システム</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>ユーザータイプ</label>
                        <div className="user-type-toggle">
                            <button
                                type="button"
                                className={`toggle-button ${credentials.userType === 'teacher' ? 'active' : ''}`}
                                onClick={() => setCredentials({...credentials, userType: 'teacher'})}
                            >
                                👨‍🏫 教員
                            </button>
                            <button
                                type="button"
                                className={`toggle-button ${credentials.userType === 'student' ? 'active' : ''}`}
                                onClick={() => setCredentials({...credentials, userType: 'student'})}
                            >
                                👨‍🎓 生徒
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            type="text"
                            value={credentials.id}
                            onChange={(e) => setCredentials({...credentials, id: e.target.value})}
                            required
                            placeholder={credentials.userType === 'teacher' ? 'T12345' : 'S67890'}
                        />
                    </div>
                    <div className="form-group">
                        <label>パスワード</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        ログイン
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login; 