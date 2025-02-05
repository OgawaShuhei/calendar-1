import React from 'react';
import '../css/UserProfile.css';

function UserProfile({ userType, userData }) {
    const getUserIcon = (type) => {
        switch (type) {
            case 'teacher':
                return '👨‍🏫';
            case 'student':
                return '👨‍🎓';
            default:
                return '👤';
        }
    };

    const getUserTypeLabel = (type) => {
        switch (type) {
            case 'teacher':
                return '教員';
            case 'student':
                return '生徒';
            default:
                return '';
        }
    };

    return (
        <div className="user-info">
            <div className="user-avatar">
                {getUserIcon(userType)}
            </div>
            <div className="user-details">
                <div className="user-name">{userData.name}</div>
                <div className="user-role">{getUserTypeLabel(userType)}</div>
                {userType === 'teacher' && (
                    <div className="user-subject">{userData.subject}科</div>
                )}
                {userType === 'student' && (
                    <>
                        <div className="user-class">{userData.grade}年{userData.class}組</div>
                        <div className="user-number">出席番号: {userData.number}</div>
                    </>
                )}
                <div className="user-id">ID: {userData.id}</div>
            </div>
        </div>
    );
}

export default UserProfile; 