//função mensagem de alerta
function alertMsg(alertText, kind='error') {
    let param4 = document.getElementById('alert-message'); 
    
    param4.classList.remove('hidden');
    param4.classList.remove('alert-sucess');
    param4.classList.add('alert',`alert-${kind}`, 'alert-show');
    param4.textContent = `${alertText}`;

    setTimeout(function(){ 
        let element = document.getElementById(`alert-message`);
        element.classList.add('hidden'); 
        }, 5000);
};

export default {alertMsg};