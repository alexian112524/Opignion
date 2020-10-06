const app = new Vue ({
    el: '#app',
    data: {
        name: "",
        opinion: "",
        opignons: []
    },
    methods: {
        onSubmit: function () {
            axios.post('http://localhost:3000/api/opignons', {
                name: this.name,
                opinion: this.opinion,
                date: Date.now()
            })
            .then(response => {
                response = response.data.opignon;
                this.opignons.unshift({ 
                    ...response
                });
            })
            .catch(error => { console.log(error); });

            this.name = "";
            this.opinion = "";
        }, 
        isDisabled: function () {
            return (this.name === "" || this.opinion === "");
        },
        toDate: function (date) {
            const newDate = new Date(date);
            const now = new Date(Date.now());
            const day = newDate.getDate();
            const month = newDate.getMonth()+1;
            const year = newDate.getFullYear();

            if (now.getFullYear() === year && 
                (now.getMonth()+1) === month &&
                now.getDate() === day) 
            {
                const hours = newDate.getHours() < 10 ? '0'+newDate.getHours() : newDate.getHours();
                const minutes = newDate.getMinutes() < 10 ? '0'+newDate.getMinutes() : newDate.getMinutes();
                const seconds = newDate.getSeconds() < 10 ? '0'+newDate.getSeconds() : newDate.getSeconds();
                return hours+':'+minutes+':'+seconds;
            }

            return day+'/'+month+'/'+year;
        }
    },
    watch: {
        
    },
    mounted() {
        axios
            .get('http://localhost:3000/api/opignons')
            .then(response => (this.opignons = response.data.reverse()))
            .catch(error => console.log(error));
    }
});