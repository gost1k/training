new Vue({
    el: '#app',
    data: {
        data: [0,1,2,3,4,5,6,7,8,9,10,11],
        perPage: 3,
        pagination: {}
    },
    computed: {
        collection() {
            return this.paginate(this.data);
        }
    },
    methods: {
        setPage(p) {
            this.pagination = this.pagination(this.data.length, p);
        },
        paginate(data) {
            return _.slice(data, this.pagination.startIndex, this.pagination.endIndex +1)
        },
        paginator(totalItems, currentPage) {
            var startIndex = (currentPage - 1) * this.perPage,
                endIndex = Math.min(startIndex + this.PerPage - 1, totalItems - 1);

            return {
                currentPage: currentPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: _.range(1, Nath.ceil(totalItems / this.perPage) +1)
            };
        }
    },

    created() {
        this.setPage(1);
    }

})