import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/medicine.css'

function NotificationBadge() {
    const [notifications, setNotifications] = useState([]);
    const [showBadge, setShowBadge] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/inventory/notification.php');
                setNotifications(response.data);
                setShowBadge(response.data.length > 0);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        fetchNotifications();

        return () => clearInterval(interval);
    }, []);

    const markAsViewed = async () => {
        try {
            const ids = notifications.map(n => n.expiration_id);
            await axios.post('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/inventory/notification_seen.php', { ids });
            setNotifications([]);
            setShowBadge(false);
        } catch (error) {
            console.error('Error marking notifications as viewed:', error);
        }
    };

    return (
        <div className='Notification'>
            {showBadge && (
                <div onClick={markAsViewed} className='badge'>
                    {notifications.length}
                </div>
            )}
            <div>
                
            </div>
        </div>
    );
}

export default NotificationBadge;
