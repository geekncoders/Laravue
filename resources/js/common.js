// Common.js is an scaffholding for axios for better performance as far as I came to know from the video tutorial
// For eg. We used error method in methods just because it is common and we can use it in any of the component

import axios from "axios"

export default{
    data(){
        return{

        }
    },
    methods: {
        async callApi(method, url, dataObj){
            try{
                return await axios({
                    method: method,
                    url: url,
                    data: dataObj
                });
            }
            catch(e){
                return e.response
            }
        },

        // For notice or notification or error
        info (desc, title="Hey") { // nodesc means no description
            this.$Notice.info({
                title: title,
                desc: desc
            });
        },
        success (desc, title="Great") {
            this.$Notice.success({
                title: title,
                desc: desc
            });
        },
        warning (desc, title="OOPs") {
            this.$Notice.warning({
                title: title,
                desc: desc
            });
        },
        error (desc, title="Ohh") {
            this.$Notice.error({
                title: title,
                desc: desc
            });
        },
        swr (desc="Something went wrong", title="OOPs") {
            this.$Notice.error({
                title: title,
                desc: desc
            });
        },
    }
}