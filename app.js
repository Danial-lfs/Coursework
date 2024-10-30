new Vue({
    el: '#app',
    data() {
        return {
            currentView: 'lessons',
            products: [
                { id: 1, name: 'Art', price: 200.99, location: "Abu-Dhabi", spaces: 5, image: 'Art.jpg' },
                { id: 2, name: 'Music', price: 199.99, location: "Sharjah", spaces: 5, image: 'Music.jpg' },
                { id: 3, name: 'English', price: 299.99, location: "Dubai", spaces: 5, image: 'English.jpg' },
                { id: 4, name: 'Biology', price: 500.99, location: "Qatar", spaces: 5, image: 'Biology.jpg' },
                { id: 5, name: 'Science', price: 400.99, location: "Doha", spaces: 5, image: 'Science.png' },
                { id: 6, name: 'History', price: 249.99, location: "Al-Thumama", spaces: 5, image: 'History.jpg' },
                { id: 7, name: 'Geography', price: 249.99, location: "Wakra", spaces: 5, image: 'Geography.png' },
                { id: 8, name: 'Chemistry', price: 199.99, location: "Abu-Hamour", spaces: 5, image: 'Chemistry.jpg' },
                { id: 9, name: 'Physics', price: 299.99, location: "Ajman", spaces: 5, image: 'Physics.jpg' },
                { id: 10, name: 'Maths', price: 299.99, location: "Academic city", spaces: 5, image: 'Maths.jpg' }
            ],
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            searchTerm: '',
            sortKey: 'name',
            sortOrder: 'asc',
            customerName: '',
            customerPhone: '',
        };
    },
    computed: {
        sortedProducts() {
            return this.products.slice().sort((a, b) => {
                let modifier = this.sortOrder === 'asc' ? 1 : -1;
                if (this.sortKey === 'name') {
                    return a.name.localeCompare(b.name) * modifier;
                } else if (this.sortKey === 'location') {
                    return a.location.localeCompare(b.location) * modifier;
                } else if (this.sortKey === 'price') {
                    return (a.price - b.price) * modifier;
                } else if (this.sortKey === 'spaces') {
                    return (a.spaces - b.spaces) * modifier;
                }
                return 0;
            });
        },
        filteredProducts() {
            if (!this.searchTerm) return this.sortedProducts;
            const lowerSearchTerm = this.searchTerm.toLowerCase();
            return this.sortedProducts.filter(product => {
                return (
                    product.name.toLowerCase().includes(lowerSearchTerm) ||
                    product.location.toLowerCase().includes(lowerSearchTerm) ||
                    product.price.toString().includes(lowerSearchTerm) ||
                    product.spaces.toString().includes(lowerSearchTerm)
                );
            });
        },
        cartHasItems() {
            return this.cart.length > 0;
        },
        isFormValid() {
            const nameRegex = /^[A-Za-z\s]+$/;
            const phoneRegex = /^\d+$/;
            return nameRegex.test(this.customerName) && phoneRegex.test(this.customerPhone);
        }
    },
    methods: {
        setSortKey(key) {
            if (this.sortKey === key) {
                this.toggleSortOrder();
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
            }
        },
        toggleSortOrder() {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        },
        addToCart(product) {
            if (product.spaces > 0) {
                const existingProduct = this.cart.find(item => item.product.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    this.cart.push({ product: product, quantity: 1 });
                }
                product.spaces--;
                localStorage.setItem('cart', JSON.stringify(this.cart));
                alert(`${product.name} added to cart. Spaces left: ${product.spaces}`);
            }
        },
        removeFromCart(index) {
            const item = this.cart[index];
            item.product.spaces++; 
            this.cart.splice(index, 1); 
            localStorage.setItem('cart', JSON.stringify(this.cart));
            alert(`${item.product.name} removed from cart. Spaces available: ${item.product.spaces}`);
        },
        switchView(view) {
            this.currentView = view;
        },
        validateInput() {
            this.isFormValid;
        },
        checkout() {
            if (this.isFormValid) {
                alert(`Order submitted for ${this.customerName}.\nPhone: ${this.customerPhone}`);
                this.cart = [];
                localStorage.setItem('cart', JSON.stringify(this.cart));
                this.customerName = '';
                this.customerPhone = '';
                this.switchView('lessons'); 
            } else {
                alert('Please enter valid name and phone number.');
            }
        },
        toggleCheckout() {
            this.currentView = this.currentView === 'lessons' ? 'cart' : 'lessons';
        }
    }
});
