import React, { useState } from 'react';
import '../css/Assignment.css';

function Assignment() {
    const [assignments] = useState([
        {
            id: 1,
            subject: '数学',
            title: '二次関数の問題集',
            dueDate: '2024-03-20',
            status: 'pending',
            description: '教科書p.45-47の練習問題を解いてください。'
        },
        {
            id: 2,
            subject: '英語',
            title: 'リーディング課題',
            dueDate: '2024-03-18',
            status: 'completed',
            description: 'Chapter 5の和訳を完成させてください。'
        }
    ]);

    const [filter, setFilter] = useState('all');

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return '未提出';
            case 'completed': return '提出済';
            default: return status;
        }
    };

    const getFilteredAssignments = () => {
        if (filter === 'all') return assignments;
        return assignments.filter(a => a.status === filter);
    };

    return (
        <div className="assignment-container">
            <div className="assignment-header">
                <h2>課題一覧</h2>
                <div className="assignment-actions">
                    <div className="filter-group">
                        <button 
                            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            全て
                        </button>
                        <button 
                            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
                            onClick={() => setFilter('pending')}
                        >
                            未提出
                        </button>
                        <button 
                            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            提出済
                        </button>
                    </div>
                    <button className="add-assignment-button">
                        ＋ 課題を追加
                    </button>
                </div>
            </div>
            <div className="assignment-list">
                {getFilteredAssignments().map(assignment => (
                    <div key={assignment.id} className="assignment-card">
                        <div className="assignment-card-header">
                            <div className="assignment-subject">{assignment.subject}</div>
                            <div className={`assignment-status ${assignment.status}`}>
                                {getStatusLabel(assignment.status)}
                            </div>
                        </div>
                        <div className="assignment-title">{assignment.title}</div>
                        <div className="assignment-description">{assignment.description}</div>
                        <div className="assignment-footer">
                            <div className="assignment-due">
                                提出期限: {assignment.dueDate}
                            </div>
                            <button className="view-detail-button">
                                詳細を見る
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Assignment; 