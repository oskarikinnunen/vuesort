<template>
	<h1> Insertion sort visualisation. (Vue.js) </h1>

	<button @click="startsort" :class="{ disabled: inprogress }">Sort data</button>
	<div class="barcont">
		<div class="bar" v-for="(item, i) in items"
		:key="i"
		:style="style(i)">&nbsp;</div>
	</div>
</template>

<style>
@import url('http://fonts.googleapis.com/css?family=Roboto');
</style>

<script>

export default {
	name: 'app',
	data() {
		return {
			items: [],
			i: 1,
			j: 0,
			key: 0,
			inprogress: false,
			arrlen: 20,
			delay: 120,
		}
	},
	methods:{
		style(i){
			if (i == this.i){
				return {
					height: `${this.items[this.i] * 5}px`,
					"background-color": `blue`,
				}
			}else if (i == this.j){
				return {
					height: `${this.key * 5}px`,
					background: `green`,
				}
			}else{
				return {
					height: `${this.items[i] * 5}px`,
				}
			}
		},

		sleep(milliseconds){
			return new Promise((resolve) => setTimeout(resolve, milliseconds));
	  	},

		startsort(){
			if (!this.inprogress){ //Start a new sorting operation
				this.inprogress = true;
				if (this.i == this.items.length) //already sorted once, rerandomize
					this.randomize();
				this.i = 0;
				this.sortarray();
			} else 
				return;
		},

		async sortarray(){ //Insertion sort
			let key, j = 0; //Local variables just to make it a bit more readable
			
			while (this.i < this.items.length){
				key = this.items[this.i];
				j = this.i - 1;
				while (j >= 0 && this.items[j] > key)
				{
					// update object variables key and j, used for rendering the color of the bars
					this.key = key; 
					this.j = j;
					await this.sleep(this.delay);
					this.items[j + 1] = this.items[j--];
				}
				this.items[j + 1] = key;
				this.i++;
			}
			this.inprogress = false;
		},

		randomize(){ //Fill the array with random numbers between 1-100
			this.items = [];
			for (let i = 0; i < this.arrlen; i++)
				this.items.push(Math.floor(Math.random() * 99) + 1);
		}
	},
	beforeMount(){
		this.randomize();
	},
}

</script>