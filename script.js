// Aguarda o documento HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mapeamento dos Elementos do HTML ---
    // Pegamos referências para todos os elementos com que vamos interagir
    
    // Área de Conexão
    const btnConnect = document.getElementById('btnConnect');
    const statusDisplay = document.getElementById('status');
    
    // Controles Manuais
    const btnFrente = document.getElementById('btnFrente');
    const btnTras = document.getElementById('btnTras');
    const btnEsquerda = document.getElementById('btnEsquerda');
    const btnDireita = document.getElementById('btnDireita');
    const btnParar = document.getElementById('btnParar');

    // Parâmetros
    const velocidadeSlider = document.getElementById('velocidade');
    const velocidadeValor = document.getElementById('velocidadeValor');
    const sensibilidadeSlider = document.getElementById('sensibilidade');
    const sensibilidadeValor = document.getElementById('sensibilidadeValor');
    
    // --- 2. Lógica para os Sliders de Parâmetros ---
    
    // Adiciona um "ouvinte" ao slider de velocidade.
    // O evento 'input' é disparado toda vez que o valor do slider muda.
    velocidadeSlider.addEventListener('input', () => {
        // Atualiza o texto do elemento <span> com o valor atual do slider
        velocidadeValor.textContent = velocidadeSlider.value;
    });

    // Faz o mesmo para o slider de sensibilidade
    sensibilidadeSlider.addEventListener('input', () => {
        sensibilidadeValor.textContent = sensibilidadeSlider.value;
    });
    
    // --- 3. Lógica para os Botões de Controle ---
    // Para cada botão, adicionamos um "ouvinte" para o evento 'click'.
    // Por enquanto, vamos apenas mostrar uma mensagem no console.
    
    btnFrente.addEventListener('click', () => {
        console.log('Comando: Frente');
        // No futuro, aqui enviaremos o comando via Bluetooth
    });
    
    btnTras.addEventListener('click', () => {
        console.log('Comando: Trás');
    });

    btnEsquerda.addEventListener('click', () => {
        console.log('Comando: Esquerda');
    });

    btnDireita.addEventListener('click', () => {
        console.log('Comando: Direita');
    });

    btnParar.addEventListener('click', () => {
        console.log('Comando: Parar');
    });
    
    // Bônus: Simular conexão para testar a interface
    btnConnect.addEventListener('click', () => {
        // Simplesmente alterna o status para fins de layout
        if (statusDisplay.textContent === 'Desconectado') {
            statusDisplay.textContent = 'Conectado';
            statusDisplay.classList.remove('status-disconnected');
            statusDisplay.classList.add('status-connected');
            btnConnect.textContent = 'Desconectar';
        } else {
            statusDisplay.textContent = 'Desconectado';
            statusDisplay.classList.remove('status-connected');
            statusDisplay.classList.add('status-disconnected');
            btnConnect.textContent = 'Conectar Bluetooth';
        }
    });

});