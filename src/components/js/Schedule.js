import React from 'react';
import '../css/Schedule.css';

function Schedule({ day, lessons, onLessonChange, subjects }) {
    const periods = ['1限目', '2限目', '3限目', '4限目', '5限目', '6限目'];

    return (
        <div className="schedule">
            <h2>{day}の時間割</h2>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>時限</th>
                        <th>科目</th>
                    </tr>
                </thead>
                <tbody>
                    {periods.map((period, index) => (
                        <tr key={index}>
                            <td>{period}</td>
                            <td>
                                <select
                                    value={lessons[index] || ''}
                                    onChange={(e) => onLessonChange(index, e.target.value)}
                                >
                                    <option value="">科目を選択</option>
                                    {subjects.map((subject, i) => (
                                        <option key={i} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedule; 