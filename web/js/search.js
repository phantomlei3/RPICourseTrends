
Vue.component('search-panel', {
    template:'\
    <div class="search-input nav-show nav-item">\
        <input v-model="search" \
        v-on:keyup="get($event)" \
        v-on:keydown.enter="searchInput()" \
        v-on:keydown.up="selectUp()" \
        v-on:keydown.down="selectDown()"\
        placeholder="Find any course department or course number">\
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

        // if (Cookies.get("searchInput")){
        //     this.search = Cookies.get("searchInput");
        // }
        //
        // var _this = this;
        // $.getJSON("../sample/identity_v2.json", function (dtaCourses) {
        //
        //     $.each( dtaCourses, function( key, val ) {
        //         if (val["department"] === _this.search){
        //             resultJson[key] = val;
        //         }
        //     });
        //     // for (let item in dtaCourses) {
        //     //     if (dtaCourses[item]["department"] == _this.search) {
        //     //         resultJson[item] = dtaCourses[item]
        //     //     }
        //     // }
        // });


    },


    methods: {


        depFullName: function (val) {
            return departmentList[val];
        },

        /**helper function: RegEx to find the matched keywords in backend Data**/
        /**Should be modified to the type of data from the backend. Currently assume it is a array**/
        findSuggestions: function(searchKeyWord,Data){
            let resultList = [];
            if (this.search === ""){ return resultList }
            const regexPattern = new RegExp(".*?"+searchKeyWord, "gi");
            for (let department of Data){
                if (regexPattern.test(department)){
                    resultList.push(department);
                }
            }
            // display the first five results
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
            this.search = this.search.toUpperCase();
            Cookies.set("searchInput", this.search);
            location.href = "coursePage.html";
            
        },

        /**
         * This method filters the original json for results,
         * then returns a new json with filtered results.
         */
        // filterCourseData: function(dtaCourses) {
        //     let newJson_ = {};
        //     // Currently only filter Department Name
        //     for (let item in dtaCourses) {
        //         console.log(dtaCourses[item]);
        //         if (dtaCourses[item]["department"] === this.search) {
        //             newJson_[item] = dtaCourses[item]
        //         }
        //     }
        //     return newJson_
        // },

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

var searchApp = new Vue({
    el:"#app"
});



