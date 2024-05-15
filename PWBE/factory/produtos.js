class Produto {
    constructor(nome, preco) {
      this.nome = nome;
      this.preco = preco;
    }
  
    obterDados() {
      console.log(`Produto: ${this.nome}, Preço: ${this.preco}`);
    }
  }
  class produtoFactory{
    criar(tipo){
      let produto;
      if (tipo === 'A') {
        produto = new Produto('Açucar', 10.5);
      } else if (tipo === 'B') {
        produto = new Produto('Sal', 2.5);
      } else if (tipo === 'C') {
        produto = new Produto('Oleo', 12.9);
      }
  
      return produto;
    }  
  }
 
const factory = new produtoFactory();
const sal = factory.criar('B');
const açucar = factory.criar('A');
const oleo = factory.criar('C');
const feijao = factory.criar('Feijao', 8.5);
sal.obterDados();
açucar.obterDados();
oleo.obterDados();
feijao.obterDados();
