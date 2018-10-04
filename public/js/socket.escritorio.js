//Comando para establecer la comunicación
var socket = io();

var label = $('small');

//obtener parametros por url
var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritrio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (!(typeof resp === 'string')) {
            label.text('Ticket ' + resp.numero);
        } else {
            label.text(resp);
            alert(resp);
            return;
        }
        console.log(resp);
    });
});