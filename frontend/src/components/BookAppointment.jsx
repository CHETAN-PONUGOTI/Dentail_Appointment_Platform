import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const BookAppointment = ({ dentist, onBack }) => {
    const [formData, setFormData] = useState({ patientName: '', age: '', gender: 'Male', appointmentDate: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await axios.post('https://dentail-appointment-platform-3.onrender.com/api/appointments', { ...formData, dentistId: dentist.id });
            setStatus('success');
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-md mx-auto my-12 p-10 bg-white rounded-3xl shadow-2xl text-center border border-green-100">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-20 h-20 text-green-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">All Set!</h2>
                <p className="text-gray-500 mb-8">Your visit with {dentist.name} is confirmed.</p>
                <button onClick={onBack} className="w-full py-3 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition-all">
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-8 p-4">
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-800 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to listings
            </button>
            
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                <div className="md:w-1/3 bg-blue-600 p-8 text-white">
                    <h2 className="text-2xl font-bold mb-4">Booking with {dentist.name}</h2>
                    <p className="text-blue-100 text-sm leading-relaxed">Please fill in the patient details to secure your time slot at {dentist.clinic}.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="md:w-2/3 p-8 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Patient Name</label>
                        <input required className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                        onChange={e => setFormData({...formData, patientName: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Age</label>
                            <input required type="number" className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                            onChange={e => setFormData({...formData, age: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Gender</label>
                            <select className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                            onChange={e => setFormData({...formData, gender: e.target.value})}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Preferred Date & Time</label>
                        <input required type="datetime-local" className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                        onChange={e => setFormData({...formData, appointmentDate: e.target.value})} />
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                        {status === 'submitting' ? 'Processing...' : 'Confirm Appointment'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;