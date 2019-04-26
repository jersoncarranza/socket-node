
export class GraficaDataBarra{
    private preguntas: string[] = ['1','2','3','4'];
    private valores: number[] = [0,0,0,0];

    constructor(){}

    getGraficaDataBarra(){
        return[
            {data:this.valores,   label: 'Preguntas' }
        ]
    }
    
    incrementarValor(pregunta: string, valor: number){
        pregunta = pregunta.toLocaleLowerCase().trim();
       // console.log(this.preguntas);
        for(let i in this.preguntas){
            if(this.preguntas[i] === pregunta){
                console.log('pregunta:', pregunta);
                console.log('valor:',valor);
                this.valores[i] += valor;
                console.log('valores:', this.valores[i]);
            }
        }
        return this.getGraficaDataBarra();
    }


}