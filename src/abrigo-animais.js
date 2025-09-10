class AbrigoAnimais {
  constructor() {
    this.animais = {
      "Rex": ["RATO", "BOLA"],
      "Mimi": ["BOLA", "LASER"],
      "Fofo": ["BOLA", "RATO", "LASER"],
      "Zero": ["RATO", "BOLA"],
      "Bola": ["CAIXA", "NOVELO"],
      "Bebe": ["LASER", "RATO", "BOLA"],
      "Loco": ["SKATE", "RATO"]
    };
  }

  validarBrinquedos(lista) {
    return new Set(lista).size === lista.length;
  }

  validarAnimal(listaAnimais) {
    return listaAnimais.every((a) => this.animais[a]);
  }

  respeitaOrdem(brinquedosPessoa, favoritos) {
    let i = 0;
    for (let item of brinquedosPessoa) {
      if (i < favoritos.length && item === favoritos[i]) {
        i++;
      }
    }
    return i === favoritos.length;
  }

  imprimirSaida(resultado) {
    if (resultado.erro) {
      return `{ erro: '${resultado.erro}' }`;
    } else {
      return `{ lista: [${resultado.lista.map((x) => `'${x}'`).join(", ")}] }`;
    }
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const b1 = brinquedosPessoa1.split(",");
    const b2 = brinquedosPessoa2.split(",");
    const listaAnimais = ordemAnimais.split(",");

    if (!this.validarBrinquedos(b1) || !this.validarBrinquedos(b2)) {
      return { erro: "Brinquedo inválido" };
    }

    if (new Set(listaAnimais).size < listaAnimais.length) {
      return { erro: "Animal inválido" };
    }

    if (!this.validarAnimal(listaAnimais)) {
      return { erro: "Animal inválido" };
    }

    let adotadosP1 = 0;
    let adotadosP2 = 0;
    const atribuicoes = [];

    for (let nome of listaAnimais) {
      const favoritos = this.animais[nome];
      let dono;

      if (nome === "Loco") {
        if (adotadosP1 > 0 && adotadosP1 < 3) {
          dono = "pessoa 1";
          adotadosP1++;
        } else if (adotadosP2 > 0 && adotadosP2 < 3) {
          dono = "pessoa 2";
          adotadosP2++;
        } else {
          dono = "abrigo";
        }
      } else {
        const p1Pode = adotadosP1 < 3 && this.respeitaOrdem(b1, favoritos);
        const p2Pode = adotadosP2 < 3 && this.respeitaOrdem(b2, favoritos);

        if (p1Pode && p2Pode) {
          dono = "abrigo";
        } else if (p1Pode) {
          dono = "pessoa 1";
          adotadosP1++;
        } else if (p2Pode) {
          dono = "pessoa 2";
          adotadosP2++;
        } else {
          dono = "abrigo";
        }
      }

      atribuicoes.push(`${nome} - ${dono}`);
    }

    atribuicoes.sort();
    return { lista: atribuicoes };
  }
}

export { AbrigoAnimais as AbrigoAnimais };

const abrigo = new AbrigoAnimais();

const r1 = abrigo.encontraPessoas("RATO,BOLA", "RATO,NOVELO", "Rex,Fofo");
console.log(abrigo.imprimirSaida(r1));

const r2 = abrigo.encontraPessoas("CAIXA,RATO", "RATO,BOLA", "Lulu");
console.log(abrigo.imprimirSaida(r2));