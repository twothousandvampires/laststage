<template>
    <div id="wrap">
        <div v-if="state === 1" class="grid-menu">
        <!-- Генерируем 60 ячеек (5 колонок * 12 строк) -->
            <div 
                v-for="n in 40" 
                :key="n"
                class="cell",
            >
          
            <span class="button" v-if="b_data[n]">
                <img @click="handleCellClick(n)" class="grid-img" :src="`/icons/${b_data[n].icon}.png`" alt="">
            </span>
            <span v-else>
                <img class="grid-img" :src="`/icons/${getRandomIcon(n)}.png`" alt="">
            </span>
            </div>
        </div>
        <!-- <Info v-if="state === 1"></Info>

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
           
        </div> -->
         <div>
            <div v-if="lobbies_data.length && show_lobbies" class="lobbies">
                <div :style="'background-color:' +  (data.started === 'true' || (data.players >= data.maxPlayers) ? '#3a0000' : '#8a2121') + '; color:#e0e07a;'" @click="connect(data)" class="button" v-for="data in lobbies_data">
                    <p>{{ data.name }}</p>
                    <p>{{ data.players }} / {{ data.maxPlayers }}</p>
                </div>
            </div>
        </div>
        <GameCanvas v-if="state === 2"></GameCanvas> 
        <Lobby v-if="state === 3"></Lobby>
    </div>
</template>
<script setup>
    import '~/assets/css/main.css'
    import { LocalSocketMock } from '~/utils/LocalSocketMock'
    import { ref } from 'vue';
    import { useNuxtApp } from '#app';

    let icons = ['divine weapon', 'focusing', 'jump', 'ascended','grim pile', 'icicles', 'scorching', 'scream', 'shattered weapon', 'staff', 'light beacon',
        'soulrender', 'spiritual call', 'sword handle', 'unhuman fortitude', 'blind', 'body melting', 'bravery', 'cloak', 'charged bow', 'commands'
    ]

    let b_data = {
            13: {
                icon: 'local game',
                action: () => startLocalGame()
            },
            18: {
                icon: 'lobby',
                action: () => showLobbies()
            }
        }

    const handleCellClick = (index) => {
        const cell = b_data[index]
        if (cell) cell.action()
    }

    let { $getInstance, $connectTo, $audio, $setInstance } = useNuxtApp();

    let state = ref(1)
    let lobbies_data = ref([])
    let show_lobbies = ref(false)

    let socket = $getInstance()

    const getRandomIcon = () => {
        return icons[Math.floor(Math.random() * icons.length)]
    }

    const showLobbies = () => {
        show_lobbies.value = true
    }

    const startLocalGame = () => {
        show_lobbies.value = false
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
        show_lobbies.value = false
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
        const isTelegram = tg && tg.initData !== ""

        if (isTelegram) {
            tg.ready()
            tg.expand()
            if (tg.requestFullscreen) {
                tg.requestFullscreen()
            }
            if (tg.disableVerticalSwipes) {
                tg.disableVerticalSwipes()
            }
            tg.setHeaderColor('#000000')
            tg.setBackgroundColor('#000000')
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