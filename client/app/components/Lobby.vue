<template>
    <div id="lobby">
        <div v-if="show_item_pull" class="item_pull">
            <div @click="show_item_pull = false" style="flex-grow: 1;min-width: 100%;text-align: center; cursor: pointer;">
                <h2 @mouseleave="$closeTitle()" @mouseover="$title($event, 'common item pool for all players, you can take 2')">items pool</h2>
            </div>
            <div v-for="item in item_pull">
                <img class="button"
                    @mouseleave="$closeTitle()"
                    @mouseover="$title($event, {'main_title': item.name, 'text':item.description})" 
                    @click="pickItem(item.name)"
                    width="60px"
                    height="60px"
                    :src="`/icons/${item.name}.png`"
                    alt="">
                </img>
            </div>
        </div>
        <div v-if="lobby_data.length && show_abilities_pull" class="abilities_pull">
            <div style="flex-grow: 1;min-width: 100%;text-align: center; cursor: pointer;">
                    <h2>possible abilities</h2>
                </div>
            <div style="display: flex; align-items: center;">            
                <div v-for="ability in abilities_to_pick">
                    <img 
                     class="button"
                     @mouseleave="$closeTitle()" @mouseover="$title($event, {'main_title': ability.name, 'text': ability.desc})"
                     @click="selectSkill(ability.name)" width="60px" height="60px" :src="`/icons/${ability.name}.png`" alt="">
                </div>
            </div>
        </div>
        <div :class="(value.ready ? 'player_ready' : 'player') + ` player${key + 1}`" v-for="(value, key) in lobby_data" :key="key">
            <div class="right_block">
                <div class="right_top" :style="value.ready ? 'background-color: #7a7a3a' : ''">
                    <div class="select_and_preview">
                        <img width="160px" height="160px" :src="`/preview/${value.template.name}.gif`" alt="{{value.template.name}}">
                    </div>
                    <div class="select_ready_equip">
                        <select @change="($event) => {$socket.emit('change_class', $event.target.value)}" style="visibility: visible;width: 100%;" class="char-select">
                            <option value="swordman">swordman</option>
                            <option value="flyer">flyer</option>
                            <option value="cultist">cultist</option>
                        </select>
                        <div class="equip_and_image">
                            <div v-for="item in value.template.item">
                                <img
                                class="button"
                                @click="unpickItem(value, item.name)"
                                width="60px"
                                height="60px"
                                :src="`/icons/${item.name}.png`"
                                @mouseleave="$closeTitle()"
                                @mouseover="$title($event, {'main_title': item.name, 'text':item.description})"
                                alt="">
                            </div>
                            <div v-for="num in 2 - value.template.item.length">
                                <img
                                class="button"
                                
                                width="60px"
                                height="60px"
                                :src="`/icons/service.png`"
                                @mouseleave="$closeTitle()"
                                @click="openItemPull(value)"
                                @mouseover="$title($event, 'click to select item')"
                                alt="">
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div class="load-and-save">
                    <div v-if="value.is_player" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; width: 60%;">
                        <p class="button" @click="ready(value)">{{ value.ready ? 'cancel' : 'ready' }}</p>
                        <p @mouseover="$title($event,'load stats, items and abilities')" @mouseleave="$closeTitle()" class="button" @click="loadBuild(value.template.name)">load</p>
                        <p @mouseover="$title($event,'save stats, items and abilities')" @mouseleave="$closeTitle()" class="button" @click="saveBuild(value.template.name, value.template)">save</p>
                    </div>
                    <div v-else style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; width: 60%;">
                        <p class="button">last</p>
                        <p class="button">stage</p>
                    </div>
                </div>
                <div class="right_bottom" v-if="lobby_data.length">
                    
                    <div class="selected_skill_div" v-for="selected in value.template.abilities.filter(elem => elem.selected)">        
                        <img 
                        class="button"
                        width="60px"
                        height="60px" 
                        @mouseleave="$closeTitle()"
                        @mouseover="$title($event, {'main_title': selected.name, 'text': selected.desc})"
                        :src="`/icons/${selected.name}.png`"
                        @click="opemAbbilitiesPull(value, selected.type)"
                        alt="">
                    </div>
                </div>
            </div>
            <div class="left_block">
                <div class="stat_wrap">
    
                    <p>remain stat points : {{ value.template.stat_count }}</p>
                    <div class="stat" v-for="(stat_value, key) in value.template.stats">
                        <p class="button" v-if="value.is_player" @click="decreaseStat(key)">-</p>
                        <p v-else>///</p>
                        <p
                        @mouseover="$title($event, value.template.stats_description[key])"
                        @mouseleave="$closeTitle()"
                        class="button">
                            {{ key }} : {{ stat_value }}
                        </p>
                       
                        <p class="button" v-if="value.is_player" @click="increaseStat(key)">+</p>
                         <p v-else>///</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useNuxtApp } from '#app';

    const { $getInstance, $audio, $title, $closeTitle } = useNuxtApp();

    let show_item_pull = ref(false)
    let show_abilities_pull = ref(false)

    let lobby_data = ref([])
    let abilities_to_pick = ref([])

    let $socket = $getInstance()
    console.log($socket)
    let increaseStat = (stat) => {
        $socket.emit('increase_stat', stat)
    }

    let decreaseStat = (stat) => {
        $socket.emit('decrease_stat', stat)
    }

    let ready = (player) =>{
        if(!player.is_player) return

        show_item_pull.value = false
        show_abilities_pull.value = false
        $socket.emit('player_ready')
    }

    let pickItem = (item_name) => {
        $audio.setSound('menu item take')
        $closeTitle()
        $socket.emit('pick_item', item_name)
    }

    let unpickItem = (player, item_name) => {
        if(!player.is_player) return
        
        $audio.setSound('menu item drop')
        $closeTitle()
        $socket.emit('unpick_item', item_name)
    }

    let selectSkill = (skill_name) => {
        $audio.setSound('select_skill')
        $closeTitle()
        $socket.emit('select_skill', skill_name)
        show_abilities_pull.value = false
        abilities_to_pick.value = []
    }

    let getSkillType = (type) => {
        if(type === 1) return 'main'
        else if(type === 2) return 'secondary'
        else if(type === 3) return 'finisher'
        else if(type === 4) return 'utility'
        else if(type === 5) return 'passive'
    }

     let loadBuild = (name) => {
        let b = JSON.parse(localStorage.getItem(name))
        if(b){
            $socket.emit('load_template', b)
            $closeTitle()
        }
    }

    let saveBuild = (name, item) => {
        if(!name || !item) return
        localStorage.setItem(name, JSON.stringify(item))
    }

    let openItemPull = (player) => {
        if(!player.is_player) return

        $closeTitle()
        show_item_pull.value = true
        show_abilities_pull.value = false
    }

    let opemAbbilitiesPull = (player, type) => {
        if(!player.is_player) return

        $closeTitle()
        show_item_pull.value = false
        show_abilities_pull.value = true  
        abilities_to_pick.value = player.template.abilities.filter(elem => elem.type === type && !elem.selected)
    }

    let item_pull = ref([])

    onMounted(() => {
        $closeTitle()
    
         $socket.on('update_lobby_data', data => {
            data.data.sort((a, b) => a.id === $socket.id ? - 1 : 1)

            lobby_data.value = []
            
            data.data.forEach(element => {
                if(element.id === $socket.id){
                    element.is_player = true
                    if(element.template.item.length >= 2){
                        show_item_pull.value = false
                    }
                }
                
                lobby_data.value.push(element)
            });

            item_pull.value = []
            data.available.forEach(elem => item_pull.value.push(elem))
        })

        $socket.emit('get_lobby_data')   
    })
</script>