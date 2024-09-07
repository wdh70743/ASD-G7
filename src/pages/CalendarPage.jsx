import React from 'react'
import './Styles/DashboardPage.css';
import Hero from '../components/Dashboard/Components/Hero';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Big Meeting',
        start: new Date(2024, 8, 10, 10, 0),
        end: new Date(2024, 8, 10, 12, 0),
    },
    {
        title: 'Vacation',
        start: new Date(2024, 8, 20),
        end: new Date(2024, 8, 30),
    },
];
const CalendarPage = () => {
    return (
        <div className="dashboard-page">
            <Hero />
            <div style={{ padding: 20}}>
                <div style={{ height: 500 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </div>
            </div>
        </div>
    );
}

export default CalendarPage