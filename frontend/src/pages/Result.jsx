import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Coins, Star, Clock, Calendar, Check, Utensils, Landmark, Ticket, Send, Mail, User, Phone, MessageSquare, Loader2 } from 'lucide-react';

export default function Result({ tripData }) {
  const [bookingModal, setBookingModal] = useState({ isOpen: false, hotel: null });
  const [bookingDetails, setBookingDetails] = useState({ checkIn: '', checkOut: '', guests: 1 });
  const [bookStatus, setBookStatus] = useState({ loading: false, success: '', error: '' });
  
  // Email Modal State
  const [emailModal, setEmailModal] = useState({ isOpen: false, email: '' });
  const [emailStatus, setEmailStatus] = useState({ loading: false, success: '', error: '' });

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '' });
  const [contactStatus, setContactStatus] = useState({ loading: false, success: '', error: '' });

  if (!tripData) {
    return <Navigate to="/plan-trip" />;
  }

  const { destination, budget, days, budget_breakdown, daily_schedule, temples, famous_places, hotels, restaurants } = tripData;

  const handleBookHotel = async (e) => {
    e.preventDefault();
    setBookStatus({ loading: true, success: '', error: '' });
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/bookings/book-hotel', {
        hotelName: bookingModal.hotel.name,
        checkIn: bookingDetails.checkIn,
        checkOut: bookingDetails.checkOut,
        guests: Number(bookingDetails.guests)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setBookStatus({ loading: false, success: 'Booking confirmed successfully!', error: '' });
      setTimeout(() => {
        setBookingModal({ isOpen: false, hotel: null });
        setBookStatus({ loading: false, success: '', error: '' });
      }, 2000);
    } catch (err) {
      setBookStatus({ loading: false, success: '', error: err.response?.data?.message || 'Error making booking' });
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setEmailStatus({ loading: true, success: '', error: '' });
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/trips/send-email', {
        email: emailModal.email,
        tripData: tripData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmailStatus({ loading: false, success: 'Trip plan sent successfully!', error: '' });
      setTimeout(() => setEmailModal({ ...emailModal, isOpen: false }), 2000);
    } catch (err) {
      setEmailStatus({ loading: false, success: '', error: err.response?.data?.message || 'Error sending email' });
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ loading: true, success: '', error: '' });
    try {
      await axios.post('http://localhost:5000/api/contact', contactForm);
      setContactStatus({ loading: false, success: 'Your message has been sent!', error: '' });
      setContactForm({ name: '', email: '', phone: '' });
      setTimeout(() => setContactStatus({ loading: false, success: '', error: '' }), 3000);
    } catch (err) {
      setContactStatus({ loading: false, success: '', error: 'Error sending message' });
    }
  };

  return (
    <div className="pb-20 animate-fade-in relative z-10">
      
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4 capitalize">
          Your Trip to {destination}
        </h1>
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center gap-6 text-gray-400 font-medium text-lg">
            <span className="flex items-center gap-2"><Calendar className="text-primary w-5 h-5"/> {days} Days</span>
            <span className="flex items-center gap-2"><Coins className="text-secondary w-5 h-5"/> ₹{budget} Total Budget</span>
          </div>
          <button 
            onClick={() => setEmailModal({ ...emailModal, isOpen: true })}
            className="flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 rounded-full transition-all font-bold"
          >
            <Send className="w-5 h-5" /> Send Trip Plan to Email
          </button>
        </div>
      </div>

      <div className="space-y-12">
        
        {/* Top Section: Budget */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <Coins className="text-accent" /> Budget Optimization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300">Hotels (40%)</span>
                <span className="font-semibold text-white">₹{budget_breakdown?.hotels}</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300">Food (30%)</span>
                <span className="font-semibold text-white">₹{budget_breakdown?.food}</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300">Travel & Misc (30%)</span>
                <span className="font-semibold text-white">₹{budget_breakdown?.travel}</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Schedule - Full Width */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
            <Calendar className="text-primary" /> Daily Schedule
          </h2>
          {/* Sticky Day Navigation (visible for trips > 3 days) */}
          {days > 3 && (
            <div className="sticky top-20 z-20 mb-6 bg-[#161f36]/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex gap-2 overflow-x-auto no-scrollbar">
              {daily_schedule?.map((dayPlan) => (
                <a 
                  key={dayPlan.day}
                  href={`#day-${dayPlan.day}`}
                  className="px-4 py-2 bg-white/5 hover:bg-primary/20 rounded-xl text-sm font-bold whitespace-nowrap transition-all border border-transparent hover:border-primary/30"
                >
                  Day {dayPlan.day}
                </a>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {daily_schedule?.map((dayPlan) => (
              <div 
                key={dayPlan.day} 
                id={`day-${dayPlan.day}`}
                className="glass-card flex flex-col h-full border-t-4 border-t-primary scroll-mt-32"
              >
                <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
                  <h3 className="font-bold text-xl text-primary">Day {dayPlan.day}</h3>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded font-bold">{dayPlan.places.length} Locations</span>
                </div>
                <div className="p-4 space-y-3 flex-1">
                  {dayPlan.places.map((place, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="font-medium text-white flex justify-between">
                        <span>{place.name}</span>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 uppercase tracking-wider">{place.type}</span>
                      </div>
                      <div className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {place.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Famous Places */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
            <MapPin className="text-primary" /> Top Famous Landmarks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {famous_places?.map((place, i) => (
              <div key={i} className="glass-card p-5 group hover:-translate-y-1 transition-all">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{place.name}</h3>
                <p className="text-sm text-gray-400 flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3 text-gray-500" /> {place.location}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">{place.description}</p>
              </div>
            ))}
          </div>
        </section>

          {/* Temples and Spiritual Tourism */}
          {temples && temples.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <Landmark className="text-accent" /> Spiritual & Historical Sites
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {temples.map((temple, i) => (
                  <div key={i} className="glass-card p-6 bg-accent/5 hover:bg-accent/10 border-accent/20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-accent mb-1">{temple.name}</h3>
                        <p className="text-sm text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {temple.location}</p>
                      </div>
                      {temple.rating && (
                         <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded text-accent font-bold text-sm">
                           {temple.rating} <Star className="w-3 h-3 fill-accent" />
                         </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-gray-300"><Clock className="w-4 h-4 text-gray-500"/> {temple.timings || 'Varies'}</div>
                      <div className="flex items-center gap-2 text-gray-300"><Ticket className="w-4 h-4 text-gray-500"/> Fee: {temple.entryFee || 'Free'}</div>
                    </div>

                    {temple.history && (
                      <div className="bg-black/20 p-4 rounded-lg text-sm border border-white/5">
                        <div className="font-semibold text-gray-200 mb-2">Historical Context</div>
                        <ul className="space-y-1 text-gray-400">
                          <li><span className="text-gray-500">Dynasty:</span> {temple.history.dynasty} ({temple.history.year})</li>
                          <li><span className="text-gray-500">Builder:</span> {temple.history.builder}</li>
                          <li className="italic mt-2">"{temple.history.importance}"</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hotels */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
              <span className="text-2xl">🏨</span> Recommended Hotels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotels?.map((hotel, i) => (
                <div key={i} className="glass-card p-5 flex flex-col h-full bg-blue-900/10 hover:bg-blue-900/20">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{hotel.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mb-4"><MapPin className="w-3 h-3" /> {hotel.location}</p>
                    
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-2xl font-bold text-white">
                        ₹{hotel.pricePerNight} <span className="text-sm font-normal text-gray-400">/night</span>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-sm font-bold">
                        {hotel.rating} <Star className="w-3 h-3 fill-yellow-400" />
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setBookingModal({ isOpen: true, hotel })}
                    className="w-full py-3 bg-primary/20 hover:bg-primary text-primary hover:text-white border border-primary/50 rounded-xl transition-colors font-medium"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Restaurants */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
              <Utensils className="text-secondary" /> Popular Restaurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {restaurants?.map((rest, i) => (
                <div key={i} className="glass-card p-4 hover:border-secondary/30 transition-colors">
                  <h3 className="font-bold text-white mb-1">{rest.name}</h3>
                  <div className="text-sm text-secondary mb-2">{rest.cuisine}</div>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" /> {rest.location}</p>
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-300">
                    {rest.rating} <Star className="w-3 h-3 fill-gray-500" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Us Section */}
          <section className="pt-12 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-10 bg-gradient-to-br from-[#1e293b]/50 to-transparent">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold flex items-center justify-center gap-3 mb-2">
                    <Mail className="text-primary" /> 📬 Contact Us
                  </h2>
                  <p className="text-gray-400">Have questions? Send us a message and we'll get back to you!</p>
                </div>

                {contactStatus.success && (
                  <div className="bg-secondary/20 border border-secondary text-secondary p-4 rounded-xl mb-6 flex items-center gap-2 animate-bounce">
                    <Check className="w-5 h-5" /> {contactStatus.success}
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text"
                        placeholder="Your Name"
                        required
                        className="input-field pl-11"
                        value={contactForm.name}
                        onChange={e => setContactForm({...contactForm, name: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="email"
                        placeholder="Your Email"
                        required
                        className="input-field pl-11"
                        value={contactForm.email}
                        onChange={e => setContactForm({...contactForm, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="tel"
                      placeholder="Your Contact Number"
                      required
                      className="input-field pl-11"
                      value={contactForm.phone}
                      onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={contactStatus.loading}
                    className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                  >
                    {contactStatus.loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>

      {/* Email Plan Modal */}
      {emailModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-md p-8 bg-[#0f172a] border-primary/50 relative scale-in">
            <button 
              onClick={() => setEmailModal({ ...emailModal, isOpen: false })}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              &times;
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Send Trip Plan</h3>
              <p className="text-gray-400 text-sm">Enter your email to receive the full PDF-ready itinerary for {destination}.</p>
            </div>

            {emailStatus.success && (
              <div className="bg-secondary/20 border border-secondary text-secondary p-4 rounded-xl mb-6 flex items-center gap-2">
                <Check className="w-5 h-5" /> {emailStatus.success}
              </div>
            )}
            {emailStatus.error && (
              <div className="bg-danger/20 border border-danger text-danger p-4 rounded-xl mb-6">
                {emailStatus.error}
              </div>
            )}

            <form onSubmit={handleSendEmail} className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email"
                  className="input-field pl-11"
                  value={emailModal.email}
                  onChange={e => setEmailModal({...emailModal, email: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                disabled={emailStatus.loading || emailStatus.success}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg"
              >
                {emailStatus.loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Send Plan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal.isOpen && bookingModal.hotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 bg-[#161f36] border-primary/30 relative">
             <button 
                onClick={() => setBookingModal({isOpen: false, hotel: null})}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
             >
               &times;
             </button>
             
             <h3 className="text-2xl font-bold mb-2">Book {bookingModal.hotel.name}</h3>
             <p className="text-gray-400 text-sm mb-6 flex items-center gap-1">
               <MapPin className="w-4 h-4"/> {bookingModal.hotel.location}
             </p>

             {bookStatus.success && (
               <div className="bg-secondary/20 border border-secondary text-secondary px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                 <Check className="w-5 h-5"/> {bookStatus.success}
               </div>
             )}
             
             {bookStatus.error && (
               <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-lg mb-4">
                 {bookStatus.error}
               </div>
             )}

             <form onSubmit={handleBookHotel} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Check-in Date</label>
                  <input 
                    type="date" 
                    required 
                    className="input-field"
                    value={bookingDetails.checkIn}
                    onChange={e => setBookingDetails({...bookingDetails, checkIn: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Check-out Date</label>
                  <input 
                    type="date" 
                    required 
                    className="input-field"
                    value={bookingDetails.checkOut}
                    onChange={e => setBookingDetails({...bookingDetails, checkOut: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Number of Guests</label>
                  <input 
                    type="number" 
                    required 
                    min="1"
                    className="input-field"
                    value={bookingDetails.guests}
                    onChange={e => setBookingDetails({...bookingDetails, guests: e.target.value})}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={bookStatus.loading || bookStatus.success}
                  className="w-full btn-primary mt-4"
                >
                  {bookStatus.loading ? 'Confirming...' : 'Confirm Booking'}
                </button>
             </form>
          </div>
        </div>
      )}

    </div>
  );
}
