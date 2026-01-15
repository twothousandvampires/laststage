<template>
    <div id="upgrades">
     
        <p
        class="button"
        style="font-size: 26px;margin-top: 20px;color: #8a0e0e;"
        @click="$socket.emit('set_left_teacher')"
        >left
        </p>
        <div @click="show_abilities = false; mastery_name = ''" v-if="show_abilities" id="suggest">
            <h2 style="text-align: center;color: brown;font-size: 16px;">choose ability</h2>
            <div class="button" @click="addMastery(ability)" v-for="ability in abilities">
                <p>{{ ability }}</p>
            </div>
        </div>
        <Stats :stats="data.stats" :triggers="data.triggers"></Stats>
        <div id ='upgrades-right'>
            <div style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
                <div class="grace-and-ascend">
                     <div>
                        <img
                            src="/preview/grace.gif"
                            @mouseover="$title($event, {
                                    text: 'Grace - used to learning abilities'
                            })"
                            @mouseleave="$closeTitle()"
                        >
                        <span style="color: #8a0e0e;">{{ data.grace }}</span>
                    </div>
                    <div>
                        <img src="/preview/helm.png"
                            @mouseover="$title($event, {
                                    text: 'Ascent - you gain this when get upgrades, and it affects the power of the improvements you can get to learn'
                            })"
                            @mouseleave="$closeTitle()"
                        >
                        <span style="color: #8a0e0e;">{{ data.ascend }}</span>
                    </div>
                </div>
               <div>
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
            <p style="text-align: center;">choose one</p>
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
                <div id="mastery">
                     <h2
                        @mouseover="$title($event, 'click to mastery to apply they to ability, it will be triggered when you use that ability, chance depends on ability cost. You get mastery every 15 ascent, after boss killing and after activating 5/5 mastery manifistation')"
                        @mouseleave="$closeTitle()"
                        >masteries
                    </h2>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: space-around;">
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