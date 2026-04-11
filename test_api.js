const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

let userToken;
let adminToken;
let createdBookId;
let createdCartItemId;
let createdOrderId;

const testAuth = async () => {
    console.log('\n--- Testing Authentication ---');

    // 1. Register User
    try {
        const res = await axios.post(`${API_URL}/auth/register`, {
            name: 'Test User',
            email: `testuser_${Date.now()}@example.com`,
            password: 'password123'
        });
        userToken = res.data.token;
        console.log('✅ Register User: SUCCESS');
    } catch (err) {
        console.error('❌ Register User: FAILED', err.response?.data || err.message);
    }

    // 2. Login User
    try {
        const res = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@example.com', // Assuming an admin exists, or we register one
            password: 'password123'
        });
        // If admin doesn't exist, we'll handle it
        adminToken = res.data.token;
        console.log('✅ Login Admin: SUCCESS');
    } catch (err) {
        // If admin login fails, try to register a new admin (this is a simplistic validation approach)
        try {
            // Create a temporary admin manually if endpoints allow or just use the user token for now to test public routes
            // For this script, let's just register a new user and try to assume they are admin (which won't work without DB modification)
            // So we will skip admin specific tests if login fails, or just use the first user as admin if we could.
            console.log('⚠️  Admin Login failed (Admin might not exist). Skipping Admin specific tests for now or using User token for basic checks.');
        } catch (e) {
            console.error('❌ Login Admin: FAILED', err.response?.data || err.message);
        }
    }
};

const testBooks = async () => {
    console.log('\n--- Testing Books ---');

    // 1. Get All Books
    try {
        const res = await axios.get(`${API_URL}/books`);
        console.log(`✅ Get All Books: SUCCESS (${res.data.count} books found)`);
    } catch (err) {
        console.error('❌ Get All Books: FAILED', err.response?.data || err.message);
    }

    // 2. Create Book (Requires Admin)
    if (adminToken) {
        try {
            const res = await axios.post(`${API_URL}/books`, {
                title: 'Test Book',
                author: 'Test Author',
                description: 'Test Description',
                price: 10,
                category: 'Fiction',
                stock: 100
            }, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            createdBookId = res.data.data._id;
            console.log('✅ Create Book: SUCCESS');
        } catch (err) {
            console.error('❌ Create Book: FAILED', err.response?.data || err.message);
        }
    } else {
        console.log('⚠️  Skipping Create Book (No Admin Token)');
        // Fallback: Try to fetch a book to get an ID for cart tests
        try {
            const res = await axios.get(`${API_URL}/books`);
            if (res.data.data.length > 0) createdBookId = res.data.data[0]._id;
        } catch (e) { }
    }
};

const testCart = async () => {
    console.log('\n--- Testing Cart ---');
    if (!userToken || !createdBookId) {
        console.log('⚠️  Skipping Cart tests (Missing User Token or Book ID)');
        return;
    }

    // 1. Add to Cart
    try {
        const res = await axios.post(`${API_URL}/cart`, {
            bookId: createdBookId,
            quantity: 2
        }, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        createdCartItemId = res.data.data.items[0]._id;
        console.log('✅ Add to Cart: SUCCESS');
    } catch (err) {
        console.error('❌ Add to Cart: FAILED', err.response?.data || err.message);
    }

    // 2. Get Cart
    try {
        const res = await axios.get(`${API_URL}/cart`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('✅ Get Cart: SUCCESS');
    } catch (err) {
        console.error('❌ Get Cart: FAILED', err.response?.data || err.message);
    }
};

const testOrders = async () => {
    console.log('\n--- Testing Orders ---');
    if (!userToken) {
        console.log('⚠️  Skipping Order tests (Missing User Token)');
        return;
    }

    // 1. Create Order
    try {
        const res = await axios.post(`${API_URL}/orders`, {
            shippingAddress: {
                address: '123 Main St',
                city: 'Test City',
                postalCode: '12345',
                country: 'Test Country'
            },
            paymentMethod: 'PayPal'
        }, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        createdOrderId = res.data.data._id;
        console.log('✅ Create Order: SUCCESS');
    } catch (err) {
        console.error('❌ Create Order: FAILED', err.response?.data || err.message);
    }

    // 2. Get My Orders
    try {
        const res = await axios.get(`${API_URL}/orders/myorders`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('✅ Get My Orders: SUCCESS');
    } catch (err) {
        console.error('❌ Get My Orders: FAILED', err.response?.data || err.message);
    }
};

const runTests = async () => {
    await testAuth();
    await testBooks();
    await testCart();
    await testOrders();
};

runTests();
