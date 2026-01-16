<template>
    <div id="upgrades">
        <div class="left-block">
             <p
                class="button"
                style="font-size: 26px;margin-top: 20px;color: whitesmoke;align-self: center;width: 80%;margin: 10px 0;"
                @click="$socket.emit('set_left_teacher')"
            >left
            </p>
             <div class="grace-and-ascend">
                     <div>
                        <p
                            @mouseover="$title($event, {
                                text: 'Used to learning abilities'
                            })"
                            @mouseleave="$closeTitle()"
                        >
                        Grace:
                        </p>
                        <span style="color: whitesmoke;">{{ data.grace }}</span>
                    </div>
                    <div>
                        <p
                            @mouseover="$title($event, {
                                    text: 'You gain this when get upgrades, and it affects the power of the improvements you can get to learn'
                            })"
                            @mouseleave="$closeTitle()"
                        >
                        Ascent:
                        </p>
                        <span style="color: whitesmoke;">{{ data.ascend }}</span>
                    </div>
                </div>
        </div>  
        <div @click="show_abilities = false; mastery_name = ''" v-if="show_abilities" id="suggest">
            <div class="button" @click="addMastery(ability)" v-for="ability in abilities">
                <p>{{ ability }}</p>
            </div>
        </div>
        <Stats :stats="data.stats" :triggers="data.triggers"></Stats>
        <div id='upgrades-right'>
            <div style="display: flex;justify-content: space-between;align-items: center;width: 100%; padding: 10px 0c">
               <div style="display: flex;justify-content: space-around;width: 100%;margin: 8px 0;">
                    <p v-if="data.ascend > 0"
                        @click="$socket.emit('hold_ascend')"
                        style="font-size: 16px;"
                        class="button" 
                        @mouseover="$title($event, {
                            text: 'Pay 1 ascent point to reroll upgrades.'
                        })"
                        @mouseleave="$closeTitle()" 
                        >reroll
                    </p>
                    <p v-if="true"
                        @click="$socket.emit('sacrifice')"
                        style="font-size: 16px;"
                        class="button" 
                        @mouseover="$title($event, {
                            text: 'Lose all life and get equals amount of grace, you can not learn upgrades in this time.'
                        })"
                        @mouseleave="$closeTitle()" 
                        >sacrifice
                    </p>
               </div>
                
            </div>
            <div class="upgrades-wrap">      
                <div v-for="upgrade in data.upgrades" class="upgrade"">
                    <img
                        class="button"
                        @mouseover="$title($event, {
                            main_title: upgrade.name,
                            text: upgrade.desc
                        })"
                        @mouseleave="$closeTitle()" 
                        @click="$socket.emit('select_upgrade', upgrade.name)"
                        width="60px"
                        height="60px"
                        :src="`/icons/${upgrade.name}.png`" alt="">
                        <p>
                            {{ upgrade.name }}
                        </p>
                        <p style="color: #8a0e0e;">
                            {{ upgrade.type }}
                        </p>
                        <p style="font-size: 14px;">
                           Cost: {{ upgrade.cost }}
                        </p>
                </div>
           </div>
           <div style="display: flex; flex-direction: column; justify-content: space-around;">
                <div style="display: flex; flex-direction: row; justify-content: space-around;flex-wrap: wrap;">
                    <div 
                        class="button" 
                        @click="suggestAbilities(mastery.name)"
                        @mouseover="$title($event, {
                            main_title: mastery.name,
                            text: mastery.description
                        })"
                        @mouseleave="$closeTitle()"
                        v-for="mastery in data.masteries">
                        <img width="60px" height="60px" :src="`/icons/small ward.png`" alt="">
                    </div>
                </div>        
           </div>
           
        </div>
    </div>
</template>
<script setup>
import Stats from './Stats.vue';

    const { $getInstance, $title, $closeTitle } = useNuxtApp();

    let $socket = $getInstance()

    let show_abilities = ref(false)
    let mastery_name = ref('')

    const props = defineProps({
        data: {
            type: Object,
            required: true,
        },
        abilities: {
            type: Array,
            required: true
        }
    });

    let suggestAbilities = (name) => {
        if(show_abilities.value){
            show_abilities.value = false
            mastery_name = ''
        }
        else{
            show_abilities.value = true
            mastery_name = name
        }
        
    }

    let addMastery = (ability) => {
        if(!mastery_name) return

        $socket.emit('add_mastery', {ability: ability, mastery: mastery_name})
    } 

</script>