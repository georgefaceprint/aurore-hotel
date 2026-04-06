import React, { useState, useEffect } from 'react';
import './index.css';
import { db, storage, auth } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, updateDoc, doc, deleteDoc, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import emailjs from '@emailjs/browser';

const translations = {
  en: {
    heroTitle: "L'Excellence Aurore Ecce",
    heroSub: "Experience the dawn of elegance in Lubumbashi. Premium guest rooms and luxury villas designed for your ultimate comfort and relaxation.",
    navVenue: "Elite Suites",
    navRestaurant: "Gastronomy",
    navBooking: "Reserve Your Stay",
    navAdmin: "Admin",
    hallTitle: "Exquisite Event Space",
    hallDesc: "From luxury weddings to professional conferences, our hall adapts to your needs with state-of-the-art facilities and elegant decor.",
    restTitle: "Terrace & Dining",
    restDesc: "Enjoy a fusion of international and local cuisines on our tropical terrace. The perfect spot for romantic dinners or business lunches.",
    bookBtn: "Check Availability",
    orderBtn: "Order Catering",
    footerText: "© 2026 Aurore Ecce Lubumbashi. All rights reserved.",
    formName: "First Name",
    formLastName: "Last Name",
    formEmail: "Email address",
    formPhone: "Phone number",
    formCountry: "Country/Region",
    formCheckIn: "Check-in Date",
    formCheckOut: "Check-out Date",
    formType: "Room Type",
    formGuests: "Number of Guests (Adults/Children)",
    formSelectRoom: "Select Your Suite / Villa",
    formSubmit: "Request Reservation",
    bookingSuccess: "Stay requested! Our team will contact you shortly via email or phone for confirmation.",
    adminDashboard: "Admin Dashboard",
    pendingBookings: "Pending Reservations",
    checkIn: "Check-in Guest",
    occupancy: "Current Occupancy",
    backHome: "Back to Site",
    adminReservations: "Reservations",
    adminRooms: "Spaces / Villas",
    adminAmenities: "Amenities",
    addRoom: "Add Space",
    roomName: "Space Name",
    roomCapacity: "Capacity",
    roomType: "Type",
    addAmenity: "Add Amenity",
    amenityName: "Amenity Name",
    amenityCategory: "Category",
    status: "Status",
    actions: "Actions",
    checkInBtn: "Check In",
    confirmBtn: "Confirm",
    adminEmployees: "Employees",
    adminAnalytics: "Reporting & Analytics",
    addEmployee: "Add Employee",
    empName: "Employee Name",
    empRole: "Role",
    empShift: "Shift",
    revenue: "Revenue",
    historical: "Historical Data",
    trends: "Monthly Trends",
    performance: "Performance Overview",
    price: "Price",
    availability: "Availability",
    selectAmenities: "Select Amenities",
    roomNumber: "Room Number / ID",
    uploadPhotos: "Upload Images",
    villasAndRooms: "Our Suites & Villas",
    chatWithUs: "Converser avec la Maison",
    typeMessage: "Your message...",
    adminChats: "Staff Chats",
    available: "Available",
    booked: "Reserved",
    night: "per night",
    reserved: "RESERVED",
    viewDetails: "Explore Suite",
    roomImages: "Room Photos (comma separated URLs)",
    searchAvail: "Search Availability",
    adults: "Adults",
    children: "Children",
    checkIn: "Arrival",
    checkOut: "Departure"
  },
  fr: {
    heroTitle: "L'Excellence Aurore Ecce",
    heroSub: "Vivez l'aube de l'élégance à Lubumbashi. Des chambres d'hôtes de prestige et des villas de luxe conçues pour votre confort ultime.",
    navVenue: "Nos Suites",
    navRestaurant: "Gastronomie",
    navBooking: "Réserver un Séjour",
    navAdmin: "Admin",
    hallTitle: "Espace Événementiel Raffiné",
    hallDesc: "Des mariages de luxe aux conférences professionnelles, notre salle s'adapte à vos besoins avec des installations de pointe et un décor élégant.",
    restTitle: "Terrasse & Restauration",
    restDesc: "Dégustez une fusion de cuisines internationales et locales sur notre terrasse tropicale. L'endroit idéal pour des dîners romantiques ou des déjeuners d'affaires.",
    bookBtn: "Vérifier la Disponibilité",
    orderBtn: "Commander Traiteur",
    footerText: "© 2026 Aurore Ecce Lubumbashi. Tous droits réservés.",
    formName: "Prénom",
    formLastName: "Nom",
    formEmail: "Adresse e-mail",
    formPhone: "Numéro de téléphone",
    formCountry: "Pays/Région",
    formCheckIn: "Date d'arrivée",
    formCheckOut: "Date de départ",
    formType: "Type de Chambre",
    formGuests: "Nombre d'invités (Adultes/Enfants)",
    formSelectRoom: "Sélectionnez votre suite / villa",
    formSubmit: "Demander Réservation",
    bookingSuccess: "Séjour demandé ! Notre équipe vous contactera sous peu par e-mail ou par téléphone pour confirmation.",
    adminDashboard: "Tableau de Bord Admin",
    pendingBookings: "Réservations en Attente",
    checkIn: "Enregistrer Invité",
    occupancy: "Occupation Actuelle",
    backHome: "Retour au Site",
    adminReservations: "Réservations",
    adminRooms: "Espaces / Villas",
    adminAmenities: "Équipements",
    addRoom: "Ajouter Espace",
    roomName: "Nom de l'Espace",
    roomCapacity: "Capacité",
    roomType: "Type",
    addAmenity: "Ajouter Équipement",
    amenityName: "Nom de l'Équipement",
    amenityCategory: "Catégorie",
    status: "Statut",
    actions: "Actions",
    checkInBtn: "Enregistrer arrivée",
    confirmBtn: "Confirmer",
    adminEmployees: "Personnel",
    adminAnalytics: "Rapports & Analyses",
    addEmployee: "Ajouter Employé",
    empName: "Nom de l'Employé",
    empRole: "Rôle",
    empShift: "Shift",
    revenue: "Revenu",
    historical: "Données Historiques",
    trends: "Tendances Mensuelles",
    performance: "Aperçu de la Performance",
    price: "Prix",
    availability: "Disponibilité",
    selectAmenities: "Sélectionner Équipements",
    roomNumber: "N° de Chambre / ID",
    uploadPhotos: "Télécharger Photos",
    villasAndRooms: "Nos Suites & Villas",
    chatWithUs: "Converser avec la Maison",
    typeMessage: "Votre message...",
    adminChats: "Messages Staff",
    available: "Disponible",
    booked: "Réservé",
    night: "la nuit",
    reserved: "RÉSERVÉ",
    viewDetails: "Explorer la Suite",
    roomImages: "Photos de la chambre (liens séparés par des virgules)",
    searchAvail: "Vérifier la Disponibilité",
    adults: "Adultes",
    children: "Enfants",
    checkIn: "Date d'arrivée",
    checkOut: "Date de départ"
  }
};

