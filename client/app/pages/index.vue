<template>
    <div id="wrap">
        <Info v-if="state === 1"></Info>

        <div v-if="state === 1" style="color: #7a6b5c;display: flex;flex-direction: column; align-items: center;">
            <div>
                <img id="main-logo" src="/preview/logo.png" alt="">
            </div>
            <div class="button" @click="startLocalGame" style="background-color: #218a21;padding: 10px;margin-top: 6px;">
                single game
            </div> 
            <div>
                <img src="/preview/666.gif" alt="">
            </div>
            <div>
                <div v-if="lobbies_data.length" class="lobbies">
                    <div :style="'background-color:' +  (data.started === 'true' || (data.players >= data.maxPlayers) ? '#3a0000' : '#8a2121') + '; color:#e0e07a;'" @click="connect(data)" class="button" v-for="data in lobbies_data">
                        <p>{{ data.name }}</p>
                        <p>{{ data.players }} / {{ data.maxPlayers }}</p>
                    </div>
                </div>
            </div>
        </div>
           
        <GameCanvas v-else-if="state === 2"></GameCanvas> 
        <Lobby v-else-if="state === 3"></Lobby>
    </div>
</template>
<script setup>
    import '~/assets/css/main.css'
    import { LocalSocketMock } from '~/utils/LocalSocketMock'
    import { ref } from 'vue';
    import { useNuxtApp } from '#app';
   
    let { $getInstance, $connectTo, $audio, $setInstance } = useNuxtApp();

    let state = ref(1)
    let lobbies_data = ref([])

    let socket = $getInstance()

    const startLocalGame = () => {
        let localSocket = new LocalSocketMock()
        socket = localSocket
        $setInstance(socket) 

        socket.on('start', () => {
            state.value = 2
        })
        
        socket.on('connect_to_lobby', () => {
            state.value = 3
        });
    }

    let connect = (data) => {
        if(data.started === 'true') return
        if(data.players >= data.maxPlayers) return

        $connectTo(data.port)
        socket = $getInstance()

        socket.on('connect_to_lobby', () => {
            state.value = 3
        })

        socket.on('start', () => {
            state.value = 2
        })
    }
    onMounted(() => {
        const tg = window.Telegram?.WebApp

        if (tg) {
            tg.ready()
            
            if (tg.requestFullscreen) {
                tg.requestFullscreen()
            } else {
                tg.expand()
            }
            if (tg.disableVerticalSwipes) {
                tg.disableVerticalSwipes()
            }
        }

        socket.on('lobbies_list', (data) => {
            lobbies_data.value = data
        })

        socket.on('lobby_updated', (data) => {
            lobbies_data.value = data
        })

        socket.emit('get_lobbies')
    })
</script>