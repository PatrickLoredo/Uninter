/*------------------- ARRAYS -------------------*/
let arrayTecnologiasADS = JSON.parse(localStorage.getItem('Tecnologias')) || [];
let arrayDisciplinasADS = JSON.parse(localStorage.getItem('Disciplinas')) || [];
let arrayLivrosADS = JSON.parse(localStorage.getItem('Livros')) || [];
let arrayProjetosADS = JSON.parse(localStorage.getItem('Projetos')) || [];
let arrayAnotacoesADS = JSON.parse(localStorage.getItem('Anotacoes')) || [];
let arrayExerciciosProvas = JSON.parse(localStorage.getItem('ExerciciosProvas')) || [];
let arrayIcones = JSON.parse(localStorage.getItem('Icones')) || [];

/*
INDICES DE SUBARRAYS
0: tecnologias
1: disciplinas
2: livros
3: projetos
4: Anotacoes
*/
let arrayIdsUtilizados = JSON.parse(localStorage.getItem('ids')) || [[], [], [], [], []];


/*------------------- CLASSES DE OBJETOS -------------------*/
class Tecnologia {
    constructor(id, nome, apelido, aplicacao, statusAtividade) {
        this.id = id;
        this.nome = nome;
        this.apelido = apelido;
        this.aplicacao = aplicacao;
        this.atividade = statusAtividade;
    }
}

class Disciplina {
    constructor(id, nome, periodo, aulas, atividade,statusAtividade) {
        this.id = id;
        this.nome = nome;
        this.periodo = periodo;
        this.aulas = aulas;
        this.atividade = atividade;
        this.statusAtividade = statusAtividade;
    }
}

class Livro {
    constructor(id, dataInicio, dataFinalizacao, nome, periodo, disciplina, statusLeitura, statusAtividade) {
        this.id = id;
        this.dataInicio = dataInicio;
        this.dataFinalizacao = dataFinalizacao;
        this.nome = nome;
        this.periodo = periodo;
        this.disciplina = disciplina;
        this.statusLeitura = statusLeitura;
        this.statusAtividade = statusAtividade;
    }
}

class Projeto{
    constructor(id, 
        nome, 
        dataInicio, 
        dataFinalizacao, 
        periodo, 
        disciplina, 
        status, 
        linkProjeto,
        tecnologias,
        statusAtividade) {
            this.id = id;
            this.nome = nome;
            this.dataInicio = dataInicio;
            this.dataFinalizacao = dataFinalizacao;
            this.periodo = periodo;
            this.disciplina = disciplina;
            this.status = status;
            this.linkProjeto = linkProjeto;
            this.tecnologias = tecnologias;
            this.statusAtividade = statusAtividade;
            
        }
}

class Anotacao {
    constructor(id, 
        dataInicio, 
        dataAtualizacao, 
        periodo, 
        disciplina, 
        nomeAula, 
        anotacao,
        statusAtividade) {
        this.id = id;
        this.dataInicio = dataInicio;
        this.dataAtualizacao = dataAtualizacao;
        this.periodo = periodo;
        this.disciplina = disciplina;
        this.nomeAula = nomeAula;
        this.anotacao = anotacao;
        this.statusAtividade = statusAtividade;
    }
}

class Tarefa {
    constructor(
        id, 
        dataTarefa,
        tipoTarefa,
        statusTarefa, 
        periodoTarefa,
        disciplinaTarefa,
        statusAtividade){
            this.id = id;
            this.dataTarefa = dataTarefa;
            this.tipoTarefa = tipoTarefa;
            this.statusTarefa = statusTarefa;
            this.periodoTarefa = periodoTarefa;
            this.disciplinaTarefa = disciplinaTarefa;
            this.statusAtividade = statusAtividade;
            
        }
}


/*=========================================== FUNÇÕES GERAIS ===========================================*/
/*=====================================================================================================*/
// GERADOR UNIVERSAL DE ID [OK]
function gerarId(idInput, array, alias) {

    let inputId = document.getElementById(idInput);

    if (!inputId) {
        console.error(`Elemento com ID "${idInput}" não foi encontrado.`);
        return;
    }

    let ultimoCodigo = array.length;
    let proximoCodigo = ultimoCodigo + 1;

    inputId.value = `${alias}_${proximoCodigo}`;
}

//TRASNCRITOR DE DADOS INSERIDOS EM OUTRO INPUT [OK]
function copiaDadosDigitados(idOrigem, idDestino) {
    document.getElementById(idDestino).value = document.getElementById(idOrigem).value;
}

//LIMPA UM CAMPO PARA VALEU = '' [OK]
function limparCampoIndividual(idCampo) {
    let campo = document.getElementById(idCampo);
    campo.value = '';
}

// FUNÇÃO GERAL DE EDIÇÃO DE CAMPO DE DADO CADASTRADO [DISABLED=FALSE] [OK]
function editarCampoCadastrado(tipo, idCampo, indice) {
    const campo = document.getElementById(idCampo);
    const btnSalvar = document.getElementById(`btnSalvarExibicao${tipo}_${indice}`);
    const btnEditar = document.getElementById(`btnEditarExibicao${tipo}_${indice}`);

    if (campo) {
        campo.disabled = false;
        campo.focus();

        if (btnSalvar.classList.contains('d-none')) {
            btnSalvar.classList.replace('d-none', 'd-block');
            btnEditar.classList.replace('d-block', 'd-none');
        } else {
            btnSalvar.classList.replace('d-block', 'd-none');
            btnEditar.classList.replace('d-none', 'd-block');
        }
    }
}

// FUNÇÃO GERAL DE ATUALIZAÇÃO DE CAMPO DE DADO CADASTRADO ATUALIZANDO NO LOCALSTORAGE [OK]
function sobrescreverCampoCadastrado(tipo, idCampo, indice) {
    const campo = document.getElementById(idCampo);
    const btnSalvar = document.getElementById(`btnSalvarExibicao${tipo}_${indice}`);
    const btnEditar = document.getElementById(`btnEditarExibicao${tipo}_${indice}`);

    if (!campo) {
        console.error(`Campo não encontrado: ${idCampo}`);
        return;
    }

    if (tipo === 'Disciplinas') {
        arrayDisciplinasADS[indice].nome = campo.value;
        localStorage.setItem('Disciplinas', JSON.stringify(arrayDisciplinasADS));
    }

    if (tipo === 'Tecnologias') {
        arrayTecnologiasADS[indice].nome = campo.value;
        localStorage.setItem('Tecnologias', JSON.stringify(arrayTecnologiasADS));
        populaCheckboxTecnologias('inputTecnologiasProjeto');
    }
    if (tipo === 'Livros') {
        arrayLivrosADS[indice].nome = campo.value;
        localStorage.setItem('Livros', JSON.stringify(arrayLivrosADS));
    }

    campo.disabled = true;

    btnEditar.classList.remove('d-none');
    btnEditar.classList.add('d-block');

    btnSalvar.classList.remove('d-block');
    btnSalvar.classList.add('d-none');

    alert(`O cadastro de ${campo.value} foi atualizado!`);
}

// FUNÇÃO GENERICA QUE EXCLUI CADASTRO NO LOCALSTORAGE CONFORME CONFIRMAÇÃO DO USUARIO [OK]
function excluirCampoCadastrado(escolha, idCampo, indice) {
    const campo = document.getElementById(idCampo);

    let confirmacao = confirm(`Deseja realmente excluir ${campo.value} ?`)

    if (confirmacao) {
        if (escolha === 'Tecnologias') {
            arrayTecnologiasADS.splice(indice, 1);
            localStorage.setItem('Tecnologias', JSON.stringify(arrayTecnologiasADS));
            populaListaButtonTecnologias();
            gerarId('inputIdTecnologia',arrayTecnologiasADS,'tcn');
            populaCheckboxTecnologias('inputTecnologiasProjeto');
        }
        if (escolha === 'Disciplinas') {
            arrayDisciplinasADS.splice(indice, 1);
            localStorage.setItem('Disciplinas', JSON.stringify(arrayDisciplinasADS));
            populaListaButtonDisciplinas();
            populaSelectDisciplinas('selectDisplinaAnotacoes', 'inputPeriodoAnotacoes');
            gerarId('inputIdDisciplina',arrayDisciplinasADS,'disc');
            mostraQtdDisciplinas();
        }
        if (escolha === 'Livros') {
            arrayLivrosADS.splice(indice, 1);
            localStorage.setItem('Livros', JSON.stringify(arrayLivrosADS));
            populaListaButtonDisciplinas();
            populaListaButtonLivros();
            gerarId('inputIdLivros',arrayLivrosADS, 'liv');
        }


        alert(`${escolha} ${campo.value} foi excluído (a)!`);
    }
    else {
        return
    }
}

// MOSTRA A DATA ATUAL EM UM ID ESPECÍFICO [OK]
function mostraDataAtual(idCampo) {
    const campoData = document.getElementById(idCampo);
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    campoData.value = `${ano}-${mes}-${dia}`;
}

function formataData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// POPULA SELECT DE DISCIPLINAS DE ACORDO COM ARRAY [OK]
function populaSelectDisciplinas(idSelect, idInputPeriodo) {
    const campoSelect = document.getElementById(idSelect);
    const campoPeriodo = document.getElementById(idInputPeriodo);
    const listaPeriodo = arrayDisciplinasADS.filter(
        disciplina => disciplina.periodo == campoPeriodo.value
    );

    campoSelect.innerHTML = '';
    for (let i = 0; i < listaPeriodo.length; i++) {
        campoSelect.innerHTML += `
            <option value="${listaPeriodo[i].nome}" class="textoCenter">
                ${listaPeriodo[i].nome}
            </option>
        `;
    }
}

