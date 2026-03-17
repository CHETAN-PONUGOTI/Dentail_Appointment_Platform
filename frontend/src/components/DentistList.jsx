import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, MapPin, Briefcase } from 'lucide-react';

const DentistList = ({ onBook }) => {
    const [dentists, setDentists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/dentists')
            .then(res => {
                setDentists(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center py-20">Loading dentists...</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {dentists.map(dentist => (
                <div key={dentist.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="relative">
                        <img src={dentist.photo} alt={dentist.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                            {dentist.experience} Years Exp
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{dentist.name}</h3>
                        <p className="text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wider">{dentist.qualification}</p>
                        
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center text-gray-600 text-sm">
                                <Briefcase className="w-4 h-4 mr-2" /> {dentist.clinic}
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="w-4 h-4 mr-2" /> {dentist.location}
                            </div>
                        </div>

                        <button 
                            onClick={() => onBook(dentist)}
                            className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200 hover:shadow-blue-200"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DentistList;