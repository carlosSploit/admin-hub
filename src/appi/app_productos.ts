import axios from "axios";

const url = "https://script.googleusercontent.com/macros/echo?user_content_key=AWDtjMUxsvtTCGRPePoYq7aCOLaFEVgWgY_XiNMe5AlEMs0SnfUJxR68m8nmBE9Hb0iVzOc8OPb0xnoV0cIWVOSP7Jj-HkoDjqA5_UIj7LqIGQygTJFzzhLTQ95EuAvNxL61VlXdz43uDpBpYnOzfHcOIBDL3YVkChRW_bUlOJkNSLM4IzAazlVRSPE9nRSJfJDlNKLv42nb7vzz5WAl2YK0r-qOXnxdz3YaNlA0OC26WlDUWhkQjPJ6k9Dext-9YdaelK4x8hrTosMw9fF3MkGtHvdByP3wRg&lib=MHWzNQ5K0Z6SMk2T1Za2UfuBiPQ9XyBWv";

/* 
active: true
category: "ghjgjhgjhgjh"
description: "dsjfhdskjfhsdjkhfjkdshfjkdsfhdjkshfkdsj"
image: ""
name: "hksahdkjashdjkashdjk"
price: 123
stock: 15
*/
export const crearProducto = async ({name = "", description= "", price = 0.0, stock= 0, category = "", image = "", active = true  }) => {
    const data = {
        nombre: name,
        descripcion: description,
        precio: price,
        stock: stock,
        categoria: category,
        imagen: image,
        activo: active
    };

    axios.post(url, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        console.log("Guardado:", res.data);
        alert("Producto creado");
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Error al crear el producto");
    });
}