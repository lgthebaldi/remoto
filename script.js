<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Controle Robô ES070</title>
    <style>
        /* Estilos Gerais */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            color: #333;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .container {
            width: 100%;
            max-width: 500px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        header {
            background-color: #4A148C;
            color: white;
            padding: 20px;
            text-align: center;
            position: relative;
        }

        header h1 {
            margin: 0;
            font-size: 1.5em;
        }

        .connection-area {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .connection-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
        }

        .connection-btn {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            font-size: 1em;
            flex: 1;
        }

        #btnConnect {
            background-color: #E91E63;
        }

        #btnTestMode {
            background-color: #2196F3;
        }

        #btnConnect:disabled, #btnTestMode:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        #status {
            display: inline-block;
            margin-top: 10px;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
        }
        
        .status-disconnected {
            background-color: #F44336;
            color: white;
        }
        
        .status-connected {
            background-color: #4CAF50;
            color: white;
        }
        
        .status-test {
            background-color: #2196F3;
            color: white;
        }

        main {
            padding: 20px;
        }

        .card {
            background-color: #fafafa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .card h2 {
            margin-top: 0;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            color: #4A148C;
        }

        /* Seletor de Modo */
        .mode-selector {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            padding: 10px;
            background-color: #eee;
            border-radius: 5px;
        }

        .mode-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 5px;
            background-color: #ccc;
            color: #333;
            cursor: pointer;
            margin: 0 5px;
            transition: all 0.3s;
        }

        .mode-btn.active {
            background-color: #4A148C;
            color: white;
        }

        /* Estilos do Controle Automático */
        .auto-controls {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .auto-btn {
            padding: 12px;
            border: none;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .auto-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        #btnAutoStop {
            background-color: #F44336;
            color: white;
        }
        
        #btnAutoStart {
            background-color: #4CAF50;
            color: white;
        }
        
        #btnAutoRepos {
            background-color: #FF9800;
            color: white;
        }
        
        .auto-btn:active:not(:disabled) {
            transform: scale(0.95);
        }

        /* Estilos dos Joysticks */
        .joysticks-container {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
        }

        .joystick-wrapper {
            text-align: center;
            width: 45%;
        }

        .joystick {
            position: relative;
            width: 100%;
            max-width: 120px;
            height: 120px;
            background: radial-gradient(circle, #f0f0f0 0%, #ddd 100%);
            border-radius: 50%;
            margin: 10px auto;
            touch-action: none;
            box-shadow: inset 0 0 15px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.1);
        }

        .joystick-label {
            font-weight: bold;
            margin-bottom: 5px;
            color: #4A148C;
        }

        .joystick-handle {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, #6A1B9A 0%, #4A148C 100%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            cursor: move;
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
            transition: transform 0.1s ease;
        }

        .joystick-handle:active {
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            transform: translate(-50%, -50%) scale(0.95);
        }

        .joystick-value {
            display: block;
            margin-top: 5px;
            font-weight: bold;
            color: #4A148C;
        }

        .stop-btn {
            width: 100%;
            padding: 12px;
            background-color: #F44336;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
            margin-top: 10px;
        }

        .stop-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        /* Estilos dos Parâmetros */
        .param-group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .param-group label {
            flex-basis: 50%;
        }
        .param-group input[type="range"] {
            width: 100%;
        }
        #btnEnviarParams {
            width: 100%;
            padding: 12px;
            background-color: #1976D2;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
        }

        #btnEnviarParams:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        /* Estilos da Telemetria */
        .telemetry-data p {
            background-color: #eee;
            padding: 10px;
            border-radius: 5px;
            margin: 5px 0;
            display: flex;
            justify-content: space-between;
        }
        .telemetry-data span {
            font-weight: normal;
            color: #000;
        }

        /* Estilos do Debug Console */
        .console {
            background-color: #2b2b2b;
            color: #00FF41;
            height: 200px;
            overflow-y: scroll;
            padding: 10px;
            border-radius: 5px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.9em;
            white-space: pre-wrap;
        }
        .console p {
            color: #888;
        }

        .console-timestamp {
            color: #888;
            font-size: 0.8em;
        }

        footer {
            background-color: #eee;
            color: #777;
            padding: 10px;
            text-align: center;
            font-size: 0.8em;
        }

        /* Responsividade para Mobile */
        @media (max-width: 480px) {
            .connection-buttons {
                flex-direction: column;
            }
            
            .joystick {
                width: 100px;
                height: 100px;
            }
            
            .joystick-handle {
                width: 35px;
                height: 35px;
            }
            
            .auto-controls {
                grid-template-columns: 1fr;
                gap: 8px;
            }
            
            .auto-btn, .stop-btn, #btnEnviarParams {
                padding: 10px;
                font-size: 0.9em;
            }
            
            .param-group {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .param-group label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <header>
            <h1>Controle Robô ES070</h1>
            <div class="connection-area">
                <div class="connection-buttons">
                    <button id="btnConnect">Conectar Bluetooth</button>
                    <button id="btnTestMode">Modo Teste</button>
                </div>
                <span id="status" class="status-disconnected">Desconectado</span>
            </div>
        </header>

        <main>
            <div class="card">
                <div class="mode-selector">
                    <button id="btnModeAuto" class="mode-btn">Automático</button>
                    <button id="btnModeManual" class="mode-btn active">Manual</button>
                </div>
                
                <div id="autoSection">
                    <h2>Controle Automático</h2>
                    <div class="auto-controls">
                        <button id="btnAutoStop" class="auto-btn" disabled>Parar</button>
                        <button id="btnAutoStart" class="auto-btn" disabled>Iniciar</button>
                        <button id="btnAutoRepos" class="auto-btn" disabled>Reposicionar</button>
                    </div>
                </div>
                
                <div id="manualSection">
                    <h2>Controle Manual</h2>
                    <div class="joysticks-container">
                        <div class="joystick-wrapper">
                            <div class="joystick-label">Roda Esquerda</div>
                            <div class="joystick" id="joystickLeft">
                                <div class="joystick-handle"></div>
                            </div>
                            <span class="joystick-value" id="leftValue">0</span>
                        </div>
                        <div class="joystick-wrapper">
                            <div class="joystick-label">Roda Direita</div>
                            <div class="joystick" id="joystickRight">
                                <div class="joystick-handle"></div>
                            </div>
                            <span class="joystick-value" id="rightValue">0</span>
                        </div>
                    </div>
                    <button id="btnParar" class="stop-btn" disabled>Parar Motores</button>
                </div>
            </div>

            <div class="card">
                <h2>Configuração de Parâmetros</h2>
                <div class="param-group">
                    <label for="velocidade">Velocidade Máxima:</label>
                    <input type="range" id="velocidade" name="velocidade" min="0" max="100" value="50" disabled>
                    <span id="velocidadeValor">50</span>
                </div>
                 <div class="param-group">
                    <label for="sensibilidade">Sensibilidade:</label>
                    <input type="range" id="sensibilidade" name="sensibilidade" min="1" max="10" value="5" disabled>
                    <span id="sensibilidadeValor">5</span>
                </div>
                <button id="btnEnviarParams" disabled>Enviar Parâmetros</button>
            </div>

            <div class="card">
                <h2>Telemetria</h2>
                <div class="telemetry-data">
                    <p><strong>Distância:</strong> <span id="distancia">0.00 m</span></p>
                    <p><strong>Velocidade:</strong> <span id="velocidadeAtual">0.0 m/s</span></p>
                    <p><strong>Bateria:</strong> <span id="bateria">100%</span></p>
                    <p><strong>Postura (x, y, θ):</strong> <span id="postura">(0, 0, 0°)</span></p>
                </div>
            </div>

            <div class="card">
                <h2>Debug Console</h2>
                <div id="debug-console" class="console">
                    <p>Aguardando conexão com o robô...</p>
                </div>
            </div>
        </main>

        <footer>
            <p>FEM - UNICAMP</p>
        </footer>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Elementos da interface
            const btnConnect = document.getElementById('btnConnect');
            const btnTestMode = document.getElementById('btnTestMode');
            const statusDisplay = document.getElementById('status');
            const btnParar = document.getElementById('btnParar');
            const btnAutoStop = document.getElementById('btnAutoStop');
            const btnAutoStart = document.getElementById('btnAutoStart');
            const btnAutoRepos = document.getElementById('btnAutoRepos');
            const btnModeAuto = document.getElementById('btnModeAuto');
            const btnModeManual = document.getElementById('btnModeManual');
            const autoSection = document.getElementById('autoSection');
            const manualSection = document.getElementById('manualSection');
            const velocidadeSlider = document.getElementById('velocidade');
            const velocidadeValor = document.getElementById('velocidadeValor');
            const sensibilidadeSlider = document.getElementById('sensibilidade');
            const sensibilidadeValor = document.getElementById('sensibilidadeValor');
            const btnEnviarParams = document.getElementById('btnEnviarParams');
            const debugConsole = document.getElementById('debug-console');
            const leftValueDisplay = document.getElementById('leftValue');
            const rightValueDisplay = document.getElementById('rightValue');
            const distanciaDisplay = document.getElementById('distancia');
            const velocidadeAtualDisplay = document.getElementById('velocidadeAtual');
            const bateriaDisplay = document.getElementById('bateria');
            const posturaDisplay = document.getElementById('postura');

            // Variáveis globais
            let deviceCharacteristic = null;
            let isConnected = false;
            let isTestMode = false;
            let maxSpeed = 50;
            let sensitivity = 5;
            let currentMode = 'manual'; // 'auto' or 'manual'
            
            // Valores atuais dos joysticks (-100 a 100)
            let leftWheelValue = 0;
            let rightWheelValue = 0;
            
            // Zona morta para os joysticks (valores abaixo disso são ignorados)
            const deadZone = 5;

            // Inicialização
            disableControls();
            updateModeUI();

            // Atualiza os valores dos sliders
            velocidadeSlider.addEventListener('input', () => {
                velocidadeValor.textContent = velocidadeSlider.value;
                maxSpeed = parseInt(velocidadeSlider.value);
            });
            
            sensibilidadeSlider.addEventListener('input', () => {
                sensibilidadeValor.textContent = sensibilidadeSlider.value;
                sensitivity = parseInt(sensibilidadeSlider.value);
            });

            // Inicialização dos joysticks
            initJoystick('joystickLeft', (value) => {
                // Aplica zona morta
                if (Math.abs(value) < deadZone) {
                    value = 0;
                }
                
                leftWheelValue = value;
                leftValueDisplay.textContent = value;
                
                // Só envia comandos se estiver no modo manual
                if (currentMode === 'manual') {
                    sendWheelCommands();
                    addToConsole(`Comando enviado: Roda Esquerda = ${value}`);
                }
            });

            initJoystick('joystickRight', (value) => {
                // Aplica zona morta
                if (Math.abs(value) < deadZone) {
                    value = 0;
                }
                
                rightWheelValue = value;
                rightValueDisplay.textContent = value;
                
                // Só envia comandos se estiver no modo manual
                if (currentMode === 'manual') {
                    sendWheelCommands();
                    addToConsole(`Comando enviado: Roda Direita = ${value}`);
                }
            });

            // Função para inicializar um joystick
            function initJoystick(joystickId, callback) {
                const joystick = document.getElementById(joystickId);
                const handle = joystick.querySelector('.joystick-handle');
                const joystickSize = joystick.offsetWidth;
                const handleSize = handle.offsetWidth;
                const maxDistance = (joystickSize - handleSize) / 2;
                
                let isDragging = false;
                
                // Eventos para desktop
                handle.addEventListener('mousedown', (e) => {
                    if ((!isConnected && !isTestMode) || currentMode !== 'manual') return;
                    isDragging = true;
                    e.preventDefault();
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (!isDragging || (!isConnected && !isTestMode) || currentMode !== 'manual') return;
                    
                    const joystickRect = joystick.getBoundingClientRect();
                    const centerX = joystickRect.left + joystickSize / 2;
                    const centerY = joystickRect.top + joystickSize / 2;
                    
                    const deltaX = e.clientX - centerX;
                    const deltaY = e.clientY - centerY;
                    
                    // Calcular distância do centro
                    const distance = Math.min(maxDistance, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
                    
                    // Calcular ângulo
                    const angle = Math.atan2(deltaY, deltaX);
                    
                    // Calcular nova posição
                    const newX = Math.cos(angle) * distance;
                    const newY = Math.sin(angle) * distance;
                    
                    // Mover a alça
                    handle.style.transform = `translate(${newX}px, ${newY}px)`;
                    
                    // Calcular valor (-100 a 100) baseado na direção Y
                    const value = Math.round((-newY / maxDistance) * 100);
                    
                    // Chamar callback com o valor
                    callback(value);
                });
                
                document.addEventListener('mouseup', () => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    // Retornar ao centro
                    handle.style.transform = 'translate(-50%, -50%)';
                    callback(0);
                });
                
                // Eventos para mobile (toque)
                handle.addEventListener('touchstart', (e) => {
                    if ((!isConnected && !isTestMode) || currentMode !== 'manual') return;
                    isDragging = true;
                    e.preventDefault();
                });
                
                document.addEventListener('touchmove', (e) => {
                    if (!isDragging || (!isConnected && !isTestMode) || currentMode !== 'manual') return;
                    
                    const touch = e.touches[0];
                    const joystickRect = joystick.getBoundingClientRect();
                    const centerX = joystickRect.left + joystickSize / 2;
                    const centerY = joystickRect.top + joystickSize / 2;
                    
                    const deltaX = touch.clientX - centerX;
                    const deltaY = touch.clientY - centerY;
                    
                    // Calcular distância do centro
                    const distance = Math.min(maxDistance, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
                    
                    // Calcular ângulo
                    const angle = Math.atan2(deltaY, deltaX);
                    
                    // Calcular nova posição
                    const newX = Math.cos(angle) * distance;
                    const newY = Math.sin(angle) * distance;
                    
                    // Mover a alça
                    handle.style.transform = `translate(${newX}px, ${newY}px)`;
                    
                    // Calcular valor (-100 a 100)
                    const value = Math.round((-newY / maxDistance) * 100);
                    
                    // Chamar callback com o valor
                    callback(value);
                    
                    e.preventDefault();
                });
                
                document.addEventListener('touchend', () => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    // Retornar ao centro
                    handle.style.transform = 'translate(-50%, -50%)';
                    callback(0);
                });
            }

            // Função para enviar comandos das rodas
            function sendWheelCommands() {
                if ((!isConnected && !isTestMode) || currentMode !== 'manual') return;
                
                // Aplicar velocidade máxima e sensibilidade
                const leftCommand = Math.round(leftWheelValue * (maxSpeed / 100) * (sensitivity / 10));
                const rightCommand = Math.round(rightWheelValue * (maxSpeed / 100) * (sensitivity / 10));
                
                // Formatar comando: "L[valor];R[valor]\n"
                const command = `L${leftCommand};R${rightCommand}\n`;
                
                if (isTestMode) {
                    // Em modo de teste, apenas simula o envio
                    simulateTelemetry(leftCommand, rightCommand);
                } else {
                    sendBluetoothCommand(command);
                }
            }

            // Função para simular dados de telemetria no modo de teste
            function simulateTelemetry(left, right) {
                // Atualiza os dados de telemetria com valores simulados
                const distancia = (Math.random() * 5).toFixed(2);
                const velocidade = (Math.abs(left + right) / 2 * 0.1).toFixed(1);
                const bateria = Math.max(0, 100 - Math.random() * 5).toFixed(0);
                const x = (Math.random() * 10 - 5).toFixed(1);
                const y = (Math.random() * 10 - 5).toFixed(1);
                const theta = (Math.random() * 360).toFixed(0);
                
                distanciaDisplay.textContent = `${distancia} m`;
                velocidadeAtualDisplay.textContent = `${velocidade} m/s`;
                bateriaDisplay.textContent = `${bateria}%`;
                posturaDisplay.textContent = `(${x}, ${y}, ${theta}°)`;
            }

            // Função para adicionar mensagens ao console
            function addToConsole(message) {
                const timestamp = new Date().toLocaleTimeString();
                const formattedMessage = `<p><span class="console-timestamp">[${timestamp}]</span> ${message}</p>`;
                
                debugConsole.innerHTML += formattedMessage;
                debugConsole.scrollTop = debugConsole.scrollHeight;
                
                // Mantém um limite máximo de linhas
                const lines = debugConsole.innerHTML.split('</p>');
                if (lines.length > 50) {
                    debugConsole.innerHTML = lines.slice(-50).join('</p>') + '</p>';
                }
            }

            // Função para conectar ao Bluetooth
            async function connectToBluetooth() {
                try {
                    addToConsole('Solicitando dispositivo Bluetooth...');
                    const device = await navigator.bluetooth.requestDevice({
                        filters: [{ services: ['00001101-0000-1000-8000-00805f9b34fb'] }]
                    });

                    updateStatus('Conectando...', false, false);
                    addToConsole('Conectando ao dispositivo...');
                    
                    const server = await device.gatt.connect();
                    const service = await server.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb');
                    const characteristic = await service.getCharacteristic('00001102-0000-1000-8000-00805f9b34fb');
                    
                    deviceCharacteristic = characteristic;
                    isConnected = true;
                    isTestMode = false;
                    
                    await deviceCharacteristic.startNotifications();
                    deviceCharacteristic.addEventListener('characteristicvaluechanged', handleIncomingData);

                    addToConsole('Conectado com sucesso!');
                    updateStatus('Conectado', true, false);
                    enableControls();

                } catch (error) {
                    console.error('Ocorreu um erro:', error);
                    addToConsole(`Erro na conexão: ${error.message}`);
                    updateStatus('Falha na conexão', false, false);
                }
            }

            // Função para ativar o modo de teste
            function activateTestMode() {
                isTestMode = true;
                isConnected = false;
                addToConsole('Modo de teste ativado - Conexão simulada');
                updateStatus('Modo Teste', true, true);
                enableControls();
                
                // Inicia a simulação de telemetria
                simulateTelemetry(0, 0);
            }

            // Função para lidar com dados recebidos
            function handleIncomingData(event) {
                const value = event.target.value;
                const decoder = new TextDecoder('utf-8');
                const message = decoder.decode(value);
                
                addToConsole(`Dados recebidos: ${message}`);
            }

            // Função para atualizar o status da conexão
            function updateStatus(message, connected, testMode) {
                statusDisplay.textContent = message;
                
                statusDisplay.classList.remove('status-disconnected', 'status-connected', 'status-test');
                
                if (testMode) {
                    statusDisplay.classList.add('status-test');
                    btnConnect.disabled = false;
                    btnTestMode.disabled = true;
                } else if (connected) {
                    statusDisplay.classList.add('status-connected');
                    btnConnect.textContent = 'Desconectar';
                    btnTestMode.disabled = true;
                } else {
                    statusDisplay.classList.add('status-disconnected');
                    btnConnect.textContent = 'Conectar Bluetooth';
                    btnTestMode.disabled = false;
                    isConnected = false;
                    isTestMode = false;
                    deviceCharacteristic = null;
                    disableControls();
                }
            }

            // Função para enviar comandos via Bluetooth
            function sendBluetoothCommand(command) {
                if (!isConnected || !deviceCharacteristic) {
                    addToConsole('Não conectado. Impossível enviar comando.');
                    return;
                }
                try {
                    const encoder = new TextEncoder();
                    deviceCharacteristic.writeValue(encoder.encode(command));
                } catch (error) {
                    console.error('Erro ao enviar comando:', error);
                    addToConsole(`Erro ao enviar comando: ${error.message}`);
                    updateStatus('Erro de conexão', false, false);
                }
            }

            // Função para desabilitar controles
            function disableControls() {
                btnAutoStop.disabled = true;
                btnAutoStart.disabled = true;
                btnAutoRepos.disabled = true;
                btnParar.disabled = true;
                velocidadeSlider.disabled = true;
                sensibilidadeSlider.disabled = true;
                btnEnviarParams.disabled = true;
            }

            // Função para habilitar controles
            function enableControls() {
                btnAutoStop.disabled = false;
                btnAutoStart.disabled = false;
                btnAutoRepos.disabled = false;
                btnParar.disabled = false;
                velocidadeSlider.disabled = false;
                sensibilidadeSlider.disabled = false;
                btnEnviarParams.disabled = false;
            }

            // Função para atualizar a UI do modo
            function updateModeUI() {
                if (currentMode === 'auto') {
                    btnModeAuto.classList.add('active');
                    btnModeManual.classList.remove('active');
                    autoSection.style.display = 'block';
                    manualSection.style.display = 'none';
                    addToConsole('Modo automático ativado');
                } else {
                    btnModeAuto.classList.remove('active');
                    btnModeManual.classList.add('active');
                    autoSection.style.display = 'none';
                    manualSection.style.display = 'block';
                    addToConsole('Modo manual ativado');
                }
            }

            // Event listeners para os botões
            btnConnect.addEventListener('click', () => {
                if (!isConnected && !isTestMode) {
                    connectToBluetooth();
                } else {
                    // Desconectar
                    if (deviceCharacteristic) {
                        deviceCharacteristic.stopNotifications();
                    }
                    addToConsole('Conexão encerrada');
                    updateStatus('Desconectado', false, false);
                }
            });

            // Botão de modo teste
            btnTestMode.addEventListener('click', () => {
                activateTestMode();
            });

            // Botão de parar
            btnParar.addEventListener('click', () => {
                leftWheelValue = 0;
                rightWheelValue = 0;
                leftValueDisplay.textContent = '0';
                rightValueDisplay.textContent = '0';
                
                // Resetar posição visual dos joysticks
                document.querySelectorAll('.joystick-handle').forEach(handle => {
                    handle.style.transform = 'translate(-50%, -50%)';
                });
                
                // Enviar comando de parada
                if (isTestMode) {
                    addToConsole('Comando de parada enviado (simulado)');
                    simulateTelemetry(0, 0);
                } else {
                    sendBluetoothCommand('L0;R0\n');
                    addToConsole('Comando de parada enviado');
                }
            });

            // Controles automáticos
            btnAutoStop.addEventListener('click', () => {
                if (isTestMode) {
                    addToConsole('Comando automático: Parar (simulado)');
                } else {
                    sendBluetoothCommand('AUTO_STOP\n');
                    addToConsole('Comando automático: Parar');
                }
            });
            
            btnAutoStart.addEventListener('click', () => {
                if (isTestMode) {
                    addToConsole('Comando automático: Iniciar (simulado)');
                } else {
                    sendBluetoothCommand('AUTO_START\n');
                    addToConsole('Comando automático: Iniciar');
                }
            });
            
            btnAutoRepos.addEventListener('click', () => {
                if (isTestMode) {
                    addToConsole('Comando automático: Reposicionar (simulado)');
                } else {
                    sendBluetoothCommand('AUTO_REPOS\n');
                    addToConsole('Comando automático: Reposicionar');
                }
            });

            // Seletor de modo
            btnModeAuto.addEventListener('click', () => {
                currentMode = 'auto';
                updateModeUI();
            });
            
            btnModeManual.addEventListener('click', () => {
                currentMode = 'manual';
                updateModeUI();
            });

            // Botão de enviar parâmetros
            btnEnviarParams.addEventListener('click', () => {
                if (isTestMode) {
                    addToConsole(`Parâmetros enviados (simulado): Velocidade=${maxSpeed}, Sensibilidade=${sensitivity}`);
                } else {
                    sendBluetoothCommand(`PARAM:${maxSpeed},${sensitivity}\n`);
                    addToConsole(`Parâmetros enviados: Velocidade=${maxSpeed}, Sensibilidade=${sensitivity}`);
                }
            });
        });
    </script>
</body>
</html>
