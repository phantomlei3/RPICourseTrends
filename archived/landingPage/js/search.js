
/*Sample data*/
var sampleData = [
    'ARTS', 'COGS', 'COMM', 'ECON', 'GSAS', 'IHSS','LANG',
    'LITR', 'PHIL', 'PSYC', 'STSH', 'STSS', 'WRIT', 'BMED',
    'CHME', 'CIVL', 'ECSE', 'ENGR', 'CSCI'
];


Vue.component('search-panel', {
    template:'\
    <div class="search-input">\
        <input v-model="search" \
        v-on:keyup="get($event)" \
        v-on:keydown.enter="searchInput()" \
        v-on:keydown.up="selectUp()" \
        v-on:keydown.down="selectDown()">\
        <button v-on:click="searchInput()" class="search-btn">Search</button>\
        <div class="search-select"> \
            <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>\
                <li v-for="(value, index) in suggestionList" \
                v-bind:class="{selected: index==now}"\
                v-bind:key="value"\
                v-on:click="searchThis(index)"\
                v-on:mouseover="selectHover(index)" \
                class="search-select-option search-select-list">\
                    {{value}}\
                </li>\
            </transition-group>\
        </div>\
    </div>',

    data:function(){
        return {
            search: '',
            suggestionList: [],
            now: -1 //now indicates the current index of the chosen element in suggestionList
        }
    },

    methods: {

        /**helper function: RegEx to find the matched keywords in backend Data**/
        /**Should be modified to the type of data from the backend. Currently assume it is a array**/
        findSuggestions: function(searchKeyWord,backendData){
            let resultList = [];
            if (this.search === ""){ return resultList }
            const regexPattern = new RegExp(".*?"+searchKeyWord, "gi");
            for (let department of backendData){
                if (regexPattern.test(department)){
                    resultList.push(department);
                }
            }
            return resultList;
        },


        get: function(event) {
            //key up and key down will not trigger the rendering
            if(event.keyCode === 38 || event.keyCode === 40){
                return;
            }
            else{
                this.suggestionList = this.findSuggestions(this.search, sampleData);
            }

        },

        searchInput: function() {
            /**display of searched results**/
        },

        selectUp: function() {
            this.now--;
            if(this.now <= -1) {
                this.now = this.suggestionList.length - 1;
            }
            this.search = this.suggestionList[this.now];
        },

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

        selectHover: function(index) {
            this.now = index;
        }

    }

});

var app = new Vue({
    el:"#app"
});



