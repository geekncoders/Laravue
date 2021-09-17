<template>
    <div>
        <h1>This is method component</h1>
        <h2>Lets build counter with basic functions/methdos</h2>
        <h1>Counter : {{ count }}</h1>
        <!-- <button @click="count += 1">Increase</button>
        <button @click="count -= 1">Decrease</button> -->

        <button @click="increaseCount(10)">Increase with method</button>
        <button @click="decreaseCount(-10)">Decrease with method</button>

        <button @click="increaseNumber">Increase without method</button>
        <button @click="decreaseNumber">Decrease without method</button>
    </div>
</template>

<script>
export default {
    data() {
        return{
            count: 0
        }
    },
    methods: {
        increaseCount(num){
            this.count+= num
        },
        decreaseCount(num){
            this.count+= num
        },
        increaseNumber(){
            this.count+=1
        },
        decreaseNumber(){
            this.count-=1
        }
    }
}
</script>