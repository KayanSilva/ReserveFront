import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

// Utilizando jQuery.
$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importarDados.bind(controller));