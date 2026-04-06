import React, { useState, useEffect } from 'react';
import './index.css';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const translations = {
  en: {
    heroTitle: "Aurore Ecce Hotel & Resort",
    heroSub: "Experience the dawn of elegance in Lubumbashi. Premium guest rooms and luxury villas designed for your ultimate comfort and relaxation.",
    navVenue: "Guest Rooms",
    navRestaurant: "Restaurant",
    navBooking: "Book Your Stay",
    navAdmin: "Admin",
    hallTitle: "Exquisite Event Space",
    hallDesc: "From luxury weddings to professional conferences, our hall adapts to your needs with state-of-the-art facilities and elegant decor.",
    restTitle: "Terrace & Dining",
    restDesc: "Enjoy a fusion of international and local cuisines on our tropical terrace. The perfect spot for romantic dinners or business lunches.",
    bookBtn: "Check Availability",
    orderBtn: "Order Catering",
    footerText: "© 2026 Aurore Ecce Lubumbashi. All rights reserved.",
    formName: "Full Name",
    formEmail: "Email",
    formCheckIn: "Check-in Date",
    formCheckOut: "Check-out Date",
    formType: "Room Type",
    formGuests: "Number of Guests (Adults/Children)",
    formSelectRoom: "Select Your Room / Villa",
    formSubmit: "Request Reservation",
    bookingSuccess: "Stay requested! Our team will contact you shortly for payment and check-in details.",
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
    villasAndRooms: "Villas & Rooms",
    chatWithUs: "Chat with Us",
    typeMessage: "Type a message...",
    adminChats: "Staff Chats",
    available: "Available",
    booked: "Booked",
    night: "night",
    reserved: "RESERVED",
    viewDetails: "View Photos",
    roomImages: "Room Photos (comma separated URLs)"
  },
  fr: {
    heroTitle: "Hôtel & Résidence Aurore Ecce",
    heroSub: "Vivez l'aube de l'élégance à Lubumbashi. Des chambres d'hôtes de prestige et des villas de luxe conçues pour votre confort ultime.",
    navVenue: "Nos Chambres",
    navRestaurant: "Restaurant",
    navBooking: "Réserver un Séjour",
    navAdmin: "Admin",
    hallTitle: "Espace Événementiel Raffiné",
    hallDesc: "Des mariages de luxe aux conférences professionnelles, notre salle s'adapte à vos besoins avec des installations de pointe et un décor élégant.",
    restTitle: "Terrasse & Restauration",
    restDesc: "Dégustez une fusion de cuisines internationales et locales sur notre terrasse tropicale. L'endroit idéal pour des dîners romantiques ou des déjeuners d'affaires.",
    bookBtn: "Vérifier la Disponibilité",
    orderBtn: "Commander Traiteur",
    footerText: "© 2026 Aurore Ecce Lubumbashi. Tous droits réservés.",
    formName: "Nom Complet",
    formEmail: "Email",
    formCheckIn: "Date d'arrivée",
    formCheckOut: "Date de départ",
    formType: "Type de Chambre",
    formGuests: "Nombre d'invités (Adultes/Enfants)",
    formSelectRoom: "Sélectionnez votre chambre / villa",
    formSubmit: "Demander Réservation",
    bookingSuccess: "Séjour demandé ! Notre équipe vous contactera sous peu pour les détails du paiement et de l'enregistrement.",
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
    villasAndRooms: "Villas & Chambres",
    chatWithUs: "Discuter avec nous",
    typeMessage: "Tapez un message...",
    adminChats: "Messages Staff",
    available: "Disponible",
    booked: "Occupé",
    night: "nuit",
    reserved: "RÉSERVÉ",
    viewDetails: "Voir Photos",
    roomImages: "Photos de la chambre (liens séparés par des virgules)"
  }
};

