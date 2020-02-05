const controller = new NegociacaoController();

// Utilizando jQuery.
$('.form').submit(controller.adiciona.bind(controller));