// Save booking to localStorage
export const saveBooking = (bookingData) => {
    try {
        // Get existing bookings
        const existingBookings = getBookings();

        // Create new booking with ID and timestamp
        const newBooking = {
            id: Date.now().toString(), // Unique ID based on timestamp
            ...bookingData,
            bookingDate: new Date().toISOString(),
            status: 'confirmed',
        };

        // Add to bookings array
        existingBookings.push(newBooking);

        // Save to localStorage with key 'movieBookings'
        localStorage.setItem('movieBookings', JSON.stringify(existingBookings));

        console.log('Booking saved:', newBooking);
        return newBooking;
    } catch (error) {
        console.error('Error saving booking:', error);
        return null;
    }
};

// Get all bookings from localStorage
export const getBookings = () => {
    try {
        const bookings = localStorage.getItem('movieBookings');
        return bookings ? JSON.parse(bookings) : [];
    } catch (error) {
        console.error('Error getting bookings:', error);
        return [];
    }
};

// Get single booking by ID
export const getBookingById = (id) => {
    try {
        const bookings = getBookings();
        return bookings.find((booking) => booking.id === id);
    } catch (error) {
        console.error('Error getting booking:', error);
        return null;
    }
};

// Cancel a booking
export const cancelBooking = (id) => {
    try {
        const bookings = getBookings();
        const updatedBookings = bookings.map((booking) =>
            booking.id === id ? { ...booking, status: 'cancelled' } : booking
        );
        localStorage.setItem('movieBookings', JSON.stringify(updatedBookings));
        console.log('Booking cancelled:', id);
        return true;
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return false;
    }
};

// Delete a specific booking
export const deleteBooking = (id) => {
    try {
        const bookings = getBookings();
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        localStorage.setItem('movieBookings', JSON.stringify(updatedBookings));
        console.log('Booking deleted:', id);
        return true;
    } catch (error) {
        console.error('Error deleting booking:', error);
        return false;
    }
};

// Clear all bookings
export const clearAllBookings = () => {
    try {
        localStorage.removeItem('movieBookings');
        console.log('All bookings cleared');
        return true;
    } catch (error) {
        console.error('Error clearing bookings:', error);
        return false;
    }
};

// Get bookings count
export const getBookingsCount = () => {
    return getBookings().length;
};

// Get confirmed bookings count
export const getConfirmedBookingsCount = () => {
    return getBookings().filter((b) => b.status === 'confirmed').length;
};

// Get cancelled bookings count
export const getCancelledBookingsCount = () => {
    return getBookings().filter((b) => b.status === 'cancelled').length;
};
