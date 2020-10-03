var app = new Vue ({
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
            var newDate = new Date(date);
            var now = new Date(Date.now());
            var day = newDate.getDate();
            var month = newDate.getMonth()+1;
            var year = newDate.getFullYear();

            if (now.getFullYear() === year && 
                (now.getMonth()+1) === month &&
                now.getDate() === day) 
            {
                var hours = newDate.getHours() < 10 ? '0'+newDate.getHours() : newDate.getHours();
                var minutes = newDate.getMinutes() < 10 ? '0'+newDate.getMinutes() : newDate.getMinutes();
                var seconds = newDate.getSeconds() < 10 ? '0'+newDate.getSeconds() : newDate.getSeconds();
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