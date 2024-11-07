document.getElementById("addItemBtnManual").addEventListener("click", function () {
    const item = document.createElement('div');
    item.classList.add('item');

    // Campo de quantidade
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.placeholder = 'QTD';
    qtyInput.required = true;
    qtyInput.style.width = '20%';
    qtyInput.step = '0.01';
    qtyInput.classList.add('qty'); // Usando class ao invés de id repetido

    // Campo de descrição
    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.placeholder = 'Descrição do item';
    descInput.required = true;
    descInput.style.width = '50%';
    descInput.classList.add('desc'); // Usando class ao invés de id repetido

    // Campo de preço
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.placeholder = 'UNI';
    priceInput.required = true;
    priceInput.style.width = '20%';
    priceInput.step = '0.01';
    priceInput.classList.add('price'); // Usando class ao invés de id repetido

    // Botão para remover o item
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    removeBtn.textContent = 'x';
    removeBtn.addEventListener('click', function () {
        item.remove();
    });

    // Adicionando os elementos ao item
    item.appendChild(qtyInput);
    item.appendChild(descInput);
    item.appendChild(priceInput);
    item.appendChild(removeBtn);

    // Adicionando o item ao board
    document.getElementById('board').appendChild(item);
});

// Função principal para gerar o PDF
document.getElementById("orcamentoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Pegando os dados do cliente
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;

    // Formatando a data
    const [ano, mes, dia] = data.split('-');
    const datebr = `${dia}/${mes}/${ano}`;

    let valorTotalItens = 0; // Variável para somar o total dos itens

    const items = [];
    // Pegando os itens inseridos no board
    document.querySelectorAll("#board .item").forEach(function (itemDiv) {
        const qty = parseFloat(itemDiv.querySelector(".qty").value);
        const desc = itemDiv.querySelector(".desc").value;
        const price = parseFloat(itemDiv.querySelector(".price").value);
        const totalItem = qty * price;
        items.push({ qty, desc, price, total: totalItem });
        valorTotalItens += totalItem; // Somando o total de cada item
    });

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Criando o template padrão
    const img = new Image();
    img.src = "/src/img/template.png";

    // Quando a imagem do template carregar, desenha no PDF
    img.onload = function () {
        doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

        doc.setFont("Helvetica");
        doc.setFontSize(14);

        // Adicionando dados do cliente
        doc.text(125, 90, nome);

        // Adicionando a data
        doc.setTextColor(255, 255, 255);
        doc.text(25, 56, datebr);
        let ypos = 125; // Posição Y inicial para os itens

        // Adicionando os itens
        items.forEach(item => {
            doc.setTextColor(0, 0, 0);
            doc.text(13, ypos, item.qty.toString());  // Quantidade
            doc.text(35, ypos, item.desc);            // Descrição
            doc.text(160, ypos, item.price.toFixed(2)); // Preço Unitário
            doc.text(180, ypos, item.total.toFixed(2)); // Total Item
            ypos += 10;  // Desce a posição para o próximo item
        });

        // Adicionando o valor total de todos os itens
        doc.setTextColor(255, 255, 255);
        doc.text(165, 217, valorTotalItens.toFixed(2)); // Total Geral

        // Salvando o PDF
        doc.save(`Orcamento_${nome}.pdf`);
    };
});
