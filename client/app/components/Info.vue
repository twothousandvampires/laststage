<template>
  <div id="top-panel">
    <p style="margin-right: 16px;" @click="show_info = !show_info">info</p>
    <p style="margin-right: 16px;" @click="socket.emit('get_records');show_records = !show_records">records</p>
    <p @click="show_contact = !show_contact">contact</p>
    <GameInfo v-if="show_info" @click="show_info = false"></GameInfo> 

    <div id ="records" v-if="show_contact">
      tg - @work_enjoyer
    </div>

    <div id ="records" v-if="show_records" @click="show_records = false">
        <div style="display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;text-align: center">
          <p>class</p>
          <p>kills</p>
          <p>waves</p>
          <p>date</p>
        </div>
 
        <div v-for="record in records" style="display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;text-align: center;">
            <p> {{ record.class }}</p>
            <p> {{ record.kills }}</p>
            <p> {{ record.waves ? record.waves : "unknown"}}</p>
            <p> {{ record.created.split('T')[0] }}</p>
        </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { useNuxtApp } from '#app';
  
  let { $getInstance } = useNuxtApp();
  let show_info = ref(false)
  let show_records = ref(false)
  let show_contact = ref(false)
  let records = ref([])

  let socket = $getInstance()

  onMounted(() => {

    socket.on('records', async (records_data) => {
      let data = await JSON.parse(records_data)
      records.value = data
    })  

  })

</script>