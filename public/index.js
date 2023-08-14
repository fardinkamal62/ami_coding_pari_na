getCookie('token') === undefined ? window.location.href = '/login' : null;

function getCookie(cName) {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded .split('; ');
      let res;
      cArr.forEach(val => {
          if (val.indexOf(name) === 0) res = val.substring(name.length);
      })
      return res;
}

let valid = false;

function focusOut(id) {
    const inputValues = $('#input').val().trim();
    const searchValue = $('#search').val().trim();

    if (id === 'input') {
        if (inputValues === '') {
            $('#input').addClass('is-invalid');
            valid = false;
        } else {
            $('#input').addClass('is-valid').removeClass('is-invalid');
            valid = true;
        }
    } else {
        if (searchValue === '') {
            $('#search').addClass('is-invalid');
            valid = false;
        } else {
            $('#search').addClass('is-valid').removeClass('is-invalid');
            valid = true;
        }
    }
}


$('body').on('click', '#submit', async function (event) {
    event.preventDefault();
    const inputValues = $('#input').val().trim();
    const searchValue = $('#search').val().trim();
    const token = localStorage.getItem('token');

    if (!valid) {
        return;
    }

    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({inputValues, searchValue})
    }).then((res) => res.json())
        .then((response) => {
            const found = response.search;
            if (found) {
                $('#output').html(`<b>True</b>`).addClass('bg-success').removeClass('bg-danger');
            } else {
                $('#output').html(`<b>False</b>`).addClass('bg-danger').removeClass('bg-success');
            }
        })
}).on('click', '#logout', function (event) {
    event.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = '/login';
}).focusout(function (event) {
    const id = event.target.id;
    focusOut(id);
}).on('keypress', function (event) {
    const id = event.target.id;
    const key = event.originalEvent.key;
    $(`#${id}`).removeClass('is-invalid').addClass('is-valid');

    if (!Number.isInteger(parseInt(key)) && key !== ',' && key !== ' ') {
        $(`#${id}`).addClass('is-invalid').removeClass('is-valid')
        valid = false;
    } else {
        $(`#${id}`).addClass('is-valid').removeClass('is-invalid');
        valid = true;
    }

    if (id === 'search') {
        if (!Number.isInteger(parseInt(key)) && key !== ' ') {
            $(`#${id}`).addClass('is-invalid').removeClass('is-valid')
            valid = false;
        } else {
            $(`#${id}`).addClass('is-valid').removeClass('is-invalid');
            valid = true;
        }
    }

})