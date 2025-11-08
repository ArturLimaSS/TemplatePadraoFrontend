import Swal from "sweetalert2";

export function swalSucesso(mensagem = "") {
    Swal.fire({
        title: "Sucesso!",
        text: mensagem,
        icon: 'success'
    })
}

export function swalErro(mensagem = "") {
    Swal.fire({
        title: "Ooops...",
        text: mensagem,
        icon: 'error'
    })
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
})




export function toastSucesso(mensagem = "") {
    Toast.fire({
        icon: 'success',
        title: mensagem,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })
}

export function toastErro(mensagem = "") {
    Toast.fire({
        icon: 'error',
        title: mensagem,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })
}

export function toastInfo(mensagem = "") {
    Toast.fire({
        icon: 'info',
        title: mensagem,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })
}