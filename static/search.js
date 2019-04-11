
Vue.component('search-panel', {
    template:'\
    <div class="search-input nav-show nav-item">\
        <input v-model="search" \
        v-on:keyup="get($event)" \
        v-on:keydown.enter="searchInput()" \
        v-on:keydown.up="selectUp()" \
        v-on:keydown.down="selectDown()" >\
                <button v-on:click="searchInput()" class="search-btn">\</button>\
                <div class="search-select"> \
                    <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>\
                        <li v-for="(value, index) in suggestionList" \
                        v-bind:class="{selected: index==now}"\
                        v-bind:key="value"\
                        v-on:click="searchThis(index)"\
                        v-on:mouseover="selectHover(index)" \
                        class="search-select-option search-select-list">\
                            <div>{{value}}&nbsp&nbsp</div>\
                            <div>{{depFullName(value)}}</div>\
                        </li>\
                    </transition-group>\
                </div>\
            </div>',

    data:function(){
        return {
            search: '',
            suggestionList: [],
            now: -1, //now indicates the current index of the chosen element in suggestionList

        }
    },

    created: function(){

    },


    methods: {


        depFullName: function (val) {
            return departmentList[val];
        },

        /*
        * TODO: Refactor this code in python
        *
        * */
        /**helper function: RegEx to find the matched keywords in backend Data**/
        /**Should be modified to the type of data from the backend. Currently assume it is a array**/
        findSuggestions: function(searchKeyWord,Data) {
            let resultList = [];
            if (this.search === ""){ return resultList }
            // suggest Course departments
            if (searchKeyWord.length < 4) {
                const regexPattern = new RegExp(".*?" + searchKeyWord, "gi");
                for (let department of Data) {
                    if (regexPattern.test(department)) {
                        resultList.push(department);
                    }
                }
            }
            /**
             * TODO: suggest Course Codes in specific departments
             * */

            return resultList.splice(0,5);
        },

        get: function(event) {
            //key up and key down will not trigger the rendering
            if(event.keyCode === 38 || event.keyCode === 40){
                return;
            }
            else{
                this.suggestionList = this.findSuggestions(this.search, Object.keys(departmentList));
            }
            
        },



        searchInput: function() {
            // if user enter something to search
            if (!(this.search === "")){
                const departRegex = new RegExp("[A-Z]{4}");
                const coursecodeRegex = new RegExp("[A-Z]{4}(-)[0-9]{4}");

                // set up the search input in the href
                location.href = "coursePage?search=" + this.search;

            }

            
        },

        // suggestion list: select up
        selectUp: function() {
            this.now--;
            if(this.now <= -1) {
                this.now = this.suggestionList.length - 1;
            }
            this.search = this.suggestionList[this.now];
        },

        // suggestion list: select down
        selectDown: function() {
            this.now++;
            if(this.now == this.suggestionList.length) {
                this.now = 0;
            }
            this.search = this.suggestionList[this.now];
        },

        // When users click a suggestion in the list, search starts.
        searchThis: function(index){
            this.search = this.suggestionList[index];
            this.searchInput();
        },

        // detect the user mouse position
        selectHover: function(index) {
            this.now = index;
        }


        /**
         * Legacy Code
         * **/
        //
        //  * Setup cookie for searches and initialize other cookies
        //  */
        // setCookie: function(place, content) {
        //     let l = ["department", "courseCode", "courseName"];
        //     for (let i=0; i<3; ++i) {
        //         if (place === l[i]) {
        //             Cookies.set(l[i], this.search);
        //         }else{
        //             Cookies.set(l[i], "null");
        //         }
        //     }
        // },

    }

});

var searchApp = new Vue({
    el:"#app"
});



