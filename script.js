document.getElementById("gerar").addEventListener("click", (event) => {
    event.preventDefault();

    // NOME E DATA :
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const [ano, mes, dia] = data.split('-');
    const datebr = `${dia}/${mes}/${ano}`;

    // QUANTIDADE :
    const qtd1 = parseFloat(document.getElementById('qtd1').value) || 0;
    const qtd2 = parseFloat(document.getElementById('qtd2').value) || 0;
    const qtd3 = parseFloat(document.getElementById('qtd3').value) || 0;
    const qtd4 = parseFloat(document.getElementById('qtd4').value) || 0;
    const qtd5 = parseFloat(document.getElementById('qtd5').value) || 0;
    const qtd6 = parseFloat(document.getElementById('qtd6').value) || 0;
    const qtd7 = parseFloat(document.getElementById('qtd7').value) || 0;

    // DESCRIÇÃO SERVIÇOS :
    const desc1 = document.getElementById('desc1').value;
    const desc2 = document.getElementById('desc2').value;
    const desc3 = document.getElementById('desc3').value;
    const desc4 = document.getElementById('desc4').value;
    const desc5 = document.getElementById('desc5').value;
    const desc6 = document.getElementById('desc6').value;
    const desc7 = document.getElementById('desc7').value;

    // VALOR UNITARIO :
    const uni1 = parseFloat(document.getElementById('uni1').value) || 0;
    const uni2 = parseFloat(document.getElementById('uni2').value) || 0;
    const uni3 = parseFloat(document.getElementById('uni3').value) || 0;
    const uni4 = parseFloat(document.getElementById('uni4').value) || 0;
    const uni5 = parseFloat(document.getElementById('uni5').value) || 0;
    const uni6 = parseFloat(document.getElementById('uni6').value) || 0;
    const uni7 = parseFloat(document.getElementById('uni7').value) || 0;

    // VALOR LINHA:
    const v1 = qtd1 * uni1;
    const v2 = qtd2 * uni2;
    const v3 = qtd3 * uni3;
    const v4 = qtd4 * uni4;
    const v5 = qtd5 * uni5;
    const v6 = qtd6 * uni6;
    const v7 = qtd7 * uni7;

    // VALOR TOTAL:
    const total = v1 + v2 + v3 + v4 + v5 + v6 + v7;

    // Criando o PDF usando jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionando o template de fundo
    const img = new Image();
    img.src = "./template.png";
    img.onload = function () {
        doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

        // Adicionando os dados no PDF
        doc.setFont("Helvetica");
        doc.setFontSize(14);

        // Nome do cliente
        doc.text(125, 90, nome);
        // DATA
        doc.setTextColor(255, 255, 255);
        doc.text(25, 56, datebr);

        // QUANTIDADES
        doc.setTextColor(0, 0, 0);
        doc.text(13, 125, qtd1.toString());
        doc.text(13, 135, qtd2.toString());
        doc.text(13, 145, qtd3.toString());
        doc.text(13, 155, qtd4.toString());
        doc.text(13, 165, qtd5.toString());
        doc.text(13, 175, qtd6.toString());
        doc.text(13, 185, qtd7.toString());

        // DESCRIÇÃO
        doc.text(35, 125, desc1);
        doc.text(35, 135, desc2);
        doc.text(35, 145, desc3);
        doc.text(35, 155, desc4);
        doc.text(35, 165, desc5);
        doc.text(35, 175, desc6);
        doc.text(35, 185, desc7);

        // VALOR UNITÁRIO
        doc.text(160, 125, uni1.toString());
        doc.text(160, 135, uni2.toString());
        doc.text(160, 145, uni3.toString());
        doc.text(160, 155, uni4.toString());
        doc.text(160, 165, uni5.toString());
        doc.text(160, 175, uni6.toString());
        doc.text(160, 185, uni7.toString());

        // VALOR LINHA
        doc.text(180, 125, v1.toFixed(2));
        doc.text(180, 135, v2.toFixed(2));
        doc.text(180, 145, v3.toFixed(2));
        doc.text(180, 155, v4.toFixed(2));
        doc.text(180, 165, v5.toFixed(2));
        doc.text(180, 175, v6.toFixed(2));
        doc.text(180, 185, v7.toFixed(2));

        // VALOR TOTAL
        doc.setTextColor(255, 255, 255);
        doc.text(165, 217, total.toFixed(2));

        // Salvando o PDF
        doc.save(`Orcamento_${nome}.pdf`);
    };
});