const App = () => {
  const [lang, setLang] = useState('fr');
  const [view, setView] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
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

  const [newRoom, setNewRoom] = useState({ name: '', capacity: '', type: 'Venue', price: '', images: '', amenities: [] });
  const [newAmenity, setNewAmenity] = useState({ name: '', category: 'General' });

  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [currentMsg, setCurrentMsg] = useState('');

  const [newEmployee, setNewEmployee] = useState({ name: '', role: 'Staff', shift: 'Morning' });
  const [selectedRoom, setSelectedRoom] = useState(null); // For Room Detail Modal

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubReservations();
      unsubRooms();
      unsubAmenities();
      unsubEmployees();
      unsubMessages();
    };
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const room = rooms.find(r => r.id === bookingFormData.roomId);
      const newReservation = {
        clientName: bookingFormData.name,
        roomId: bookingFormData.roomId,
        roomName: room?.name || 'N/A',
        checkIn: bookingFormData.checkIn,
        checkOut: bookingFormData.checkOut,
        type: bookingFormData.type || 'Stay',
        status: 'pending',
        guests: bookingFormData.guests,
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, "reservations"), newReservation);
      
      setBookingStatus('success');
      setTimeout(() => {
        setBookingStatus(null);
        setView('home');
        setBookingFormData({ name: '', email: '', roomId: '', checkIn: '', checkOut: '', guests: '2' });
      }, 3000);
    } catch (error) {
      console.error("Error booking room:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminCredentials.email === 'faceprint@icloud.com' && adminCredentials.password === 'Jethro@#1973') {
      setIsAdminLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
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
      <section className="hero">
        <div className="app-container fade-in-up">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => setView('booking')}>{t.bookBtn}</button>
            <button className="btn-secondary">{t.orderBtn}</button>
          </div>
        </div>
      </section>

      <section id="accommodation" className="app-container">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Luxury Accommodations</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem' }}>Experience the ultimate comfort in our premium hotel rooms and villas.</p>
        <div className="card-grid">
          {rooms.filter(r => r.type === 'Room' || r.type === 'Villa').map(room => (
            <div className="card" key={room.id}>
              <div style={{ position: 'relative' }}>
                <img src={room.images ? room.images.split(',')[0] : room.image} alt={room.name} />
                <span className={`availability-badge ${room.isAvailable ? 'available' : 'booked'}`}>
                  {room.isAvailable ? t.available : t.reserved}
                </span>
              </div>
              <h3>{room.name}</h3>
              <div className="price-tag">${room.price} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ {t.night}</span></div>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{t.roomCapacity}: {room.capacity} Guests</p>
              <div style={{ marginBottom: '1.5rem', minHeight: '60px' }}>
                {room.amenities.slice(0, 3).map(a => <span key={a} className="amenity-pill">{a}</span>)}
                {room.amenities.length > 3 && <span className="amenity-pill">+{room.amenities.length - 3}</span>}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" style={{ flex: 1, padding: '0.6rem' }} onClick={() => setSelectedRoom(room)}>{t.viewDetails}</button>
                <button
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.6rem' }}
                  disabled={!room.isAvailable}
                  onClick={() => {
                    setBookingFormData({ ...bookingFormData, roomId: room.id, type: room.type });
                    setView('booking');
                  }}
                >
                  {t.bookBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="venue" className="app-container" style={{ marginTop: '5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Events & Fine Dining</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem' }}>Host world-class events in our versatile halls or enjoy culinary masterpieces at our restaurant.</p>
        <div className="card-grid">
          {rooms.filter(r => r.type === 'Venue' || r.type === 'Garden' || r.type === 'Lounge').map(room => (
            <div className="card" key={room.id}>
              <div style={{ position: 'relative' }}>
                <img src={room.images ? room.images.split(',')[0] : room.image} alt={room.name} />
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
    </>
  );

  const renderBooking = () => (
    <section className="app-container" style={{ marginTop: '100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t.navBooking}</h2>
      {bookingStatus === 'success' ? (
        <div className="glass fade-in-up" style={{ padding: '3rem', textAlign: 'center', border: '1px solid var(--accent-gold)' }}>
          <h3 style={{ color: 'var(--accent-gold)' }}>{t.bookingSuccess}</h3>
        </div>
      ) : (
        <form className="glass" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }} onSubmit={handleBookingSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.formSelectRoom}</label>
            <select
              required
              className="admin-input"
              style={{ width: '100%', marginTop: 0 }}
              value={bookingFormData.roomId}
              onChange={(e) => {
                const room = rooms.find(r => r.id === e.target.value);
                setBookingFormData({ ...bookingFormData, roomId: e.target.value, type: room?.type || '' });
              }}
            >
              <option value="">-- Choose a Space --</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id} disabled={!room.isAvailable}>
                  {room.name} ({room.type}) - ${room.price} {room.isAvailable ? '' : `(${t.reserved})`}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.formName}</label>
            <input
              type="text"
              required
              placeholder="Ex: Jean Mukendi"
              style={{ width: '100%', padding: '0.8rem', background: '#ffffff10', border: '1px solid #ffffff20', borderRadius: '4px', color: 'white' }}
              value={bookingFormData.name}
              onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.formCheckIn}</label>
              <input
                type="date"
                required
                className="admin-input"
                style={{ marginTop: 0 }}
                value={bookingFormData.checkIn}
                onChange={(e) => setBookingFormData({ ...bookingFormData, checkIn: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.formCheckOut}</label>
              <input
                type="date"
                required
                className="admin-input"
                style={{ marginTop: 0 }}
                value={bookingFormData.checkOut}
                onChange={(e) => setBookingFormData({ ...bookingFormData, checkOut: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.formGuests}</label>
            <input
              type="number"
              placeholder="2"
              className="admin-input"
              style={{ marginTop: 0 }}
              value={bookingFormData.guests}
              onChange={(e) => setBookingFormData({ ...bookingFormData, guests: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>{t.formSubmit}</button>
        </form>
      )}
    </section>
  );

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "rooms"), {
        ...newRoom,
        isAvailable: true,
        image: newRoom.images ? newRoom.images.split(',')[0] : '/assets/images/hall.png',
        createdAt: serverTimestamp()
      });
      setNewRoom({ name: '', capacity: '', type: 'Venue', price: '', images: '', amenities: [] });
    } catch (err) { console.error(err); }
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

  const renderAdmin = () => {
    if (!isAdminLoggedIn) {
      return (
        <section className="app-container" style={{ marginTop: '150px', display: 'flex', justifyContent: 'center' }}>
          <div className="glass fade-in-up" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--accent-gold)', marginBottom: '2rem' }}>Staff Login</h2>
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
      <section className="app-container" style={{ marginTop: '100px', minHeight: '80vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>{t.adminDashboard}</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }} onClick={() => setIsAdminLoggedIn(false)}>Logout</button>
            <button className="btn-secondary" onClick={() => setView('home')}>{t.backHome}</button>
          </div>
        </div>

        <div className="admin-tabs">
          <button className={`admin-tab ${adminActiveTab === 'overview' ? 'active' : ''}`} onClick={() => setAdminActiveTab('overview')}>Overview</button>
          <button className={`admin-tab ${adminActiveTab === 'reservations' ? 'active' : ''}`} onClick={() => setAdminActiveTab('reservations')}>{t.adminReservations}</button>
          <button className={`admin-tab ${adminActiveTab === 'rooms' ? 'active' : ''}`} onClick={() => setAdminActiveTab('rooms')}>{t.adminRooms}</button>
          <button className={`admin-tab ${adminActiveTab === 'amenities' ? 'active' : ''}`} onClick={() => setAdminActiveTab('amenities')}>{t.adminAmenities}</button>
          <button className={`admin-tab ${adminActiveTab === 'employees' ? 'active' : ''}`} onClick={() => setAdminActiveTab('employees')}>{t.adminEmployees}</button>
          <button className={`admin-tab ${adminActiveTab === 'analytics' ? 'active' : ''}`} onClick={() => setAdminActiveTab('analytics')}>{t.adminAnalytics}</button>
          <button className={`admin-tab ${adminActiveTab === 'chats' ? 'active' : ''}`} onClick={() => setAdminActiveTab('chats')}>{t.adminChats}</button>
        </div>

        {adminActiveTab === 'overview' && (
          <div className="fade-in-up">
            <div className="card-grid">
              <div className="card glass">
                <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>{t.occupancy} (Confirmed)</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
                  {Math.round((reservations.filter(r => r.status === 'confirmed' || r.status === 'checked-in').length / (rooms.length || 1)) * 100)}%
                </div>
                <p style={{ fontSize: '0.9rem' }}>{rooms.length} Active Spaces</p>
              </div>
              <div className="card glass">
                <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Total Bookings</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>{reservations.length}</div>
                <p style={{ fontSize: '0.9rem' }}>{reservations.filter(r => r.status === 'pending').length} Pending Review</p>
              </div>
              <div className="card glass">
                <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>New Messages</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>{chatMessages.filter(m => m.sender === 'user').length}</div>
                <p style={{ fontSize: '0.9rem' }}>Awaiting Staff Reply</p>
              </div>
            </div>
          </div>
        )}

        {adminActiveTab === 'reservations' && (
          <div className="glass fade-in-up" style={{ padding: '2rem' }}>
            <h3>{t.adminReservations}</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Date</th>
                  <th>{t.roomType}</th>
                  <th>{t.status}</th>
                  <th>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(res => (
                  <tr key={res.id}>
                    <td>{res.clientName}</td>
                    <td>{res.date}</td>
                    <td>{res.type}</td>
                    <td>
                      <span className={`status-badge status-${res.status}`}>
                        {res.status}
                      </span>
                    </td>
                    <td>
                      {res.status === 'pending' && (
                        <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', marginRight: '0.5rem' }} onClick={() => handleUpdateStatus(res.id, 'confirmed')}>{t.confirmBtn}</button>
                      )}
                      {res.status === 'confirmed' && (
                        <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }} onClick={() => handleUpdateStatus(res.id, 'checked-in')}>{t.checkInBtn}</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {adminActiveTab === 'rooms' && (
          <div className="fade-in-up">
            <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3>{t.addRoom}</h3>
              <form onSubmit={handleAddRoom} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="admin-form-group">
                  <label>{t.roomName}</label>
                  <input className="admin-input" value={newRoom.name} onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })} required placeholder="E.g. Villa Royale" />
                </div>
                <div className="admin-form-group">
                  <label>{t.price} ($)</label>
                  <input type="number" className="admin-input" value={newRoom.price} onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })} required placeholder="300" />
                </div>
                <div className="admin-form-group">
                  <label>{t.roomCapacity}</label>
                  <input type="number" className="admin-input" value={newRoom.capacity} onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })} required placeholder="E.g. 50" />
                </div>
                <div className="admin-form-group">
                  <label>{t.roomType}</label>
                  <select className="admin-input" value={newRoom.type} onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}>
                    <option value="Venue">Venue</option>
                    <option value="Villa">Villa</option>
                    <option value="Room">Room</option>
                    <option value="Garden">Garden</option>
                    <option value="Lounge">Lounge</option>
                  </select>
                </div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>{t.roomImages}</label>
                  <input className="admin-input" value={newRoom.images} onChange={(e) => setNewRoom({ ...newRoom, images: e.target.value })} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
                </div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>{t.selectAmenities}</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {amenities.map(a => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => toggleAmenityInNewRoom(a.name)}
                        className={`amenity-pill ${newRoom.amenities.includes(a.name) ? 'active' : ''}`}
                        style={{ border: newRoom.amenities.includes(a.name) ? '1px solid var(--accent-gold)' : '1px solid #ffffff20', color: newRoom.amenities.includes(a.name) ? 'var(--accent-gold)' : 'white' }}
                      >
                        {a.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'flex-end', gridColumn: '1 / -1' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>{t.addRoom}</button>
                </div>
              </form>
            </div>

            <div className="glass" style={{ padding: '2rem' }}>
              <h3>Current {t.adminRooms}</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t.roomName}</th>
                    <th>{t.price}</th>
                    <th>{t.availability}</th>
                    <th>{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(room => (
                    <tr key={room.id}>
                      <td>{room.name}</td>
                      <td>${room.price}</td>
                      <td>
                        <button onClick={() => toggleRoomAvailability(room.id, room.isAvailable)} className={`status-badge ${room.isAvailable ? 'status-confirmed' : 'status-pending'}`} style={{ cursor: 'pointer' }}>
                          {room.isAvailable ? t.available : t.booked}
                        </button>
                      </td>
                      <td>
                        <button style={{ color: '#ff4d4d', fontSize: '0.8rem' }} onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminActiveTab === 'amenities' && (
          <div className="fade-in-up">
            <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3>{t.addAmenity}</h3>
              <form onSubmit={handleAddAmenity} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="admin-form-group">
                  <label>{t.amenityName}</label>
                  <input className="admin-input" value={newAmenity.name} onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })} required placeholder="E.g. Wi-Fi 6" />
                </div>
                <div className="admin-form-group">
                  <label>{t.amenityCategory}</label>
                  <select className="admin-input" value={newAmenity.category} onChange={(e) => setNewAmenity({ ...newAmenity, category: e.target.value })}>
                    <option value="General">General</option>
                    <option value="Food">Food & Drink</option>
                    <option value="Audio/Visual">Audio/Visual</option>
                    <option value="Services">Services</option>
                  </select>
                </div>
                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>{t.addAmenity}</button>
                </div>
              </form>
            </div>

            <div className="glass" style={{ padding: '2rem' }}>
              <h3>Current {t.adminAmenities}</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t.amenityName}</th>
                    <th>{t.amenityCategory}</th>
                    <th>{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {amenities.map(amenity => (
                    <tr key={amenity.id}>
                      <td>{amenity.name}</td>
                      <td>{amenity.category}</td>
                      <td>
                        <button style={{ color: '#ff4d4d', fontSize: '0.8rem' }} onClick={async () => {
                          if (window.confirm("Delete?")) await deleteDoc(doc(db, "amenities", amenity.id));
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminActiveTab === 'employees' && (
          <div className="fade-in-up">
            <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3>{t.addEmployee}</h3>
              <form onSubmit={handleAddEmployee} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="admin-form-group">
                  <label>{t.empName}</label>
                  <input className="admin-input" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} required placeholder="John Doe" />
                </div>
                <div className="admin-form-group">
                  <label>{t.empRole}</label>
                  <input className="admin-input" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} required placeholder="E.g. Chef" />
                </div>
                <div className="admin-form-group">
                  <label>{t.empShift}</label>
                  <select className="admin-input" value={newEmployee.shift} onChange={(e) => setNewEmployee({ ...newEmployee, shift: e.target.value })}>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Night">Night</option>
                    <option value="Full-time">Full-time</option>
                  </select>
                </div>
                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>{t.addEmployee}</button>
                </div>
              </form>
            </div>

            <div className="glass" style={{ padding: '2rem' }}>
              <h3>{t.adminEmployees}</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t.empName}</th>
                    <th>{t.empRole}</th>
                    <th>{t.empShift}</th>
                    <th>{t.status}</th>
                    <th>{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.role}</td>
                      <td>{emp.shift}</td>
                      <td><span className="status-badge status-confirmed">{emp.status}</span></td>
                      <td>
                        <button onClick={() => handleRemoveEmployee(emp.id)} style={{ color: '#ff4d4d', fontSize: '0.8rem', cursor: 'pointer' }}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminActiveTab === 'analytics' && (
          <div className="fade-in-up">
            <div className="card-grid">
              <div className="card glass">
                <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Total {t.revenue} (YTD)</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>$82,200</div>
                <p style={{ color: 'var(--accent-blue)', fontSize: '0.8rem' }}>+12% from last year</p>
              </div>
              <div className="card glass">
                <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Total {t.adminReservations}</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>105</div>
                <p style={{ color: 'var(--accent-blue)', fontSize: '0.8rem' }}>Avg. 15 events/month</p>
              </div>
              <div className="card glass">
                <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Client Satisfaction</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>4.9/5</div>
                <p style={{ color: 'var(--accent-blue)', fontSize: '0.8rem' }}>Based on 80 reviews</p>
              </div>
            </div>

            <div className="glass" style={{ marginTop: '2rem', padding: '2rem' }}>
              <h3>{t.trends}</h3>
              <div style={{ marginTop: '2rem', height: '200px', display: 'flex', alignItems: 'flex-end', gap: '5%', padding: '0 2rem' }}>
                {analyticsData.map(data => (
                  <div key={data.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    <div style={{
                      width: '100%',
                      background: 'linear-gradient(to top, var(--accent-gold), transparent)',
                      height: `${(data.revenue / 20000) * 100}%`,
                      borderRadius: '4px 4px 0 0',
                      position: 'relative'
                    }}>
                      <span style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: 'var(--accent-gold)' }}>${data.revenue}</span>
                    </div>
                    <span style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass" style={{ marginTop: '2rem', padding: '2rem' }}>
              <h3>{t.historical}</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>{t.revenue}</th>
                    <th>{t.adminReservations}</th>
                    <th>Avg. Guest Count</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.slice().reverse().map(data => (
                    <tr key={data.month}>
                      <td>{data.month}</td>
                      <td style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>${data.revenue}</td>
                      <td>{data.bookings}</td>
                      <td>{Math.round(data.revenue / (data.bookings * 10))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminActiveTab === 'chats' && (
          <div className="fade-in-up glass" style={{ padding: '2rem' }}>
            <h3>{t.adminChats}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', marginTop: '1.5rem', height: '500px' }}>
              <div style={{ borderRight: '1px solid #ffffff10', overflowY: 'auto' }}>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <strong>{t.chatWithUs}</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].text.substring(0, 30) + '...' : 'No messages yet'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                  {chatMessages.map(m => (
                    <div key={m.id} className={`msg ${m.sender === 'staff' ? 'msg-user' : 'msg-staff'}`} style={{ marginBottom: '1rem', alignSelf: m.sender === 'staff' ? 'flex-end' : 'flex-start' }}>
                      {m.text}
                      <div style={{ fontSize: '0.6rem', marginTop: '0.3rem', opacity: 0.7 }}>{m.timestamp?.toDate ? m.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <input className="admin-input" placeholder="Type reply..." value={currentMsg} onChange={(e) => setCurrentMsg(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage('staff')} />
                  <button className="btn-primary" onClick={() => handleSendMessage('staff')}>Send</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  };

  const renderRoomDetail = () => {
    if (!selectedRoom) return null;
    const roomImages = selectedRoom.images ? selectedRoom.images.split(',') : [selectedRoom.image || '/assets/images/hall.png'];
    
    return (
      <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
        <div className="modal-content glass fade-in-up" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedRoom(null)}>✕</button>
          <div className="modal-body">
            <div className="modal-gallery">
              <img src={roomImages[0]} alt={selectedRoom.name} className="main-modal-img" />
              <div className="gallery-thumbs">
                {roomImages.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt={`${selectedRoom.name}-${i}`} 
                    onClick={(e) => {
                      const main = e.currentTarget.closest('.modal-gallery').querySelector('.main-modal-img');
                      if (main) main.src = img;
                    }} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: '1px solid #ffffff20' }} 
                  />
                ))}
              </div>
            </div>
            <div className="modal-info">
              <h2>{selectedRoom.name}</h2>
              <div className="price-tag" style={{ fontSize: '1.8rem' }}>${selectedRoom.price} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ {t.night}</span></div>
              <p style={{ margin: '1rem 0', color: 'var(--text-secondary)' }}>{t.roomCapacity}: {selectedRoom.capacity} Guests</p>
              
              <div className="modal-amenities">
                <h4 style={{ marginBottom: '1rem', color: 'white' }}>{t.adminAmenities}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedRoom.amenities.map(a => <span key={a} className="amenity-pill" style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>{a}</span>)}
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '1.2rem' }}
                  disabled={!selectedRoom.isAvailable}
                  onClick={() => {
                    setBookingFormData({ ...bookingFormData, type: selectedRoom.type.toLowerCase() });
                    setView('booking');
                    setSelectedRoom(null);
                  }}
                >
                  {selectedRoom.isAvailable ? t.navBooking : t.reserved}
                </button>
              </div>
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
          <a href="#" className="nav-link" onClick={() => setView('home')}>{t.navRestaurant}</a>
          <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={() => setView('booking')}>{t.navBooking}</button>
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

      <footer>
        <div className="app-container">
          <p>{t.footerText}</p>
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
