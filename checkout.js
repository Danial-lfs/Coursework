new Vue({
    el: '#app',
    data() {
        return {
            customerName: '',
            customerPhone: ''
        };
    },
    computed: {
        isFormValid() {
            return this.validateName(this.customerName) && this.validatePhone(this.customerPhone);
        }
    },
    methods: {
        validateName(name) {
            const nameRegex = /^[A-Za-z\s]+$/;
            return nameRegex.test(name);
        },
        validatePhone(phone) {
            const phoneRegex = /^[0-9]+$/;
            return phoneRegex.test(phone);
        },
        submitOrder() {
            if (this.isFormValid) {
                alert(`Order submitted successfully for ${this.customerName}`);
            } else {
                alert('Please enter valid details.');
            }
        }
    }
});
