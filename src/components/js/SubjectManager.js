import React, { useState } from 'react';
import './SubjectManager.css';

function SubjectManager({ onAddSubject, onDeleteSubject, subjects }) {
    const [newSubject, setNewSubject] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newSubject.trim()) {
            onAddSubject(newSubject.trim());
            setNewSubject('');
        }
    };

    return (
        <div className="subject-manager">
            <h3>科目管理</h3>
            <form onSubmit={handleSubmit} className="subject-form">
                <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="新しい科目名"
                    className="subject-input"
                />
                <button type="submit" className="add-button">追加</button>
            </form>
            <div className="subject-list">
                <h4>登録済み科目</h4>
                {subjects.map((subject, index) => (
                    <div key={index} className="subject-item">
                        <span>{subject}</span>
                        <button 
                            onClick={() => onDeleteSubject(subject)}
                            className="delete-button"
                        >
                            削除
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubjectManager; 