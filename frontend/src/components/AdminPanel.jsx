import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, User, Clock, ClipboardList } from 'lucide-react';

const AdminPanel = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/appointments')
            .then(res => {
                setAppointments(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center py-20 font-medium text-gray-500 text-lg">Loading database...</div>;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h2>
                    <p className="text-gray-500 mt-1">Manage all incoming dental appointments</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-2xl">
                    <ClipboardList className="w-8 h-8 text-blue-600" />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Patient Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Schedule</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Assigned Dentist</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {appointments.map((app) => (
                                <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                                <User className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{app.patientName}</div>
                                                <div className="text-sm text-gray-500">{app.age} yrs • {app.gender}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col text-sm">
                                            <span className="flex items-center font-semibold text-gray-700">
                                                <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                                                {new Date(app.appointmentDate).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center text-gray-500 mt-1">
                                                <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                                {new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-gray-900 font-medium">{app.dentistName}</div>
                                        <div className="text-xs text-blue-600 font-bold uppercase tracking-tighter">{app.clinicName}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full uppercase">Confirmed</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {appointments.length === 0 && (
                    <div className="py-20 text-center text-gray-400">No appointments found.</div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;