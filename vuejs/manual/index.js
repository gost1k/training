var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})

var app2 = new Vue({
    el: '#app2',
    data: {
        message: 'You loaded this page: ' + new Date().toLocaleString()
    }
})


var app3 = new Vue({
    el: '#app3',
    data: {
        seen: true
    }
})

var app4 = new Vue({
    el: '#app4',
    data: {
        todos: [ { text: 'Learn JavaScript'}, { text: 'Learn VueJs'}, { text: 'Do something Awesome'} ]
    }
})

var app5 = new Vue({
    el: '#app5',
    data: {
        message: 'Hello, Vue.js'
    } ,
    methods: {
        reverseMessage: function() {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello, Vue!'
    }
})

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
    })

var app7 = new Vue({
    el: '#app7',
    data: {
        groceryList: [
            { id: 0, text: 'OBoLLIu'},
            { id: 1, text: "CbIp"},
            { id: 2, text: 'One more'}
        ]
    }
})

var vm = new Vue({
    el: '#demo',
    data: {
        firstName: 'gost1k',
        lastName: 'Awesome'
    },
    computed: {
    fullName: function() {
        return this.firstName + ' ' + this.lastName
        }
    }
})

var exampe1 = new Vue({
    el: '#example1',
    data: {
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
})

Vue.component('todo-item', {
    template: '\
    <li>\
    {{ title }}\
    <button v-on:click="$emit(\'remove\')">x</button>\
    </li>\
    ',
    props: ['title']
    })

new Vue({
    el: '#todo-list-example',
    data: {
        newTodoText: '',
        todos: [
            {
                id: 1,
                title: 'Помыть посуду'
            },
            {
                id: 2,
                title: 'Вынести мусор'
            },
            {
                id: 3,
                title: 'Подстричь газон'
            }
        ],
        nextTodoId: 4
    },
    methods: {
        addNewTodo: function () {
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    }
})

var example2 = new Vue({
    el: '#example-2',
    data: {
        name: 'Vue.js'
    },
    methods: {
        greet: function (event) {
            alert('Привет, ' + this.name + '!')
            if (event) {
                alert(event.target.tagName)
            }
        }
    }
})

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">Счётчик кликов — {{ count }}</button>'
})

new Vue({ el: '#components-demo'})