const App = () => {
  const [lang, setLang] = useState('fr');
  const [view, setView] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [bookingStep, setBookingStep] = useState('details'); // details, summary
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1549294413-26f195200c16', // Estate
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', // Palace
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d', // Pool Elite
    'https://images.unsplash.com/photo-1566073771259-bc3b8c2537e5'  // Lobby Gold
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const [bookingFormData, setBookingFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    country: '+243',
    roomId: '', 
    type: 'Room', 
    checkIn: '', 
    checkOut: '', 
    adults: '1', 
    children: '0' 
  });
  const [bookingStatus, setBookingStatus] = useState(null);

  // Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(false);

  // Admin State
  const [adminActiveTab, setAdminActiveTab] = useState('overview');
  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [newRoom, setNewRoom] = useState({ name: '', number: '', price: '', capacity: '', type: 'Room', amenities: [], images: '' });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [newAmenity, setNewAmenity] = useState({ name: '', category: 'General' });

  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [currentMsg, setCurrentMsg] = useState('');

  const [newEmployee, setNewEmployee] = useState({ name: '', role: 'Staff', shift: 'Morning' });
  const [selectedRoom, setSelectedRoom] = useState(null); // For Room Detail Modal
  const [activeImg, setActiveImg] = useState(0);

  const [analyticsData] = useState([
    { month: 'Oct', revenue: 8500, bookings: 12 },
    { month: 'Nov', revenue: 11200, bookings: 15 },
    { month: 'Dec', revenue: 19800, bookings: 24 },
    { month: 'Jan', revenue: 14500, bookings: 18 },
    { month: 'Feb', revenue: 12100, bookings: 16 },
    { month: 'Mar', revenue: 16700, bookings: 21 },
  ]);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Sync Groups
    const syncData = (collectionName, setState, orderField = "createdAt") => {
      const q = query(collection(db, collectionName), orderBy(orderField, "desc"));
      return onSnapshot(q, (snapshot) => {
        setState(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    };

    const unsubReservations = syncData("reservations", setReservations);
    const unsubRooms = syncData("rooms", setRooms, "name");
    const unsubAmenities = syncData("amenities", setAmenities, "name");
    const unsubEmployees = syncData("employees", setEmployees, "name");
    const unsubMessages = syncData("messages", setChatMessages, "timestamp");

    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubAuth();
      unsubReservations();
      unsubRooms();
      unsubAmenities();
      unsubEmployees();
      unsubMessages();
    };
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setBookingFormData({
        ...bookingFormData,
        firstName: result.user.displayName.split(' ')[0],
        lastName: result.user.displayName.split(' ').slice(1).join(' ') || '',
        email: result.user.email
      });
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleBookingSubmit = async (e) => {
    if (e) e.preventDefault();
    if (bookingStep === 'details') {
      setBookingStep('summary');
      return;
    }

    // Double-booking check
    try {
      const conflictQuery = query(
        collection(db, 'reservations'),
        where('roomId', '==', bookingFormData.roomId),
        where('status', 'in', ['pending', 'confirmed', 'checked-in'])
      );
      const existing = await getDocs(conflictQuery);
      const hasConflict = existing.docs.some(d => {
        const r = d.data();
        const reqIn = new Date(bookingFormData.checkIn);
        const reqOut = new Date(bookingFormData.checkOut);
        const exIn = new Date(r.checkIn);
        const exOut = new Date(r.checkOut);
        return reqIn < exOut && reqOut > exIn;
      });
      if (hasConflict) {
        alert('⚠️ Sorry — this space is already reserved for your selected dates. Please choose different dates or another space.');
        setBookingStep('details');
        return;
      }
    } catch (err) {
      console.error('Conflict check failed:', err);
    }

    try {
      const room = rooms.find(r => r.id === bookingFormData.roomId);
      const newReservation = {
        ...bookingFormData,
        userId: user?.uid || null,
        roomName: room?.name || 'N/A',
        status: 'pending',
        createdAt: serverTimestamp()
      };
      await addDoc(collection(db, 'reservations'), newReservation);

      // 📧 Send confirmation email via EmailJS
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_aurore',
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_aurore',
          {
            to_name: `${bookingFormData.firstName} ${bookingFormData.lastName}`,
            to_email: bookingFormData.email,
            room_name: room?.name || 'Selected Space',
            check_in: bookingFormData.checkIn,
            check_out: bookingFormData.checkOut,
            phone: `${bookingFormData.country} ${bookingFormData.phone}`,
            total_price: `$${(room?.price || 0) * Math.max(1, (new Date(bookingFormData.checkOut) - new Date(bookingFormData.checkIn)) / 86400000 || 1)}`,
            reply_to: 'contact@auroreecce.cd',
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
        );
      } catch (emailErr) {
        console.warn('Email send failed (check EmailJS config):', emailErr);
      }
      setBookingStatus('success');
      setBookingStep('details');
      setTimeout(() => {
        setBookingStatus(null);
        setView('home');
        setBookingFormData({ firstName: '', lastName: '', email: '', phone: '', country: '+243', roomId: '', type: 'Room', checkIn: '', checkOut: '', adults: '1', children: '0' });
      }, 3000);
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const ADMIN_EMAIL = 'faceprint@icloud.com';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(false);
    try {
      const result = await signInWithEmailAndPassword(auth, adminCredentials.email, adminCredentials.password);
      if (result.user.email === ADMIN_EMAIL) {
        setIsAdminLoggedIn(true);
      } else {
        await signOut(auth);
        setLoginError(true);
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setLoginError(true);
    }
  };

  const handleAdminLogout = async () => {
    await signOut(auth);
    setIsAdminLoggedIn(false);
  };

  const handleSendMessage = async (sender = 'user') => {
    if (!currentMsg.trim()) return;
    try {
      const msg = {
        text: currentMsg,
        sender: sender,
        timestamp: serverTimestamp()
      };
      await addDoc(collection(db, "messages"), msg);
      setCurrentMsg('');
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  const renderHome = () => (
    <>
      <section className="hero" style={{ 
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url('${heroImages[activeHeroIdx]}?auto=format&fit=crop&w=1600&q=80')`,
        transition: 'background-image 1.5s ease-in-out'
      }}>
        <div className="app-container fade-in-up">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
          <div className="booking-bar-hero glass fade-in-up">
            <div className="bar-item">
              <label>{t.checkIn}</label>
              <input type="date" value={bookingFormData.checkIn} onChange={(e) => setBookingFormData({...bookingFormData, checkIn: e.target.value})} />
            </div>
            <div className="bar-item">
              <label>{t.checkOut}</label>
              <input type="date" value={bookingFormData.checkOut} onChange={(e) => setBookingFormData({...bookingFormData, checkOut: e.target.value})} />
            </div>
            <div className="bar-item">
              <label>{t.adults}</label>
              <select value={bookingFormData.adults} onChange={(e) => setBookingFormData({...bookingFormData, adults: e.target.value})}>
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
              </select>
            </div>
            <div className="bar-item">
              <label>{t.children}</label>
              <select value={bookingFormData.children} onChange={(e) => setBookingFormData({...bookingFormData, children: e.target.value})}>
                <option value="0">0 Children</option>
                <option value="1">1 Child</option>
                <option value="2">2 Children</option>
              </select>
            </div>
            <button className="btn-primary" style={{ padding: '1rem 2rem' }} onClick={() => {
              setView('booking');
            }}>{t.searchAvail}</button>
          </div>
        </div>
      </section>

      <section id="accommodation" className="app-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2>{t.villasAndRooms}</h2>
            <span className="subtitle-french">L'élégance au service de votre repos</span>
            <p style={{ color: 'var(--text-secondary)' }}>Available stays for your selected dates</p>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--accent-gold)' }}>
            {rooms.filter(r => r.type === 'Room' || r.type === 'Villa').length} properties found
          </div>
        </div>
        
        <div className="listing-grid">
          {rooms.filter(r => r.type === 'Room' || r.type === 'Villa').map(room => (
            <div className="listing-item glass fade-in-up" key={room.id}>
              <div className="listing-img-container">
                <img src={room.images ? room.images.split(',')[0] : room.image} alt={room.name} onClick={() => setSelectedRoom(room)} style={{ cursor: 'pointer' }} />
                <span className={`availability-badge ${room.isAvailable ? 'available' : 'booked'}`}>
                  {room.isAvailable ? t.available : t.reserved}
                </span>
              </div>
              <div className="listing-details">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3>{room.name}</h3>
                  <div className="rating-badge">9.8</div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>✨ Premium Choice</p>
                <div className="listing-amenities-short">
                  {room.amenities.slice(0, 5).map(a => <span key={a} className="amenity-inline"> • {a}</span>)}
                </div>
                <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--text-secondary)' }}>{t.roomCapacity}: {room.capacity} Guests</p>
              </div>
              <div className="listing-cta">
                <div className="price-box">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.night}</span>
                  <div className="price-tag">${room.price}</div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue)' }}>Includes taxes & fees</span>
                </div>
                <button
                  className="btn-primary"
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                  disabled={!room.isAvailable}
                  onClick={() => {
                    setBookingFormData({ ...bookingFormData, roomId: room.id, type: room.type });
                    setView('booking');
                  }}
                >
                  {t.bookBtn}
                </button>
                <button className="btn-secondary" style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }} onClick={() => setSelectedRoom(room)}>{t.viewDetails}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="venue" className="app-container" style={{ marginTop: '5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>L'Art de Recevoir</h2>
        <span className="subtitle-french" style={{ textAlign: 'center', display: 'block', marginBottom: '1rem' }}>Halls de Prestige & Gastronomie</span>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem' }}>Host world-class events in our versatile halls or enjoy culinary masterpieces at our restaurant.</p>
        <div className="card-grid">
          {rooms.filter(r => r.type === 'Venue' || r.type === 'Garden' || r.type === 'Lounge').map(room => (
            <div className="card" key={room.id}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={`${(room.images ? room.images.split(',')[0] : room.image)}?auto=format&fit=crop&w=600&q=70`} 
                  alt={room.name} 
                  loading="lazy"
                />
                <span className={`availability-badge ${room.isAvailable ? 'available' : 'booked'}`}>
                  {room.isAvailable ? 'OPEN' : t.reserved}
                </span>
              </div>
              <h3>{room.name}</h3>
              <div className="price-tag">Starting from ${room.price}</div>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Cap. {room.capacity} Seats</p>
              <div style={{ marginBottom: '1.5rem', minHeight: '60px' }}>
                {room.amenities.map(a => <span key={a} className="amenity-pill">{a}</span>)}
              </div>
              <button
                className="btn-secondary"
                style={{ width: '100%' }}
                onClick={() => {
                  setBookingFormData({ ...bookingFormData, roomId: room.id, type: room.type });
                  setView('booking');
                }}
              >
                Enquire Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Gastronomy Section */}
      <section id="restaurant" className="glass" style={{ margin: '5rem 2rem', padding: '5rem 2rem', borderRadius: '24px' }}>
        <div className="app-container" style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1.2fr' : '1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="subtitle-french" style={{ color: 'var(--accent-gold)' }}>Expérience Culinaire</span>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Le Restaurant de l'Aurore</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Experience the pinnacle of French-Congolais fusion at our signature restaurant. Our chefs utilize locally sourced ingredients to create masterpieces that dance on the palate, served in an atmosphere of unparalleled elegance.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h4 style={{ color: 'var(--accent-gold)' }}>Fine Dining</h4>
                <p style={{ fontSize: '0.85rem' }}>Gourmet dinners under the stars.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-gold)' }}>Brunch Elite</h4>
                <p style={{ fontSize: '0.85rem' }}>Sundays of luxury and flavor.</p>
              </div>
            </div>
            <button className="btn-primary">Reserve a Table</button>
          </div>
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} alt="Dining" />
            <div className="glass" style={{ position: 'absolute', bottom: '-20px', left: '-20px', padding: '1.5rem', background: '#fff' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>3 Michelin</span>
              <p style={{ fontSize: '0.8rem' }}>Inspired Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Gallery */}
      <section className="app-container" style={{ paddingBottom: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Galerie des Événements</h2>
          <span className="subtitle-french">Moments d'exception à Aurore Ecce</span>
        </div>
        <div className="listing-grid">
          {[
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
            'https://images.unsplash.com/photo-1505232458593-29695b8a910d'
          ].map((url, i) => (
            <div key={i} className="glass" style={{ height: '300px', overflow: 'hidden', padding: 0 }}>
              <img src={`${url}?auto=format&fit=crop&w=600&q=70`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Event" />
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderBooking = () => {
    if (bookingStatus === 'success') {
      return (
        <section className="app-container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
          <div className="glass fade-in-up" style={{ padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✨</div>
            <h2 style={{ color: 'var(--accent-gold)' }}>L'Excellence Confirmée</h2>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{t.bookingSuccess}</p>
            <button className="btn-secondary" style={{ marginTop: '2rem' }} onClick={() => setView('home')}>Return to Home</button>
          </div>
        </section>
      );
    }

    const selectedRoomData = rooms.find(r => r.id === bookingFormData.roomId);
    const nights = (new Date(bookingFormData.checkOut) - new Date(bookingFormData.checkIn)) / (1000 * 60 * 60 * 24) || 1;
    const total = (selectedRoomData?.price || 0) * Math.max(1, nights);

    return (
      <section className="app-container" style={{ paddingBottom: '5rem', paddingTop: '8rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{t.navBooking}</h2>
        <form onSubmit={handleBookingSubmit} className="glass fade-in-up" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem' }}>

          {/* 💰 Cash Payment Policy Banner */}
          <div style={{ marginBottom: '2rem', padding: '1.2rem 1.5rem', background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #f59e0b', borderRadius: '10px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>💵</span>
            <div>
              <strong style={{ color: '#92400e', display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>Cash Payment Policy — Please Read</strong>
              <p style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.6, margin: 0 }}>
                Reservations at Aurore Ecce are <strong>confirmed only upon receipt of cash payment</strong> at our reception. Submitting this form holds your <em>request</em>, but <strong>does not guarantee your space</strong>. A paying customer may claim the space before your payment is received.
                <br /><br />
                🕐 <strong>First come, first served.</strong> Contact us to secure your spot quickly: <strong>+243 ...</strong>
              </p>
            </div>
          </div>

          {bookingStep === 'details' ? (
            <>
              {!user && (
                <div style={{ marginBottom: '2rem', textAlign: 'center', padding: '1rem', background: '#f1f5f9', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Sign in to track your reservation and earn loyalty rewards.</p>
                  <button type="button" onClick={handleGoogleLogin} className="btn-secondary" style={{ width: '100%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
                    Sign in with Google
                  </button>
                </div>
              )}
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>{t.formSelectRoom}</label>
                <select
                  required
                  className="admin-input"
                  style={{ width: '100%', marginTop: 0 }}
                  value={bookingFormData.roomId}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, roomId: e.target.value })}
                >
                  <option value="">{t.formSelectRoom}</option>
                  {rooms.filter(r => r.isAvailable).map(room => (
                    <option key={room.id} value={room.id}>{room.name} - ${room.price}</option>
                  ))}
                </select>
              </div>

              <div className="glass" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Almost done! Just fill in the * required info</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>{t.formName} *</label>
                  <input type="text" required className="admin-input" style={{ width: '100%', marginTop: 0 }} value={bookingFormData.firstName} onChange={(e) => setBookingFormData({ ...bookingFormData, firstName: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>{t.formLastName} *</label>
                  <input type="text" required className="admin-input" style={{ width: '100%', marginTop: 0 }} value={bookingFormData.lastName} onChange={(e) => setBookingFormData({ ...bookingFormData, lastName: e.target.value })} />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>{t.formEmail} *</label>
                <input type="email" required className="admin-input" style={{ width: '100%', marginTop: 0 }} value={bookingFormData.email} onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>{t.formPhone} *</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    className="admin-input"
                    style={{ width: '180px', flexShrink: 0, marginTop: 0 }}
                    value={bookingFormData.country}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, country: e.target.value })}
                  >
                    <option value="+243">🇨🇩 DRC +243</option>
                    <option value="+260">🇿🇲 Zambia +260</option>
                    <option value="+32">🇧🇪 Belgium +32</option>
                    <option value="+33">🇫🇷 France +33</option>
                    <option value="+1">🇺🇸 USA +1</option>
                    <option value="+254">🇰🇪 Kenya +254</option>
                    <option value="+27">🇿🇦 S. Africa +27</option>
                  </select>
                  <input
                    type="tel"
                    required
                    className="admin-input"
                    style={{ flex: 1, marginTop: 0 }}
                    value={bookingFormData.phone}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                    placeholder="81 234 5678"
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem', display: 'block' }}>Our team may call this number to confirm your reservation.</span>
              </div>

              <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.formCheckIn}</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="admin-input"
                    style={{ width: '100%', marginTop: 0 }}
                    value={bookingFormData.checkIn}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, checkIn: e.target.value, checkOut: '' })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.formCheckOut}</label>
                  <input
                    type="date"
                    required
                    min={bookingFormData.checkIn || new Date().toISOString().split('T')[0]}
                    className="admin-input"
                    style={{ width: '100%', marginTop: 0 }}
                    value={bookingFormData.checkOut}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, checkOut: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Review Summary</button>
            </>
          ) : (
            <div className="fade-in-up">
              <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Booking Summary</h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Guest:</span>
                  <span style={{ fontWeight: 600 }}>{bookingFormData.firstName} {bookingFormData.lastName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Space:</span>
                  <span style={{ fontWeight: 600 }}>{selectedRoomData?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Stay:</span>
                  <span style={{ fontWeight: 600 }}>{bookingFormData.checkIn} to {bookingFormData.checkOut} ({nights} nights)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #f1f5f9' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total Price:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-gold)' }}>${total}</span>
                </div>
              </div>
              {/* Cash Policy Alert in Summary */}
              <div style={{ marginBottom: '2rem', padding: '1.2rem 1.5rem', background: '#fff7ed', border: '2px solid #f97316', borderRadius: '10px' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>⚠️</span>
                  <strong style={{ color: '#9a3412', fontSize: '0.9rem' }}>Your spot is NOT yet guaranteed</strong>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#7c2d12', lineHeight: 1.65, margin: 0 }}>
                  This is a <strong>reservation request only</strong>. Your space will be officially held <strong>once cash payment is received</strong> at our front desk. Spaces operate on a <strong>first-come, first-served</strong> basis — a paying guest may take priority before your payment arrives.
                </p>
                <p style={{ fontSize: '0.82rem', color: '#9a3412', marginTop: '0.75rem', marginBottom: 0, fontWeight: 600 }}>
                  Please visit or call us as soon as possible to secure your booking.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setBookingStep('details')}>Back to Edit</button>
                <button type="submit" className="btn-primary" style={{ flex: 2 }}>{t.formSubmit}</button>
              </div>
            </div>
          )}
        </form>
      </section>
    );
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const roomData = { 
        ...newRoom, 
        price: Number(newRoom.price), 
        capacity: Number(newRoom.capacity), 
        isAvailable: true,
        image: newRoom.images.split(',')[0].trim(),
        createdAt: serverTimestamp() 
      };

      if (editingRoomId) {
        await updateDoc(doc(db, "rooms", editingRoomId), roomData);
        setEditingRoomId(null);
      } else {
        await addDoc(collection(db, "rooms"), roomData);
      }

      setNewRoom({ name: '', price: '', capacity: '', type: 'Room', amenities: [], images: '' });
    } catch (err) {
      console.error("Room add/update error:", err);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `rooms/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(url);
      }
      const currentImages = newRoom.images ? newRoom.images.split(',') : [];
      setNewRoom({ ...newRoom, images: [...currentImages, ...uploadedUrls].filter(u => u).join(',') });
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image. Please check your storage rules.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditRoom = (room) => {
    setNewRoom({
      name: room.name,
      number: room.number || '',
      price: room.price ? room.price.toString() : '',
      capacity: room.capacity ? room.capacity.toString() : '',
      type: room.type || 'Room',
      amenities: room.amenities || [],
      images: room.images || ''
    });
    setEditingRoomId(room.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAmenityInNewRoom = (amenityName) => {
    const current = newRoom.amenities;
    if (current.includes(amenityName)) {
      setNewRoom({ ...newRoom, amenities: current.filter(a => a !== amenityName) });
    } else {
      setNewRoom({ ...newRoom, amenities: [...current, amenityName] });
    }
  };

  const toggleRoomAvailability = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "rooms", id), { isAvailable: !currentStatus });
    } catch (err) { console.error(err); }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Delete this space?")) {
      await deleteDoc(doc(db, "rooms", id));
    }
  };

  const handleAddAmenity = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "amenities"), { ...newAmenity, createdAt: serverTimestamp() });
      setNewAmenity({ name: '', category: 'General' });
    } catch (err) { console.error(err); }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "employees"), { ...newEmployee, status: 'Active', createdAt: serverTimestamp() });
      setNewEmployee({ name: '', role: 'Staff', shift: 'Morning' });
    } catch (err) { console.error(err); }
  };

  const handleRemoveEmployee = async (id) => {
    if (window.confirm("Remove employee?")) {
      await deleteDoc(doc(db, "employees", id));
    }
  };
  const handleUpdateStatus = async (id, status) => {
    try {
      const docRef = doc(db, "reservations", id);
      await updateDoc(docRef, { status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const sendTestEmail = async () => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: 'Faceprint Admin',
          to_email: 'faceprint@icloud.com',
          room_name: 'Suite Royale N°101',
          check_in: '2026-04-10',
          check_out: '2026-04-12',
          phone: '+243 81 000 0000',
          total_price: '$240',
          reply_to: 'contact@auroreecce.cd',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      alert('✅ Test email sent to faceprint@icloud.com!');
    } catch (err) {
      alert(`❌ EmailJS not configured yet. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file.\n\nGo to emailjs.com → Free account → Create service & template → Copy keys.`);
      console.error('EmailJS error:', err);
    }
  };

  const handleSeedData = async () => {
    try {
      console.log('Seeding data started. Rooms available:', rooms.length);
      if (rooms.length === 0) {
        alert('Please add at least one space in the "Spaces" tab before seeding demo bookings.');
        return;
      }
      if (!window.confirm('Seed 20 mock reservations for the last 5 days?')) return;

      const firstNames = ['Jean', 'Marie', 'Marc', 'Alice', 'David', 'Sophie', 'Paul', 'Emma', 'Luc', 'Fatima'];
      const lastNames = ['Mukendi', 'Kabila', 'Lumumba', 'Tshisekedi', 'Ngoy', 'Ilunga', 'Kasongo'];
      const statuses = ['pending', 'confirmed', 'checked-in'];
      const promises = [];

      for (let i = 0; i < 20; i++) {
        const room = rooms[Math.floor(Math.random() * rooms.length)];
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 5));
        
        const resData = {
          firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
          lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
          email: 'guest@example.com',
          phone: '81 234 5678',
          country: '+243',
          roomId: room.id || 'unknown',
          roomName: room.name || 'Unknown Space',
          checkIn: date.toISOString().split('T')[0],
          checkOut: new Date(date.getTime() + 86400000 * 2).toISOString().split('T')[0],
          adults: '2',
          children: '1',
          status: statuses[Math.floor(Math.random() * statuses.length)],
          createdAt: serverTimestamp()
        };
        
        promises.push(addDoc(collection(db, 'reservations'), resData));
      }
      
      await Promise.all(promises);
      console.log('Successfully seeded 20 reservations');
      alert('✅ 20 Demo Reservations Seeded!');
    } catch (err) {
      console.error('Seed Error:', err);
      alert('❌ FAILED to seed data: ' + (err.message || 'Unknown error'));
    }
  };

  const renderAdmin = () => {
    const revenue = reservations.reduce((acc, r) => acc + (rooms.find(rm => rm.id === r.roomId)?.price || 0), 0);
    const confirmedCount = reservations.filter(r => r.status === 'confirmed' || r.status === 'checked-in').length;

    if (!isAdminLoggedIn) {
      return (
        <section className="app-container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
          <div className="glass" style={{ maxWidth: '400px', margin: '0 auto', padding: '3rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Staff Access</h2>
            <form onSubmit={handleLogin}>
              <div className="admin-form-group" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                <label>Staff Email</label>
                <input
                  type="email"
                  className="admin-input"
                  placeholder="admin@aurore.cd"
                  value={adminCredentials.email}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <label>Password</label>
                <input
                  type="password"
                  className="admin-input"
                  placeholder="••••••••"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                  required
                />
              </div>
              {loginError && <p style={{ color: '#ff4d4d', fontSize: '0.8rem', marginBottom: '1rem' }}>Invalid staff credentials.</p>}
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Access Dashboard</button>
            </form>
          </div>
        </section>
      );
    }

    return (
      <section className="app-container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1>{t.adminDashboard}</h1>
            <span className="subtitle-french">L'Excellence Maison Aurore</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }} onClick={handleSeedData}>📊 Seed Demo Data</button>
            <button className="btn-secondary" style={{ borderColor: '#10b981', color: '#10b981' }} onClick={sendTestEmail}>📧 Test Email</button>
            <button className="btn-secondary" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }} onClick={handleAdminLogout}>Logout</button>
            <button className="btn-secondary" onClick={() => setView('home')}>{t.backHome}</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="glass" style={{ padding: '1.5rem', textAlign: 'center', background: '#fff' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Total Revenue</h4>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--accent-blue)' }}>${revenue.toLocaleString()}</div>
          </div>
          <div className="glass" style={{ padding: '1.5rem', textAlign: 'center', background: '#fff' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Reservations</h4>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--accent-gold)' }}>{reservations.length}</div>
          </div>
          <div className="glass" style={{ padding: '1.5rem', textAlign: 'center', background: '#fff' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Occupancy Rate</h4>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#10b981' }}>{Math.round((confirmedCount / (rooms.length || 1)) * 100)}%</div>
          </div>
        </div>

        <div className="admin-tabs">
          <button className={`admin-tab ${adminActiveTab === 'reservations' ? 'active' : ''}`} onClick={() => setAdminActiveTab('reservations')}>{t.adminReservations}</button>
          <button className={`admin-tab ${adminActiveTab === 'rooms' ? 'active' : ''}`} onClick={() => setAdminActiveTab('rooms')}>{t.adminRooms}</button>
          <button className={`admin-tab ${adminActiveTab === 'amenities' ? 'active' : ''}`} onClick={() => setAdminActiveTab('amenities')}>{t.adminAmenities}</button>
          <button className={`admin-tab ${adminActiveTab === 'chats' ? 'active' : ''}`} onClick={() => setAdminActiveTab('chats')}>{t.adminChats}</button>
          <button className={`admin-tab ${adminActiveTab === 'analytics' ? 'active' : ''}`} onClick={() => setAdminActiveTab('analytics')}>{t.adminAnalytics}</button>
        </div>

        {adminActiveTab === 'analytics' && (
          <div className="fade-in-up">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              <div className="glass" style={{ padding: '2rem', background: '#fff' }}>
                <h3>Revenue Trends (Last 5 Days)</h3>
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                  {[45, 60, 35, 80, 55, 90].map((h, i) => (
                    <div key={i} style={{ flex: 1, backgroundColor: 'var(--accent-gold)', height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: -20, width: '100%', textAlign: 'center', fontSize: '0.65rem' }}>${(h * (revenue/100)).toFixed(0)}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>
              </div>
              <div className="glass" style={{ padding: '2rem', background: '#fff' }}>
                <h3>Category Performance</h3>
                <div style={{ marginTop: '1.5rem' }}>
                  {['Elite Suites', 'Luxury Villas', 'Prestige Venues'].map((cat, i) => (
                    <div key={i} style={{ marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                        <span>{cat}</span>
                        <span>{75 - (i * 15)}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${75 - (i * 15)}%`, height: '100%', background: 'var(--accent-blue)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {adminActiveTab === 'reservations' && (
          <div className="glass fade-in-up" style={{ padding: '2rem' }}>
            <h3>{t.adminReservations}</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Contact</th>
                    <th>Stay</th>
                    <th>Space</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(res => (
                    <tr key={res.id}>
                      <td>{res.firstName} {res.lastName}</td>
                      <td>
                        <div style={{ fontSize: '0.8rem' }}>{res.email}</div>
                        <div style={{ fontSize: '0.8rem' }}>{res.phone}</div>
                      </td>
                      <td>{res.checkIn} to {res.checkOut}</td>
                      <td>{rooms.find(r => r.id === res.roomId)?.name || res.roomName || 'Deleted Space'}</td>
                      <td className={`status-${res.status}`}>{res.status}</td>
                      <td>
                        {res.status === 'pending' && <button className="btn-primary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.7rem' }} onClick={() => handleUpdateStatus(res.id, 'confirmed')}>{t.confirmBtn}</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminActiveTab === 'rooms' && (
          <div className="fade-in-up">
            <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3>{t.addRoom}</h3>
              <form onSubmit={handleAddRoom} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="admin-form-group"><label>{t.roomName}</label><input className="admin-input" value={newRoom.name} onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })} required /></div>
                <div className="admin-form-group"><label>{t.price} ($)</label><input type="number" className="admin-input" value={newRoom.price} onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })} required /></div>
                <div className="admin-form-group"><label>{t.roomCapacity}</label><input type="number" className="admin-input" value={newRoom.capacity} onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })} required /></div>
                <div className="admin-form-group"><label>{t.roomNumber}</label><input className="admin-input" value={newRoom.number} onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })} /></div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>{t.roomImages}</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input className="admin-input" style={{ flex: 1 }} value={newRoom.images} onChange={(e) => setNewRoom({ ...newRoom, images: e.target.value })} />
                    <label className="btn-secondary" style={{ cursor: 'pointer' }}>Upload <input type="file" multiple onChange={handleImageUpload} hidden /></label>
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1' }}>{editingRoomId ? "Update" : "Add"} Space</button>
              </form>
            </div>
            <div className="glass" style={{ padding: '2rem' }}>
              <table className="admin-table">
                <thead><tr><th>{t.roomName}</th><th>{t.price}</th><th>Actions</th></tr></thead>
                <tbody>
                  {rooms.map(r => (
                    <tr key={r.id}>
                      <td>{r.name} {r.number}</td>
                      <td>${r.price}</td>
                      <td><button onClick={() => handleEditRoom(r)}>Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminActiveTab === 'amenities' && (
          <div className="glass fade-in-up" style={{ padding: '2rem' }}>
            <h3>{t.adminAmenities}</h3>
            <div style={{ marginTop: '1.5rem' }}>
              {amenities.map(a => <span key={a.id} className="amenity-pill">{a.name}</span>)}
            </div>
          </div>
        )}

        {adminActiveTab === 'chats' && (
          <div className="glass fade-in-up" style={{ padding: '2rem' }}>
            <h3>{t.adminChats}</h3>
            <p>Chat system active. Responses appear in guest portal.</p>
          </div>
        )}
      </section>
    );
  };

  const renderRoomDetail = () => {
    if (!selectedRoom) return null;
    const images = selectedRoom.images ? selectedRoom.images.split(',') : [selectedRoom.image];
    
    return (
      <div className="modal-overlay active" onClick={() => setSelectedRoom(null)}>
        <div className="modal glass fade-in-up" onClick={e => e.stopPropagation()} style={{ background: '#fff', maxWidth: '900px', width: '95%' }}>
          <button className="modal-close" onClick={() => setSelectedRoom(null)} style={{ color: 'var(--text-primary)' }}>&times;</button>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '2rem', padding: '2rem' }}>
            <div className="gallery-section">
              <img 
                src={`${images[activeImg]}?auto=format&fit=crop&w=800&q=80`} 
                alt={selectedRoom.name} 
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {images.map((img, i) => (
                  <img 
                    key={i}
                    src={`${img}?auto=format&fit=crop&w=150&q=60`} 
                    alt={`Thumb ${i}`}
                    className={activeImg === i ? 'active' : ''}
                    onClick={() => setActiveImg(i)}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: activeImg === i ? '2px solid var(--accent-gold)' : '1px solid var(--glass-border)' }}
                  />
                ))}
              </div>
            </div>
            <div className="info-section">
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{selectedRoom.name}</h2>
              <div className="price-tag" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                ${selectedRoom.price} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ {t.night}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{t.roomCapacity}: {selectedRoom.capacity} Guests</p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '0.8rem', color: 'var(--text-primary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>{t.adminAmenities}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedRoom.amenities.map(a => <span key={a} className="amenity-pill">{a}</span>)}
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '1rem' }}
                disabled={!selectedRoom.isAvailable}
                onClick={() => {
                  setBookingFormData({ ...bookingFormData, roomId: selectedRoom.id, type: selectedRoom.type });
                  setView('booking');
                  setSelectedRoom(null);
                }}
              >
                {selectedRoom.isAvailable ? t.bookBtn : t.reserved}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="logo" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
          <img src="/assets/images/logo.png" alt="Logo" />
          AURORE ECCE
        </div>
        <div className="nav-links">
          <a href="#venue" className="nav-link" onClick={() => setView('home')}>{t.navVenue}</a>
          <a href="#restaurant" className="nav-link" onClick={() => setView('home')}>{t.navRestaurant}</a>
          <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={() => setView('booking')}>{t.navBooking}</button>
          
          {user ? (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button className="nav-link" onClick={() => setView('home')} style={{ color: 'var(--accent-gold)' }}>My Stays</button>
              <button className="nav-link" onClick={() => auth.signOut()} style={{ fontSize: '0.7rem' }}>Sign Out</button>
            </div>
          ) : (
            <button className="nav-link" onClick={() => setView('booking')} style={{ fontSize: '0.8rem' }}>Guest Login</button>
          )}

          <button className="nav-link" onClick={() => setView('admin')} style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{t.navAdmin}</button>
          <button className="lang-toggle" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
            {lang.toUpperCase()}
          </button>
        </div>
      </nav>

      <main>
        {view === 'home' && renderHome()}
        {view === 'booking' && renderBooking()}
        {view === 'admin' && renderAdmin()}
      </main>

      {renderRoomDetail()}

      <footer style={{ background: '#0f172a', color: '#e2e8f0', paddingTop: '4rem', paddingBottom: '2rem', marginTop: '4rem' }}>
        <div className="app-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <img src="/assets/images/logo.png" alt="Logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#f1b43c', letterSpacing: '0.1em' }}>AURORE ECCE</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                L'Excellence à Lubumbashi. Premier luxury venue, suites &amp; gastronomy. Est. 2020.
              </p>
              {/* Social Media */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                  { icon: '📘', label: 'Facebook', href: 'https://facebook.com/auroreecce' },
                  { icon: '📸', label: 'Instagram', href: 'https://instagram.com/auroreecce' },
                  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/243000000000' },
                  { icon: '🎵', label: 'TikTok', href: 'https://tiktok.com/@auroreecce' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.label}
                    style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', textDecoration: 'none', transition: 'background 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(241,180,60,0.25)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  >{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: '#f1b43c', fontFamily: 'Playfair Display, serif', marginBottom: '1.2rem', fontSize: '1rem' }}>Contact &amp; Réservations</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span>📞</span>
                  <div>
                    <a href="tel:+243000000001" style={{ color: '#e2e8f0', textDecoration: 'none', display: 'block' }}>+243 000 000 001</a>
                    <a href="tel:+243000000002" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.8rem' }}>+243 000 000 002 (Alt)</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span>💬</span>
                  <a href="https://wa.me/243000000000" target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none' }}>WhatsApp direct</a>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span>✉️</span>
                  <a href="mailto:contact@auroreecce.cd" style={{ color: '#e2e8f0', textDecoration: 'none' }}>contact@auroreecce.cd</a>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0 }}>📍</span>
                  <span>Avenue Lumumba, Lubumbashi, Haut-Katanga, DRC</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span>⏰</span>
                  <span>Réception: 24h/24 · 7j/7</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: '#f1b43c', fontFamily: 'Playfair Display, serif', marginBottom: '1.2rem', fontSize: '1rem' }}>Navigation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: 'Nos Suites & Villas', anchor: '#accommodation' },
                  { label: 'Halls de Prestige', anchor: '#venue' },
                  { label: 'Le Restaurant', anchor: '#restaurant' },
                  { label: 'Galerie des Événements', anchor: '#gallery' },
                  { label: 'Réserver un Séjour', view: 'booking' },
                ].map(l => (
                  <a key={l.label}
                    href={l.anchor || '#'}
                    onClick={l.view ? (e) => { e.preventDefault(); setView(l.view); } : undefined}
                    style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.color = '#f1b43c'}
                    onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                  >{l.label}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <iframe
              title="Aurore Ecce Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62869.87823695908!2d27.43391!3d-11.66079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19723f5b4e678c41%3A0x6c7b268babb0ac48!2sLubumbashi%2C%20Democratic%20Republic%20of%20the%20Congo!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="260"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{t.footerText}</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy Policy', 'Terms', 'Cookie Policy'].map(l => (
                <a key={l} href="#" style={{ fontSize: '0.75rem', color: '#64748b', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <div className="chat-widget">
        {chatOpen && (
          <div className="chat-window glass fade-in-up">
            <div className="chat-header">
              <span>{t.chatWithUs}</span>
              <button onClick={() => setChatOpen(false)} style={{ color: 'white' }}>✕</button>
            </div>
            <div className="chat-body">
              {chatMessages.map(m => (
                <div key={m.id} className={`msg msg-${m.sender}`}>
                  {m.text}
                  <div style={{ fontSize: '0.6rem', marginTop: '0.2rem', opacity: 0.7 }}>{m.timestamp?.toDate ? m.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}</div>
                </div>
              ))}
            </div>
            <div className="chat-footer">
              <input
                className="admin-input"
                style={{ marginTop: 0 }}
                placeholder={t.typeMessage}
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="btn-primary" style={{ padding: '0.5rem' }} onClick={handleSendMessage}>➤</button>
            </div>
          </div>
        )}
        <button className="chat-btn" onClick={() => setChatOpen(!chatOpen)}>
          {chatOpen ? '✕' : '💬'}
        </button>
      </div>
    </div>
  );
};

export default App;
