export default defineNuxtPlugin(() => {
    let closeTitle = () => {
        let exist = document.getElementById('title')

        if(exist){
            exist.parentNode.removeChild(exist)
        }

        let exist2 = document.getElementById('message')

        if(exist2){
            exist2.parentNode.removeChild(exist2)
        }
       
    }
    let createTitle = (e, title_text) => {
        closeTitle()
        let title_div = document.createElement('div')
        let text =  document.createElement('p')
     
        let main_title = undefined

        if(typeof title_text === 'object'){
            text.innerText = title_text.text
            if(title_text.main_title){
                main_title = document.createElement('p')
                main_title.innerText = title_text.main_title
                main_title.classList = 'main_title'
            }
        }
        else{
            text.innerText = title_text
        }

        if(e){
            // Если есть событие - позиционируем относительно курсора
            title_div.style.top = (e.pageY + 15) + 'px'
            title_div.style.left = (e.pageX + 15) + 'px'
            title_div.id = 'title'
        } else {
            // Если нет события - позиционируем по центру на 65% высоты экрана
            let centerX = window.innerWidth / 2
            let centerY = window.innerHeight * 0.65 // 65% от высоты экрана
            title_div.id = 'message'
            title_div.style.top = centerY + 'px'
            title_div.style.left = centerX + 'px'
            title_div.style.transform = 'translate(-50%, -50%)' // Центрируем элемент относительно его центра
        }

        if(main_title){
            title_div.appendChild(main_title)
        }

        title_div.appendChild(text)

        document.getElementsByTagName('body')[0].appendChild(title_div)

        const rect = title_div.getBoundingClientRect();
        if(e){
            if(rect.bottom > window.innerHeight){
                title_div.style.top = (e.pageY - rect.height- 15) + 'px'
            }
            if(rect.right > window.innerWidth){
                title_div.style.left = (e.pageX - rect.width - 15) + 'px'
            }
        }
        
    }
    
    return {
        provide: {
            title: createTitle,
            closeTitle: closeTitle
        }
    };
});