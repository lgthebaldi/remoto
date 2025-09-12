// Aguarda o documento HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mapeamento dos Elementos do HTML ---
    const btnConnect = document.getElementById('btnConnect');
    const statusDisplay = document.getElementById('status');
    const btnFrente = document.getElementById('btnFrente');
    const btnTras = document.getElementById('btnTras');
    const btnEsquerda = document.getElementById('btnEsquerda');
    const btnDireita = document.getElementById('btnDireita');
    const btnParar = document.getElementById('btnParar');
    const velocidadeSlider = document.getElementById('velocidade');
    const velocidadeValor = document.getElementById('velocidadeValor');
    const sensibilidadeSlider = document.getElementById('sensibilidade');
    const sensibilidadeValor = document.getElementById('sensibilidadeValor');

    // Variável para guardar a característica do Bluetooth que usaremos para enviar dados
    let deviceCharacteristic = null;
    let isConnected = false;

    // --- 2. Lógica para os Sliders de Parâmetros ---
    velocidadeSlider.addEventListener('input', () => {
        velocidadeValor.textContent = velocidadeSlider.value;
    });
    sensibilidadeSlider.addEventListener('input', () => {
        sensibilidadeValor.textContent = sensibilidadeSlider.value;
    });

    // --- 3. Lógica Principal do Bluetooth ---

    // Função para conectar ao dispositivo Bluetooth
    async function connectToBluetooth() {
        try {
            console.log('Solicitando dispositivo Bluetooth...');
            // Abre a janela do navegador para o usuário escolher um dispositivo
            const device = await navigator.bluetooth.requestDevice({
                // Filtra por dispositivos que oferecem o serviço de porta serial (padrão do HC-05)
                filters: [{ services: ['00001101-0000-1000-8000-00805f9b34fb'] }]
                // Se o filtro acima não funcionar, tente a opção abaixo, que mostra todos os dispositivos.
                // acceptAllDevices: true 
            });

            console.log('Dispositivo selecionado:', device.name);
            updateStatus('Conectando...', false);

            // Conecta ao servidor GATT do dispositivo
            const server = await device.gatt.connect();
            
            // Obtém o serviço de porta serial
            const service = await server.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb');
            
            // Obtém a característica do serviço que permite a escrita de dados
            const characteristic = await service.getCharacteristic('00001102-0000-1000-8000-00805f9b34fb');
            
            // Armazena a característica globalmente para ser usada por outras funções
            deviceCharacteristic = characteristic;
            isConnected = true;
            
            console.log('Conectado com sucesso!');
            updateStatus('Conectado', true);

        } catch (error) {
            console.error('Ocorreu um erro:', error);
            updateStatus('Falha na conexão', false);
        }
    }

    // Função para atualizar a interface do usuário
    function updateStatus(message, connected) {
        statusDisplay.textContent = message;
        if (connected) {
            statusDisplay.classList.remove('status-disconnected');
            statusDisplay.classList.add('status-connected');
            btnConnect.textContent = 'Desconectar';
        } else {
            statusDisplay.classList.remove('status-connected');
            statusDisplay.classList.add('status-disconnected');
            btnConnect.textContent = 'Conectar Bluetooth';
        }
    }

    // Função para enviar comandos via Bluetooth
    function sendBluetoothCommand(command) {
        if (!isConnected || !deviceCharacteristic) {
            console.warn('Não conectado. Impossível enviar comando.');
            return;
        }
        try {
            console.log(`Enviando comando: ${command}`);
            // O comando precisa ser enviado como um array de bytes
            const encoder = new TextEncoder();
            deviceCharacteristic.writeValue(encoder.encode(command));
        } catch (error) {
            console.error('Erro ao enviar comando:', error);
        }
    }
    
    // --- 4. Conectando os Eventos às Funções ---
    
    btnConnect.addEventListener('click', () => {
        // Se já estiver conectado, a lógica de desconexão seria aqui (não implementada para simplificar)
        // Por agora, apenas tentamos conectar.
        if (isConnected) {
            // Lógica de desconexão (futuro)
            console.log("Desconexão ainda não implementada.");
        } else {
            connectToBluetooth();
        }
    });

    // Atualiza os botões para enviar comandos via Bluetooth em vez de console.log
    btnFrente.addEventListener('click',    () => sendBluetoothCommand('F'));
    btnTras.addEventListener('click',      () => sendBluetoothCommand('B'));
    btnEsquerda.addEventListener('click',  () => sendBluetoothCommand('L'));
    btnDireita.addEventListener('click',   () => sendBluetoothCommand('R'));
    btnParar.addEventListener('click',     () => sendBluetoothCommand('S'));
});
