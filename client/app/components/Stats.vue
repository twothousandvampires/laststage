<template>
    <div style="display: flex; flex-direction: column;" @click="all = !all">
        <!-- <div style="display: flex; flex-direction: row; justify-content: space-around;">
            <div class="button" @click="showAllStats()">
                show triggers
            </div>
        </div> -->
        <div v-if="!all" class="stat-wrap">
            <div v-for="(part, num) in stats.stats">
                <div class="stat-row" v-for="(key, stat) in part">
                    <p 
                        class="class-paragraph"
                        style="cursor: pointer;"
                        @mouseover="showStat($event, stats.descriptions[stat])"
                        @mouseleave="$closeTitle()"
                        >
                        {{ stat }}:
                    </p>
                    <p class="class-paragraph"><span style="color: #8a0e0e;">{{ key }}</span></p>
                </div>
            </div>
        </div>
        <div v-else class="all-stats">
             <div>
                <div v-for="(value, key, index) in triggers">
                    <div v-if="triggers[key].length != 0">
                        <p style="font-size: 16px;color: black;">{{ key }}</p>
                        <div style="display: flex; flex-direction: row; align-items: center;justify-content: space-between;" v-for="trigger in triggers[key]">
                        <p
                        @mouseover="showStat($event, trigger.description)"
                        @mouseleave="$closeTitle()"
                        style="cursor: pointer; font-size: 14px;color: whitesmoke;"
                        >{{ trigger.name }} </p>
                            <p style="color: whitesmoke;"> {{ (trigger.cd ? trigger.cd : 0) / 1000 }} sec / {{ trigger.chance }} %</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
        
</template>
<script setup>
    const { $title, $closeTitle, $getInstance } = useNuxtApp();
    let showStat = (event, desc) =>{
        if(!desc) return

        $title(event, desc)
    }

    let show = ref('stats')
    let all = ref(false)
    
    let showAllStats = () => {
        all.value = true
    }

    const props = defineProps({
        stats: {
            type: Object,
            required: true,
        },
        triggers: {
            type: Object,
            required: true,
        },
    });
</script>