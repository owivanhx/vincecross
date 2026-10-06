function openPolaroidModal(title, desc, imgUrl) {
    const modalId = 'polaroid-inspection-modal';
    let existingModal = document.getElementById(modalId);
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-[#f4eee1] p-6 rounded-lg max-w-md w-full border-4 border-[#3d2e23] shadow-2xl relative space-y-4">
            <button onclick="document.getElementById('${modalId}').remove()" class="absolute top-3 right-3 text-[#574435] hover:text-black font-cinzel font-bold text-lg">✕</button>
            <div class="text-center">
                <span class="text-xs font-courier text-[#6e5844] tracking-widest uppercase">Evidência Catalogada</span>
                <h3 class="font-cinzel font-bold text-xl text-[#211812] mt-1">${title}</h3>
            </div>
            <div class="w-full h-64 bg-[#2b221d] flex items-center justify-center overflow-hidden border border-[#d1c4b2] rounded">
                <img src="${imgUrl}" alt="${title}" class="object-cover w-full h-full filter sepia">
            </div>
            <p class="font-typewriter text-sm text-[#382b21] leading-relaxed">${desc}</p>
            <div class="text-right">
                <button onclick="document.getElementById('${modalId}').remove()" class="px-4 py-2 bg-[#3d2e23] text-[#f4eee1] font-typewriter text-xs rounded hover:bg-[#2b1f17] transition">Fechar Inspecionador</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Função para atualizar o Calendário com base no fuso horário do Oregon (EUA / America/Los_Angeles)
function gerarCalendarioOregon() {
    const tituloEl = document.getElementById('calendario-titulo');
    if (!tituloEl) return; // Só executa se estiver na página de calendário

    const agoraOregonStr = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const dataOregon = new Date(agoraOregonStr);

    const ano = dataOregon.getFullYear();
    const mes = dataOregon.getMonth(); // 0 a 11
    const diaAtual = dataOregon.getDate();

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    tituloEl.innerText = `${nomesMeses[mes]} / ${ano}`;

    const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
    const totalDiasMes = new Date(ano, mes + 1, 0).getDate();
    const totalDiasMesAnterior = new Date(ano, mes, 0).getDate();

    let htmlDias = '';

    for (let i = primeiroDiaDaSemana - 1; i >= 0; i--) {
        const diaAnterior = totalDiasMesAnterior - i;
        htmlDias += `<div class="p-2 text-[#b09e86]">${diaAnterior}</div>`;
    }

    for (let dia = 1; dia <= totalDiasMes; dia++) {
        if (dia === diaAtual) {
            htmlDias += `<div class="p-2 bg-[#4a3525] text-white rounded font-bold">${dia}</div>`;
        } else {
            htmlDias += `<div class="p-2 hover:bg-[#dcd0bc] rounded transition cursor-default">${dia}</div>`;
        }
    }

    const totalCelulasPreenchidas = primeiroDiaDaSemana + totalDiasMes;
    const celulasRestantes = (totalCelulasPreenchidas % 7 === 0) ? 0 : 7 - (totalCelulasPreenchidas % 7);
    for (let proximoDia = 1; proximoDia <= celulasRestantes; proximoDia++) {
        htmlDias += `<div class="p-2 text-[#b09e86]">${proximoDia}</div>`;
    }

    document.getElementById('calendario-corpo').innerHTML = htmlDias;
}

window.addEventListener('DOMContentLoaded', () => {
    gerarCalendarioOregon();
});
