<template>
    <div id="canvas-wrap">
        <div id="hud">
            <div id="skill_icons">
              <div v-for="(ability, key) in client.abilities">
                <img :class="{'cannot_use': !client.can_use[key]}" width="60px" height="60px" :src="`/icons/${ability}.png`" alt="">
              </div>
            </div>
            <div id="player_stats" >
                <p> {{ client.energy }} / {{ client.max_energy }}</p>
                <p> {{ client.courage }} / {{ client.enl_trashold }}</p>
                <p> {{ getLife(client) }}</p>
            </div>
            <div id="meta_info" >
                <div id="time">
                    <p>{{ Math.floor(meta.ms / 1000 )}}</p>
                </div>
                <div id="scenario">
                    <p>{{ meta.scenario}}</p>
                </div>
                <div id="killed">
                    <p>{{ meta.killed }}</p>
                </div>
            </div>
        </div>
        <div style="filter:saturate(83%);justify-content: center;">
            <canvas id="canvas" width="480px" height="480px"></canvas>
        </div>
        <div id ="status">
            <div class="status-block status-block1">
                <div v-for="status in statuses.slice(0, 5)">
                    <img 
                    @mouseleave="$closeTitle()" @mouseover="$title($event, {'main_title': status.name, 'text': status.desc})"
                    width="60px" height="60px"
                    :title="status.desc"
                    :src="`/icons/${status.name}.png`" alt="">
                </div>
            </div>
            <div class="status-block status-block2">
                <div v-for="status in statuses.slice(5)">
                    <img 
                    @mouseleave="$closeTitle()" @mouseover="$title($event, {'main_title': status.name, 'text': status.desc})"
                    width="60px" height="60px"
                    :title="status.desc"
                    :src="`/icons/${status.name}.png`" alt="">
                </div>
            </div>s        
        </div>
    </div>
    <Upgrades v-if="show_upgrades" :data="upgrade_data" :abilities="client.abilities"></Upgrades>
    <Forging v-if="show_forging" :data="forging_data"></Forging>
    <Record v-if="show_record" :data="record_data"></Record>
</template>
<script setup>
    import Render from '~/render/Render';
    import { useNuxtApp } from '#app';
    import { reactive } from 'vue';

    const { $getInstance, $audio, $title, $closeTitle } = useNuxtApp();

    let $socket = $getInstance()
   
    let client = reactive({
        life: 0,
        max_life: 0,
        energy: 0,
        max_energy: 0,
        abilities: []
    })

    let show_upgrades = ref(false)
    let upgrade_data = reactive({})

    let show_record = ref(false)
    let record_data = reactive(1)

    let show_forging = ref(false)
    let forging_data = reactive({})

    let statuses = ref([])
    let meta = reactive({})

    let updateClientData = (data) => {
        if(!data) return
     
        client.life = data.life_status
        client.max_energy = data.max_resource
        client.energy = data.resource
        client.abilities = data.abilities
        client.can_use = data.can_use
        client.warded = data.ward
        client.courage = data.courage
        client.enl_trashold = data.max_courage
        client.max_life = data.max_life
    }

    let getLife = (client) => {
        if(client.warded){
            return 'warded'
        }
        else if(client.life > client.max_life){
            return 'blessed'
        }
        else if(client.life <= client.max_life && client.life > 3){
            return 'good'
        }
        else if(client.life === 3){
            return 'damaged'
        }
        else if(client.life === 2){
            return 'injured'
        }
        else if(client.life === 1){
            return "near dead"
        }
        else{
            return "dead"
        }
    }

    onMounted(() => {
   
        
        let render = new Render($socket)

        let updateMessages = (messages, client) => {
            messages.forEach(msg => {
                if(!msg.id || msg.id === client.id){
                    $title(null, msg.text)
                    setTimeout(() => {
                        $closeTitle()
                    }, 4000)
                }
            })
        }

        $socket.on('tick_data', server_data => {
            server_data = JSON.parse(server_data)
            let client = render.actors.get($socket.id)
            $audio.updateData(server_data, client)
            render.updateData(server_data)
            updateMessages(server_data.messedges, client)
            meta = server_data.meta
            updateClientData(client)
        })

        $socket.on('new_status', (data) => {
            let exist = statuses.value.find(elem => elem.name === data.name)
            if(exist){
                if(exist.timeout){
                    clearTimeout(exist.timeout)
                }
               
                statuses.value = statuses.value.filter(elem => elem != exist)
            }

            if(statuses.value.length >= 10){
                return
            }

            if(data.duration){
                data.timeout = setTimeout(() => {
                    $closeTitle()
                    statuses.value = statuses.value.filter(elem => elem.name != data.name)
                }, data.duration)
            }
            statuses.value.push(data)
        })

        $socket.on('game_is_over', () => {
            show_record.value = false
            $socket.disconnect()
        })

        $socket.on('status_end', (status_name) => {
            statuses.value = statuses.value.filter(elem => elem.name != status_name)
        })
        
        $socket.on('suggers_record', (data) => {
            show_record.value = true
            record_data = data
        })

        $socket.on('show_upgrades', (data) => {
            show_upgrades = true
            upgrade_data = data
        })

        $socket.on('show_forgings', (data) => {
            show_forging = true
            if(typeof data === 'object'){
                forging_data = data
                                
            }
            else{
                forging_data = JSON.parse(data)
            }
        })

        $socket.on('close_forgings', () => {
            show_forging = false
            $closeTitle()
            forging_data = {}
        })

        $socket.on('close_upgrades', () => {
            show_upgrades = false
            $closeTitle()
            upgrade_data = {}
        })
        let tick = 0

        setInterval(() => {
            render.draw()
            tick ++
            
            if(tick % 2 === 0){
                $socket.emit('inputs', render.input.getInputs())
            }
        }, 30)
    })
</script>