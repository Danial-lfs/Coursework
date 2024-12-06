new Vue({
    el: '#app',
    data: {
        currentView: 'lessons',
        products: [
            { id: 1, name: 'Art', price: 200.99, location: "Abu-Dhabi", spaces: 5, image: 'http://localhost:3000/static/Art.jpg' },
            { id: 2, name: 'Music', price: 199.99, location: "Sharjah", spaces: 5, image: 'http://localhost:3000/static/Music.jpg' },
            { id: 3, name: 'English', price: 299.99, location: "Dubai", spaces: 5, image: 'http://localhost:3000/static/English.jpg' },
            { id: 4, name: 'Biology', price: 500.99, location: "Qatar", spaces: 5, image: 'http://localhost:3000/static/Biology.jpg' },
            { id: 5, name: 'Science', price: 400.99, location: "Doha", spaces: 5, image: 'http://localhost:3000/static/Science.png' },
            { id: 6, name: 'History', price: 249.99, location: "Al-Thumama", spaces: 5, image: 'http://localhost:3000/static/History.jpg' },
            { id: 7, name: 'Geography', price: 249.99, location: "Wakra", spaces: 5, image: 'http://localhost:3000/static/Geography.png' },
            { id: 8, name: 'Chemistry', price: 199.99, location: "Abu-Hamour", spaces: 5, image: 'http://localhost:3000/static/Chemistry.jpg' },
            { id: 9, name: 'Physics', price: 299.99, location: "Ajman", spaces: 5, image: 'http://localhost:3000/static/Physics.jpg' },
            { id: 10, name: 'Maths', price: 299.99, location: "Academic city", spaces: 5, image: 'http://localhost:3000/static/Maths.jpg' }

        ],
        cart: [],
        searchTerm: '',
        sortKey: 'name',
        sortOrder: 'asc',
        customerName: '',
        customerPhone: '',
        nameError: '',
        phoneError: '',
    },
    computed: {
        filteredProducts() {
            let filtered = this.products.filter(product =>
                product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
            if (this.sortKey) {
                filtered.sort((a, b) => {
                    const aValue = a[this.sortKey];
                    const bValue = b[this.sortKey];
                    return this.sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
                });
            }
            return filtered;
        },
        cartHasItems() {
            return this.cart.length > 0;
        },
        isFormValid() {
            return this.customerName && this.customerPhone && !this.nameError && !this.phoneError;
        },
    },
    methods: {
        addToCart(product) {
            const cartItem = this.cart.find(item => item.product.id === product.id);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                this.cart.push({ product, quantity: 1 });
            }
            product.spaces--;
        },
        removeFromCart(index) {
            const item = this.cart[index];
            item.product.spaces += item.quantity;
            this.cart.splice(index, 1);
        },
        switchView(view) {
            this.currentView = view;
        },
        toggleCheckout() {
            this.currentView = this.currentView === 'checkout' ? 'lessons' : 'checkout';
        },
        setSortKey(key) {
            this.sortKey = key;
        },
        toggleSortOrder() {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        },
        validateName() {
            this.nameError = this.customerName.trim().length < 3
                ? 'Name must be at least 3 characters.'
                : '';
        },
        validatePhone() {
            const phoneRegex = /^[0-9]{10}$/;
            this.phoneError = !phoneRegex.test(this.customerPhone)
                ? 'Phone number must be 10 digits.'
                : '';
        },
        checkout() {
            if (this.isFormValid) {
                const order = {
                    customerName: this.customerName,
                    customerPhone: this.customerPhone,
                    cart: this.cart.map(item => ({
                        name: item.product.name,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                };
       
                // Send order data to the backend
                fetch('http://localhost:3000/place-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(order),
                })
                .then(response => {
                    console.log('Response:', response); // Log the response for debugging
                    return response.json();
                })
                .then(data => {
                    console.log('Response Data:', data); // Log the response data
                    if (data.msg === 'Order placed successfully') {
                        alert('Order placed successfully!');
                        this.cart = [];
                        this.customerName = '';
                        this.customerPhone = '';
                        this.switchView('lessons');
                    } else {
                        alert('Failed to place order. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while placing the order.');
                });
            }
        }
       
    },
});
