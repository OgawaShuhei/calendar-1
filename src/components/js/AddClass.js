import React, { useState, useEffect } from 'react';
import '../css/AddClass.css';

function AddClass({ onSave, onCancel }) {
    const [classData, setClassData] = useState({
        subject: '',
        time: '',
        date: new Date().toISOString().split('T')[0],
        duration: '60'
    });

    const [showShareUrl, setShowShareUrl] = useState(false);
    const [showNewSubject, setShowNewSubject] = useState(false);
    const [newSubject, setNewSubject] = useState('');

    // 既存の科目リスト
    const [subjects, setSubjects] = useState([
        '数学',
        '英語',
        '国語',
        '理科',
        '社会',
        '体育',
        '音楽',
        '美術',
        '特別講義'
    ]);

    const [isEditingSubjects, setIsEditingSubjects] = useState(false);
    const [editableSubjects, setEditableSubjects] = useState([
        '数学',
        '英語',
        '国語',
        '理科',
        '社会',
        '体育',
        '音楽',
        '美術',
        '特別講義'
    ]);

    useEffect(() => {
        const savedSubjects = localStorage.getItem('subjects');
        if (savedSubjects) {
            const parsedSubjects = JSON.parse(savedSubjects);
            setSubjects(parsedSubjects);
            setEditableSubjects(parsedSubjects);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(classData);
    };

    const handleAddNewSubject = () => {
        if (newSubject.trim()) {
            setSubjects(prev => [...prev, newSubject.trim()]);
            setClassData(prev => ({ ...prev, subject: newSubject.trim() }));
            setNewSubject('');
            setShowNewSubject(false);
        }
    };

    const handleSubjectChange = (e) => {
        const value = e.target.value;
        if (value === 'new') {
            setShowNewSubject(true);
        } else {
            setClassData({ 
                ...classData, 
                subject: value,
                type: value === '特別講義' ? 'special' : 'regular'
            });
        }
    };

    const generateShareUrl = () => {
        const baseUrl = window.location.origin;
        const params = new URLSearchParams({
            date: classData.date,
            subject: classData.subject,
            time: classData.time,
            duration: classData.duration,
            type: 'special'
        });
        return `${baseUrl}/?${params.toString()}`;
    };

    const handleCopyUrl = () => {
        const url = generateShareUrl();
        navigator.clipboard.writeText(url).then(() => {
            alert('URLをコピーしました！');
        });
    };

    const handleDeleteSubject = (subjectToDelete) => {
        setEditableSubjects(prev => prev.filter(subject => subject !== subjectToDelete));
        if (classData.subject === subjectToDelete) {
            setClassData(prev => ({ ...prev, subject: '' }));
        }
    };

    const handleEditSubjectList = () => {
        setSubjects(editableSubjects);
        localStorage.setItem('subjects', JSON.stringify(editableSubjects));
        setIsEditingSubjects(false);
    };

    return (
        <div className="add-class">
            <div className="add-class-header">
                <h2>授業を追加</h2>
                <button className="close-button" onClick={onCancel}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="add-class-form">
                <div className="form-group">
                    <div className="subject-header">
                        <label>科目</label>
                        <button 
                            type="button"
                            className="edit-subjects-button"
                            onClick={() => setIsEditingSubjects(!isEditingSubjects)}
                        >
                            {isEditingSubjects ? '完了' : '科目を編集'}
                        </button>
                    </div>
                    {isEditingSubjects ? (
                        <div className="subject-edit-container">
                            <div className="subject-list">
                                {editableSubjects.map((subject, index) => (
                                    <div key={index} className="subject-item">
                                        <span>{subject}</span>
                                        <button
                                            type="button"
                                            className="delete-subject-button"
                                            onClick={() => handleDeleteSubject(subject)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="new-subject-input">
                                <input
                                    type="text"
                                    value={newSubject}
                                    onChange={(e) => setNewSubject(e.target.value)}
                                    placeholder="新しい科目名"
                                    className="subject-input"
                                />
                                <button
                                    type="button"
                                    className="add-subject-button"
                                    onClick={() => {
                                        if (newSubject.trim()) {
                                            setEditableSubjects(prev => [...prev, newSubject.trim()]);
                                            setNewSubject('');
                                        }
                                    }}
                                >
                                    追加
                                </button>
                            </div>
                            <div className="edit-actions">
                                <button
                                    type="button"
                                    className="save-button"
                                    onClick={handleEditSubjectList}
                                >
                                    変更を保存
                                </button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => {
                                        setIsEditingSubjects(false);
                                        setEditableSubjects(subjects);
                                    }}
                                >
                                    キャンセル
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="subject-select-container">
                            <select
                                value={showNewSubject ? 'new' : classData.subject}
                                onChange={handleSubjectChange}
                                required
                                className="subject-select"
                            >
                                <option value="">科目を選択</option>
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                                <option value="new">+ 新しい科目を追加</option>
                            </select>
                            {showNewSubject && (
                                <div className="new-subject-input">
                                    <input
                                        type="text"
                                        value={newSubject}
                                        onChange={(e) => setNewSubject(e.target.value)}
                                        placeholder="新しい科目名"
                                        className="subject-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddNewSubject}
                                        className="add-subject-button"
                                    >
                                        追加
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowNewSubject(false);
                                            setNewSubject('');
                                        }}
                                        className="cancel-subject-button"
                                    >
                                        キャンセル
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>日付</label>
                    <input
                        type="date"
                        value={classData.date}
                        onChange={(e) => setClassData({...classData, date: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>時間</label>
                    <input
                        type="time"
                        value={classData.time}
                        onChange={(e) => setClassData({...classData, time: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>授業時間（分）</label>
                    <select
                        value={classData.duration}
                        onChange={(e) => setClassData({...classData, duration: e.target.value})}
                    >
                        <option value="45">45分</option>
                        <option value="60">60分</option>
                        <option value="90">90分</option>
                    </select>
                </div>
                <div className="share-section">
                    <button 
                        type="button" 
                        className="share-button"
                        onClick={() => setShowShareUrl(!showShareUrl)}
                    >
                        🔗 共有URLを生成
                    </button>
                    {showShareUrl && (
                        <div className="share-url-container">
                            <input
                                type="text"
                                value={generateShareUrl()}
                                readOnly
                                className="share-url-input"
                            />
                            <button 
                                type="button"
                                className="copy-button"
                                onClick={handleCopyUrl}
                            >
                                📋 コピー
                            </button>
                        </div>
                    )}
                </div>
                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-button">
                        キャンセル
                    </button>
                    <button type="submit" className="save-button">
                        保存
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddClass; 