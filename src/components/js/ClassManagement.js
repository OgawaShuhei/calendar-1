import React, { useState } from 'react';
import '../css/ClassManagement.css';

function ClassManagement({ userType }) {
    const [classes, setClasses] = useState([
        {
            id: 1,
            name: '2年3組',
            subject: '数学',
            students: 35,
            schedule: '月曜3限, 水曜2限',
            room: '2-3教室'
        },
        {
            id: 2,
            name: '1年2組',
            subject: '数学',
            students: 32,
            schedule: '火曜1限, 木曜4限',
            room: '1-2教室'
        }
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newClass, setNewClass] = useState({
        name: '',
        subject: '',
        students: '',
        schedule: '',
        room: ''
    });

    const [accounts, setAccounts] = useState([
        { id: 1, name: '山田太郎', type: 'student', email: 'yamada@example.com' },
        { id: 2, name: '鈴木先生', type: 'teacher', email: 'suzuki@example.com' }
    ]);
    const [showAddAccount, setShowAddAccount] = useState(false);
    const [newAccount, setNewAccount] = useState({
        name: '',
        type: 'student',
        email: '',
        password: ''
    });

    const handleAddClass = (e) => {
        e.preventDefault();
        setClasses(prev => [...prev, {
            id: prev.length + 1,
            ...newClass,
            students: parseInt(newClass.students)
        }]);
        setNewClass({
            name: '',
            subject: '',
            students: '',
            schedule: '',
            room: ''
        });
        setShowAddForm(false);
    };

    const handleAddAccount = (e) => {
        e.preventDefault();
        const newId = Math.max(...accounts.map(acc => acc.id)) + 1;
        setAccounts([...accounts, { ...newAccount, id: newId }]);
        setNewAccount({ name: '', type: 'student', email: '', password: '' });
        setShowAddAccount(false);
    };

    const handleDeleteAccount = (id) => {
        if (window.confirm('このアカウントを削除してもよろしいですか？')) {
            setAccounts(accounts.filter(acc => acc.id !== id));
        }
    };

    return (
        <div className="class-management">
            <div className="management-header">
                <h2>クラス管理</h2>
                {userType === 'admin' && (
                    <button 
                        className="add-account-button"
                        onClick={() => setShowAddAccount(true)}
                    >
                        ＋ アカウントを追加
                    </button>
                )}
            </div>

            {showAddAccount && (
                <div className="add-account-form">
                    <h3>新規アカウント作成</h3>
                    <form onSubmit={handleAddAccount}>
                        <div className="form-group">
                            <label>名前</label>
                            <input
                                type="text"
                                value={newAccount.name}
                                onChange={(e) => setNewAccount({
                                    ...newAccount,
                                    name: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>メールアドレス</label>
                            <input
                                type="email"
                                value={newAccount.email}
                                onChange={(e) => setNewAccount({
                                    ...newAccount,
                                    email: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>パスワード</label>
                            <input
                                type="password"
                                value={newAccount.password}
                                onChange={(e) => setNewAccount({
                                    ...newAccount,
                                    password: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>アカウントタイプ</label>
                            <select
                                value={newAccount.type}
                                onChange={(e) => setNewAccount({
                                    ...newAccount,
                                    type: e.target.value
                                })}
                            >
                                <option value="student">生徒</option>
                                <option value="teacher">教師</option>
                                <option value="admin">管理者</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={() => setShowAddAccount(false)}
                            >
                                キャンセル
                            </button>
                            <button type="submit" className="save-button">
                                作成
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="accounts-list">
                <h3>アカウント一覧</h3>
                <div className="accounts-grid">
                    {accounts.map(account => (
                        <div key={account.id} className="account-card">
                            <div className="account-info">
                                <h4>{account.name}</h4>
                                <p className="account-email">{account.email}</p>
                                <span className={`account-type ${account.type}`}>
                                    {account.type === 'student' ? '生徒' :
                                     account.type === 'teacher' ? '教師' : '管理者'}
                                </span>
                            </div>
                            {userType === 'admin' && (
                                <div className="account-actions">
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteAccount(account.id)}
                                    >
                                        削除
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="class-management-header">
                <h2>クラス管理</h2>
                {userType === 'teacher' && (
                    <button 
                        className="add-class-button"
                        onClick={() => setShowAddForm(true)}
                    >
                        ＋ クラスを追加
                    </button>
                )}
            </div>

            {showAddForm && userType === 'teacher' && (
                <div className="add-class-form-container">
                    <form onSubmit={handleAddClass} className="add-class-form">
                        <h3>新規クラス追加</h3>
                        <div className="form-group">
                            <label>クラス名</label>
                            <input
                                type="text"
                                value={newClass.name}
                                onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                                required
                                placeholder="例: 2年3組"
                            />
                        </div>
                        <div className="form-group">
                            <label>科目</label>
                            <input
                                type="text"
                                value={newClass.subject}
                                onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                                required
                                placeholder="例: 数学"
                            />
                        </div>
                        <div className="form-group">
                            <label>生徒数</label>
                            <input
                                type="number"
                                value={newClass.students}
                                onChange={(e) => setNewClass({...newClass, students: e.target.value})}
                                required
                                placeholder="例: 35"
                            />
                        </div>
                        <div className="form-group">
                            <label>授業時間</label>
                            <input
                                type="text"
                                value={newClass.schedule}
                                onChange={(e) => setNewClass({...newClass, schedule: e.target.value})}
                                required
                                placeholder="例: 月曜3限, 水曜2限"
                            />
                        </div>
                        <div className="form-group">
                            <label>教室</label>
                            <input
                                type="text"
                                value={newClass.room}
                                onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                                required
                                placeholder="例: 2-3教室"
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={() => setShowAddForm(false)} className="cancel-button">
                                キャンセル
                            </button>
                            <button type="submit" className="save-button">
                                保存
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="class-list">
                {classes.map(classItem => (
                    <div key={classItem.id} className="class-card">
                        <div className="class-card-header">
                            <h3>{classItem.name}</h3>
                            <span className="subject-badge">{classItem.subject}</span>
                        </div>
                        <div className="class-card-content">
                            <div className="class-info">
                                <div className="info-item">
                                    <span className="info-label">👥 生徒数:</span>
                                    <span>{classItem.students}名</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">📅 授業時間:</span>
                                    <span>{classItem.schedule}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">🏫 教室:</span>
                                    <span>{classItem.room}</span>
                                </div>
                            </div>
                        </div>
                        {userType === 'teacher' && (
                            <div className="class-card-actions">
                                <button className="action-button">
                                    📋 出席簿
                                </button>
                                <button className="action-button">
                                    📊 成績表
                                </button>
                                <button className="action-button">
                                    ⚙️ 設定
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClassManagement; 