// POPULA CAMPO ESPECIFICOM COM CHECKBOX DAS TECNOLOGIAS CADASTRADAS [OK]
function populaCheckboxTecnologias(campo){
    let campoExibicao = document.getElementById(campo);
    campoExibicao.innerHTML = '';

    for(let i=0; i<arrayTecnologiasADS.length;i++){
        campoExibicao.innerHTML +=`
            <div class="col-4 mb-2 mt-3 flexCenter">
                <input type="checkbox" name="tecnologiasProjeto_${arrayTecnologiasADS[i].nome}" id="tecnologia_${arrayTecnologiasADS[i].nome}" checked>&nbsp;&nbsp;
                <span class="uppercase tamanho08 text-danger fw-semibold">${arrayTecnologiasADS[i].nome}</span>
            </div>
        `
    }
}

// ALTERA O CHEVRON DE DOWN PARA UP (VICE VERSA) [OK]
function mudaChevron(idChevron) {
    const icone = document.getElementById(idChevron);

    if (icone.classList.contains('fa-chevron-down')) {
        icone.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        icone.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

function abreLink(url) {
    window.open(url, '_blank');
}

function scrollParaId(id, pixels = 0) {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    window.scrollTo({
        top: elemento.offsetTop + pixels,
        behavior: 'smooth'
    });
}

function clicarElemento(idElemento) {
    const elemento = document.getElementById(idElemento);
    if (!elemento) {
        return;
    }
    elemento.click();
}

function focarElemento(idElemento) {
    const elementoFoco = document.getElementById(idElemento);
    elementoFoco.focus();
}

function exibirNotificacaoAtividadePendente() {
    let contadorExerciciosPendentes = 0;

    for (let i = 0; i < arrayExerciciosProvas.length; i++) {
        if (arrayExerciciosProvas[i].statusTarefa === 'Pendente') {
            contadorExerciciosPendentes++;
        }
    }

    const campoExerciciosPendentes = document.getElementById('sessaoAlertExerciciosPendentes');

    if (contadorExerciciosPendentes > 0) {
        campoExerciciosPendentes.innerHTML = `
            <div class="col-sm-0 col-lg-2"></div>
            <div class="col-12 col-lg-8">
                <div class="alert alert-danger">
                    <div class="row">
                        <div class="col flexCenter">
                            <i class="fa fa-exclamation-triangle fa-fade"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="uppercase tamanho11 fw-bold">
                                Atenção
                            </span>
                        </div>
                        <div class="col-1">
                            <button class="btn btn-danger btn-sm" onclick="esconderElemento('sessaoAlertExerciciosPendentes')">
                                <i class="fa fa-x"></i>
                            </button>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <div class="row mt-3">
                    <hr>
                        <div class="col flexCenter">
                            <span class="uppercase tamanho07">
                                Existe(m) um total de <b><u>${contadorExerciciosPendentes} atividades pendentes</u></b> para serem realizadas.
                            </span>
                        </div>
                    </div>
                    <div class="row mt-2 mt-lg-1">
                        <div class="col flexCenter">
                            <span class="uppercase tamanho07">
                                Fique atento aos prazos e a programação de estudo.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-0 col-lg-2"></div>
        `;
    }
}

function esconderElemento(id) {
    document.getElementById(id).style.display = 'none';
}

window.exportarBackup = function () {

    if (typeof XLSX === 'undefined') {

        alert(
            'Erro: a biblioteca SheetJS não foi carregada.\n\n' +
            'Verifique o carregamento do XLSX no HTML.'
        );

        console.error('XLSX não está disponível.');

        return;
    }

    try {

        const workbook = XLSX.utils.book_new();

        const dadosBackup = [

            {
                nomeAba: 'Tecnologias',
                dados: arrayTecnologiasADS
            },

            {
                nomeAba: 'Disciplinas',
                dados: arrayDisciplinasADS
            },

            {
                nomeAba: 'Livros',
                dados: arrayLivrosADS
            },

            {
                nomeAba: 'Projetos',
                dados: arrayProjetosADS
            },

            {
                nomeAba: 'Anotacoes',
                dados: arrayAnotacoesADS
            },

            {
                nomeAba: 'ExerciciosProvas',
                dados: arrayExerciciosProvas
            }

        ];

        dadosBackup.forEach(item => {

            const dadosPlanilha = item.dados.map(objeto => {

                const linha = {};

                Object.keys(objeto).forEach(chave => {

                    const valor = objeto[chave];

                    if (
                        typeof valor === 'object' &&
                        valor !== null
                    ) {

                        linha[chave] = JSON.stringify(valor);

                    } else {

                        linha[chave] = valor;

                    }

                });

                return linha;

            });

            const worksheet =
                dadosPlanilha.length > 0
                    ? XLSX.utils.json_to_sheet(dadosPlanilha)
                    : XLSX.utils.aoa_to_sheet([]);

            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                item.nomeAba
            );

        });

        const dadosIds = arrayIdsUtilizados.map(
            (grupo, indice) => ({

                grupo: indice,
                ids: JSON.stringify(grupo)

            })
        );

        const worksheetIds =
            XLSX.utils.json_to_sheet(dadosIds);

        XLSX.utils.book_append_sheet(
            workbook,
            worksheetIds,
            'IdsUtilizados'
        );

        const data = new Date();

        const dia =
            String(data.getDate()).padStart(2, '0');

        const mes =
            String(data.getMonth() + 1).padStart(2, '0');

        const ano =
            data.getFullYear();

        const dataBackup =
            `${dia}${mes}${ano}`;

        const nomeArquivo =
            `backupUninter_${dataBackup}.xlsx`;

        XLSX.writeFile(
            workbook,
            nomeArquivo
        );

        console.log(
            `Backup exportado com sucesso: ${nomeArquivo}`
        );

        alert(
            `Backup exportado com sucesso!\n\n` +
            `Arquivo: ${nomeArquivo}`
        );

    } catch (erro) {

        console.error(
            'Erro ao exportar backup:',
            erro
        );

        alert(
            'Não foi possível exportar o backup.\n\n' +
            'Verifique o console do navegador para mais detalhes.'
        );

    }

};


window.importarBackup = function (input) {

    const arquivo = input.files[0];

    if (!arquivo) {
        return;
    }

    const confirmacao = confirm(

        'Atenção!\n\n' +

        'A importação irá substituir os dados atuais pelos dados do backup.\n\n' +

        'Deseja continuar?'

    );

    if (!confirmacao) {

        input.value = '';

        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (evento) {

        try {

            const dados =
                new Uint8Array(
                    evento.target.result
                );

            const workbook =
                XLSX.read(dados, {
                    type: 'array'
                });


            function lerAba(nomeAba) {

                if (
                    !workbook.SheetNames.includes(nomeAba)
                ) {

                    return [];

                }

                const worksheet =
                    workbook.Sheets[nomeAba];

                return XLSX.utils.sheet_to_json(
                    worksheet
                );

            }


            function converterObjetos(array) {

                return array.map(objeto => {

                    const novoObjeto = {};

                    Object.keys(objeto).forEach(chave => {

                        let valor = objeto[chave];

                        if (
                            typeof valor === 'string' &&
                            (
                                valor.startsWith('[') ||
                                valor.startsWith('{')
                            )
                        ) {

                            try {

                                valor = JSON.parse(valor);

                            } catch (erro) {

                            }

                        }

                        novoObjeto[chave] = valor;

                    });

                    return novoObjeto;

                });

            }


            const tecnologias =
                converterObjetos(
                    lerAba('Tecnologias')
                );

            const disciplinas =
                converterObjetos(
                    lerAba('Disciplinas')
                );

            const livros =
                converterObjetos(
                    lerAba('Livros')
                );

            const projetos =
                converterObjetos(
                    lerAba('Projetos')
                );

            const anotacoes =
                converterObjetos(
                    lerAba('Anotacoes')
                );

            const exerciciosProvas =
                converterObjetos(
                    lerAba('ExerciciosProvas')
                );


            const dadosIds =
                lerAba('IdsUtilizados');

            const idsUtilizados =
                dadosIds.map(item => {

                    try {

                        return JSON.parse(item.ids);

                    } catch (erro) {

                        return [];

                    }

                });


            localStorage.setItem(
                'Tecnologias',
                JSON.stringify(tecnologias)
            );

            localStorage.setItem(
                'Disciplinas',
                JSON.stringify(disciplinas)
            );

            localStorage.setItem(
                'Livros',
                JSON.stringify(livros)
            );

            localStorage.setItem(
                'Projetos',
                JSON.stringify(projetos)
            );

            localStorage.setItem(
                'Anotacoes',
                JSON.stringify(anotacoes)
            );

            localStorage.setItem(
                'ExerciciosProvas',
                JSON.stringify(exerciciosProvas)
            );

            localStorage.setItem(
                'ids',
                JSON.stringify(idsUtilizados)
            );


            alert(

                'Backup importado com sucesso!\n\n' +

                'A página será recarregada para atualizar os dados.'

            );

            input.value = '';

            location.reload();

        } catch (erro) {

            console.error(
                'Erro ao importar backup:',
                erro
            );

            alert(

                'Não foi possível importar o backup.\n\n' +

                'Verifique se o arquivo é um backup válido do ADS Uninter.'

            );

            input.value = '';

        }

    };

    leitor.readAsArrayBuffer(arquivo);

};

/*======================================== FUNÇÕES EXERCICIOS PROVAS ========================================*/
/*=====================================================================================================*/
function calculaDiasFaltam(idDataAtual, idcampoxibicaoDiasFaltam) {

    const campoDataExercicio = document.getElementById(idDataAtual);
    const campoExibicaoDiasFaltam = document.getElementById(idcampoxibicaoDiasFaltam);

    let dataInformada = new Date(campoDataExercicio.value + 'T00:00:00');
    let dataAtual = new Date();

    dataAtual.setHours(0, 0, 0, 0);

    let diferenca = dataInformada - dataAtual;
    let dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    if (dias < 0) {

        alert(`A data informada é inferior à data atual!\n\nInsira uma data igual ou maior à data atual.`);
        campoExibicaoDiasFaltam.value = 'n/a';
        return;
    }

    campoExibicaoDiasFaltam.value = `${dias}`;

}

function salvarNovoExerciciosProvas() {
    let campoID = document.getElementById('inputIdExerciciosProvas');
    let campoDATA = document.getElementById('inputDataExerciciosProvas');
    let campoTIPOTAREFA = document.getElementById('tipoTarefaCadastro');
    let campoSTATUSPERIODO = document.getElementById('statusTarefaCadastro');
    let campoPERIODO = document.getElementById('periodoTarefaCadastro');
    let campoDISCIPLINA = document.getElementById('materiaTarefaCadastro');

    if (
        campoDATA.value === '' ||
        campoTIPOTAREFA.value === '' ||
        campoSTATUSPERIODO.value === '' ||
        campoPERIODO.value === '' ||
        campoDISCIPLINA.value === ''
    ) {
        alert('Preencha todos os campos obrigatórios');
        return;
    }

    let cadastroExiste = arrayExerciciosProvas.some(tarefa => tarefa.dataTarefa === campoDATA.value && tarefa.disciplinaTarefa === campoDISCIPLINA.value && tarefa.tipoTarefa === campoTIPOTAREFA.value);

    if (cadastroExiste) {
    alert(`Já existe um cadastro de ${campoTIPOTAREFA.value.toUpperCase()} para a disciplina ${campoDISCIPLINA.value.toUpperCase()}, na data ${formataData(campoDATA.value)}.`);        return;
    }

    let novoExercicioProva = new Tarefa(
        campoID.value,
        campoDATA.value,
        campoTIPOTAREFA.value,
        campoSTATUSPERIODO.value,
        campoPERIODO.value,
        campoDISCIPLINA.value,
        true
    );

    arrayExerciciosProvas.push(novoExercicioProva);

    localStorage.setItem('ExerciciosProvas',JSON.stringify(arrayExerciciosProvas));

    campoSTATUSPERIODO.value = 'Pendente';
    campoPERIODO.value = '-';
    campoDISCIPLINA.value = '';

    gerarId('inputIdExerciciosProvas', arrayExerciciosProvas, 'trf');
    mostraDataAtual('inputDataExerciciosProvas');

    exibeCadastroExercicioProva();
}

function exibeCadastroExercicioProva() {
    const campos = {
        Exercício: document.getElementById('campoExibicaoExercicios'),
        Prova: document.getElementById('campoExibicaoProvas'),
        Trabalho: document.getElementById('campoExibicaoTrabalhos'),
        Outro: document.getElementById('campoExibicaoOutros')
    };

    Object.values(campos).forEach(campo => campo.innerHTML = '');

    for (let i = 0; i < arrayExerciciosProvas.length; i++) {

        const tarefa = arrayExerciciosProvas[i];
        console.log(tarefa.tipoTarefa);
        const campo = campos[tarefa.tipoTarefa];

        if (!campo) continue;

        campo.innerHTML += `
            <div class="col-12 mt-3">
                <div class="row mb-3">
                    <div class="col-12">
                        <span class="roundedUpData uppercase tamanho065" id="roundedDataAtividade_${i}">
                            Data do(a) ${tarefa.tipoTarefa}: &nbsp;&nbsp;
                            <span class="text-danger">
                                ${formataData(tarefa.dataTarefa)}
                            </span>
                        </span>

                        <span class="roundedUpStatus${tarefa.statusTarefa} uppercase tamanho065"
                        id="roundedStatusAtividade_${i}">
                            ${tarefa.tipoTarefa} ${tarefa.statusTarefa}
                        </span>

                        <div class="input-group">
                            <span class="w-75 bg-secondary text-light px-3 py-1 uppercase tamanho07 flexCenter rounded-start-pill text-center"
                            id="spanNomeAtividade_${i}"
                            data-bs-toggle="tooltip"
                            title="${tarefa.disciplinaTarefa}">
                                ${tarefa.disciplinaTarefa}
                            </span>

                            <button class="btn btn-sm btn-dark"
                            onclick="removeAtividade('${i}')">
                                <i class="fa fa-trash"></i>
                            </button>

                            <button class="btn btn-sm btn-success"
                            id="btnAtividade_${i}"
                            onclick="checaAtividade(
                                'roundedStatusAtividade_${i}',
                                '${i}',
                                'btnAtividade_${i}',
                                'iconAtividade_${i}')">

                                <i class="fa fa-check"
                                id="iconAtividade_${i}"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function checaAtividade(campoStatusAtividade, indiceArray, btnChecagem, iconeChecagem) {
    const tarefa = arrayExerciciosProvas[indiceArray];
    const campoAtividade = document.getElementById(campoStatusAtividade);
    const buttonChecagem = document.getElementById(btnChecagem);
    const iconChecagem = document.getElementById(iconeChecagem);

    if (tarefa.statusTarefa === 'Pendente') {
        tarefa.statusTarefa = 'Finalizado';

        campoAtividade.classList.replace('roundedUpStatusPendente','roundedUpStatusFinalizado');

        buttonChecagem.classList.replace('btn-success', 'btn-primary');
        iconChecagem.classList.replace('fa-check', 'fa-hourglass');

    } else {

        tarefa.statusTarefa = 'Pendente';

        campoAtividade.classList.replace('roundedUpStatusFinalizado','roundedUpStatusPendente');

        buttonChecagem.classList.replace('btn-primary', 'btn-success');
        iconChecagem.classList.replace('fa-hourglass', 'fa-check');
    }

    campoAtividade.innerHTML = `${tarefa.tipoTarefa} ${tarefa.statusTarefa}`;

    localStorage.setItem('ExerciciosProvas',JSON.stringify(arrayExerciciosProvas));
}

function removeAtividade(indice) {
    arrayExerciciosProvas.splice(indice, 1);
    localStorage.setItem('ExerciciosProvas',JSON.stringify(arrayExerciciosProvas));
    exibeCadastroExercicioProva();
}

/*======================================== FUNÇÕES TECNOLOGIAS ========================================*/
/*=====================================================================================================*/
// SALVA NOVO CADASTRO DE TENCOLOGIA NO ARRAY [OK]
function salvarNovaTecnologia() {
    let campoCadastro_IdTecnologia = document.getElementById('inputIdTecnologia');
    let campoCadastro_NomeTecnologia = document.getElementById('inputNomeTecnologia');
    let campoCadastro_ApelidoTecnologia = document.getElementById('inputApelidoTecnologia');
    let campoCadastro_AplicacaoTecnologia = document.getElementById('selectAplicacoTecnologia');

    if (campoCadastro_NomeTecnologia.value.trim() === '') {
        alert('Nenhum NOME DE TECNOLOGIA NÃO FOI INFORMADO. Tente novamente !')
    }
    else {
        if (arrayTecnologiasADS.some(tecnologia => tecnologia === campoCadastro_NomeTecnologia.value.trim())) {
            alert(`Tecnologia ${campoCadastro_NomeTecnologia.value} já foi cadastrada anteriormente!`); return
        }
        else{
            if(campoCadastro_AplicacaoTecnologia.value === '-'){
                alert('Preencha o campo de Aplicação da Tecnologia !')
            }
            else{
                 let novoCadastroTecnologia = new Tecnologia(campoCadastro_IdTecnologia.value, campoCadastro_NomeTecnologia.value, campoCadastro_ApelidoTecnologia.value, campoCadastro_AplicacaoTecnologia.value);

                arrayTecnologiasADS.push(novoCadastroTecnologia);
                localStorage.setItem('Tecnologias', JSON.stringify(arrayTecnologiasADS));

                alert(`A tecnologia ${campoCadastro_NomeTecnologia.value}  foi cadastrada com sucesso !`)

                arrayIdsUtilizados[0].push(campoCadastro_IdTecnologia.value);
                localStorage.setItem('ids', JSON.stringify(arrayIdsUtilizados));

                campoCadastro_NomeTecnologia.value = '';
                campoCadastro_ApelidoTecnologia.value = '';
                campoCadastro_AplicacaoTecnologia.value = '-';

                gerarId('inputIdTecnologia',arrayTecnologiasADS,'tcn');

                populaListaButtonTecnologias();
                copiaDadosDigitados('inputNomeTecnologia', 'inputApelidoTecnologia');
                populaCheckboxTecnologias('inputTecnologiasProjeto');
            }
        }
    }
}

// POPULA LISTA DE BUTTONS DE ACORDO COM ARRAY [OK]
function populaListaButtonTecnologias() {
    let campoInputCadastrosFrontend = document.getElementById('campoExibicaoTecnologiasFrontend');
    let campoInputCadastrosBackend = document.getElementById('campoExibicaoTecnologiasBackend');
    let campoInputCadastrosFullstack = document.getElementById('campoExibicaoTecnologiasFullStack');

    campoInputCadastrosBackend.innerHTML = '';
    campoInputCadastrosFrontend.innerHTML = '';
    campoInputCadastrosFullstack.innerHTML = '';

    for (let i = 0; i < arrayTecnologiasADS.length; i++) {


        let mensagemPopular = `
            <div class="col-md-6 col-sm-12 mb-2">
                <div class="input-group">
                    <input type="text" class="form-control uppercase text-center" value="${arrayTecnologiasADS[i].nome}" 
                    disabled style="font-size:0.8rem" id="campoTecnologiaCadastrada_${arrayTecnologiasADS[i].nome}"></input>

                    <button class="btn btn-success input-group-text d-none" 
                    id="btnSalvarExibicaoTecnologias_${i}"
                    onclick="sobrescreverCampoCadastrado('Tecnologias','campoTecnologiaCadastrada_${arrayTecnologiasADS[i].nome}', '${i}')">
                        <i class="fa fa-save"></i>
                    </button>                

                    <button class="btn btn-primary input-group-text d-block"
                    id="btnEditarExibicaoTecnologias_${i}"
                    onclick="editarCampoCadastrado('Tecnologias', 'campoTecnologiaCadastrada_${arrayTecnologiasADS[i].nome}', ${i})">
                        <i class="fa fa-edit"></i>
                    </button>                

                    <button class="btn btn-danger input-group-text d-block"
                    id="btnExcluirExibicaoTecnologias_${i}"
                    onclick="excluirCampoCadastrado('Tecnologias', 'campoTecnologiaCadastrada_${arrayTecnologiasADS[i].nome}', '${i}')">
                        <i class="fa fa-trash"></i>
                    </button>                
            </div>
        `

        if (arrayTecnologiasADS[i].aplicacao === 'Frontend')
            campoInputCadastrosFrontend.innerHTML += `
                ${mensagemPopular}
            `
        else if (arrayTecnologiasADS[i].aplicacao === 'Backend') {
            campoInputCadastrosBackend.innerHTML += `
                ${mensagemPopular}
            `
        }
        else {
            campoInputCadastrosFullstack.innerHTML += `
                ${mensagemPopular}
            `
        }
    }
}


/*======================================== FUNÇÕES DISCIPLINAS ========================================*/
/*=====================================================================================================*/
// SALVA UMA NOVA DISCIPLINA NO LOCALSTORAGE [OK]
function salvarNovaDisciplina() {
    let campoCadastro_IdDisciplina = document.getElementById('inputIdDisciplina');
    let campoCadastro_PeriodoDisciplina = document.getElementById('inputPeriodoDisciplina');
    let campoCadastro_NomeDisciplina = document.getElementById('inputNomeDisciplina');
    const idDisciplina = campoCadastro_IdDisciplina.value.trim();
    const periodoDisciplina = Number(campoCadastro_PeriodoDisciplina.value);
    const nomeDisciplina = campoCadastro_NomeDisciplina.value.trim();

    if (nomeDisciplina === '') {
        alert('Nenhuma disciplina informada! Preencha o campo e tente novamente.');
        return;
    }

    if (
        arrayDisciplinasADS.some(disciplina => disciplina.nome.toLowerCase() === nomeDisciplina.toLowerCase())
    ) 
    {
        alert('A disciplina já foi inserida anteriormente! Tente um novo cadastro diferente.');
        return;
    }

    let novaDisciplina = new Disciplina(idDisciplina, nomeDisciplina, periodoDisciplina, []);

    arrayDisciplinasADS.push(novaDisciplina);
    localStorage.setItem('Disciplinas', JSON.stringify(arrayDisciplinasADS));

    populaListaButtonDisciplinas();
    populaSelectDisciplinas('selectDisplinaAnotacoes', 'inputPeriodoAnotacoes');

    alert('Disciplina cadastrada com sucesso!');

    limparCampoIndividual('inputNomeDisciplina');
    campoCadastro_PeriodoDisciplina.value = 1;
    
    arrayIdsUtilizados[1].push(campoCadastro_IdDisciplina.value);
    localStorage.setItem('ids', JSON.stringify(arrayIdsUtilizados));

    populaSelectDisciplinas('materiaTarefaCadastro','periodoTarefaCadastro');
    gerarId('inputIdDisciplina',arrayDisciplinasADS, 'dsc');
    mostraQtdDisciplinas();

}

// POPULA LISTA DE BUTTONS DE ACORDO COM ARRAY [OK]
function populaListaButtonDisciplinas() {
    const camposPeriodo = [
        document.getElementById('alert1Periodo'),
        document.getElementById('alert2Periodo'),
        document.getElementById('alert3Periodo'),
        document.getElementById('alert4Periodo'),
        document.getElementById('alert5Periodo')
    ];

    const mensagemAlertPadrao = `
        <div class="alert alert-danger">
            <div class="row">
                <div class="col">
                    <h6 class="uppercase tamanho09 flexCenter">
                        <i class="fas fa-triangle-exclamation fa-fade tamanho18"></i>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="textoCenter"><b>nenhuma disciplina <br>cadastrada</b> para esse período</span>
                    </h6>
                </div>
            </div>
        </div>
    `;

    for (let i = 0; i < camposPeriodo.length; i++) {
        camposPeriodo[i].innerHTML = '';
    }

    for (let periodo = 1; periodo <= 5; periodo++) {

        const disciplinasDoPeriodo = arrayDisciplinasADS.filter(
            disciplina => Number(disciplina.periodo) === periodo
        );

        if (disciplinasDoPeriodo.length === 0) {
            camposPeriodo[periodo - 1].innerHTML = mensagemAlertPadrao;
            continue;
        }

        for (let i = 0; i < arrayDisciplinasADS.length; i++) {
            const disciplina = arrayDisciplinasADS[i];
            if (Number(disciplina.periodo) !== periodo) {
                continue;
            }

            const mensagemPopular = `
                <div class="col-12 mb-3">
                    <div class="input-group">
                        <span class="bg-dark input-group-text text-warning">
                            <i class="fa fa-book"></i>
                        </span>
                        <input type="text" class="form-control uppercase textoCenter"
                            data-bs-toggle="tooltip"
                            title="${disciplina.nome}"
                            value="${disciplina.nome}" disabled style="font-size: 0.7rem"
                            id="campoDisciplinaCadastrada_${disciplina.nome}">

                        <button class="btn btn-success btn-sm input-group-text d-none"
                            onclick="sobrescreverCampoCadastrado(
                                'Disciplinas',
                                'campoDisciplinaCadastrada_${disciplina.nome}',
                                '${i}')" id="btnSalvarExibicaoDisciplinas_${i}">
                            <i class="fa fa-save"></i>
                        </button>

                        <button
                            class="btn btn-primary btn-sm input-group-text"
                            id="btnEditarExibicaoDisciplinas_${i}"
                            onclick="editarCampoCadastrado(
                                'Disciplinas',
                                'campoDisciplinaCadastrada_${disciplina.nome}', ${i})">
                            <i class="fa fa-edit"></i>
                        </button>

                        <button
                            class="btn btn-danger btn-sm input-group-text"
                            onclick="excluirCampoCadastrado(
                                'Disciplinas',
                                'campoDisciplinaCadastrada_${disciplina.nome}', '${i}' )">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;

            camposPeriodo[periodo - 1].innerHTML += mensagemPopular;
        }
    }
}

