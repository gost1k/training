var app = new Vue ({
    el: '#app',

    data: {
      count: 0
    },

    methods: {
        countUp: function() {
            this.count += 1
        },
        countDown: function() {
            this.count -= 1
        }
    }
})