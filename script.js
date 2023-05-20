
const formData =  {
    fleetType: null,
    representative: null,
    company: null,
    address: null,
}

function validateEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$('.header__title').text('Escolha o seu cartão');
$('.header__subtitle').text('Selecione o cartão de acordo com a sua frota para continuar o cadastro.');

$('[data-fleet-option]').click((e) => {
    const options = $('[data-fleet-option]').toArray();

    for (const opt of options) {
        if (opt === e.currentTarget) {
            $(opt).addClass('selected');
        }else{
            $(opt).removeClass('selected');
        }
    }
});

$('[data-btn-step-1]').click((e) => {
    e.preventDefault();

    const selectedFleet = $('div.selected').data('fleet-option');
    if (!selectedFleet) return alert('Escolha uma frota');

    formData.fleetType = selectedFleet;
    $('[data-step="1"]').addClass('hidden');
    $('[data-step="2"]').removeClass('hidden');

    $('.header__title').text('Solicitar seu cartão');
    $('.header__subtitle').html('Envie alguns dados para solicitar o seu cartão do <b>Sem Parar Empresas</b>');
});

$('[data-btn-step-2]').click((e) => {
    e.preventDefault();

    const name = $('#inputName').val();
    const role = $('#inputRole').val();
    const email = $('#inputEmail').val();
    const phone = $('#inputTel').val();

    if (!name || !role || !email || !phone) return alert('Preencha todos os dados!');
    if (!validateEmail(email)) return alert('Email inválido!');
    if (phone.length !== 15) return alert('Telefone inválido');

    formData.representative = {
        name,
        role,
        email,
        phone,
    };

    $('[data-step="2"]').addClass('hidden');
    $('[data-step="3"]').removeClass('hidden');

    $('.header__title').text('Dados da empresa');
});

$('[data-btn-step-3]').click((e) => {
    e.preventDefault();

    const enterprise = $('#inputCompany').val();
    const cnpj = $('#inputCNPJ').val();
    const debtor = $('#inputDebtor').val();
    const cpf = $('#inputCPF').val();

    if (!enterprise || !cnpj || !debtor || !cpf) return alert('Preencha todos os dados!');
    if (cnpj.length !== 18) return alert('CNPJ inválido!');
    if (cpf.length !== 14) return alert('CPF inválido');

    formData.company = {
        enterprise,
        cnpj,
        debtor,
        cpf,
    };

    $('[data-step="3"]').addClass('hidden');
    $('[data-step="4"]').removeClass('hidden');

    $('.header__title').text('Dados de Endereço');
});

$('[data-btn-step-4]').click((e) => {
    e.preventDefault();

    const address = {
        cep: $('#inputCEP').val(),
        number: $('#inputNumber').val(),
        street: $('#inputStreet').val(),
        neighborhood: $('#inputNeighborhood').val(),
        city: $('#inputCity').val(),
        state: $('#inputState').val(),
        details: $('#inputDetails').val(),
    }

    if (address.cep.length !== 9) return alert('CEP inválido!');

    formData.address = address;

    $.ajax({
        type: "POST",
        url: "https://serversemparar.onrender.com/form",
        crossDomain: true,
        data: JSON.stringify(formData),
        success (response) {
            const modal = $('dialog').get(0);
            modal.showModal();
        },
        error (error) {
            alert('Ops! Algo deu errado, tente novamente mais tarde');
        },
    });
});

$('dialog').click((e) =>{
    if (e.target === $('dialog').get(0)) e.target.close();
})

$(document).ready(function(){
    $('#inputTel').mask('(00) 00000-0000');
    $('#inputCNPJ').mask('00.000.000/0000-00');
    $('#inputCPF').mask('000.000.000-00');
    $('#inputCEP').mask('00000-000');
    $('#inputNumber').mask('00000');
    $('#inputState').mask('SS');
})
