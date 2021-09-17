<template>
    <div>
        <h1 ref="myref">This is hooks page. We can understand hooks from the comments in source code. {{ name }}</h1>
        <h1>{{ name }}</h1>
    </div>
</template>

The code below is a hook.
<!-- This will only work on the local template file means only in this page and will not work in any other template files. -->
<script>
    export default{
        data() {
            return{
                name: 'Adnan'
            }
        },
        created(){
            // This will hide html but will show data like  this is used to show only data
            console.log('this will show', this.$refs.myref) // This will not show dom elements
            console.log('this will show', this.name) // This will not show dom elements but will show data
        },
        mounted(){
            // This is used to show dom elements along with data
            console.log('This will show', this.$refs.myref) // This will show dom elements
            console.log('This will show', this.name) // This will show elements data too.
        }
    }
</script>
