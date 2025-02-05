import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Calendar.css';

function Calendar({ selectedDay, setSelectedDay, schedule, onAddSchedule, userType }) {
    const [showDayDetail, setShowDayDetail] = useState(false);
    const [selectedDaySchedule, setSelectedDaySchedule] = useState([]);
    const location = useLocation();
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [hasAddedFromUrl, setHasAddedFromUrl] = useState(false);

    useEffect(() => {
        // URLからの追加が既に行われている場合は処理をスキップ
        if (hasAddedFromUrl) return;

        // URLパラメータからスケジュール情報を取得
        const params = new URLSearchParams(location.search);
        const scheduleData = {
            date: params.get('date'),
            subject: params.get('subject'),
            time: params.get('time'),
            duration: params.get('duration'),
            type: params.get('type')
        };

        // 全てのパラメータが存在する場合のみスケジュールを追加
        if (scheduleData.date && scheduleData.subject && scheduleData.time) {
            // 同じ日時の予定が存在するかチェック
            const existingSchedule = schedule[scheduleData.date] || [];
            const isDuplicate = existingSchedule.some(item => 
                item.time === scheduleData.time && 
                item.subject === scheduleData.subject
            );

            // 重複がない場合のみ追加
            if (!isDuplicate) {
                onAddSchedule(scheduleData);
                setHasAddedFromUrl(true);  // 追加後にフラグを設定
            } else {
                setHasAddedFromUrl(true);  // 重複の場合もフラグを設定
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]); // locationの代わりにlocation.searchを使用

    const getMonthDays = () => {
        const days = [];
        const firstDay = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), 1);
        const lastDay = new Date(selectedDay.getFullYear(), selectedDay.getMonth() + 1, 0);
        
        // 月初めの週の前月部分を追加
        const firstDayOfWeek = firstDay.getDay();
        for (let i = 0; i < firstDayOfWeek; i++) {
            const prevDate = new Date(firstDay);
            prevDate.setDate(prevDate.getDate() - (firstDayOfWeek - i));
            days.push(prevDate);
        }
        
        // 当月の日付を追加
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(selectedDay.getFullYear(), selectedDay.getMonth(), i));
        }
        
        // 月末の週の翌月部分を追加
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const nextDate = new Date(lastDay);
            nextDate.setDate(nextDate.getDate() + i);
            days.push(nextDate);
        }
        
        return days;
    };

    const getDaySchedule = (day) => {
        const dateKey = day.toISOString().split('T')[0];
        return schedule[dateKey] || [];
    };

    const renderScheduleItem = (item) => {
        return (
            <div className={`schedule-item ${item.type || ''}`}>
                {item.subject} {item.time}
            </div>
        );
    };

    const handleDayClick = (day) => {
        setSelectedDay(new Date(day));
        const daySchedule = getDaySchedule(day);
        if (daySchedule.length > 0) {
            setSelectedDaySchedule(daySchedule);
            setShowDayDetail(true);
        }
    };

    const formatTime = (time) => {
        return time.split(':').slice(0, 2).join(':');
    };

    const formatDuration = (duration) => {
        return `${duration}分`;
    };

    const handleEditSchedule = (item) => {
        setEditingSchedule(item);
    };

    const handleUpdateSchedule = (updatedItem) => {
        const dateKey = selectedDay.toISOString().split('T')[0];
        const updatedSchedule = { ...schedule };
        
        // 既存のスケジュールを更新
        updatedSchedule[dateKey] = schedule[dateKey].map(item => 
            item.time === editingSchedule.time && 
            item.subject === editingSchedule.subject ? 
            updatedItem : item
        );

        onAddSchedule(updatedSchedule);
        setEditingSchedule(null);
    };

    const handleDeleteSchedule = (itemToDelete) => {
        if (window.confirm('このスケジュールを削除してもよろしいですか？')) {
            const dateKey = selectedDay.toISOString().split('T')[0];
            const updatedSchedule = { ...schedule };
            
            // その日のスケジュールが存在する場合のみ処理を行う
            if (updatedSchedule[dateKey]) {
                updatedSchedule[dateKey] = updatedSchedule[dateKey].filter(item => 
                    !(item.time === itemToDelete.time && item.subject === itemToDelete.subject)
                );

                // スケジュールリストも更新
                setSelectedDaySchedule(updatedSchedule[dateKey]);

                // スケジュールが空になった場合はモーダルを閉じる
                if (updatedSchedule[dateKey].length === 0) {
                    setShowDayDetail(false);
                }

                onAddSchedule(updatedSchedule);
            }
        }
    };

    return (
        <div className="calendar">
            <div className="calendar-navigation">
                <button onClick={() => setSelectedDay(new Date(selectedDay.setMonth(selectedDay.getMonth() - 1)))}>前月</button>
                <h2>{selectedDay.getFullYear()}年{selectedDay.getMonth() + 1}月</h2>
                <button onClick={() => setSelectedDay(new Date(selectedDay.setMonth(selectedDay.getMonth() + 1)))}>次月</button>
            </div>
            <div className="calendar-grid">
                <div className="calendar-header">
                    {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                        <div key={day} className="calendar-header-cell">{day}</div>
                    ))}
                </div>
                <div className="month-view">
                    {getMonthDays().map((day, index) => (
                        <div
                            key={index}
                            className={`day-cell ${
                                day.getMonth() !== selectedDay.getMonth() ? 'other-month' : ''
                            } ${
                                day.toDateString() === selectedDay.toDateString() ? 'selected' : ''
                            }`}
                            onClick={() => handleDayClick(day)}
                        >
                            <div className="day-content">
                                <div className="day-number">{day.getDate()}</div>
                                <div className="day-schedule">
                                    {getDaySchedule(day).map((item, i) => (
                                        <React.Fragment key={i}>
                                            {renderScheduleItem(item)}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* スケジュール詳細モーダル */}
            {showDayDetail && (
                <div className="schedule-detail-modal">
                    <div className="schedule-detail-content">
                        <div className="schedule-detail-header">
                            <h3>{selectedDay.getFullYear()}年{selectedDay.getMonth() + 1}月{selectedDay.getDate()}日のスケジュール</h3>
                            <button 
                                className="close-button"
                                onClick={() => {
                                    setShowDayDetail(false);
                                    setEditingSchedule(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className="schedule-detail-list">
                            {selectedDaySchedule.length === 0 ? (
                                <p className="no-schedule">予定はありません</p>
                            ) : (
                                selectedDaySchedule
                                    .sort((a, b) => a.time.localeCompare(b.time))
                                    .map((item, index) => (
                                        editingSchedule === item ? (
                                            <div key={index} className="schedule-edit-form">
                                                <div className="edit-form-group">
                                                    <label>時間</label>
                                                    <input
                                                        type="time"
                                                        value={editingSchedule.time}
                                                        onChange={(e) => setEditingSchedule({
                                                            ...editingSchedule,
                                                            time: e.target.value
                                                        })}
                                                    />
                                                </div>
                                                <div className="edit-form-group">
                                                    <label>所要時間（分）</label>
                                                    <select
                                                        value={editingSchedule.duration}
                                                        onChange={(e) => setEditingSchedule({
                                                            ...editingSchedule,
                                                            duration: e.target.value
                                                        })}
                                                    >
                                                        <option value="45">45分</option>
                                                        <option value="60">60分</option>
                                                        <option value="90">90分</option>
                                                    </select>
                                                </div>
                                                <div className="edit-form-actions">
                                                    <button
                                                        className="save-button"
                                                        onClick={() => handleUpdateSchedule(editingSchedule)}
                                                    >
                                                        保存
                                                    </button>
                                                    <button
                                                        className="cancel-button"
                                                        onClick={() => setEditingSchedule(null)}
                                                    >
                                                        キャンセル
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div 
                                                key={index} 
                                                className={`schedule-detail-item ${item.type || ''}`}
                                            >
                                                <div className="schedule-time">
                                                    {formatTime(item.time)}
                                                    <span className="schedule-duration">
                                                        ({formatDuration(item.duration)})
                                                    </span>
                                                </div>
                                                <div className="schedule-subject">
                                                    {item.subject}
                                                </div>
                                                {item.type === 'special' && (
                                                    <span className="special-badge">
                                                        🌟 特別講義
                                                    </span>
                                                )}
                                                <div className="schedule-actions">
                                                    <button
                                                        className="edit-button"
                                                        onClick={() => handleEditSchedule(item)}
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className="delete-button"
                                                        onClick={() => handleDeleteSchedule(item)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calendar; 