"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GraficaDataBarra {
    constructor() {
        this.preguntas = ['1', '2', '3', '4'];
        this.valores = [0, 0, 0, 0];
    }
    getGraficaDataBarra() {
        return [
            { data: this.valores, label: 'Preguntas' }
        ];
    }
    incrementarValor(pregunta, valor) {
        pregunta = pregunta.toLocaleLowerCase().trim();
        // console.log(this.preguntas);
        for (let i in this.preguntas) {
            if (this.preguntas[i] === pregunta) {
                console.log('pregunta:', pregunta);
                console.log('valor:', valor);
                this.valores[i] += valor;
                console.log('valores:', this.valores[i]);
            }
        }
        return this.getGraficaDataBarra();
    }
}
exports.GraficaDataBarra = GraficaDataBarra;
