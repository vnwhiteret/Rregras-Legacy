// Manual dos mecanicos (Pitstop e Truck Diesel). Cada pagina chama mecanicaSecoes('pitstop' ou 'truck').
// Para editar: mude o texto aqui. **texto** vira negrito.
function mecanicaSecoes(tipo) {
  const truck = tipo === 'truck';
  const nome = truck ? 'Truck Diesel' : 'Pitstop';
  const loja = truck ? 'Loja Truck Diesel' : 'Loja Pitstop';

  return [
    { grupo: 'Comece aqui', id: 'turno', icon: 'fa-clock', cor: 'c1', titulo: 'Começando o turno', tiles: [
      { t: '🕒 Bater o ponto', v: 'Entre **em serviço** antes de trabalhar. O salário cai a cada **40 minutos**, só com o ponto aberto.' },
      { t: '🏦 De onde sai o salário', v: 'Do **cofre da ' + nome + '**. Cofre vazio = ninguém recebe. Cada nota paga enche o cofre.' },
      { t: '📍 Área da oficina', v: truck ? 'A oficina fica no **norte (Paleto)**. Os serviços só funcionam **dentro da área**.' : 'A oficina fica na **cidade**. Os serviços só funcionam **dentro da área**.' },
    ], blocos: [
      { h: 'O que você atende', itens: truck ? [
        'A Truck Diesel mexe **só em motor diesel**: caminhões, pickups e veículos com motor diesel.',
        'Carro a gasolina é com a **Pitstop**. O sistema bloqueia se você tentar.',
      ] : [
        'A Pitstop mexe em **carros e motos a gasolina**.',
        'Motor **diesel** é com a **Truck Diesel**. O sistema bloqueia se você tentar.',
      ]},
      { h: 'Peças', itens: [
        'As peças ficam na **' + loja + '** (só funcionários). Elas saem **de graça** da loja: quem paga é o cliente, pela nota.',
        'Pegue só o que vai usar. Peça parada no inventário não dá dinheiro para ninguém.',
      ]},
    ]},

    { id: 'cobranca', icon: 'fa-file-invoice-dollar', cor: 'c3', titulo: 'Cobrança (tablet F4)', passos: [
      ['Abra o tablet', 'Aperte **F4** perto do cliente (até 10 metros).'],
      ['Monte a nota', 'Escolha os serviços e peças nas categorias: **Reparos**, **Peças**, **Motores**, **Mapas de drift** e **Retífica**.'],
      ['Envie para o cliente', 'Escolha o cliente na lista de pessoas próximas e envie. Ele paga pelo **banco**.'],
    ], tiles: [
      { t: '💵 Divisão da nota', v: '**25%** para você · **35%** para o cofre da empresa · 40% é o custo das peças.' },
      { t: '🚗 Deslocamento e guincho', v: 'Deslocamento cidade **R$ 1.500** · norte **R$ 3.500**<br>Guincho cidade **R$ 2.500** · norte **R$ 4.500**' },
    ], blocos: [{ h: 'Regras de cobrança', itens: [
      'Cobre **sempre pela nota**. Cobrar por fora ou fazer acordo pessoal = **expulsão**.',
      'Cobre o que **foi feito**. Não cobre peça que não instalou.',
      'Os preços já estão no tablet. Não invente preço.',
    ]}]},

    { grupo: 'Serviços', id: 'painel', icon: 'fa-screwdriver-wrench', cor: 'c4', titulo: 'Painel "Peças" (capô aberto)', sub: 'Abra o capô, mire no carro com o olhinho (ALT) e escolha Peças.',
      tiles: [
        { t: '🛢️ Óleo', v: 'Completar, **trocar óleo + filtro** e trocar só o filtro. Motor **desligado** e até **80°C**.' },
        { t: '💧 Arrefecimento', v: 'Completar **água + aditivo**, trocar **radiador**, **bomba d’água** e **junta do cabeçote**.' },
        { t: '🔋 Elétrica', v: 'Trocar **bateria** e **alternador**.' },
        { t: '⚙️ Preparação', v: truck ? 'Câmbio, transmissão, **bomba e bicos diesel**, admissão, downpipe, diferencial e **swap de motor**.' : 'Câmbio, transmissão, **bomba de combustível**, **bicos**, admissão, downpipe, **FuelTech**, diferencial e **swap de motor**.' },
      ],
      blocos: [{ h: 'Outras opções no olhinho', itens: [
        '**Verificar Óleo** e **Verificar Água do Radiador**: veja o estado antes de cobrar.',
        '**Drenar Óleo** e **Drenar Água**: esvazia antes de trocar.',
        '**Regular Pressão do Turbo**: aparece com o capô aberto em carro com turbo.',
        'O painel mostra o que está **quebrado** e quantos km faltam para alternador e bomba d’água.',
      ]}],
    },

    { id: 'motor', icon: 'fa-gears', cor: 'c2', titulo: 'Motor no cavalete', sub: 'Peças internas (pistão, biela, cabeçote, comando, válvulas, volante, embreagem, bloco, turbo) são montadas com o motor fora do carro.',
      passos: [
        ['Retirar o motor', 'Com o carro **dentro da oficina** e o capô aberto, escolha **Retirar Motor** no olhinho.'],
        ['Levar ao cavalete', 'Carregue o motor até um cavalete livre e escolha **Colocar Motor Aqui**.'],
        ['Modificar', 'No cavalete, escolha **Modificar Motor** e instale as peças (com as peças no inventário). Cada peça gasta **25 de moral** do carro.'],
        ['Pegar o motor', 'Terminou? Escolha **Pegar Motor** no cavalete.'],
        ['Instalar no carro', 'Volte ao carro e escolha **Instalar Motor**.'],
        ['Testar', 'Ligue, confira óleo, água e o painel antes de entregar.'],
      ],
      blocos: [
        { h: 'Moral do carro', itens: [
          'Cada carro tem até **250** de moral (ganha nos Eventos de Moral). Peça instalada gasta **25**; freio **5 por roda**.',
          'Sem moral suficiente, a peça **não instala**. Avise o cliente antes de começar.',
          'Voltar uma peça para a **original** não gasta moral.',
        ]},
        { h: 'Monte na ordem certa', itens: [
          'Turbo forte só com **pistão, biela, cabeçote e válvulas** preparados.',
          truck ? 'Turbo maior pede **bicos e bomba diesel** maiores.' : 'Turbo maior pede **bicos e bomba** maiores. Depois, acerte na **FuelTech**.',
          'Explique ao cliente: preparação mal feita **quebra o motor**, e a culpa volta para a oficina.',
        ]},
        { h: 'Motor perdido', itens: [
          'Motor que ficou esquecido no cavalete ou sumiu: use **/motoresperdidos** para recuperar.',
        ]},
      ],
    },

    { id: 'elevador', icon: 'fa-arrow-up-from-ground-water', cor: 'c5', titulo: 'Elevador, rodas e freio', sub: 'Esses serviços pedem o carro levantado (pelo menos 1,80 m) no elevador, dentro da oficina.',
      blocos: [{ h: 'Serviços no elevador', itens: [
        '**Trocar Pneu**: o pneu furado (item **pneu**).',
        truck ? '**Trocar os 4 pneus** (original).' : '**Trocar os 4 pneus**: original ou **pneu de drift** (gasta 25 de moral).',
        '**Retirar / Colocar Roda**.',
        '**Freio**: nível 1 (cerâmico), 2 (aço) e 3 (carbono). Gasta **5 de moral por roda**.',
        '**Tração**: traseira, dianteira ou 4x4.',
        truck ? 'Ângulo de direção (steering lock) é serviço da Pitstop.' : '**Steering Lock** 50, 60 ou 70° (gasta 25 de moral).',
      ]}],
    },

    { id: 'radiador', icon: 'fa-temperature-high', cor: 'c6', titulo: 'Radiador, junta e quebras', blocos: [
      { h: 'Radiador', itens: [
        'Radiador furado em batida: o cliente pode chegar com **gambiarra** (20%) ou **reparo** (80%).',
        'Radiador que já teve gambiarra **só troca**: use o item **radiador** pelo painel.',
        'Upgrade: **alumínio 1 fan** (+40% de resfriamento) ou **2 fans** (+80%).',
      ]},
      { h: 'Junta do cabeçote', itens: [
        'Motor que passou de **118°C** pode queimar a junta: sai fumaça e ele **come óleo**.',
        'Troque com o item **junta do cabeçote** e complete o óleo.',
      ]},
      { h: 'Retífica', itens: [
        'Bloco quebrado (motor que rodou sem óleo, por exemplo): leve o **bloco** até a **fresa** e escolha **Colocar bloco na retífica**.',
        'Espere o tempo e escolha **Retirar bloco da retífica**. Cobre **Retífica** na nota.',
        truck ? 'A Truck Diesel tem uma fresa na oficina do norte.' : 'A Pitstop tem **duas fresas**.',
      ]},
      { h: 'Lataria', itens: [
        'Use o **martelinho** no carro amassado. Para mecânico em serviço, o conserto **não gasta** o item.',
      ]},
    ]},

    { grupo: 'Avançado', id: 'avancado', icon: 'fa-microchip', cor: 'c7', titulo: truck ? 'Câmbio, remap e diagnóstico' : 'FuelTech, remap e diagnóstico', blocos: [
      { h: 'Remap de câmbio', itens: [
        'Stage **1 (+10%)**, **2 (+20%)** e **3 (+25%)**: sem risco.',
        'Stage **4 (+40%)** e **5 (+60%)**: **podem quebrar o câmbio** se o carro andar muito tempo no limite. Avise o cliente.',
        'É feito dentro da oficina e cobrado pela nota (de **R$ 15.000** a **R$ 100.000**).',
      ]},
      truck ? { h: 'Diesel', itens: [
        'Bicos diesel: **100, 180, 260 e 360 cv por bico**. Bombas diesel: **600, 1.000 e 1.600 cv**.',
        'Swap de motor diesel: **MWM Sprint 6.07T** e **Cummins 3.9**.',
      ]} : { h: 'FuelTech', itens: [
        'Instale o **kit FuelTech** pelo painel (gasta 25 de moral).',
        'Com a FT você acerta **mistura, ponto, pressão do turbo, controle de tração e 2-step**.',
        'Acerto ruim (mistura pobre, ponto adiantado, pressão demais) **desgasta e quebra** o motor.',
        '**Mapas de drift** prontos são vendidos pela nota (categoria Mapas de drift).',
      ]},
      { h: 'Diagnóstico', itens: [
        '**Tablet OBD** (item): lê a saúde das peças e os erros do carro.',
        '**/perfdiag**: painel de diagnóstico (mistura, bicos, bomba, embreagem). **PAGE UP / DOWN** trocam a página.',
        '**Dinamômetro**: mede a potência real. Abra com **/mechanicdyno**.',
      ]},
    ]},

    { id: 'regras', icon: 'fa-scale-balanced', cor: 'c6', titulo: 'Regras da oficina', blocos: [{ h: 'Obrigatório', itens: [
      'Atendimento por **ordem de chegada**.',
      'Uniforme **só em serviço**. Em serviço tem que trabalhar.',
      'Proibido favorecer a si mesmo ou amigos.',
      'Proibido vender peças ou kits para quem não é da oficina.',
      'Proibido suspensão e rodas fora da realidade.',
      'Organização **neutra**: foi preso ou se envolveu em crime = **expulso na hora**.',
      'Veículo da empresa só para o trabalho.',
    ]}]},
  ];
}