function mostraQtdDisciplinas() {
    let contadores = {
        contador1: 0,
        contador2: 0,
        contador3: 0,
        contador4: 0,
        contador5: 0
    };

    for (let i = 0; i < arrayDisciplinasADS.length; i++) {
        let periodo = arrayDisciplinasADS[i].periodo;

        console.log(arrayDisciplinasADS[i].periodo)

        switch (periodo) {
            case 1: contadores.contador1++; break;
            case 2: contadores.contador2++; break;
            case 3: contadores.contador3++; break;
            case 4: contadores.contador4++; break;
            case 5: contadores.contador5++; break;
        }
    }

    for (let i = 1; i <= 5; i++) {
        document.getElementById(`spanQtdDisciplinas_${i}Periodo`).innerHTML = `
        <span class="bg-secondary text-light px-3 py-1 uppercase tamanho06 rounded-pill">
            ${contadores[`contador${i}`]} Disciplinas
        </span>`;
    }
}

/*======================================== FUNÇÕES LIVROS ========================================*/
/*=====================================================================================================*/
// SALVA NOVO CADASTRO DE LIVRO DENTRO DO ARRAY [OK]
function salvarNovoLivro() {
    let campoCadastro_IdLivro = document.getElementById('inputIdLivros').value;
    let campoCadastro_DataInicioLivro = document.getElementById('inputDataInicioLivros').value;
    let campoCadastro_DataFinalizacaoLivro = document.getElementById('inputDataFinalLivros').value;
    let campoCadastro_NomeLivro = document.getElementById('inputNomeLivros').value;
    let campoCadastro_PeriodoLivro = document.getElementById('inputPeriodoLivros').value;
    let campoCadastro_DisciplinaLivro = document.getElementById('selectDisplinaLivros').value;
    let campoCadastro_StatusLeituraLivro = document.getElementById('inputStatusLeitutraLivros').value;

    let livroExiste = arrayLivrosADS.some(
        livro => livro.nome.trim().toLowerCase() === campoCadastro_NomeLivro.trim().toLowerCase()
)   ;

    if (campoCadastro_NomeLivro) {
        if (livroExiste) {
            alert(`O livro informado ${campoCadastro_NomeLivro} já foi cadastrado anteriormente. Tente novamente outro exemplar de livro !`)
        }
        else {
            let novoLivro = new Livro(
                campoCadastro_IdLivro,
                campoCadastro_DataInicioLivro,
                campoCadastro_DataFinalizacaoLivro,
                campoCadastro_NomeLivro.trim(),
                campoCadastro_PeriodoLivro,
                campoCadastro_DisciplinaLivro,
                campoCadastro_StatusLeituraLivro);

            arrayLivrosADS.push(novoLivro);
            localStorage.setItem('Livros', JSON.stringify(arrayLivrosADS));

            alert(`O livro ${campoCadastro_NomeLivro} foi salvo com sucesso !`)

            document.getElementById('inputDataFinalLivros').value = '';
            document.getElementById('inputNomeLivros').value = '';
            document.getElementById('inputPeriodoLivros').value = 1;

            arrayIdsUtilizados[2].push(campoCadastro_IdLivro.value);
            localStorage.setItem('ids', JSON.stringify(arrayIdsUtilizados));

            gerarId('livro', 'inputIdLivros');
            mostraDataAtual('inputDataInicioLivros');
            populaSelectDisciplinas('selectDisplinaLivros', 'inputPeriodoLivros')
        }
    }
    else {
        alert('Nenhum nome de livro foi informado ! \nInsira e tente novamente.')
    }
    populaListaButtonLivros()
}

