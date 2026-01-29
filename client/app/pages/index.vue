<template>
    <div id="wrap">
        <div v-if="state === 1" class="grid-menu">
        <!-- Генерируем 60 ячеек (5 колонок * 12 строк) -->
            <div 
                v-for="(cell, index) in grid" 
                :key="index"
                class="cell",
            >   
                <span class="button" v-if="b_data[index]">
                    <img @click="handleCellClick(index)" class="grid-img" :src="`/icons/${b_data[index].icon}.png`" alt="">
                </span>
                <span v-else>
                    <img class="grid-img" :src="`/icons/${cell.icon}.png`" alt="">
                </span>  
            </div>
        </div>
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
        'soulrender', 'spiritual call', 'sword handle', 'unhuman fortitude', 'blind', 'body melting', 'bravery', 'cloak', 'charged bow', 'commands', 'afterlight',
        'blessed fighter', 'crystal greaves', 'electrified dash', 'exhaustion', 'leaded by shost', 'lightning_eye', 'mystic way', 'through and through', 'zap',
        'while we alive', 'heaven intervention', 'glass sword', 'frost sphere', 'fragility', 'fortification', 'forger', 'forge', 'flesh harvest', 'flame ring',
        'emerald knife', 'durability', 'drained', 'distorter', 'disintegration', 'disease', 'devouring', 'devouring flame', 'destroyer', 'despair', 'defender',
        'cutting', 'curse', 'crushed', 'crossbow', 'corrosion', 'conductivity', 'conduct of pain', 'collapse', 'charged shield', 'charged armour', 'glacial chain',
        'excitement', 'fan of swords', 'fire spliting', 'light stream'
    ]

    let b_data = {
            12: {
                icon: 'local game',
                action: () => startLocalGame()
            },
            17: {
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
    let grid = ref([])

    let socket = $getInstance()

    const getRandomIcon = () => {
        return icons[Math.floor(Math.random() * icons.length)]
    }

    const showLobbies = () => {
        show_lobbies.value = true
    }

    const createGrid = () => {
        for(let i = 0; i < 45; i++){
            grid.value.push({
                icon: getRandomIcon()
            })
        }
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

    const changeGridImg = () => {
        grid.value = grid.value.map(elem => {
            return {
                icon: getRandomIcon()
            }
        })
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
        createGrid()
        setInterval(() => {
            if(state.value != 1) return

            changeGridImg()
        }, 5000)
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