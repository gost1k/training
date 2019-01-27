Vue.component('book', {
    template: '#books',
    props: ['title', 'author', 'content']
});

new Vue({
    el: '#app',
    data: {
        author: 'David Flanagan',
        title: 'JavaScript The Defentive Guide',
        content: 'Lorem Lorem Lorem.'
    }
});