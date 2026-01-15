<template>
    <div id="add-record"> 
        <p>You are have killed {{ data }} enemies.</p>
        <p>Tell us your name, challenger.</p>
        <input v-model="record_name" type="text">
        <button v-if="!submited" @click="sendRecord()">SUBMIT</button>
    </div>
</template>
<script setup>
    const { $getInstance } = useNuxtApp();
    
    let $socket = $getInstance()
    
    const props = defineProps({
    data: {
            type: Number,
            required: true,
        },
    });
    let submited = ref(false)

    let sendRecord = () => {
        if(record_name === '') return

        submited.value = true
        $socket.emit('add_record', record_name)
    }

    let record_name = ''

    
</script>