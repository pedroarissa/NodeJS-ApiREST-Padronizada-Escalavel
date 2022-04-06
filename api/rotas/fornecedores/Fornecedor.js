const TabelaFornecedor = require("./TabelaFornecedor");
const CampoInvalido = require("../../erros/CampoInvalido");
const DadosNaoFornecidos = require("../../erros/DadosNaoFornecidos");

class Fornecedor {
    constructor({id, empresa, email, categoria, dataCriação, dataAtualização, versão}) {
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria;
        this.dataCriação = dataCriação;
        this.dataAtualização = dataAtualização;
        this.versão = versão;
    }

    async criar() {
        this.validar();
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = resultado.id;
        this.dataCriação = resultado.dataCriação;
        this.dataAtualização = resultado.dataAtualização;
        this.versão = resultado.versão;
    }

    async carregar() {
        const fornecedorEncontrado = await TabelaFornecedor.pegarPorId(this.id);
        this.empresa = fornecedorEncontrado.empresa;
        this.email = fornecedorEncontrado.email;
        this.categoria = fornecedorEncontrado.categoria;
        this.dataCriação = fornecedorEncontrado.dataCriação;
        this.dataAtualização = fornecedorEncontrado.dataAtualização;
        this.versão = fornecedorEncontrado.versão;
    }

    async atualizar() {
        await TabelaFornecedor.pegarPorId(this.id);
        const campos = ["empresa", "email", "categoria"];
        const dadosParaAtualizar = {};

        campos.forEach((campo) => {
            const valor = this[campo];
            if(typeof valor  === "string" && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar);
    }

    remover() {
        return TabelaFornecedor.remover(this.id);
    }

    validar() {
        const campos = ["empresa", "email", "categoria"];

        campos.forEach(campo => {
            const valor = this[campo];

            if (typeof valor !== "string" || valor.lenght === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }
};

module.exports = Fornecedor;