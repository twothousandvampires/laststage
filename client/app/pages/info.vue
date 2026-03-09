<template>
  <div id="top-panel">
    <NuxtLink to="/">
      <img :src="`/icons/back.png`" class="grid-img button" style="box-shadow: unset;">
    </NuxtLink>
    
    <div>
      <img :src="`/icons/rules.png`" class="grid-img button" 
           style="box-shadow: unset;" 
           @click="show_info = !show_info">
      
      <!-- Используем функцию вместо прямой вставки сокета -->
      <img :src="`/icons/records.png`" class="grid-img button" 
           style="box-shadow: unset;"  
           @click="handleGetRecords">
      
<<<<<<< Updated upstream
      <img :src="`/icons/discord.png`" class="grid-img button" 
=======
      <img :src="`/icons/tg.png`" class="grid-img button" 
>>>>>>> Stashed changes
           style="box-shadow: unset;" 
           @click="goTg">
    </div>
  </div>

  <GameInfo v-if="show_info" @click="show_info = false" />

  <div id="records" v-if="show_records" @click="show_records = false">
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center">
      <p>class</p>
      <p>kills</p>
      <p>waves</p>
      <p>date</p>
    </div>

    <!-- Защита через v-if и key -->
    <div v-for="(record, index) in records" 
         :key="index"
         style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
      <p>{{ record?.class || 'N/A' }}</p>
      <p>{{ record?.kills ?? 0 }}</p>
      <p>{{ record?.waves || "unknown" }}</p>
      <!-- Безопасный сплит даты -->
      <p>{{ record?.created_at ? record.created_at.split('T')[0] : '---' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

// Состояние
const show_info = ref(false);
const show_records = ref(false);
const records = ref([]);
const socket = ref(null);

// Инициализация
onMounted(() => {
  console.log('Fired: onMounted');
  
  try {
    const { $getInstance } = useNuxtApp();
    const socketInstance = $getInstance();
    
    if (socketInstance) {
      socket.value = socketInstance;
      console.log('Socket connected successfully');

      // Слушаем событие
      socket.value.on('records', (records_data) => {
        console.log('Received records data:', records_data);
        try {
          // Если данные уже объект, не парсим. Если строка — парсим.
          const data = typeof records_data === 'string' ? JSON.parse(records_data) : records_data;
          records.value = data;
        } catch (parseError) {
          console.error('JSON Parse error:', parseError);
        }
      });
    } else {
      console.error('Socket instance not found via $getInstance');
    }
  } catch (err) {
    console.error('Critical error in onMounted:', err);
  }
});

// Методы
const handleGetRecords = () => {
  console.log('Button clicked: get_records');
  if (socket.value) {
    socket.value.emit('get_records');
    show_records.value = !show_records.value;
  } else {
    alert('Соединение с сервером еще не установлено');
    console.warn('Socket not initialized yet');
  }
};

const goTg = () => {
<<<<<<< Updated upstream
  window.open('https://discird.gg/MReQMztuU6D', '_blank');
=======
  window.open('https://t.me/lststg', '_blank');
>>>>>>> Stashed changes
};
</script>
