class Ingredientes{
    constructor(descricao){
        this.descricao = descricao;
    }
}

class Comida{
    constructor(nome,tipo,peso){
        this.nome = nome != undefined ? nome : "Comida Genérica";
        this.tipo = tipo != undefined ? tipo : "Tipo Genérico";
        this.peso = peso != undefined ? peso : 0;
    }
}

class Salgada{
    constructor(nome,peso){
        this.nome = nome != undefined ? nome : "Comida Genérica";
        this.tipo = "Salgada";
        this.peso = peso != undefined ? peso : 0;
    }
}

class Doce{
    constructor(nome,peso){
        this.nome = nome != undefined ? nome : "Comida Genérica";
        this.tipo = "Doce";
        this.peso = peso != undefined ? peso : 0;
    }
}

class ComidaBuilder{
    constructor(nome,tipo,peso){
        if(nome != undefined && tipo != undefined && peso != undefined) {
            if (tipo == "Salgada")
                this.Comida = new Salgada(nome,peso);
            else if (tipo == "Doce")
                this.comida = new Doce(nome,peso);
            else
                this.comida = new this.comida(nome,tipo,peso);
             } else if (nome != undefined && tipo != undefined) {
                if (tipo == "Salgada")
                    this.comida == new Salgada (nome);
                else if (tipo == "Doce")
                    this.comida == new Doce(nome);
                else
                    this.comida = new this.comida(nome,tipo);
                }else if (nome != undefined) {
                    this.comida
                }
    }
}