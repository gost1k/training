<template>
	<div class="app">
		<header>
			<div class="title">
				<h1>Hyrule Jobs</h1>
			</div>
			<div class="order">
				<button @click="handleClick('title')">order by title</button>
				<button @click="handleClick('salary')">order by salary</button>
				<button @click="handleClick('location')">order by location</button>
			</div>
		</header>
		<JobList :jobs="jobs" :order="order"/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import JobList from './components/JobsList.vue';
import Job from './types/Job';
import OrderTerm from './types/orderTerm';


export default defineComponent({
	name: 'App',
	components: {JobList},
	setup() {
		const jobs = ref<Job[]>([
			{ title: 'farm worker', location: 'lag lon ranch', salary: 30000, id: '1' },
			{ title: 'Quarryman', location: 'the lost woods', salary: 40000, id: '2' },
			{ title: 'fisherman', location: 'gerudo valley', salary: 50000, id: '3' },
		])

		const order = ref<OrderTerm>('title');
		const handleClick = (term: OrderTerm) => {
			order.value = term
		}

		return { jobs, handleClick, order }
	},
});
</script>

<style>
	header {
		text-align: center;
	}
	header .order {
		margin-top: 20px;
	}
	button {
		margin: 0 10px;
		color: #1195c9;
		border: 3px solid #1195c9;
		background: #d5f0ff;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}

</style>

<!--const name = ref('Link');-->
<!--const age = ref<number | string>(25);-->

<!--return { name, age }-->
<!-- const state = reactive({-->
<!-- 	name: 'Link',-->
<!-- 	age: 25 as string | number-->
<!-- })-->
<!-- state.name = 'Some name';-->
<!-- return { ...toRefs(state) }-->
<!-- data() {-->
<!-- 	return {-->
<!-- 		name: 'Link',-->
<!-- 		age: 25 as number | string-->
<!-- 	}-->
<!-- },-->