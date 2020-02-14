import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';

export class NegociacaoController {

  @domInject('#data')
  private _inputData: JQuery;

  @domInject('#quantidade')
  private _inputQuantidade: JQuery;

  @domInject('#valor')
  private _inputValor: JQuery;

  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');
  private _negociacaoService = new NegociacaoService();

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  @throttle()
  adiciona() {

    let data = new Date(this._inputData.val().replace(/-/g, ','));

    if (!this._ehDiaUtil(data)) {
      return this._mensagemView.update('Somente negociações em dias úteis');
    }

    const negociacao = new Negociacao(
      data,
      parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val()));

    this._negociacoes.adiciona(negociacao);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso.');
  }

  @throttle()
  importarDados() {

    this._negociacaoService.obterNegociacoes(res => {
      if (res.ok) return res;
      throw new Error(res.statusText);
    })
      .then(negociacoes => {
        negociacoes.forEach(negociacao =>
          this._negociacoes.adiciona(negociacao));
        this._negociacoesView.update(this._negociacoes);
      });
  }

  private _ehDiaUtil(data: Date): boolean {
    return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}