// VERIFICA SE A LEITURA DO IVRO SE ENCONTRA COMO FINALIZADO OU ABERTO - GERA O ALERT CONFORME OPTION [OK]
function verificaStatusLeituraLivro(status) {
    const alertSuccess = document.getElementById('alertLeituraLivroSuccess');
    const alertDanger = document.getElementById('alertLeituraLivroDanger');

    alertSuccess.classList.remove('d-block');
    alertSuccess.classList.add('d-none');

    alertDanger.classList.remove('d-block');
    alertDanger.classList.add('d-none');

    if (status === 'Em aberto') {
        alertSuccess.classList.remove('d-none');
        alertSuccess.classList.add('d-block');
    }

    if (status === 'Finalizado') {
        alertDanger.classList.remove('d-none');
        alertDanger.classList.add('d-block');
    }
}

// POPULA OS NOMES DE LIVROS CADASTRADOS CONFORME PERIODO DE ESTUDO [OK]
function populaListaButtonLivros() {
    const campoExibicaoLivros_1Periodo = document.getElementById('campoExibicaoLivros_1Periodo');
    const campoExibicaoLivros_2Periodo = document.getElementById('campoExibicaoLivros_2Periodo');
    const campoExibicaoLivros_3Periodo = document.getElementById('campoExibicaoLivros_3Periodo');
    const campoExibicaoLivros_4Periodo = document.getElementById('campoExibicaoLivros_4Periodo');
    const campoExibicaoLivros_5Periodo = document.getElementById('campoExibicaoLivros_5Periodo');

    campoExibicaoLivros_1Periodo.innerHTML = '';
    campoExibicaoLivros_2Periodo.innerHTML = '';
    campoExibicaoLivros_3Periodo.innerHTML = '';
    campoExibicaoLivros_4Periodo.innerHTML = '';
    campoExibicaoLivros_5Periodo.innerHTML = '';

    for (let i = 0; i < arrayLivrosADS.length; i++) {
        const livro = arrayLivrosADS[i];
        const periodo = Number(livro.periodo);

        const mensagemPopular = `
            <div class="col-12 mb-3">
                <div class="input-group">
                    <input type="text" class="form-control uppercase tamanho08 textoCenter" value="${livro.nome}" disabled
                    id="exibicaoLivros_${i}"></input>
                    <button class="btn btn-secondary input-group-text">
                        <i class="fa fa-hourglass"></i>
                    </button>
                    <button class="btn btn-primary input-group-text d-block" id="btnEditarExibicaoLivros_${i}"
                    onclick="editarCampoCadastrado('Livros', 'exibicaoLivros_${i}', ${i})">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-success input-group-text d-none" id="btnSalvarExibicaoLivros_${i}"
                    onclick="sobrescreverCampoCadastrado('Livros', 'exibicaoLivros_${i}', '${i}')">
                        <i class="fa fa-save"></i>
                    </button>
                    <button class="btn btn-danger input-group-text"
                    onclick="excluirCampoCadastrado('Livros', 'exibicaoLivros_${i}', ${i})">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        if (periodo === 1) {campoExibicaoLivros_1Periodo.innerHTML += mensagemPopular;}
        else if (periodo === 2) {campoExibicaoLivros_2Periodo.innerHTML += mensagemPopular;}
        else if (periodo === 3) {campoExibicaoLivros_3Periodo.innerHTML += mensagemPopular;}
        else if (periodo === 4) {campoExibicaoLivros_4Periodo.innerHTML += mensagemPopular;}
        else if (periodo === 5) {campoExibicaoLivros_5Periodo.innerHTML += mensagemPopular;}
    }
}

function limparCamposLivros() {
    document.getElementById('inputDataInicioLivros').value = '';
    document.getElementById('inputNomeLivros').value = '';
    document.getElementById('inputStatusLeitutraLivros').value = '-';
    document.getElementById('inputPeriodoLivros').value = '1';

    populaSelectDisciplinas('selectDisplinaLivros', 'inputPeriodoLivros');
    verificaStatusLeituraLivro('inputStatusLeitutraLivros');
}

/*======================================== FUNÇÕES PROJETOS ========================================*/
/*=====================================================================================================*/

//SALVA O NOVO CADASTRO DE PROJETO NO ARRAY DE PROJETOS [OK]
function salvarProjeto() {
    let campoCadastro_IdProjeto = document.getElementById('inputIdProjeto').value;
    let campoCadastro_NomeProjeto = document.getElementById('inputNomeProjeto').value;
    let campoCadastro_DataInicioProjeto = document.getElementById('inputDataInicioProjeto').value;
    let campoCadastro_DataFinalizacaoProjeto = document.getElementById('inputDataFinalizacaoProjeto').value;
    let campoCadastro_PeriodoProjeto = document.getElementById('inputPeriodoProjeto').value;
    let campoCadastro_DisciplinaProjeto = document.getElementById('selectDisplinaProjeto').value;
    let campoCadastro_StatusProjeto = document.getElementById('selectStatusProjeto').value;
    let campoCadastro_LinkProjeto = document.getElementById('inputLinkProjeto').value;

    function pegaTecnologiasSelecionadas() {
        let tecnologiasSelecionadas = [];

        let checkboxes = document.querySelectorAll(
            'input[type="checkbox"][name^="tecnologiasProjeto_"]'
        );

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                tecnologiasSelecionadas.push(checkbox.name);
            }
        });

        return tecnologiasSelecionadas;
    }

    if (!campoCadastro_NomeProjeto.trim()) {
        alert('O NOME DO PROJETO não foi inserido! Tente novamente.');
        return;
    }

    if (arrayProjetosADS.some(projeto => projeto.nomeProjeto === campoCadastro_NomeProjeto.trim())){
            alert('Esse nome de projeto já foi inserido anteriormente.\n' +
            'Tente um novo nome de projeto diferente!'
        );
        return;
    }

    let tecnologiasSelecionadas = pegaTecnologiasSelecionadas();

    let novoProjeto = new Projeto(
        campoCadastro_IdProjeto,
        campoCadastro_NomeProjeto,
        campoCadastro_DataInicioProjeto,
        campoCadastro_DataFinalizacaoProjeto,
        campoCadastro_PeriodoProjeto,
        campoCadastro_DisciplinaProjeto,
        campoCadastro_StatusProjeto,
        campoCadastro_LinkProjeto,
        tecnologiasSelecionadas
    );

    arrayProjetosADS.push(novoProjeto);
    localStorage.setItem('Projetos',JSON.stringify(arrayProjetosADS));

    alert(`O projeto ${campoCadastro_NomeProjeto} foi cadastrado com Sucesso!`);

    document.getElementById('inputNomeProjeto').value = '';
    document.getElementById('inputDataFinalizacaoProjeto').value = '';
    document.getElementById('inputPeriodoProjeto').value = 1;
    document.getElementById('selectStatusProjeto').value = '-';
    document.getElementById('inputLinkProjeto').value = '';

    arrayIdsUtilizados[3].push(campoCadastro_IdProjeto.value);
    localStorage.setItem('ids', JSON.stringify(arrayIdsUtilizados));
    gerarId('campoCadastro_IdProjeto',arrayProjetosADS,'ant');

    mostraDataAtual('inputDataInicioProjeto');
    populaSelectDisciplinas('selectDisplinaProjeto','inputPeriodoProjeto');
    populaCheckboxTecnologias('inputTecnologiasProjeto');
}

// POPULA O CAMPO COM TODOS OS PROJETOS JA CADASTRADOS [OK]
function exibirProjetosCadastrado(){
    const campoExibicao = document.getElementById('exibicaoProjetosCadastrados');
    campoExibicao.innerHTML = '';

    for(let i=0;i<arrayProjetosADS.length;i++){
        campoExibicao.innerHTML +=`
            <div class="col-12">
                <button class="btn btn-sm btn-dark uppercase w-100"
                data-bs-toggle="modal" data-bs-target="#modalProjetoEditar"
                onclick="recuperaDadosProjetoModal('${i}'),
                populaCheckboxTecnologias('exibicaoModalTecnologias')">
                    <i class="fa fa-star text-warning"></i>&nbsp;&nbsp;
                    ${arrayProjetosADS[i].nome}
                </button>
            </div>
        `
    }
}

function recuperaDadosProjetoModal(indice){
    const campoModalBodyDados = document.getElementById('campoModalBodyDadosProjetoEditar');
    const exibicaoModalTecnologias = document.getElementById('exibicaoModalTecnologias');
    const modalBodyBtnHref = document.getElementById('campoModalProjetoBtnHref');

    campoModalBodyDados.innerHTML = '';
    exibicaoModalTecnologias.innerHTML = '';
    modalBodyBtnHref.innerHTML = '';

    modalBodyBtnHref.innerHTML = `
        <div class="col-12 mb-3 flexCenter">
            <button class="btn btn-dark btn-sm w-100"
            onclick="abreLink('${arrayProjetosADS[indice].linkProjeto}')">
                <i class="fa fa-link text-primary"></i>&nbsp;&nbsp;
                <span>${arrayProjetosADS[indice].nome}</span>
            </button>
        </div>
    `

    campoModalBodyDados.innerHTML = `
            <div class="col-12 mb-4">
                <h6 class="uppercase textoCenter">dados do projeto</h6>
            </div>
            <div class="col-3 mb-3">
                <label for="" class="labelFormat">id</label>
                <input type="text" class="form-control uppercase" 
                value="${arrayProjetosADS[indice].id}"
                disabled>
            </div>
            <div class="col-9 mb-3">
                <label for="" class="labelFormat">nome</label>
                <input type="text" class="form-control uppercase" 
                value="${arrayProjetosADS[indice].nome}" disabled>
            </div>
            <div class="col-5 mb-3">
                <label for="" class="labelFormat">Data Inicio</label>
                <input type="date" class="form-control uppercase" 
                value="${arrayProjetosADS[indice].dataInicio}" disabled>
            </div>
            <div class="col-5 mb-3">
                <label for="" class="labelFormat">Data Finalização</label>
                <input type="date" class="form-control uppercase" 
                value="${arrayProjetosADS[indice].dataFinalizacao}" disabled>
            </div>
            <div class="col-2 mb-3">
                <label for="" class="labelFormat">Período</label>
                <input type="number" class="form-control uppercase" 
                min="1" max="5" value="${arrayProjetosADS[indice].periodo}"
                disabled>
            </div>
            <div class="col-8 mb-3">
                <label for="" class="labelFormat">Disciplina</label>
                <input type="text" class="form-control uppercase" 
                value="${arrayProjetosADS[indice].disciplina}"
                disabled>
            </div>
            <div class="col-4 mb-3">
                <label for="" class="labelFormat">sTATUS</label>
                <select name="" class="form-select uppercase textoCenter" id="" disabled>
                    <option>${arrayProjetosADS[indice].status}</option>
                </select>
            </div>
            <div class="col-12 mb-5">
                <label for="" class="labelFormat">link de acesso do projeto</label>
                <input type="text" class="form-control uppercase" 
                value="${arrayProjetosADS[indice].linkProjeto}" disabled>
            </div>
        <hr>
    `

}

function limparCamposProjetos(){
    document.getElementById('inputNomeProjeto').value = '';
    const dataInicio_Projeto = document.getElementById('inputDataInicioProjeto').value;
    const dataFinalizacao_Projeto = document.getElementById('inputDataFinalizacaoProjeto').value;
    const periodo_Projeto = document.getElementById('inputPeriodoProjeto').value;
    const disciplina_Projeto = document.getElementById('selectDisplinaProjeto').value;
    const status_Projeto = document.getElementById('selectStatusProjeto').value;
    const link_Projeto = document.getElementById('inputLinkProjeto').value;


}

function excluirProjeto(id){
    let projetoExiste = arrayProjetosADS.some(projeto => projeto.id === id);

    if(projetoExiste){
        for(let i=0;i<arrayProjetosADS.length;i++){
            if(arrayProjetosADS[i].id === id){
            alert(`O ID: ${id} é referente ao projeto: ${arrayProjetosADS[i].nome}`);
            }  
        }
    }
}

/*======================================== FUNÇÕES ANOTAÇÕES MATERIA ========================================*/
/*=====================================================================================================*/

// SALVA UMA NOVA ANOTAÇÃO NO LOCALSTORAGE [OK]
function salvarAnotacaoMateria() {

    const inputIdAnotacoes =
        document.getElementById('inputIdAnotacoes').value;

    const inputDataInicioAnotacoes =
        document.getElementById('inputDataInicioAnotacoes').value;

    const inputDataAtualizacaoAnotacoes =
        document.getElementById('inputDataAtualizacaoAnotacoes').value;

    const inputPeriodoAnotacoes =
        document.getElementById('inputPeriodoAnotacoes').value;

    const selectDisplinaAnotacoes =
        document.getElementById('selectDisplinaAnotacoes').value;

    const inputNomeMateriaAnotacoes =
        document.getElementById('inputNomeMateriaAnotacoes').value.trim();

    const textAreaAnotacaoMateria =
        document.getElementById('textAreaAnotacaoMateria').value.trim();


    // VALIDAÇÃO
    if (
        inputNomeMateriaAnotacoes === '' ||
        textAreaAnotacaoMateria === ''
    ) {
        alert(
            'Campos obrigatórios não foram preenchidos!\n' +
            'Tente novamente.'
        );

        return;
    }


    // PROCURA ANOTAÇÃO EXISTENTE
    const indiceMateria = arrayAnotacoesADS.findIndex(
        anotacao =>
            anotacao.nomeAula.toLowerCase() ===
            inputNomeMateriaAnotacoes.toLowerCase()
    );


    // SE JÁ EXISTE
    if (indiceMateria !== -1) {

        const confirmacaoMateria = confirm(
            'Já existe uma anotação feita anteriormente para essa matéria.\n' +
            'Deseja atualizar?'
        );

        if (!confirmacaoMateria) {
            return;
        }

        const anotacaoAtualizada = new Anotacao(
            arrayAnotacoesADS[indiceMateria].id,
            arrayAnotacoesADS[indiceMateria].dataInicio,
            inputDataAtualizacaoAnotacoes,
            inputPeriodoAnotacoes,
            selectDisplinaAnotacoes,
            inputNomeMateriaAnotacoes,
            textAreaAnotacaoMateria
        );

        arrayAnotacoesADS[indiceMateria] = anotacaoAtualizada;

        localStorage.setItem('Anotacoes',JSON.stringify(arrayAnotacoesADS));
        alert('Anotação atualizada com sucesso!');

        return;
    }


    // NOVA ANOTAÇÃO
    const novaAnotacao = new Anotacao(
        inputIdAnotacoes,
        inputDataInicioAnotacoes,
        inputDataAtualizacaoAnotacoes,
        inputPeriodoAnotacoes,
        selectDisplinaAnotacoes,
        inputNomeMateriaAnotacoes,
        textAreaAnotacaoMateria
    );

    arrayAnotacoesADS.push(novaAnotacao);

    localStorage.setItem('Anotacoes',JSON.stringify(arrayAnotacoesADS));

    // REGISTRA O ID COMO UTILIZADO
    arrayIdsUtilizados[4].push(inputIdAnotacoes);
    localStorage.setItem('ids', JSON.stringify(arrayIdsUtilizados));

    alert('Anotação salva com sucesso!');

    // LIMPA CAMPOS
    document.getElementById('inputDataInicioAnotacoes').value = '';
    document.getElementById('inputPeriodoAnotacoes').value = '1';
    document.getElementById('inputNomeMateriaAnotacoes').value = 'Aula Teórica X - ';
    document.getElementById('textAreaAnotacaoMateria').value = '';

    // GERA O PRÓXIMO ID DE ANOTAÇÃO
    gerarId('inputIdAnotacoes',arrayAnotacoesADS,'ant');

    console.log(arrayAnotacoesADS);
    console.log(arrayIdsUtilizados);
}

// EXIBE OS CARDS-HEADER DE CADA PERIODO DO CURSO [OK]
function exibePeriodosAnotacoes() {
    let campoExibicao = document.getElementById('mainExibicaoAnotacoes');
    campoExibicao.innerHTML = '';

    for (let i = 1; i < 6; i++) {
        campoExibicao.innerHTML += `
            <div class="row" id="anotacaoPeriodo${i}">
                <div class="col">
                    <div class="card-header mb-2">
                        <div class="row">
                            <div class="col">
                                <h6 class="uppercase tamanho11 mb-0">
                                    ${i}° período
                                </h6>
                            </div>

                            <div class="col-auto">
                                <span class="bg-warning uppercase fw-bold tamanho07 px-3 py-1 rounded-pill"
                                id="contador_${i}Periodo"
                                style="width: 20px">
                                    Anotações
                                </span>
                            </div>

                            <div class="col-auto">
                                <button class="btn btn-danger btn-sm"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#body_${i}PeriodoAnotacoesAlert"
                                    onclick="mudaChevron('iconeChevron_Anotacao0${i}'); 
                                    populaAnotacoesPorPeriodo(${i});">

                                    <i class="fa fa-chevron-down"
                                        id="iconeChevron_Anotacao0${i}">
                                    </i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        class="row card-body  collapse" id="body_${i}PeriodoAnotacoesAlert">

                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// EXIBE O ROUNDED-PILL COM A QUANITDADE DE ANOTAÇÕES POR PERIODO [OK]
function calculaQtdAnotacoesPeriodo() {
    const contador1Periodo = document.getElementById('contador_1Periodo');
    const contador2Periodo = document.getElementById('contador_2Periodo');
    const contador3Periodo = document.getElementById('contador_3Periodo');
    const contador4Periodo = document.getElementById('contador_4Periodo');
    const contador5Periodo = document.getElementById('contador_5Periodo');

    let contagem1Periodo = 0;
    let contagem2Periodo = 0;
    let contagem3Periodo = 0;
    let contagem4Periodo = 0;
    let contagem5Periodo = 0;

    for (let i = 0; i < arrayAnotacoesADS.length; i++) {
        let periodo = Number(arrayAnotacoesADS[i].periodo);

        if (periodo === 1) {
            contagem1Periodo++;
        }

        if (periodo === 2) {
            contagem2Periodo++;
        }

        if (periodo === 3) {
            contagem3Periodo++;
        }

        if (periodo === 4) {
            contagem4Periodo++;
        }

        if (periodo === 5) {
            contagem5Periodo++;
        }
    }

    contador1Periodo.innerHTML = `${contagem1Periodo} Anotações`
    contador2Periodo.innerHTML = `${contagem2Periodo} Anotações`
    contador3Periodo.innerHTML = `${contagem3Periodo} Anotações`
    contador4Periodo.innerHTML = `${contagem4Periodo} Anotações`
    contador5Periodo.innerHTML = `${contagem5Periodo} Anotações`
}

function insereIconeTextArea(icone, idTextArea) {
    const textArea = document.getElementById(idTextArea);
    const posicaoCursor = textArea.selectionStart;
    const textoAtual = textArea.value;

    textArea.value = textoAtual.substring(0, posicaoCursor) + icone + textoAtual.substring(posicaoCursor);
}

function exibeIcones(idCampo , idTextAreaInserir) {
    const campoTextArea = document.getElementById(idCampo);
    
    campoTextArea.innerHTML = ''; 
    for(let i=0;i<arrayIcones.length;i++){
        campoTextArea.innerHTML += `
            <button class="btn btn-sm btn-outline-dark mb-1"
                value="${arrayIcones[i].trim()}"
                onclick="insereIconeTextArea(this.value, '${idTextAreaInserir}')"
                ondblclick="excluirIconeAnotacao(this.value)">
                ${arrayIcones[i]}
            </button>
        `;
    }
}

function salvarIconeAnotacao(idInput) {
    const input = document.getElementById(idInput);

    if (!input) {
        console.error(`Campo não encontrado: ${idInput}`);
        return;
    }

    const icone = input.value.trim();

    if (icone === '') {
        alert('Insira um ícone antes de salvar.');
        return;
    }

    arrayIcones.push(icone);

    localStorage.setItem(
        'Icones',
        JSON.stringify(arrayIcones)
    );

    input.value = '';

    alert(
        'Ícone salvo com sucesso!\n\n' +
        'Clique no ícone para inseri-lo na anotação.\n' +
        'Clique duas vezes para excluir o ícone.'
    );
}

function limparIconeAnotacao(idInput){
    const input = document.getElementById(idInput);
    input.value = '';
}

function excluirIconeAnotacao(icone){
    const index = arrayIcones.indexOf(icone);

    if(index !== -1){
        let confirmacao = confirm('Deseja realmente excluir este ícone?');
        if(confirmacao){
            arrayIcones.splice(index, 1);
            localStorage.setItem('Icones', JSON.stringify(arrayIcones));
            exibeIcones();
        }
        else{
            alert('Exclusão cancelada!');
        }
    }
}

//  LIBERA CAMPOS PARA EDICAO [OK]
function editaAnotacaoFeita(idCampoPeriodo, idCampoNomeAula,SelectDisciplinas, textAreaAnotacao) {
    const campoPeriodo = document.getElementById(idCampoPeriodo);
    const campoNomeAula = document.getElementById(idCampoNomeAula);
    const selectDisciplinas = document.getElementById(SelectDisciplinas);
    const campoTextAreaAnotacao = document.getElementById(textAreaAnotacao);


    if(campoPeriodo.disabled){
        campoPeriodo.disabled = false;
        campoNomeAula.disabled = false;
        selectDisciplinas.disabled = false;
        campoTextAreaAnotacao.disabled = false;
    }
}

// POPULA TODAS AS ANOTAÇÕES POR PERÍODO [OK]
function populaAnotacoesPorPeriodo(periodoSelecionado) {
    const campoPeriodo = document.getElementById(
        `body_${periodoSelecionado}PeriodoAnotacoesAlert`
    );

    campoPeriodo.innerHTML = '';

    const periodo = Number(periodoSelecionado);
    let encontrouAnotacao = false;

    for (let i = arrayAnotacoesADS.length - 1; i >= 0; i--) {
        const anotacao = arrayAnotacoesADS[i];
        if (Number(anotacao.periodo) !== periodo) {
            continue;
        }
        encontrouAnotacao = true;

        const idPeriodo = `campoSessaoAnotacoesPERIODO_${i}`;
        const idID = `campoSessaoAnotacoesID_${i}`;
        const idNomeAula = `campoSessaoAnotacoesNOMEAULA_${i}`;
        const idDisciplina = `campoSessaoAnotacoesDISCIPLINA_${i}`;
        const idTextArea = `campoSessaoAnotacoesTEXTANOTACAO_${i}`;

        campoPeriodo.innerHTML += `
            <div class="col-12 mt-4">
                <div class="alert alert-primary">
                    <span class="iconetagNumero uppercase px-2 rounded-start-pill" 
                        data-bs-toggle="collapse"
                        data-bs-target="#alertPeriodo_${periodo}_Anotacao_${i}"
                        style="cursor:pointer"
                        onclick="consoleArray(arrayAnotacoesADS)">
                        &nbsp;&nbsp;
                        <i class="fa fa-eye"
                            id="iconeChevron_Anotacao_${i}">
                        </i>
                        &nbsp;&nbsp;
                        <span>
                            Resumo &nbsp;${i + 1}
                        </span>
                    </span>
                    <span class="iconetagDisciplina uppercase rounded-start-pill">
                        ${anotacao.disciplina}
                    </span>
                    <div class="row mt-2">
                        <!-- ID -->
                        <div class="col-lg-3 col-12 mb-2">
                            <label class="labelFormat text-primary fw-bold">
                                ID
                            </label>
                            <input class="form-control uppercase textoCenter"
                                style="font-size: 0.8rem"
                                type="text"
                                value="${anotacao.id}"
                                id="${idID}"
                                disabled>
                        </div>

                        <!-- NOME DA AULA -->
                        <div class="col-12 col-lg mb-3 mt-3 mt-lg-0">
                            <label class="labelFormat text-primary fw-bold">
                                Nome da Aula
                            </label>
                            <input class="form-control uppercase textoCenter"
                                style="font-size: 0.8rem"
                                type="text"
                                value="${anotacao.nomeAula}"
                                disabled
                                id="${idNomeAula}"
                                data-toggle="tooltip"
                                title="${anotacao.nomeAula}">
                        </div>
                    </div>

                    <!-- DETALHES -->

                    <div class="row collapse" id="alertPeriodo_${periodo}_Anotacao_${i}">
                        <!-- PERÍODO -->
                        <div class="col-auto mb-3">
                            <label class="labelFormat text-primary fw-bold">
                                Período
                            </label>

                            <select class="form-select uppercase textoCenter"
                                id="${idPeriodo}"
                                disabled
                                style="font-size: 0.8rem"
                                onchange="populaSelectDisciplinas('${idDisciplina}', '${idPeriodo}')">

                                <option value="1" ${Number(anotacao.periodo) === 1 ? 'selected' : ''}>
                                    1
                                </option>
                                <option value="2" ${Number(anotacao.periodo) === 2 ? 'selected' : ''}>
                                    2
                                </option>
                                <option value="3" ${Number(anotacao.periodo) === 3 ? 'selected' : ''}>
                                    3
                                </option>
                                <option value="4" ${Number(anotacao.periodo) === 4 ? 'selected' : ''}>
                                    4
                                </option>
                                <option value="5" ${Number(anotacao.periodo) === 5 ? 'selected' : ''}>
                                    5
                                </option>
                            </select>
                        </div>

                        <!-- DISCIPLINA -->
                        <div class="col mb-2">
                            <label class="labelFormat text-primary fw-bold">
                                Disciplina da Aula
                            </label>
                            <select class="form-select uppercase textoCenter"
                                id="${idDisciplina}"
                                disabled
                                style="font-size: 0.8rem">

                                <option value="${anotacao.disciplina}" selected>
                                    ${anotacao.disciplina}
                                </option>
                            </select>
                        </div>

                        <hr>

                        <div class="row mb-3">
                            <div class="col"></div>
                            <div class="col-auto m-auto">
                                <label for="" class="labelFormat">
                                    ícones utilizados
                                </label>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-sm btn-dark"
                                data-bs-toggle="modal" data-bs-target="#modalCadastroIcones_${i}">
                                    <i class="fa fa-plus"></i></button>
                            </div>
                            <div class="col"></div>
                        </div>

                        <div class="row my-2 m-auto">
                            <div class="col" id="colunaExibeIcones_${i}"></div>
                        </div>

                        <!-- ANOTAÇÃO -->
                        <div class="col-12">
                            <div class="mt-1">
                                <label class="labelFormat text-primary fw-bold">
                                    Anotações da Aula
                                </label>

                                <button class="btn btn-sm btn-dark rounded-pill btnExpandText d-none d-lg-block btnExpansivo"
                                    id="btnExpancaoMinimizar_${idDisciplina}"
                                    onclick="expandirReduzirTextArea(
                                        'iconeExpandirRecolher_${idDisciplina}',
                                        'colunaPricipalAnotacoes',
                                        'btnExpancaoMinimizar_${idDisciplina}')">
                                    <i class="fa-solid fa-up-right-and-down-left-from-center"
                                        id="iconeExpandirRecolher_${idDisciplina}">
                                    </i>
                                </button>

                                <textarea class="form-control" rows="10" disabled id="${idTextArea}_${i}">
                                    ${anotacao.anotacao}
                                </textarea>
                            </div>
                        </div>


                        <!-- BOTÕES -->
                        <div class="col-12 flexCenter gap-2">
                            <!-- SALVAR -->
                            <button
                                class="btn btn-sm btn-success"
                                onclick="sobscreverAtualizarAnotacao(
                                    '${idID}',
                                    '${idNomeAula}',
                                    '${idPeriodo}',
                                    '${idDisciplina}',
                                    '${idTextArea}_${i}' )">

                                <i class="fa fa-save"></i>&nbsp;
                                <span class="uppercase tamanho07">
                                    Salvar
                                </span>
                            </button>

                            <!-- EDITAR -->
                            <button class="btn btn-sm btn-primary"
                                onclick="editaAnotacaoFeita(
                                    '${idPeriodo}',
                                    '${idNomeAula}',
                                    '${idDisciplina}',
                                    '${idTextArea}_${i}' )">

                                <i class="fa fa-edit"></i>&nbsp;
                                <span class="uppercase tamanho07">
                                    Editar
                                </span>
                            </button>


                            <!-- EXCLUIR -->
                            <button class="btn btn-sm btn-danger"
                                onclick="excluirAnotacaoCompleta('${anotacao.id}')">
                                <i class="fa fa-trash"></i>&nbsp;

                                <span class="uppercase tamanho07">
                                    Excluir
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!--MODAL CADASTRO ICONES-->
            <div class="modal mt-5" tabindex="-1" id="modalCadastroIcones_${i}">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header m-auto flexCenter">
                            <div class="row">
                                <div class="col">
                                    <h5 class="modal-title uppercase tamanho12">cadastrar icone</h5>
                                </div>
                                <div class="col-1">
                                    <button type="button" class="btn btn-sm btn-danger"
                                        data-bs-dismiss="modal"
                                        aria-label="Close">
                                            <i class="fa fa-x"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="modal-body">
                            <label for="" class="labelFormat">
                                Insira o ícone que deseja utilizar nas anotações das matérias
                            </label>
                            <div class="input-group">
                                <span class="input-group-text bg-primary text-light">
                                    <i class="fa fa-star"></i>
                                </span>
                                <input type="text" class="form-control col-12" id="inputNomeIcone_${i}" 
                                placeholder="Insira o ícone...">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success uppercase"
                            onclick="salvarIconeAnotacao('inputNomeIcone_${i}'),
                            exibeIcones('colunaExibeIcones_${i}', '${idTextArea}_${i}')">
                                <i class="fa fa-save"></i>&nbsp;
                                <span class="tamanho08">salvar</span>
                            </button>
                            <button type="button" class="btn btn-primary uppercase"
                            onclick="limparIconeAnotacao('inputNomeIcone_${i}')">
                                <i class="fa fa-broom"></i>&nbsp;
                                <span class="tamanho08">limpar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
        ;


        // Popula o select de disciplinas
        populaSelectDisciplinas(idDisciplina,idPeriodo);

        // Seleciona a disciplina salva
        document.getElementById(idDisciplina).value =anotacao.disciplina;

        exibeIcones(`colunaExibeIcones_${i}`, `${idTextArea}_${i}`);
        insereIconeTextArea(anotacao.anotacao, `${idTextArea}_${i}`);
    }

    // Nenhuma anotação encontrada para este período
    if (!encontrouAnotacao) {
        campoPeriodo.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center">
                    <span class="uppercase tamanho08 fw-bold">
                        <i class="fas fa-exclamation-triangle"></i>&nbsp;
                        Nenhuma anotação neste período.
                    </span>
                </div>
            </div>
        `;
    }
}

// ATUALIZA O ARRAY DE ACORDO COM A ATUALIZAÇAÃO DA ANOTAÇÃO [OK]
function sobscreverAtualizarAnotacao( id, nomeAula, periodo, disciplina, anotacao) {
    const campoId = document.getElementById(id);
    const campoNomeAula = document.getElementById(nomeAula);
    const campoPeriodo = document.getElementById(periodo);
    const campoDisciplinas = document.getElementById(disciplina);
    const campoTextoAnotacao = document.getElementById(anotacao);

    if ( !campoId || !campoNomeAula || !campoPeriodo || !campoDisciplinas || !campoTextoAnotacao) {
        console.error('Um ou mais campos não foram encontrados.');
        return;
    }

    const campoIdValor = campoId.value.trim();
    const campoNomeAulaValor = campoNomeAula.value.trim();
    const campoPeriodoValor = Number(campoPeriodo.value);
    const campoDisciplinaValor = campoDisciplinas.value;
    const campoTextoAnotacaoValor = campoTextoAnotacao.value.trim();

    if ( campoNomeAulaValor === '' || campoTextoAnotacaoValor === '' ) {
        alert(
            'Os campos de Nome da Aula e Anotação não podem ficar vazios.\n' +
            'Insira e tente novamente.'
        );

        return;
    }

    const indice = arrayAnotacoesADS.findIndex( anotacao => String(anotacao.id) === campoIdValor);

    if (indice === -1) {
        alert('Anotação não encontrada.');
        return;
    }

    const periodoAnterior = Number(arrayAnotacoesADS[indice].periodo);

    const data = new Date();
    const dataAtualizacao =
        `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;

    arrayAnotacoesADS[indice].nomeAula = campoNomeAulaValor;
    arrayAnotacoesADS[indice].dataAtualizacao = dataAtualizacao;
    arrayAnotacoesADS[indice].periodo = campoPeriodoValor;
    arrayAnotacoesADS[indice].disciplina = campoDisciplinaValor;
    arrayAnotacoesADS[indice].anotacao = campoTextoAnotacaoValor;

    localStorage.setItem('Anotacoes', JSON.stringify(arrayAnotacoesADS));

    alert('Anotação atualizada com sucesso!');

    populaAnotacoesPorPeriodo(periodoAnterior);

    if (periodoAnterior !== campoPeriodoValor) {
        populaAnotacoesPorPeriodo(campoPeriodoValor);
    }

    calculaQtdAnotacoesPeriodo();
    console.log(arrayAnotacoesADS);
}

function excluirAnotacaoCompleta(id) {
    const confirmacao = confirm('Deseja realmente excluir esta anotação?');
    if (!confirmacao) {return;}

    const indice = arrayAnotacoesADS.findIndex(anotacao => String(anotacao.id) === String(id));
    if (indice === -1) {
        alert('Anotação não encontrada.');
        return;
    }

    const periodo = Number(arrayAnotacoesADS[indice].periodo);
    arrayAnotacoesADS.splice(indice, 1);

    localStorage.setItem('Anotacoes',JSON.stringify(arrayAnotacoesADS));
    alert('Anotação excluída com sucesso!');

    populaAnotacoesPorPeriodo(periodo);
    calculaQtdAnotacoesPeriodo();
}

function consoleArray(array){
    console.log(array)
}

function expandirReduzirTextArea(iconeDoBTN, colunaPrincipalMain, btnParaExpandeRecolhe) {
    const iconeBtn = document.getElementById(iconeDoBTN);
    const colunaPrincipal = document.getElementById(colunaPrincipalMain);
    const btnExpandeRecolhe = document.getElementById(btnParaExpandeRecolhe);

    if (iconeBtn.classList.contains('fa-up-right-and-down-left-from-center')) {
        iconeBtn.classList.replace(
            'fa-up-right-and-down-left-from-center',
            'fa-down-left-and-up-right-to-center'
        );
        btnExpandeRecolhe.classList.replace("btn-dark",'btn-danger')
        colunaPrincipal.classList.replace('col-lg-6', 'col-lg-12');
        scrollParaId('btnSalvarAnotacoes',50)
        iconeBtn.classList.add('fa-beat-fade')

        document.getElementById('mainProvasExercicios').classList.add('d-none');
        document.getElementById('mainTecnologias').classList.add('d-none');
        document.getElementById('mainDisciplinas').classList.add('d-none');
        document.getElementById('mainLivros').classList.add('d-none');
        document.getElementById('mainProjetos').classList.add('d-none');


        document.getElementById('colunaIDnovaAnotacao').classList.replace('col-lg-3','col-lg-2');
        document.getElementById('colunaDATAINICIOnovaAnotacao').classList.replace('col-lg-4','col-lg-auto');
        document.getElementById('colunaDATAATUALIZACAOnovaAnotacao').classList.replace('col-lg-5','col-lg-auto');
        document.getElementById('colunaPERIODOnovaAnotacao').classList.replace('col-lg-3','col-lg-2');
        document.getElementById('colunaDISCIPLINAnovaAnotacao').classList.replace('col-lg-9','col-lg-6');
        document.getElementById('colunaNOMEMATERIAnovaAnotacao').classList.replace('col-12','col-6');
    } 
    else {
        iconeBtn.classList.replace(
            'fa-down-left-and-up-right-to-center',
            'fa-up-right-and-down-left-from-center'
        );

        btnExpandeRecolhe.classList.replace("btn-danger",'btn-dark')
        iconeBtn.classList.remove('fa-beat-fade')
        colunaPrincipal.classList.replace('col-lg-12', 'col-lg-6');

        document.getElementById('mainProvasExercicios').classList.remove('d-none');
        document.getElementById('mainTecnologias').classList.remove('d-none');
        document.getElementById('mainDisciplinas').classList.remove('d-none');
        document.getElementById('mainLivros').classList.remove('d-none');
        document.getElementById('mainProjetos').classList.remove('d-none');

        document.getElementById('colunaIDnovaAnotacao').classList.replace('col-lg-2','col-lg-3');
        document.getElementById('colunaDATAINICIOnovaAnotacao').classList.replace('col-lg-auto','col-lg-4');
        document.getElementById('colunaDATAATUALIZACAOnovaAnotacao').classList.replace('col-lg-auto','col-lg-5');
        document.getElementById('colunaPERIODOnovaAnotacao').classList.replace('col-lg-2','col-lg-3');
        document.getElementById('colunaDISCIPLINAnovaAnotacao').classList.replace('col-lg-6','col-lg-9');
        document.getElementById('colunaNOMEMATERIAnovaAnotacao').classList.replace('col-6','col-12');
    }
}
/*======================================== FUNÇÕES ONLOAD ========================================*/
/*=====================================================================================================*/
window.onload = () => {
    verificaStatusLeituraLivro('Em Aberto');
    gerarId('inputIdProjeto', arrayProjetosADS, 'PRJ');
    mostraDataAtual('inputDataInicioProjeto');
    populaSelectDisciplinas('selectDisplinaProjeto','inputPeriodoProjeto');
    populaCheckboxTecnologias('inputTecnologiasProjeto');
    clicarElemento('btnSessaoCadastroExerciciosProvas');
    exibeCadastroExercicioProva();
    exibirNotificacaoAtividadePendente();
    exibeIcones('colunaExibeIcones', 'textAreaAnotacaoMateria');
};