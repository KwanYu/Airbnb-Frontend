<template>
        <v-container>
            <h3>Location</h3>
            <input type="text" class="text" placeholder="Input a city" v-model="city" @blur="search('blur')" @focus="search('focus')">
            <h3>Time</h3>
                <div>
                    <div class="datepicker-trigger">
                        <input
                                type="text"
                                id="datepicker-trigger"
                                placeholder="Select dates"
                                :value="formatDates(dateOne, dateTwo)"
                        >
                        <AirbnbStyleDatepicker
                                :trigger-element-id="'datepicker-trigger'"
                                :mode="'range'"
                                :fullscreen-mobile="true"
                                :date-one="dateOne"
                                :date-two="dateTwo"
                                @date-one-selected="val => { dateOne = val }"
                                @date-two-selected="val => { dateTwo = val }"
                        />
                    </div>
                </div>
            <h3>Guests</h3>
            <div class="right-wrap">
                <div class="number box-item" @click="showNumber">
                    <span class="iconfont icon">&#xe6b6;</span>
                    <span v-if="!this.count">People</span>
                    <span v-if="this.count">{{this.count}}Adult</span>
                    <span v-if="this.babyAdd">,{{this.babyCount}}Baby</span>
                </div>
                <div class="btn box-item">
                    <v-btn @click="getData">Search</v-btn>
                </div>
                <div class="number-select" v-if="this.showNumberselect">
                    <ul>
                        <li class="clearfix">
                            <span class="fl first">Adult</span>
                            <div class="fr">
                                <button class="btns" @click="reduce('adult')" :class="{'disabled': this.adultCount === 0}">-</button>
                                <span class="count">{{this.adultCount}}</span>
                                <button class="btns" @click="add('adult')">+</button>
                            </div>
                        </li>
                        <li class="clearfix">
                            <span class="fl">Children<br><span class="year">2 to 12 years</span></span>
                            <div class="fr">
                                <button class="btns" @click="reduce('children')" :class="{'disabled': this.childrenCount === 0}">-</button>
                                <span class="count">{{this.childrenCount}}</span>
                                <button class="btns" @click="add('children')">+</button>
                            </div>
                        </li>
                        <li class="clearfix">
                            <span class="fl">Baby<br><span class="year">2 years or below</span></span>
                            <div class="fr info">
                                <button @click="reduce('baby')" :class="{'disabled': this.babyCount === 0}">-</button>
                                <span class="count">{{this.babyCount}}</span>
                                <button @click="add('baby')">+</button>
                            </div>
                        </li>
                            <v-btn @click="cencel">Cancel</v-btn>
                            <v-sapcer></v-sapcer>
                            <v-btn @click="sure">Confirm</v-btn>
                    </ul>
                </div>
            </div>
        </v-container>
</template>

<script>
    import format from 'date-fns/format'
    import axios from 'axios'
    export default {
        data() {
            return {
                dateFormat: 'D MMM',
                dateOne: '',
                dateTwo: '',
                showSelect: false,
                city: '',
                value6: '',
                count: null,
                adultCount: 0,
                childrenCount: 0,
                babyCount: 0,
                babyAdd: null,
                showNumberselect: false,
                itemList: []
            }
        },
        methods: {
            formatDates(dateOne, dateTwo) {
                let formattedDates = ''
                if (dateOne) {
                    formattedDates = format(dateOne, this.dateFormat)
                }
                if (dateTwo) {
                    formattedDates += ' - ' + format(dateTwo, this.dateFormat)
                    console.log(formattedDates)
                }
                return formattedDates

            },
            search(type) {
                if (type === 'blur') {
                    this.showSelect = false;
                } else {
                    this.showSelect = true;
                }
            },
            changeCity(data) {
                this.city = data.city;
                this.showSelect = false;
            },
            showNumber() {
                this.showNumberselect = true;
            },
            reduce(type) {
                // if (this.count >= 0) {
                //   this.count--;
                // }
                if (type === 'adult' && this.adultCount > 0) {
                    this.adultCount--;
                    this.count--;
                }
                if (type === 'children' && this.childrenCount > 0) {
                    this.childrenCount--;
                    this.count--;
                }
                if (type === 'baby' && this.babyCount > 0) {
                    this.babyCount--;
                    this.babyAdd--;
                }
            },
            add(type) {
                if (type === 'adult') {
                    this.adultCount++;
                    this.count++;
                }
                if (type === 'children') {
                    this.childrenCount++;
                    this.count++;
                    // this.count += this.childrenCount;
                }
                if (type === 'baby') {
                    this.babyCount++;
                    this.babyAdd++;
                }
            },
            cencel() {
                this.adultCount = 0;
                this.childrenCount = 0;
                this.babyCount = 0;
                this.count = null;
                this.babyAdd = null;
            },
            sure() {
                this.showNumberselect = false;
            },
            getData() {
                axios.get('/test.json').then(response => {
                    this.itemlist =response.data
                    console.log(response.data);
                });
            }
        }
    }
</script>
