new Vue({
    el: '#app',
    data() {
        return {
            cart: JSON.parse(localStorage.getItem('cart')) || []
        };
    },
    computed: {
        cartHasItems() {
            return this.cart.length > 0; 
        }
    },
    methods: {
        removeFromCart(product) {
            const index = this.cart.findIndex(item => item.product.id === product.id);
            if (index > -1) {
                this.cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(this.cart));
                alert(`${product.name} removed from cart.`);
            }
        },
        goBack() {
            window.history.back(); 
        },
        goToCheckout() {
            window.location.href = 'checkout.html'; 
        },
        viewLessons() {
            window.location.href = 'index.html'; 
        }
    }
});
