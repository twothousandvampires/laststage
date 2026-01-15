<template>
    <div style="display: flex; flex-direction: column;">
        <div style="display: flex; flex-direction: row; justify-content: space-around;">
            <div class="button" @click="showAllStats()">
                show all
            </div>
        </div>
        <div class="stat-wrap">
            <div v-for="(part, num) in stats.stats">
                <div v-if="num < 2" class="stat-row" v-for="(key, stat) in part">
                    <p 
                        style="font-size: 14px; cursor: pointer;"
                        @mouseover="showStat($event, stats.descriptions[key])"
                        @mouseleave="$closeTitle()"
                        >
                        {{ stat }}:
                    </p>
                    <p style="font-size: 14px;"><span style="color: #8a0e0e;">{{ key }}</span></p>
                </div>
            </div>
        </div>
        <div v-if="all" class="all-stats" @click="all = false">
            <div class="stat-wrap">
                <div v-for="(part, num) in stats.stats">
                    <div class="stat-row" v-for="(key, stat) in part">
                        <p 
                            style="font-size: 14px; cursor: pointer;"
                            @mouseover="showStat($event, stats.descriptions[key])"
                            @mouseleave="$closeTitle()"
                            >
                            {{ stat }}:
                        </p>
                        <p style="font-size: 14px;"><span style="color: #8a0e0e;">{{ key }}</span></p>
                    </div>
                </div>
            </div>
             <div>
                <div v-for="(value, key, index) in triggers">
                    <div v-if="triggers[key].length != 0">
                        <p style="font-size: 26px;color: rgb(138, 14, 14);">{{ key }}</p>
                        <div style="display: flex; flex-direction: row; align-items: center;" v-for="trigger in triggers[key]">
                        <p
                        @mouseover="showStat($event, trigger.description)"
                        @mouseleave="$closeTitle()"
                        style="cursor: pointer; font-size: 14px;"
                        >{{ trigger.name }}</p>
                        <p>{{ (trigger.cd ? trigger.cd : 0) / 1000 }} sec / {{ trigger.chance }} %</p>
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